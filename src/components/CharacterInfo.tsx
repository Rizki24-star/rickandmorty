import React from "react";
import { useRecoilState } from "recoil";
import { characterState } from "../recoil/atom";
import { useQuery, gql } from "@apollo/client";
import QueryResult from "./QueryResult";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const GET_CHARACTER = gql`
  query GetCharacterQuery($characterId: ID!) {
    character(id: $characterId) {
      id
      name
      image
      status
      species
    }
  }
`;

const CharacterInfo = ({ characterId }: { characterId: string }) => {
  const [characters, setCharacters] = useRecoilState(characterState);
  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: {
      characterId: characterId,
    },
  });

  return (
    <QueryResult loading={loading} error={error} data={data}>
      {data && data.character && (
        <div>
          <p>Character info: </p>
          <Row>
            <Col lg={5}>
              <img src={data.character.image} alt={data.character.name} />
            </Col>
            <Col lg={7}>
              <h3>{data.character.name}</h3>
              <p>Status: {data.character.status}</p>
              <p>Species: {data.character.species}</p>
              <Link to={`/${characterId}`} className="btn btn-dark">
                Detail
              </Link>
            </Col>
          </Row>
        </div>
      )}
    </QueryResult>
  );
};

export default CharacterInfo;
