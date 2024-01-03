import React, { useEffect, useState } from 'react'
import { Col, Container, Modal, Row, ToastContainer } from 'react-bootstrap';
import { BASE_URL } from '../Services/baseUrl';
import { Box, Button, TextField } from '@mui/material';
import { updateprofile } from '../Services/Allapi';
import { toast } from 'react-toastify';
import Header from '../Components/Header';



function Profile() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const [update, setUpadate] = useState("")
    const[email,setEmail]=useState("")
    const [uname, setUname] = useState("")
    const [preview, setPreview] = useState("")
    const [token, setToken] = useState("")
  
    const [existingImage, setExistingImage] = useState("")
  
  
    // state to setProfile
    const [profile, setProfile] = useState({
      user: "",
      image: "",
     bio:"",
     gender:"",
     dateOfBirth:""
  
    })
  
    useEffect(() => {
        const userData = (JSON.parse(localStorage.getItem("currentUser")))
        setProfile({ ...profile, user: userData.userName, image: "",bio:userData.bio, gender:userData.gender, dateOfBirth:userData.dateOfBirth })
        setExistingImage(userData.profile)
      }, [update])
      console.log(existingImage);
    
      // to display name at welcome
      useEffect(() => {
        if (localStorage.getItem("currentUser")) {
          setUname(JSON.parse(localStorage.getItem("currentUser")).userName)
          setEmail(JSON.parse(localStorage.getItem("currentUser")).email)
        }
        else {
          alert("Please Login")
    
        }
    
    
      }, [])
      useEffect(() => {
        if(profile.image) {
          setPreview(URL.createObjectURL(profile.image));
        }
      }, [profile.image])
    
    useEffect(()=>{
    if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"))
    }
    },[])
    // console.log(token);
    
      console.log(preview);
      console.log(profile);
    
      const setData = (e) => {
        const { value, name } = e.target;
        setProfile({ ...profile, [name]: value });
      };
    
      // function for update profile
      const handelUpdate = async (e) => {
        e.preventDefault()
        const { user,
          image,
          bio,
        gender,dateOfBirth } = profile
    
        if (localStorage.getItem("currentId")) {
          const id = localStorage.getItem("currentId")
          // console.log(id);
          // header
          const reqHeader = {
            "Content-Type": "multipart/form-data",
            "access_token":`Bearer ${token}`
          }
          // console.log(reqHeader);
    
          // body
          const reqBody = new FormData()
          reqBody.append("userName", user)
          reqBody.append("profile", image?image:existingImage)
          reqBody.append("bio",bio)
          reqBody.append("gender",gender)
          reqBody.append("dateOfBirth",dateOfBirth)
         
    
          // console.log(reqBody);
          const response = await updateprofile(reqBody, reqHeader, id)
          console.log(response);
          if(response.status==200){
           alert("Profile Updated")
            localStorage.setItem("currentUser",JSON.stringify(response.data))
            setUpadate(response.data)
            handleClose()
    
          }
          else{
            console.log("Profile Updation failed");
          }
        }
       
      }
    
    
    

  return (
   <>
   <Header></Header>
        <div>

        <div>
        <h2 className='m-5' style={{ textTransform: 'capitalize' }}>Hii, {uname}</h2>
        <div className='text-end w-100 container'> <Button className='btn Btn' variant="contained" onClick={handleShow}>Edit Profile</Button></div>
        <Container className='mt-5'>
          <Row>
            <Col lg={5}>
            <label htmlFor="img2">

            {
                    existingImage!=""?
                    <img
                    className='ms-5 ps-5'
                    style={{ height: '220px', width: '250px' }}
                    src={
                    preview?preview:`${BASE_URL}/uploads/${existingImage}`
                    } alt="" />:
                    <img src={preview?preview:"https://i.postimg.cc/3RVMX6tC/images-1.jpg"} alt="" />
                  }

                  


</label>

</Col>
            <Col lg={7} style={{textTransform:'capitalize'}}>
              <p><b>Name :</b> {profile.user}</p>
              <hr />
             
              <p><b>Email :</b> {email}</p>
              <hr />
             
             <p><b>Bio</b> : {profile.bio}</p>
             <hr />
             <p><b>Gender :</b> {profile.gender}</p>
             <hr />
             <p><b>Date Of Birth : </b>{profile.dateOfBirth}</p>


            </Col>

          </Row>
        </Container>


      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>

            <Container>
              <div className='text-start mt-5' >
                <div>
                  <h2 style={{ display: 'inline' }}>Personal Information</h2>


                </div>

                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                  }}
                  noValidate
                  className='mt-3'
                  autoComplete="off"
                >
                  <div>

                    <label htmlFor="img2">


                  {
                    existingImage!=""?
                    <img
                    style={{ height: '180px', width: '200px' }}
                     src={
                      preview?preview:`${BASE_URL}/uploads/${existingImage}`
                    } alt="" />:
                    <img src={preview?preview:"https://i.postimg.cc/3RVMX6tC/images-1.jpg"} alt="" />
                  }
                    

                    </label>
                    <input placeholder='choose file' type="file" id='img2' style={{ display: 'none' }}
                      onChange={(e) => setProfile({ ...profile, ["image"]: e.target.files[0] })} />




                    <TextField
                      id="outlined-password-input-"
                      label=" Name"
                      type="text"
                      color="success"
                      required
                      className='w-100'
                      name='user'
                      value={profile.user}
                      onChange={(e) => setData(e)}
                    />





                    <TextField
                      id="outlined-password-input-"
                      label="Bio"
                      type="text"
                      color="success"
                      className='w-100'
                      required
                      name='bio'
                      value={profile.bio}
                      onChange={(e) => setData(e)}
                    />

                    <br />

                  

                  
                    <br />
                    <TextField
                      id="outlined-password-input-"
                      label=" Gender"
                      type="text"
                      color="success"
                      required
                      className='w-100'
                      name='gender'
                      value={profile.gender}
                      onChange={(e) => setData(e)}
                    />

                    <br />

                    <TextField
                      id="outlined-password-input-"
                      label="dateOfBirt"
                      type="date"
                      color="success"
                      className='w-100'
                      required
                      name='dateOfBirth'
                      value={profile.dateOfBirth}
                      onChange={(e) => setData(e)}
                    />



                    <br />





                  </div>

                </Box>
              </div >
            </Container>

          </div>

        </Modal.Body>
        <Modal.Footer>

          <Button className='btn Btn' variant="contained" onClick={(e) => handelUpdate(e)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
            
        </div>
   </>
  )
}

export default Profile