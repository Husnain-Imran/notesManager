import React, { useEffect } from "react";
import MainScreen from "../component/MainScreen";
import { Link } from "react-router-dom";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import notes from "../data/notes";
import axios from "axios"
import { useSelector } from "react-redux";

const Mynotes = () => {
  const {user } = useSelector(state => state.auth)
  // console.log(user)
  const deleHandle = (id) => {
    if (window.confirm("Are you sure?")) {
      // deleteNote(id);
    }
  };

    const fetchData = async () => {
      const data = await axios.get("/api/notes");
      console.log(data);
    };

    useEffect(() => {
      fetchData();
    }, []);
  return (
    <MainScreen title={ `hello  ${user.name}  wellcome back` }>
      <Link to="createnotes">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>
      {notes.map((note) => (
        <Accordion>
          <Accordion.Item eventKey="0">
            <Card style={{ margin: 10 }}>
              <Card.Header style={{ display: "flex" }}>
                {/* <Accordion.Toggle as={Card.Text} eventKey="0" variant="link"> */}
                <Accordion.Header>
                  <span>{note.title}</span>
                </Accordion.Header>
                {/* </Accordion.Toggle> */}
                <div
                  style={{
                    flex: 1,
                    textAlign: "right",
                    cursor: "pointer",
                    fontSize: 20,
                  }}
                >
                  <Button href={`/note/${note._id}`}>Edit</Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleHandle(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>
              <Accordion.Body>


              <Card.Body>
                <h4>
                  <Badge variant="success">Category - {note.category}</Badge>
                </h4>
                <blockquote className="blockquote mb-0">
                  <p>{note.content}</p>
                  <footer className="blockquote-footer">
                    created at -Date
                  </footer>
                </blockquote>
              </Card.Body>
              </Accordion.Body>
            </Card>
          </Accordion.Item>
        </Accordion>
      ))}
    </MainScreen>
  );
};

export default Mynotes;
