import React, { useEffect, useState } from 'react'
import { singleRecipeApi } from '../Services/Allapi';
import { BASE_URL } from '../Services/baseUrl';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Header from '../Components/Header';
import CommentLike from '../Components/CommmentLike';


function SingleView() {

    const [singleRecipe, setSingleRecipe] = useState({});
    const { recipeId } = useParams(); 
  
    const singleView = async () => {
        const result = await singleRecipeApi(recipeId);
        setSingleRecipe(result.data);
        console.log(result);
    };
  
    useEffect(() => {
      singleView();
      console.log(recipeId);
    }, [recipeId])
  return (
    <div>
      <Header></Header>
    <Container  className='mt-5'>

      <Row>
        <Col lg={7}><img style={{width:'100%'}} src={`${BASE_URL}/uploads/${singleRecipe.recipeImage}`} alt="" /></Col>
        <Col lg={5} className='d-flex justify-content-center align-items-cente flex-column'>
        <h1><b>{singleRecipe.recipeName} </b></h1>
        <br />

        <h5 className='text-succes'><b>Cooking Time: {singleRecipe.cookingTime}</b></h5>
        <h4>{singleRecipe.cuisinORcategory}</h4>
        <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Ingredients</Accordion.Header>
        <Accordion.Body>
         {singleRecipe.ingredients}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Instructions</Accordion.Header>
        <Accordion.Body>
          {singleRecipe.instructions}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  
        </Col>
      </Row>
    </Container>
  </div>
  )
}

export default SingleView