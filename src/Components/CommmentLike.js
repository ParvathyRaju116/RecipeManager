import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Modal } from 'react-bootstrap';
import { addLikeApi, addcommentApi, deleteCommentApi, getCommentsApi, getLikes, getLikesApi, removeLikeApi } from '../Services/Allapi';
import { ToastContainer, toast } from 'react-toastify';

function CommentLike({ _id }) {


  const [show, setShow] = useState(false);
  const [commentInput, setCommentInput] = useState({ comment: '', userName: "" });

  const handleClose = () => setShow(false);
  const [recipeComment, setRecipeComment] = useState([])

  const [like, setLike] = useState(0)
  const [isLike, setIsLike] = useState(false)
  const [totalLike, setTotalLike] = useState()
  const [likeCount, setLikeCount] = useState(0)

  const setInput = (e) => {
    const { value, name } = e.target;
    setCommentInput({ ...commentInput, [name]: value });
  };
  // ________________________________________________________________________________________________


  const getUserName = () => {
    return localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).userName : '';
  };

  const addComment = async (e) => {
    e.preventDefault();
    const { comment } = commentInput;
    console.log(_id);
    if (!comment) {
      toast.warn('Please fill the field', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

    } else {
      const token = localStorage.getItem('token');
      const headerConfig = {
        'Content-Type': 'application/json',
        'access_token': `Bearer ${token}`,
      };
      const reqBody = new FormData()
      reqBody.append("commentText", comment)
      reqBody.append("userName", getUserName())
      // console.log(id);

      const result = await addcommentApi(reqBody, headerConfig, _id);

      if (result.status == 200) {
        // alert(" comment added")
        toast.success('Comment Added', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });

        setCommentInput({ comment: "" })


      }

      const newComment = {
        _id: result.data._id,
        userName: result.data.userName,
        commentText: result.data.commentText,
        recipeId: _id
      };

      setRecipeComment(prevComments => [...prevComments, newComment]);
      // console.log(result);
    }
  };
  // _____________________________________________________________________________________




  // get comment
  const getComments = async () => {
    const reqHeader = {
      "Content-Type": "application/json",
    };
    const result = await getCommentsApi(reqHeader, _id)
    setRecipeComment(result.data)

  }

  const handleShow = (e, _id) => {
    setShow(true);
    getComments();
  };



  // _____________________________________________________________________________________


  // delete comment
  const handleDelete = async (e,id) => {
    e.preventDefault();
    const reqHeader = {
      "Content-Type": "application/json",
    };
    const response = await deleteCommentApi(reqHeader,id);
    if(response.status==200){
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
      setRecipeComment(prevRecipes => {
        const updatedRecipes = prevRecipes.filter(recipe => recipe.id !== id);
        return updatedRecipes;
      });
    }
    console.log(response);
   
  };



  // ______________________________________________________________________________________________________________




// Inside your component...
const toggleLike = async (e, id) => {
  e.preventDefault();

  if (!isLike) {
    // Add a like
    setLike(like + 1);
    setIsLike(true);

    const headerConfig = {
      'Content-Type': 'application/json'
    };

    const reqBody = { like };

    const result = await addLikeApi(reqBody, headerConfig, _id);
    if (result.status === 200) {
      setLikeCount(likeCount + 1);
    }
  } else {
    // Remove the like
    setLike(like - 1);
    setIsLike(false);

    const headerConfig = {
      'Content-Type': 'application/json'
    };

    const reqBody = { like };

    const result = await removeLikeApi(reqBody, headerConfig, _id);
    if (result.status === 200) {
      setLikeCount(likeCount - 1);
    }
  }
};


  // ___________________________________________________________________________________________________

  // getLikes
  const getLikes = async () => {
    const reqHeader = {
      "Content-Type": "application/json",
    };
    const result = await getLikesApi(reqHeader, _id);

    if (result && result.data) {
      setLikeCount(result.data);

      // if (likeCount) {
      //   setTotalLike(likesForRecipe);
      // }
    }
  };


  useEffect(() => {
    getLikes()
  }, [])









  return (
    <div>
      <div className='text-center'>
        <Container>
          <Row>
            <Col>
              <Button className='btn' onClick={(e, _id) => handleShow(e, _id)} style={{ backgroundColor: 'transparent', border: '0', color: 'black' }}>
                <i className="fa-regular fs-2 fa-comment"></i>
              </Button>
              <p></p>
            </Col>
            <Col>
              <Button className='btn' onClick={(e) => toggleLike(e)} style={{
                backgroundColor: 'transparent', border: '0', color: 'black', backgroundColor: 'transparent',
                border: '0',
                color: isLike ? 'red' : 'black',
              }}>
                <i className="fa-regular fs-2 fa-heart"></i><p style={{ display: 'inline' ,color:'black'}}>{likeCount ? likeCount.length : 0}</p>
              </Button>

            </Col>
          </Row>
        </Container>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {recipeComment && recipeComment.length > 0 ? (
            recipeComment.map((i, index) => (
              i.recipeId === _id && (
                <div key={index}>
                  <Row><Col> <p><b>@{i.userName}</b></p></Col>
                    <Col><Button onClick={(e) => handleDelete(e, i.id)} className='Btn ms-3 btn text-white'><i className="fa-solid fa-trash"></i></Button>  </Col>
                  </Row>
                  <p>{i.commentText}</p>
                  <hr />
                </div>
              )
            ))
          ) : (
            <p>No comments yet.</p>
          )}

          <Row>
            <Col lg={10}>
              <input type="text" onChange={(e) => setInput(e)} name='comment' value={commentInput.comment} className='form-control' placeholder='Message' />

            </Col>
            <Col lg={1}> <Button className='btn Btn' onClick={(e) => addComment(e)}><i class="fa-solid fa-paper-plane"></i></Button>
            </Col>
          </Row>        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
     <ToastContainer/>
    </div>
  );
}

export default CommentLike;
