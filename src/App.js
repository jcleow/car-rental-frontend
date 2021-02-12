import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarCard from './components/CarCard.jsx';
import Modal from './components/Modal.jsx';
import TopNavbar from './components/TopNavbar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const BACKEND_URL = 'http://localhost:3004';

export default function App() {

// const getAllCars = () =>{
//   axios.get('/cars/index')
//   .then((result)=>{
//     console.log(result,'result')
//     const listOfCarCards = result.data.map(car=>{
//       return <CarCard car={car}/>
//     })
//   })
//   .catch(err=>console.log(err))
// }
useEffect(()=>{
  // getAllCars()
},[])

  return (
    <div>
      <TopNavbar />
    <div className='container'>
      <div className='row'>
        <div className='col'>
          {}
        </div>
      </div>
    </div>
    </div>
  );
}
