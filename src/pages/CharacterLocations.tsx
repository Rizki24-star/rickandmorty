import { collection, query, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../config/firebase";
import { useRecoilState } from "recoil";
import { characterLocationListState } from "../recoil/atom";
import {
  Accordion,
  Col,
  Container,
  ListGroup,
  Row,
  Tab,
} from "react-bootstrap";
import CharacterInfo from "../components/CharacterInfo";

const CharacterLocationsPage = () => {
  const [characterLoactions, setCharacterLoactions] = useRecoilState(
    characterLocationListState
  );

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "character_location"));
      const querySnapshot = await getDocs(q);

      const locations = querySnapshot.docs.map((doc) => doc.data());
      console.log(locations);
      if (locations) {
        setCharacterLoactions(
          locations.map((location) => ({
            name: location.name,
            character_id: location.character_id,
          }))
        );
      }
    };

    fetchData();
  }, []);
  return (
    <div className="mt-2 mb-5 container">
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <Row>
          <Col sm={2}>
            <ListGroup>
              {characterLoactions.map((item, index) => (
                <ListGroup.Item action href={`#${index}`}>
                  {item.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              {characterLoactions.map((item, index) => (
                <>
                  <Tab.Pane eventKey={`#${index}`}>
                    <p className="fw-bold fs-4">{item.name}</p>
                    <CharacterInfo
                      characterId={item.character_id}
                      key={index}
                    />
                  </Tab.Pane>
                </>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default CharacterLocationsPage;
