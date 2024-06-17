import React from "react";
import { useEffect, useState } from "react";
import MainScreen from "../component/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { deleteNoteAction, updateNoteAction } from "../../actions/notesActions";
// import ErrorMessage from "../../components/ErrorMessage";
// import Loading from "../../components/Loading";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { setNote } from "../Store/noteSlice";
import {useNavigate} from "react-router-dom"
import { showLoading, hideLoading } from "../Store/alertSlice";
import Loader from "../component/Loader";
import { removeNote } from "../Store/noteSlice";


function SingleNote({ match }) {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState("");
  const { id } = useParams();
  const { loading } = useSelector((state) => state.alert);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      //   dispatch(deleteNoteAction(id));
    }
    // history.push("/mynotes");
  };

  useEffect(() => {
    const fetching = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const {data} = await axios.get(`/api/v1/note/${id}`, config);
      const note = data.data;
      console.log(data.data);

        setTitle(note.title);
        setContent(note.content);
        setCategory(note.category);
        setDate(note.updatedAt);
    };

    fetching();
  }, [id,date]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = async(e) => {
    e.preventDefault();
    try
    {
        const config = {
            headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };
        dispatch(showLoading());
        const  {data}  = await axios.put(
            `/api/v1/note/${id}`,
            { title, content, category },
            config
        );
        console.log(data.data);
        dispatch(hideLoading());

        if (data.data) {
          navigate("/myNotes");
        }

        

    }
    catch(error){
        console.log(error)
        dispatch(hideLoading());

    }
    
  };

  return (
    <MainScreen title="Edit Note">
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {/* {loadingDelete && <Loading />} */}
            {/* {&& <ErrorMessage variant="danger">{error}</ErrorMessage>} */}
            {/* { (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )} */}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={content}
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
                placeholder="Enter the Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loader size={50} />}
            <Button variant="primary" type="submit">
              Update Note
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(match.params.id)}
            >
              Delete Note
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          {/* Updated on - {date.substring(0, 10)} */}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleNote;
// import React from 'react'

// const SingleNote = () => {
//   return (
//     <div>
//       helo
//     </div>
//   )
// }

// export default SingleNote
