import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'
import Recipes from '../Components/Recipies'
import Header from '../Components/Header'
function Home() {
  const navigate = useNavigate()

  const redirection = () => {
    navigate('/all-recipes')
  }

  return (
    <>
    <Header></Header>

      <div className='home' id='#home'>
        <Row>
          <Col xs={12} sm={12} md={5} lg={5} xl={5}></Col>
          <Col xs={12} sm={12} md={7} lg={7} xl={7}>

            <div className='me-auto mt-5 pt-5 text-start text-black content'>


              <h5 className='ms-5 fs-2 mt-5 pt-5'>Welcom to cook book</h5>
              <h1 className='ms-5 ' style={{ fontSize: '4rem', maxWidth: '500px' }}><b>What You Want <br /> To Cook Today..?</b></h1>

            </div>

          </Col>

        </Row>

      </div>


      {/* Recipies */}
      <div className='recipes '>
        <Recipes></Recipes>
      </div>









      <div className='text-center  mt-5 mb-5'>
        <h1><b>Services</b> </h1>
        <Container>
          <div className='Features mt-5' >
            <Row>
              <Col className='p-4'>
               <b> <h5>Recipe Upload</h5></b>
               <img className='mt-3' src="https://i.postimg.cc/kXz4vvpN/istockphoto-1185879263-612x612.jpg"style={{height:'80px',width:'80px'}} alt="" />
                <p style={{textAlign:'justify'}}>Allow users to upload their own recipes, including ingredients, instructions, and photos.</p>
              </Col>
             
              <Col className='p-4'>

              <b><h5> Search Recipies</h5></b>
              <img  className='mt-3' src="https://i.postimg.cc/ZY8Ydykn/download-2.png"style={{height:'80px',width:'80px'}} alt="" />

              <p style={{textAlign:'justify'}}>
               Users can search for recipies and get recipes, including ingredients, instructions, and photos.

              </p>
              </Col>
              <Col className='p-4'>
              <b><h5>Filter Recipies</h5></b>
              <img  className='mt-3' src="https://i.postimg.cc/CK9rCNBq/download-2.jpg" style={{height:'80px',width:'80px'}}  alt="" />
              <p style={{textAlign:'justify'}}>enable users filter recipies based on various criteria such as startes, main cource desserts etc.</p>
              </Col>
            </Row>


          </div>
        </Container>
      </div>
      <hr />

      <Footer></Footer>
    </>
  )
}

export default Home