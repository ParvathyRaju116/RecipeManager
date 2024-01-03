import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { deleteRecipieApi, getAllRecipesApi, getAllUserssApi } from '../Services/Allapi'
import { BASE_URL } from '../Services/baseUrl'
import AdminHeader from '../Components/AdminHeader'
import { ToastContainer, toast } from 'react-toastify';


function AdminDashboed() {

    const param = useParams()

    const [recipes, setRecipes] = useState([]);
    const [users, setUsers] = useState([])
    const getAllRecipes = async () => {
        const response = await getAllRecipesApi();
        setRecipes(response.data);
        console.log(recipes);
    };



    const handleDelete = async (e, id) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const reqHeader = {
          "Content-Type": "application/json",
          "access_token": `Bearer ${token}`
        };
        const response = await deleteRecipieApi(reqHeader, id);
        // alert(response.data);
        toast.error(response.data, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        setRecipes(prevRecipes => {
          const updatedRecipes = prevRecipes.filter(recipe => recipe.id !== id);
          return updatedRecipes;
        });
      };

    const getAllUsers = async () => {
        const response = await getAllUserssApi()
        setUsers(response.data)
        console.log(users);

    }

    useEffect(() => {
        getAllRecipes()
        getAllUsers()

    }, []);


    return (
        <div>
                <AdminHeader></AdminHeader>
            <Container>
                <Row>
                    <Col lg={10}>
                        <div>
                            <div className='d-flex'>
                                <div className='text-center mt-5 ms-5 ps-5 me-auto'><h1><span className='text-danger'>A</span>ll<span className='text-danger'>R</span>ecipes</h1></div>

                            </div>
                            <div className='text-center mt-5 '>
                                <Container>
                                    <Row xs={1} sm={1} md={2} lg={3} xl={3} xxl={3}>
                                        {recipes?.length > 0 ? recipes?.map((i, index) => (
                                            <Col key={index}>
                                              <Link style={{ textDecoration: 'none' ,}} className='text-black' to={`/all-recipes/single-view/${i.id}`}>
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
                                                                <Button onClick={(e) => handleDelete(e, i.id)} className='Btn ms-3 btn text-white'><i className="fa-solid fa-trash"></i></Button>                    </div>
                                                        </Card.Body>
                                                    </Card>
                                              </Link>
                                            </Col>
                                        )) : <p>No recipies uploaded yet ..!</p>}
                                    </Row>
                                </Container>
                            </div>
                            <br /><br /><br />
                            <hr />

                        </div>

                    </Col>
                    <Col>
                        <div className=' mt-5 pt-5 text-center'>
                            <div className='text-center mt-5  ' style={{ borderBottom: '4px solid red' }}><p><b>Total Users</b></p></div>
                           <Link style={{textDecoration:'none',color:'black'}} to={'/all-users'}> <div className='shadow m-2 mt-5 p-5' ><h2>{users.length}</h2></div></Link>


                        </div>

                        <div className=' mt-5 pt-5 text-center'>
                            <div className='text-center mt-5  ' style={{ borderBottom: '4px solid red' }}><p><b>Total Recipies</b></p></div>
                            <div className='shadow m-2 mt-5 p-5' ><h2>{recipes.length}</h2></div>


                        </div>
                    </Col>
                </Row>

            </Container>
            <ToastContainer/>
        </div>
    )
}

export default AdminDashboed