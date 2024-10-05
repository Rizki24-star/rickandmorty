import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { characterLocationState, characterState } from "../recoil/atom";
import React, { useEffect, useState } from "react";
import QueryResult from "../components/QueryResult";
import { db } from "../config/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import ModalDialog from "../components/ModalDialog";

const GET_CHARACTER = gql(`
  query GetCharacter($characterId: ID!) {
    character(id: $characterId) {
      id
      name
      status
      species
      type
      gender
      origin {
        name 
      }
      image
      episode {
        name
      }
      created
    }
  }
`);

const CharacterDetailPage = () => {
  const { id } = useParams();
  const [character, setCharacter] = useRecoilState(characterState);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<{
    status: string;
    message: string;
  }>();

  const [characterLocation, setCharacterLocation] = useRecoilState(
    characterLocationState
  );
  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { characterId: id },
  });

  useEffect(() => {
    if (data) {
      setCharacter(data);
    }
  }, [data, character]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCharacterLocation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const docRef = doc(
        db,
        "character_location",
        `${characterLocation.name}-${id}`
      );

      const docSnapShot = await getDoc(docRef);

      if (docSnapShot.exists()) {
        setModalContent({
          status: "error",
          message: "Characters with Locations have been registered",
        });
        setShowModal((prev) => !prev);
        console.log("Characters with Locations have been registered");
      } else {
        await setDoc(docRef, {
          name: characterLocation.name,
          character_id: id,
          timestamp: serverTimestamp(),
        });
        setCharacterLocation({ ...characterLocation, name: "" });
        setModalContent({
          status: "success",
          message: "Location registered successfully",
        });
        setShowModal((prev) => !prev);
        console.log("Location added successfully");
      }
    } catch (error) {
      console.error("Error adding location: ", error);
    }
  };

  return (
    <QueryResult loading={loading} error={error} data={data}>
      <div className="character-detail mt-4">
        <Container>
          <Row noGutters className="d-flex justify-content-center">
            <Col md={3}>
              <Card.Img src={character?.character?.image!} />
            </Col>
            <Col
              md={5}
              className="position-relative h-full d-flex flex-column justify-content-between gap-2 p-2"
            >
              <Link
                to={`https://rickandmortyapi.com/api/character/${id}`}
                className="position-absolute top-0 end-0"
              >
                🌐
              </Link>
              <div>
                <h4 className="fw-bold fs-2">{character?.character?.name}</h4>
                <div className="d-flex align-items-center gap-2 fw-bold">
                  <div
                    className={`rounded-circle ${
                      character?.character?.status === "Alive"
                        ? "bg-success"
                        : character?.character?.status === "Dead"
                          ? "bg-danger text-decoration-line-through"
                          : "bg-secondary"
                    }`}
                    style={{ width: "12px", height: "12px" }}
                  />
                  {character?.character?.status} -
                  {character?.character?.species}
                  <div>&#127757; {character?.character?.origin?.name}</div>
                </div>
              </div>

              <div className="">
                <span className="text-secondary fs-6">First seen in</span>
                <h5>{character?.character?.episode[0]?.name}</h5>
              </div>

              <div className="">
                <span className="text-secondary fs-6">Gender</span>
                <h5>{character?.character?.gender}</h5>
              </div>

              <div>
                <Form onSubmit={handleAdd}>
                  <Form.Group className="mb-3" controlId="locationInput">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      name="name"
                      type="text"
                      placeholder="Enter location"
                      onChange={handleChange}
                      value={characterLocation.name}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-end">
                    <Button type="submit">Add Location</Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <ModalDialog
        isOpen={showModal}
        {...modalContent!}
        onClose={() => setShowModal((prev) => !prev)}
      />
    </QueryResult>
  );
};

export default CharacterDetailPage;
