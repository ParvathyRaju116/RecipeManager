import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Nav, NavDropdown, Navbar, Offcanvas, Row } from 'react-bootstrap'
import { Link, NavLink, useNavigate } from 'react-router-dom'




function Header() {

    const navigate = useNavigate()

    const [isLogin, setisLogin] = useState(false)
  
  
    const handleLogOut = () => {
      localStorage.removeItem("currentUser")
      localStorage.removeItem("token")
      localStorage.removeItem("currentId")
      navigate('/auth')
    }
  
    const login = () => {
      if (localStorage.getItem("currentId")) {
        setisLogin(true)
      }
      else{
        setisLogin(false)
      }
    }
  
    const handleAccount = () => {
      if (localStorage.getItem("currentId")) {
        navigate('/profile')
      }
      else {
        alert("Please Login")
      }
    };
  
    const handleSelling = () => {
      if (localStorage.getItem("currentId")) {
        navigate('/sell-product')
      }
      else {
        alert("Please Login")
      }
    };
  
    useEffect(()=>{
      login()
    })
  
  return (
    <div>




<Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <img src="https://i.postimg.cc/qqwSpgrw/images-3-removebg-preview.png" style={{height:'100px'}} alt="" />
        <Navbar.Brand href="#home" style={{ color: 'rgb(218, 35, 35)' }} className='head fs-5'>find the recipe...</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
                <NavLink active className="text-black mt-2 me-5" to={"/"} style={{ textDecoration: 'none' }}><b>Home</b></NavLink>
                <NavLink active className="text-black mt-2 me-5" to={'/my-recipes'} style={{ textDecoration: 'none' }}><b>My recipes</b></NavLink>
                {isLogin?<NavLink active className="text-black mt-2 me-5"  onClick={handleLogOut} style={{ textDecoration: 'none' }}><b>Logout</b></NavLink>:
                <NavLink active className="text-black mt-2 me-5" to={'/auth'}style={{ textDecoration: 'none' }}><b>Login</b></NavLink>}
                <NavLink active className="text-black mt-2 me-5" to={'/aboutUs'} style={{ textDecoration: 'none' }}><b>About Us</b></NavLink>
                <NavLink active className="text-black mt-2 me-5" to={'/profile'} style={{ textDecoration: 'none' }}><b>My Account</b></NavLink>

             { !isLogin &&  <NavDropdown title="Select" id="basic-nav-dropdown">
              <NavDropdown.Item href="auth">User</NavDropdown.Item>
              <NavDropdown.Item href="adminLogin">
                Admin
              </NavDropdown.Item>
            </NavDropdown>}
            </Nav>
        </Navbar.Collapse>
    </Container>
</Navbar>

    </div>
  )
}

export default Header