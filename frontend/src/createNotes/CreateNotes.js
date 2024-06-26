import React, { useEffect, useState } from "react";
import MainScreen from "../component/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { createNoteAction } from "../../actions/notesActions";
// import Loading from "../../components/Loading";
// import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import Loader from "../component/Loader";
import { useDispatch,useSelector } from "react-redux";
import { showLoading ,hideLoading } from "../Store/alertSlice";
import axios from "axios";
// import { config } from "dotenv";
import { Navigate, useNavigate } from "react-router-dom";

function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const {loading}= useSelector(state => state.alert)
  const navigate = useNavigate();   

  const dispatch = useDispatch();

//   const noteCreate = useSelector((state) => state.noteCreate);
//   const { loading, error, note } = noteCreate;

//   console.log(note);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };
  const storeTodb= async()=>{
    try {
       
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        
        };
         dispatch(showLoading())
             const { data } = await axios.post("/api/v1/note/createNote",{title,content,category} ,config)
           
                if(data)
                {
                 dispatch(hideLoading())
                  console.log(data)
                }


    }catch(error){
      console.log(error)
      dispatch(hideLoading())
    }
}

  const submitHandler = (e) => {
    e.preventDefault();
    storeTodb()
    navigate("/myNotes");
  
  };

  useEffect(() => {

  }, []);

  return (
    <MainScreen title="Create a Note">
      <Card>
        <Card.Header>Create a new Note</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {/* {error && <ErrorMessage variant="danger">{error}</ErrorMessage>} */}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loader size={50} />}
            <Button type="submit" variant="primary">
              Create Note
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateNote;
