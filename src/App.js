import './App.css';
import React, { useState,useEffect,useReducer,useContext } from 'react';
import {CarProvider} from './store.js';
import axios from 'axios';
import CarCard from './components/CarCard.jsx';
import TopNavbar from './components/TopNavbar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const BACKEND_URL = 'http://localhost:3004';
export default function App() {
//Default all axios requests to have withCredentialsTrue
axios.defaults.withCredentials = true;

const [listOfCarCards, setListOfCarCards] = useState([])

const getAllCars = () => {
  axios.get(`${BACKEND_URL}/availableCars`)
  .then((result)=>{    
    const arrayOfCarCards = result.data.availableCars.map((car,index) =>{
      return (      
      <div className='col-3'>
        <CarCard key={index} car={car}/>
      </div>      
      )
    })
     setListOfCarCards(arrayOfCarCards)
  })
  .catch((err)=>console.log(err))
}

useEffect(()=>{
  getAllCars()  
},[])
  
  return (
    <div>
      <TopNavbar />      
      <div className='container'>
        <div className='row'>
          <CarProvider >
          {listOfCarCards}    
          </CarProvider>      
        </div>
      </div>      
    </div>
  );
}
