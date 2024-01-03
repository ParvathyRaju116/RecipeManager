import React, { useState } from 'react'
import {ToastContainer, toast } from 'react-toastify';
import { loginApi, userRegisterApi } from '../Services/Allapi';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Header from '../Components/Header';


function Auth({admin}) {

    const navigate = useNavigate()


    const toggleSignup = () => {

        const loginToggle = document.getElementById("login-toggle");
        const signupToggle = document.getElementById("signup-toggle");
        const loginForm = document.getElementById("login-form");
        const signupForm = document.getElementById("signup-form");

        if (loginToggle && signupToggle && loginForm && signupForm) {
            loginToggle.style.backgroundColor = "#fff";
            loginToggle.style.color = "#222";
            signupToggle.style.backgroundColor = "rgb(218, 35, 35)";
            signupToggle.style.color = "#fff";
            loginForm.style.display = "none";
            signupForm.style.display = "block";

        }
    };

    // Function to toggle login view
    const toggleLogin = () => {

        const loginToggle = document.getElementById("login-toggle");
        const signupToggle = document.getElementById("signup-toggle");
        const loginForm = document.getElementById("login-form");
        const signupForm = document.getElementById("signup-form");

        if (loginToggle && signupToggle && loginForm && signupForm) {
            loginToggle.style.backgroundColor = "rgb(218, 35, 35)";
            loginToggle.style.color = "#fff";
            signupToggle.style.backgroundColor = "#fff";
            signupToggle.style.color = "#222";
            signupForm.style.display = "none";
            loginForm.style.display = "block";
        }
    };

    const [unameValid, setUnameValid] = useState(false)
    const [emailValid, setEmailValid] = useState(false)
    const [pswValid, setPswValid] = useState(false)


    const [user, setUser] = useState({
        userName: "", email: "", password: ""
    })

    // get data from input
    const setInputs = (e) => {

        if (e.target.name == 'useName') {
            if (e.target.value.match(/^[a-zA-Z]$/)) {
                setUnameValid(false)
            }
            else {
                setUnameValid(true)
            }
        }

        if (e.target.name == 'emali') {
            if (e.target.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
                setEmailValid(false)
            }
            else {
                setEmailValid(true)
            }
        }

        if (e.target.name == 'password') {
            if (e.target.value.match(/^[A-Za-z]\w{7,14}$/)) {
                setPswValid(false)
            }
            else {
                setPswValid(true)
            }
        }
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    console.log(user);
    // _____________________________________________________________________________

    const handleRegister = async (e) => {
        e.preventDefault()
        const { userName, email, password } = user
        if (!userName || !email || !password) {
            toast.error('Please fill all data', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {

            const result = await userRegisterApi(user)
            console.log(result);
            if (result.status === 200) {
               console.log("loged in");
               
                alert("Accout created Please Login")
                setUser({ userName: "", email: "", password: "" })

                navigate('/auth')
            }
            else {
                // alert(result.response.data)
                console.log("button clicked");


            }

        }
    }
    // ___________________________________________________________________________________________________

    // LOGIN
    const handleLogin = async (e) => {
        const { email, password } = user
        e.preventDefault()
        if (!email || !password) {
            toast.error("Please Fill All Data", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            const result = await loginApi(user)
            console.log(result);
            if (result.status === 200) {
                localStorage.setItem("token", result.data.token)
                localStorage.setItem("currentUser", JSON.stringify(result.data.user))
                localStorage.setItem("currentId", result.data.user._id)
                // toast.success(`login success`, {
                //     position: "top-center",
                //     autoClose: 3000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     theme: "light",
                // });
                setUser({ userName: "", email: "", password: "" })
                navigate('/')

                if(admin){
                    navigate('/admin-dashbord')
                }
                else{
                    navigate('/')
                }

            }
            else {
                toast.error(result.response.data, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                // alert("incorrect email or password")
            }
        }
    }






    return (
        <div>
<Header></Header>
            <div className='' >
                <div className='text-center d-flex justify-content-center'>
                    <h1 className='pt-5 head'><b> Cook Book </b></h1>
                </div>
                <div class="form-modal">



                    <div class="form-toggle">
                        <button id="login-toggle" onClick={toggleLogin}>log in</button>
                      { !admin && <button id="signup-toggle" onClick={toggleSignup}>sign up</button>}
                    </div>

{!admin &&
                    <div register id="signup-form">
                        <form>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                name='email'
                                onChange={(e) => setInputs(e)}

                            />
                            {emailValid &&
                                <p className='text-danger'>Enter a valid email</p>
                            }
                            <input
                                name='userName'
                                type="text" placeholder="Choose username"
                                onChange={(e) => setInputs(e)}
                            />
                            {
                                unameValid &&
                                <p className='text-danger'>Include characters only</p>
                            }
                            <input
                                name='password'
                                type="password"
                                placeholder="Create password"
                                onChange={(e) => setInputs(e)}
                            />
                            {pswValid &&
                                <p className='text-danger'>Enter a strong password</p>
                            }
                            <Button
                                onClick={(e) => handleRegister(e)}
                                type="button" class="btn signup btn-sucess" >create account</Button>
                            <hr />

                        </form>
                    </div>}

                    <div id="login-form">
                        <form>

                            <input
                                onChange={(e) => setInputs(e)}
                                type="text"
                                name='email'
                                placeholder="Enter email" />
                            <input
                                onChange={(e) => setInputs(e)}
                                name='password'
                                type="password"
                                placeholder="Enter password" />
                            <Button type="button" class="btn login btn-sucess"
                                onClick={(e) => handleLogin(e)}
                            >
                                login</Button>

                            <hr />

                        </form>
                    </div>



                </div>

                <ToastContainer />
            </div>
        </div>
    )
}

export default Auth