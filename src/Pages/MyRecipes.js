import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Modal, Row } from 'react-bootstrap';
import { BASE_URL } from '../Services/baseUrl';
import { deleteRecipieApi, getCommentsApi, getLikesApi, userRecipeApi } from '../Services/Allapi';
import UpdateRecipe from '../Components/UpdateRecipe';
import AddRecipe from '../Components/AddRecipe';
import Footer from '../Components/Footer';
import Header from '../Components/Header';



function MyRecipes() {
  const [userRecipe, setUserRecipe] = useState([]);
  const [recipeComment, setRecipeComment] = useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [likeCount, setLikeCount] = useState(0)


  const getUserRecipes = async () => {
    if (localStorage.getItem("currentId")) {
      const id = localStorage.getItem("currentId");
      const token = localStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "application/json",
        "access_token": `Bearer ${token}`
      };
      const result = await userRecipeApi(reqHeader, id);
      if (result.status === 200) {
        setUserRecipe(result.data);
      }
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const reqHeader = {
      "Content-Type": "application/json",
      "access_token": `Bearer ${token}`
    };
    const response = await deleteRecipieApi(reqHeader, id);
    alert(response.data);
    setUserRecipe(prevRecipes => {
      const updatedRecipes = prevRecipes.filter(recipe => recipe.id !== id);
      return updatedRecipes;
    });
  };

  useEffect(() => {
    getUserRecipes();
  }, []);


  const getComments = async (e, _id) => {
    const reqHeader = {
      "Content-Type": "application/json",
    };
    const result = await getCommentsApi(reqHeader, _id)
    setRecipeComment(result.data)
    console.log(result.data);
  

  }

  const handleShow = (e, _id) => {
    setShow(true);
    getComments(_id);
   
  };


  const getLikes = async (_id) => {
    const reqHeader = {
      "Content-Type": "application/json",
    };
    const result = await getLikesApi(reqHeader, _id);

    if (result && result.data) {
      setLikeCount(result.data);
console.log(result);
     
    }
  };



  useEffect(() => {
    getLikes()
  }, [])



  return (
    <div>
      <Header></Header>
      <div className='d-flex'>
        <div className='text-center mt-5 ms-5 ps-5 me-auto'><h1><span className='text-danger'>M</span>y<span className='text-danger'>R</span>ecipes</h1></div>
        <AddRecipe />
      </div>
      <div className='text-center mt-5 '>
        <Container>
          <Row xs={1} sm={2} md={3} lg={4} xl={4} xxl={4}>
            {userRecipe?.length > 0 ? userRecipe?.map((i, index) => (
              <Col key={index}>
                <Card style={{ width: '18rem' }} className='mt-4'>
                  <Card.Img style={{ height: '300px' }} className='p-3' variant="top"
                    src={i.recipeImage ? `${BASE_URL}/uploads/${i.recipeImage}` : i.recipeImage}
                  />
                  <Card.Body>
                    <Card.Title>{i.recipeName}</Card.Title>
                    <Card.Text>
                      <b>Cuisine:</b> {i.cuisineORcategory}
                    </Card.Text>
                    <Card.Text>{i.quantity}</Card.Text>
                    <div className='d-flex align-item-center justify-content-center'>
                      <UpdateRecipe recipe={i}></UpdateRecipe>
                      <Button onClick={(e) => handleDelete(e, i.id)} className='Btn ms-3 btn text-white'><i className="fa-solid fa-trash"></i></Button>                    </div>
                  </Card.Body>
                  <div className='m-3'><Row>
                    <Col> <i className="fa-regular fs-2 fa-comment p-4" onClick={(e) => handleShow(e, i._id)}></i></Col>
                    <Col> <i className="fa-regular fs-2 fa-heart p-4"></i>{likeCount}</Col>
                  </Row></div>
                </Card>



                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Comments</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    {recipeComment && recipeComment.length > 0 ? (
                      recipeComment.map((item, index) => (
                        item.recipeId === i._id && (
                          <div key={index}>
                            <Row><Col> <p><b>@{item.userName}</b></p></Col>
                            </Row>
                            <p>{item.commentText}</p>
                            <hr />
                          </div>
                        )
                      ))
                    ) : (
                      <p>No comments yet.</p>
                    )}

                  </Modal.Body>
                  <Modal.Footer>
                  </Modal.Footer>
                </Modal>

              </Col>



            )) : <p>No recipies uploaded yet ..!</p>}
          </Row>
        </Container>
      </div>
      <br /><br /><br />
      <hr />


      <Footer></Footer>
    </div>
  );
}

export default MyRecipes;
