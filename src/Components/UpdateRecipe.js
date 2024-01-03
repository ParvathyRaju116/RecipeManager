import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from '@mui/material';
import { Button, Container } from 'react-bootstrap';
import { BASE_URL } from '../Services/baseUrl';
import { updateRecipeApi } from '../Services/Allapi';




function UpdateRecipe({ recipe }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [preview, setPreview] = useState("")
    const [recipeInputs, setRecipeInputs] = useState({
        recipeName: recipe.recipeName,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        category: recipe.category,
        cookingTime: recipe.cookingTime,
        difficultyLevel: recipe.difficultyLevel,
        cuisineORcategory: recipe.cuisineORcategory,
        caption: recipe.caption,
        recipeImage: recipe.recipeImage ? recipe.recipeImage : null
    })

    useEffect(() => {
        if (recipeInputs.recipeImage instanceof File) {
            setPreview(URL.createObjectURL(recipeInputs.recipeImage));
        } else {
            setPreview("");
        }
    }, [recipeInputs.recipeImage]);
    console.log(recipeInputs);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const {
            recipeName, ingredients, instructions, category, cookingTime, difficultyLevel, cuisineORcategory, caption, recipeImage
        } = recipeInputs
        if (!recipeName || !ingredients || !instructions || !category || !cookingTime || !difficultyLevel || !cuisineORcategory || !caption) {
            alert("Please fill all data")
        }
        else {
            const reqBody = new FormData();
            reqBody.append("recipeName", recipeName)
            reqBody.append("ingredients", ingredients)
            reqBody.append("instructions", instructions)
            reqBody.append("category", category)
            reqBody.append("cookingTime", cookingTime)
            reqBody.append("difficultyLevel", difficultyLevel)
            reqBody.append("cuisineORcategory", cuisineORcategory)
            reqBody.append("caption", caption)

            preview ? reqBody.append("recipeImage", recipeImage)
                : reqBody.append("recipeImage", recipe.recipeImage)



            // header
            const token = localStorage.getItem("token");
            if (preview) {
                var headerConfig = {
                    "Content-Type": "multipart/form-data",
                    " access_token": `Bearer ${token}`,
                };

            }
            else {
                var headerConfig = {
                    "Content-Type": "application/json",
                    " access_token": ` Bearer ${token}`,
                };
            }

            //   id 
            const id = recipe._id
            console.log(id);

            const result = await updateRecipeApi(reqBody, headerConfig, id)
            console.log(result);
            if (result.status == 200) {
                alert(`${result.data.recipeName} updated`)
                // setEditUpdate(result.data)
                window.location.reload()
                handleClose()
            }
            else {
                alert('update failed')
            }



        }

    }

    return (
        <div>
            <div>
                <Button onClick={handleShow} className='Btn me-3 btn text-white w-100'><i class="fa-solid fa-pen-to-square"></i></Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className=' mt-5' >
                            <Container>

                                <div className='ms-auto' style={{ display: 'flex', justifyContent: 'flex-center', alignItems: 'flex-center' }}>

                                    <label htmlFor='img1' className='text-center'>
                                        <input
                                            type="file"
                                            id="img1"
                                            style={{ display: "none" }}
                                            onChange={(e) => setRecipeInputs({ ...recipeInputs, ["recipeImage"]: e.target.files[0] })}
                                        />

                                        <img src={preview ? preview : `${BASE_URL}/uploads/${recipe.recipeImage}`}

                                            style={{ height: '200px', width: '200px' }} alt="" />

                                    </label>
                                </div>


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


                                    <TextField
                                        id="outlined-password-input-"
                                        label="Recipe Name"
                                        type="text"
                                        color="success"
                                        required
                                        className='w-100'
                                        name='recipeName'
                                        value={recipeInputs.recipeName}
                                        onChange={(e) => setRecipeInputs({ ...recipeInputs, ["recipeName"]: e.target.value })}

                                    />


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
                                            onChange={(e) => setRecipeInputs({ ...recipeInputs, ["category"]: e.target.value })}

                                        >
                                            <MenuItem value='starters'>Starters</MenuItem>
                                            <MenuItem value='mainCourse'>Main course</MenuItem>
                                            <MenuItem value='snacks'>Snacks</MenuItem>
                                            <MenuItem value='beverages'>Beverages</MenuItem>
                                            <MenuItem value='desserts'>Desserts</MenuItem>
                                        </Select>
                                    </FormControl>


                                    <TextField
                                        id="outlined-password-input-"
                                        label="Cooking Time"
                                        type="text"
                                        color="success"
                                        className='w-100'
                                        required
                                        name='cookingTime'
                                        value={recipeInputs.cookingTime}
                                        onChange={(e) => setRecipeInputs({ ...recipeInputs, ["cookingTime"]: e.target.value })}


                                    />






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
                                        onChange={(e) => setRecipeInputs({ ...recipeInputs, ["ingredients"]: e.target.value })}

                                    />




                                    <textarea
                                        placeholder='Instructions'
                                        id="outlined-password-input-"
                                        label="Instructions"
                                        type="text"
                                        color="success"
                                        required
                                        className='w-100 mt-3 form-control '
                                        name='instructions'
                                        value={recipeInputs.instructions}
                                        onChange={(e) => setRecipeInputs({ ...recipeInputs, ["instructions"]: e.target.value })}

                                    />




                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label" color="success">Category</InputLabel>
                                        <Select
                                            className='mt-2'
                                            color="success"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Difficulty Level"
                                            name='difficultyLevel'
                                            value={recipeInputs.difficultyLevel}
                                            onChange={(e) => setRecipeInputs({ ...recipeInputs, ["difficultyLevel"]: e.target.value })}

                                        >
                                            <MenuItem value='easy'>Easy</MenuItem>
                                            <MenuItem value='moderate'>Moderate</MenuItem>
                                            <MenuItem value='hard'>Hard</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <TextField
                                        id="outlined-password-input-"
                                        label="Cuisine"
                                        type="text"
                                        color="success"
                                        className='w-100'
                                        required
                                        name='cuisineORcategory'
                                        value={recipeInputs.cuisineORcategory}
                                        onChange={(e) => setRecipeInputs({ ...recipeInputs, ["cuisineORcategory"]: e.target.value })}

                                    />

                                    <TextField
                                        id="outlined-password-input-"
                                        label="Caption"
                                        type="text"
                                        color="success"
                                        className='w-100'
                                        required
                                        name='caption'
                                        value={recipeInputs.caption}
                                        onChange={(e) => setRecipeInputs({ ...recipeInputs, ["caption"]: e.target.value })}

                                    />





                                </div>

                            </Box>
                        </div >
                    </Modal.Body>
                    <Modal.Footer>

                        <Button className='Btn' onClick={(e) => handleUpdate(e)}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default UpdateRecipe