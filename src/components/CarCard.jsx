import axios from 'axios';
import React,{useContext, useEffect} from 'react';
import Modal from './Modal.jsx';
import {BookingContext} from '../store';
import {updateBookedDatesAction} from '../store';
import getUserIdFromCookie from '../getUserIdFromCookie';
const BACKEND_URL = 'http://localhost:3004';

export default function CarCard({car}){
const carDescription = () =>{
  return (<div>
    ID: {car.id}
    <br/>
    {car.details} is available for booking</div>)
}
const carId = car.id

const {store,dispatchBooking} = useContext(BookingContext);

function getAllBookings(){
  const currUserId = getUserIdFromCookie();
  if (currUserId){    
     axios.get(`${BACKEND_URL}/unavailableDates/${carId}`)  
    .then((response)=>{             
      if (response.data.length > 0){
        dispatchBooking(updateBookedDatesAction(response.data,carId))              
      }      
    })
    .catch(err => console.log(err))    
  }  
}

//Update all bookings for this particular car
useEffect(()=>{
  getAllBookings();  
},[])

console.log(store,'store');
return(
  <div>
    {car.name}
    {Modal(carDescription,carId)}
  </div>
  )
}