import React, { useEffect } from "react";
import MainScreen from "../component/MainScreen";
import { Link } from "react-router-dom";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import Notes from "../data/notes";
import axios from "axios"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setNote, resetNote } from "../Store/noteSlice";
import { showLoading, hideLoading } from "../Store/alertSlice";
import Loader from "../component/Loader";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { removeNote } from "../Store/noteSlice";
import { verify } from "../Store/tfaSlice";



const Mynotes = ({search}) => {
  const {user } = useSelector(state => state.auth)
  const {note} = useSelector(state => state.data)
  const {loading} =useSelector(state => state.alert)
  const navigate = useNavigate(); 
  const dispatch = useDispatch()
  const [succes ,setscuess] = useState(false)
  
  // console.log(user)
  const deleHandle = async(id) => {
    try {
      const config ={
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
       dispatch(showLoading());
       const delet = await axios.delete(`/api/v1/note/${id}`,config)
       dispatch(hideLoading());
       dispatch(removeNote(id))
       console.log(delet)
       setscuess(true)  

    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
      
    }
   
  };
  const createNote = (e) => {
    e.preventDefault();
     dispatch(verify());
    navigate("/createNote");
  };


    useEffect(() => {
       const fetchData = async () => {
         try {
         
           dispatch(showLoading());
           console.log("Getting notes", localStorage.getItem("token"));

           const { data } = await axios.get(
             "/api/v1/note/getNotes",
             //  { token: localStorage.getItem("token") },
             {
               headers: {
                 Authorization: `Bearer ${localStorage.getItem("token")}`,
               },
             }
           );
           console.log(data.notes);
           if (data.notes) {
             dispatch(setNote(data.notes));
             dispatch(hideLoading());
             console.log("notes", data.notes);
           }
         } catch (error) {
           console.log("err", error);
           dispatch(hideLoading());
         }
       };
       fetchData()
  
    }, [dispatch]);
  return (
    <MainScreen title={`hello  ${user.name}  wellcome back`}>
      
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg"  href="/createNote" onSubmit={createNote}>
          Create New Note
        </Button >
      
      {loading ? (
        <Loader />
      ) : (
         note && note.length > 0 ?(
          note.filter((filteredNote) => filteredNote.title.toLowerCase().includes(search.toLowerCase()))
          .map((note) => (
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
                      <Badge variant="success">
                        Category - {note.category}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <p>{note.content}</p>
                      <footer className="blockquote-footer">
                        {note.createdAt.substring(0, 10)}
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Body>
              </Card>
            </Accordion.Item>
          </Accordion>
      
        )
         )

           ): <h2>No Notes</h2>
      )}

    </MainScreen>
  );
};

export default Mynotes;
