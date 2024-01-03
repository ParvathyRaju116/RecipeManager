import { Button } from '@mui/material'
import React, {  useState } from 'react'
import {  Col, Container, Row } from 'react-bootstrap'
import {  Link } from 'react-router-dom'
import { addfeedbackApi } from '../Services/Allapi'


function Footer() {




  return (
    <div className='mt-4' style={{backgroundColor:''}}>
      <div>
      <Container>
          <Row>
            <Col lg={6} className='mt-3'>
             <Container>
               <div className='p-3'>
                  <div className='text-center me-auto ms-5' style={{ display: 'flex', alignItems: 'center' }} >
                  <img src="https://i.postimg.cc/qqwSpgrw/images-3-removebg-preview.png" style={{height:'100px'}} alt="" />
                    <h3 className='d-sm-block'>CookBook</h3>
                    </div>
                    <p style={{fontSize:'13px'}} className='p-2'>
                    We're committed to simplifying your culinary experience, empowering you to explore, create, and enjoy delicious dishes effortlessly.Absolutely, we strive to turn cooking into a delightful adventure where every dish becomes a celebration of flavors and creativity!
                    </p>               
               </div>
                
             </Container>
            </Col>

            <Col className='mt-4  pe-3'>
            <p><b>Contanct Us</b></p>
            <p><i class="fa-solid fa-envelope"></i>@cookBook@gmail.com</p>
             <p><i class="fa-brands fa-instagram"></i> <i class="fa-brands fa-x-twitter"></i> <i class="fa-brands fa-whatsapp"></i></p>
            </Col>

            <Col className='mt-3' lg={2}>
            <p><b>Get to Know Us</b></p>
            <a href='/' style={{textDecoration:'none',color:'black'}}><p>Home</p></a>
              <Link to={'/aboutUs'}  style={{textDecoration:'none',color:'black'}} ><p>about Us</p></Link>
              <Link to={'/all-recipies'}  style={{textDecoration:'none',color:'black'}} ><p>Recipes</p></Link>
           
            </Col>

           
          <Col className='mt-3'>
          <p><b>Guides</b></p>
          <p>React</p>
          <p>Bootstrap</p>
          <p>React Router</p>
          </Col>
         
         
          </Row>
      </Container>
      </div>

      <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }} className='m-2'><p>@2023 | all rignt reserved |Fresh From Home</p></div>

    </div>)
}

export default Footer