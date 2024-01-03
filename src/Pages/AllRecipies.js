import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { getAllRecipesApi } from '../Services/Allapi';
import { BASE_URL } from '../Services/baseUrl';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import CommentLike from '../Components/CommmentLike';


function AllRecipies() {

    const [recipes, setRecipes] = useState([]);




    const getAllRecipes = async () => {
        const response = await getAllRecipesApi();
        setRecipes(response.data);
        console.log(recipes);
    };





    useEffect(() => {
        getAllRecipes()

    }, []);






    return (
        <>
<Header></Header>

            <div className='text-center mt-5'>
           <Container>
            <h1>Explore Cook Book</h1>
              <Row xs={1} sm={2} md={3} lg={4} xl={4} xxl={4}>
                    {recipes?.length > 0 ? recipes?.map(i => (  
                  <Col>
                            <Card style={{ width: '18rem' }} className='mt-4'>
                                  <Card.Img style={{height:'300px'}} className='p-3' variant="top" 
                                  src={i.recipeImage?`${BASE_URL}/uploads/${i.recipeImage}`:i.recipeImage}
                                   />
                                                         <Link style={{ textDecoration: 'none' ,}} className='text-black' to={`/all-recipes/single-view/${i.id}`}>

                                  <Card.Body>
                                    <Card.Title>{i.recipeName}</Card.Title>
                
                
                                    <Card.Text>
                
                                    <b> Cuisine:</b> {i.cuisineORcategory}
                
                
                                    </Card.Text>
                                    <Card.Text>{i.quantity}</Card.Text>
                                    <div className='d-flex align-item-center justify-content-center'>
                                    </div>
                                  </Card.Body>
                                  </Link>
                                  <CommentLike _id={i._id}></CommentLike>

                                </Card>
                              

                    
                  </Col>
        
        )) : <></>}
        
              </Row >
           </Container>
            </div>
            <br /><br /><br />
            <hr />
<Footer></Footer>
        </>);
}


export default AllRecipies