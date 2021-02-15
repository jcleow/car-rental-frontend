import axios from 'axios';
import React, { useReducer } from 'react';

const BACKEND_URL = 'http://localhost:3004';

export default function SignInForm({setIsVisible}){
   const initialUserState = {
    username: null,
    password: null,
  }

  const INPUT_USERNAME = 'INPUT_USERNAME';
  const INPUT_PASSWORD = 'INPUT_PASSWORD';

  const userReducer = (initialUserState,action)=>{
    switch(action.type){
      case INPUT_USERNAME:
        return {...initialUserState, username: action.payload.username}
      case INPUT_PASSWORD:
        return {...initialUserState, password: action.payload.password}
    }
  }

  const inputUsername = (event) =>{
    return {
      type:INPUT_USERNAME,
      payload:{
        username: event.target.value,
      }
    };
  }

  const inputPassword = (event) => {
  return {
    type:INPUT_PASSWORD,
    payload:{
      password: event.target.value,
    }
  };
}

const [state,dispatch] = useReducer(userReducer,initialUserState)
  
  const handleSignIn = () =>{         
    axios.post(`${BACKEND_URL}/user/signin`,state,{withCredentials: true,})
    .then((signinResult)=>{
      console.log(signinResult)
      setIsVisible(false);
    })
    .catch(error =>console.log(error));
  }

  const handleUsernameInput = (event) =>{
    dispatch(inputUsername(event))
  }

  const handlePasswordInput = (event) =>{
    dispatch(inputPassword(event))
  }


return (
<div className='d-flex flex-column align-items-center'>      
  <label><b>Sign In</b></label>
  <label className='mt-3'>Username</label>
  <input placeholder='Username' onChange={handleUsernameInput}></input>
  <label className='mt-3'>Password</label>
  <input type='password' placeholder='Password' onChange={handlePasswordInput}></input>
  <button className='mt-3' onClick={handleSignIn}>Sign In</button>
</div>)
}