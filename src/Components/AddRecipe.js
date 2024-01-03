import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Col, Container, Row } from 'react-bootstrap';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uniqid from 'uniqid';
import { addRecipeApi } from '../Services/Allapi';
import Modal from 'react-bootstrap/Modal';





function AddRecipe() {


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  

    const recipeId = uniqid()


    const [token, setToken] = useState("")
    const [recipeInputs, setRecipeInputs] = useState({
        recipeName: "",
        ingredients: "",
        instructions: "",
        category: "",
        cookingTime: "",
        difficultyLevel: "",
        cuisineORcategory: "",
        caption: "",
        recipeImage: ""

    })

    const [preview, setPreview] = useState("")

    const setInput = (e) => {
        const { value, name } = e.target
        setRecipeInputs({ ...recipeInputs, [name]: value })
    }
    useEffect(() => {
        if (recipeInputs.recipeImage) {
            setPreview(URL.createObjectURL(recipeInputs.recipeImage))
        }
        else {
            setPreview("")
        }

    }, [recipeInputs.recipeImage])
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setToken(localStorage.getItem("token"))
        }
        else {
            setToken("")
        }
    }, [])

    console.log(recipeInputs);
    console.log(preview);
    console.log(token);

    const handleAdd = async (e) => {
        e.preventDefault()
        const {
            recipeName,
            ingredients,
            instructions,
            category,
            cookingTime,
            difficultyLevel,
            cuisineORcategory,
            caption,
            recipeImage } = recipeInputs
        if (!recipeName || !ingredients || !instructions || !cookingTime || !difficultyLevel || !cuisineORcategory || !caption || !recipeImage) {
            toast.warn('Please fill all datas!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            const headerConfiq = {
                "Content-Type": "multipart/form-data",
                "access_token": `Bearer ${token}`
            }

            const reqBody = new FormData()
            reqBody.append('id', recipeId);
            reqBody.append("recipeName", recipeName)
            reqBody.append("ingredients", ingredients)
            reqBody.append("instructions", instructions)
            reqBody.append("category", category)
            reqBody.append("cookingTime", cookingTime)
            reqBody.append("difficultyLevel", difficultyLevel)
            reqBody.append("cuisineORcategory", cuisineORcategory)
            reqBody.append("caption", caption)
            reqBody.append("recipeImage", recipeImage)

            console.log(recipeId);

            const result = await addRecipeApi(reqBody, headerConfiq)
            console.log(result);
            if (result.status == 200) {


                toast.success(`${result.data.recipeName} added !`, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                setRecipeInputs({
                    ...recipeInputs,
                    recipeName: "",
                    ingredients: "",
                    instructions: "",
                    category: "",
                    cookingTime: "",
                    difficultyLevel: "",
                    cuisineORcategory: "",
                    caption: "",
                    recipeImage: "",
                })
                handleClose()

            }
            else {

                toast.error(result.response?.data, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            console.log(result);


        }

    }


    return (
        <div>
                      <div className='ms-auto mt-5 me-5'><Button className='btn Btn text-white' onClick={handleShow}>Add Recipe</Button></div>




                      <Modal show={show} onHide={handleClose} className='w-100'>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>

        <div>



<Container>
    <div className=' mt-5' >
        <Container>
            <Row>
                <Col className='mt-3 ms-4'> <h2 style={{ display: 'inline' }} ><b>Add Recipe</b></h2></Col>
                <Col className='text-center'>
                    <div className='ms-auto' style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <label htmlFor="farmerImg">
                            <img style={{ height: '150px', width: '150px' }} src={preview ? preview : "https://i.postimg.cc/zBL6qn3C/download.png"} alt="" />
                        </label>
                        <input
                            onChange={(e) => setRecipeInputs({ ...recipeInputs, ["recipeImage"]: e.target.files[0] })}
                            type="file" id='farmerImg' style={{ display: 'none', height: '100px', width: '100px' }} />
                    </div>
                </Col>

            </Row>

        </Container>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            className='mt-5'
            autoComplete="off"
        >
            <div>


                <Row>
                    <Col >
                        <TextField
                            id="outlined-password-input-"
                            label="Recipe Name"
                            type="text"
                            color="success"
                            required
                            className='w-100'
                            name='recipeName'
                            value={recipeInputs.recipeName}
                            onChange={(e) => setInput(e)}
                        />
                    </Col>



                </Row>
                <Row>
                    <Col>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" color="success">Category</InputLabel>
                            <Select
                                className='mt-2'
                                color="success"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Ctegory"
                                name='category'
                                value={recipeInputs.category}
                                onChange={(e) => setInput(e)}
                            >
                                <MenuItem value='starters'>Starters</MenuItem>
                                <MenuItem value='mainCourse'>Main course</MenuItem>
                                <MenuItem value='snacks'>Snacks</MenuItem>
                                <MenuItem value='beverages'>Beverages</MenuItem>
                                <MenuItem value='desserts'>Desserts</MenuItem>
                            </Select>
                        </FormControl>

                    </Col>
                    <Col >
                        <TextField
                            id="outlined-password-input-"
                            label="Cooking Time"
                            type="text"
                            color="success"
                            className='w-100'
                            required
                            name='cookingTime'
                            value={recipeInputs.cookingTime}
                            onChange={(e) => setInput(e)}
                        />



                    </Col>
                </Row>
                <br />



                <textarea
                    placeholder='Ingredients'
                    id="outlined-password-input-"
                    label="Ingredients"
                    type="text"
                    color="success"
                    className='w-100 form-control'
                    required
                    name='ingredients'
                    value={recipeInputs.ingredients}
                    onChange={(e) => setInput(e)}
                />




                <textarea
                    placeholder='Instructions'
                    id="outlined-password-input-"
                    label="Instructions"
                    type="text"
                    color="success"
                    required
                    className='w-100 form-control mt-2'
                    name='instructions'
                    value={recipeInputs.instructions}
                    onChange={(e) => setInput(e)}
                />



                <br />
                <Row>
                    <Col>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" color="success">Difficulty Level</InputLabel>
                            <Select
                                className='mt-2'
                                color="success"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Difficulty Level"
                                name='difficultyLevel'
                                value={recipeInputs.difficultyLevel}
                                onChange={(e) => setInput(e)}
                            >
                                <MenuItem value='easy'>Easy</MenuItem>
                                <MenuItem value='moderate'>Moderate</MenuItem>
                                <MenuItem value='hard'>Hard</MenuItem>
                            </Select>
                        </FormControl>
                    </Col>


                    <Col >
                        <TextField
                            id="outlined-password-input-"
                            label="Cuisine"
                            type="text"
                            color="success"
                            className='w-100'
                            required
                            name='cuisineORcategory'
                            value={recipeInputs.cuisineORcategory}
                            onChange={(e) => setInput(e)}
                        />
                    </Col>
                </Row>
                <TextField
                    id="outlined-password-input-"
                    label="Caption"
                    type="text"
                    color="success"
                    className='w-100'
                    required
                    name='caption'
                    value={recipeInputs.caption}
                    onChange={(e) => setInput(e)}
                />


                <br />



            </div>

        </Box>
    </div >
</Container>
</div>
            
        </Modal.Body>
        <Modal.Footer>
        <Button  onClick={(e) => handleAdd(e)} className="btn Btn">Add</Button>

        
        </Modal.Footer>
      </Modal>

      
            <ToastContainer />
        </div>
    )
}

export default AddRecipe