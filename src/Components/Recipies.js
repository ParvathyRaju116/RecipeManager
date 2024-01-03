import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { getAllRecipesApi, getUserApi } from '../Services/Allapi';
import { BASE_URL } from '../Services/baseUrl';
import CommmentLike from './CommmentLike';

function Recipes() {
    const param = useParams();
    const [user, setUser] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All Recipes');

    const [expandedCaption, setExpandedCaption] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');

    // Function to toggle the expanded state
    const toggleExpandedCaption = () => {
        setExpandedCaption(!expandedCaption);
    };

    const getAllRecipes = async () => {
        const response = await getAllRecipesApi();
        setRecipes(response.data);
        setFilteredRecipes(response.data); 
    };

 

    useEffect(() => {
        getAllRecipes();
    }, []);

  

    const filterRecipesByCategory = (category) => {
        if (category === 'All Recipes') {
            setFilteredRecipes(recipes);
            setSelectedCategory('All Recipes');
        } else {
            const filtered = recipes.filter((recipe) => recipe.category === category);
            setFilteredRecipes(filtered);
            setSelectedCategory(category);
        }
    };


    const filterRecipesBySearch = (query) => {
        const filtered = recipes.filter(
            (recipe) =>
                recipe.recipeName.toLowerCase().includes(query.toLowerCase()) ||
                recipe.caption.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredRecipes(filtered);
    };

    return (
        <>
            <Container>
                <Row className='mt-5'>

                    <Col className="text-center mt-5" lg={2}>
                        <div>
                            <div style={{ borderBottom: '4px solid rgb(218, 35, 35)' }}>
                                <h4 className="text-danger">Categories</h4>
                            </div>
                            <p className="mt-4" onClick={() => filterRecipesByCategory('All Recipes')}>
                                All Recipes
                            </p>
                            <hr />
                            <p onClick={() => filterRecipesByCategory('mainCourse')}>MainCourse</p>
                            <hr />
                            <p onClick={() => filterRecipesByCategory('snacks')}>Snacks</p>
                            <hr />
                            <p onClick={() => filterRecipesByCategory('beverages')}>Beverages</p>
                            <hr />
                            <p onClick={() => filterRecipesByCategory('desserts')}>Desserts</p>
                        </div>
                    </Col>

                    <Col lg={10}>
                        <Container>
                            <div className="text-cente mt-5">
                                <Container>
                                    <Row className="d-flex">
                                        <Col lg={9}>
                                            <h1>
                                                Popular Recipes On <span className="text-danger">{selectedCategory}</span> category
                                            </h1>
                                        </Col>
                                        <Col lg={3}>
                                            <Form inline className='mt-2'>
                                                <Row>
                                                    <Col xs="auto">
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Search"
                                                            className=" mr-sm-2 ms-5"
                                                            style={{ width: '100%' }}
                                                            value={searchQuery}
                                                            onChange={(e) => {
                                                                setSearchQuery(e.target.value);
                                                                filterRecipesBySearch(e.target.value);
                                                            }}
                                                        />
                                                    </Col>
                                    
                                                </Row>
                                            </Form>
                                        </Col>
                                    </Row>
                                    <Row xs={1} sm={2} md={3} lg={4} xl={4} xxl={4}>
                                        {filteredRecipes?.length > 0 ? (
                                            filteredRecipes.map((i) => (
                                                <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                                                    <Card className="h-100 d-flex flex-column mt-4" >
                                                        <Card.Img
                                                            style={{ height: '120px' }}
                                                            variant="top"
                                                            src={i.recipeImage ? `${BASE_URL}/uploads/${i.recipeImage}` : i.recipeImage}
                                                            className="card-img-top"
                                                            alt={i.recipeName}

                                                        />
                                                        <Card.Body className="d-flex flex-column">
                                                            <Card.Title>{i.recipeName}</Card.Title>
                                                            <Card.Text className="flex-grow-1">
                                                                {expandedCaption ? i.caption : (i.caption.length > 100 ? `${i.caption.substring(0, 100)}...` : i.caption)}
                                                                {i.caption.length > 100 && (
                                                                    <span className="text-primary" onClick={toggleExpandedCaption}>
                                                                        {expandedCaption ? ' Read Less' : ' Read More'}
                                                                    </span>
                                                                )}

                                                            </Card.Text>
                                                            <CommmentLike _id={i._id}></CommmentLike>

                                                            <div className='footer mt-auto'>
                                                          
                                                                <hr />
                                                                <div className="d-flex align-item-center justify-content-center"></div>
                                                                <Link style={{ textDecoration: 'none' }} className="text-black" to={`/all-recipes/single-view/${i.id}`}>
                                                                    <Button className="btn Btn">View Recipe</Button>
                                                                </Link>
                                                            </div>
                                                           
                                                        </Card.Body>
                                                    </Card>
                                                </Col>

                                                


                                            ))
                                        ) : (
                                            <p>No recipes found for {selectedCategory}</p>
                                        )}
                                    </Row>
                                </Container>
                                <div className='text-end'><Link style={{ textDecoration: 'none' }} to={'/all-recipies'}><p className="text-danger">View All Recipes <i class="fa-solid fa-arrow-right fa-beat"></i></p> </Link></div>

                            </div>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Recipes;
