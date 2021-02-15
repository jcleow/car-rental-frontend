import "../App.css";
import { useState,useContext } from "react";
import DatePicker from 'react-datepicker';
import {BookingContext} from '../store.js';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import getUserIdFromCookie from "../getUserIdFromCookie";
import {bookCarAction,cancelCarAction,} from '../store.js'

const BACKEND_URL = 'http://localhost:3004';

export default function Modal(ChildComponent,carId) {
  const [isVisible, setIsVisible] = useState(false);  

  //State management for date picker
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  
  const loggedInUserId = getUserIdFromCookie();
    
  const bookingInfo = {
    userId:loggedInUserId,
    carId:carId,
    startDate,
    endDate,
  };
  
  const {store,dispatchBooking} = useContext(BookingContext);

  const handleConfirmation = () =>{
    console.log(bookingInfo,'bookingInfo');
    axios.post(`${BACKEND_URL}/confirmBooking`,bookingInfo,{withCredentials:true})
    .then((result)=>{      
      const bookingId = result.data.id
      dispatchBooking(bookCarAction(bookingId,bookingInfo))
      setIsVisible(false);     
    })
    .catch(error=> console.log(error))
  }
  if(store.blockedDates[carId]){
  console.log(store.blockedDates[carId],'blockedDates');
  }

  if (isVisible) {
    return (
      <div className="rental-modal-container">
        <div className="rental-modal">
          <button className="rental-modal-close" onClick={() => setIsVisible(false)}>
            x
          </button>
          {<ChildComponent />}
          <DatePicker
            selected={startDate}
            onChange={onChange}
            minDate={new Date()}
            startDate={startDate}
            endDate={endDate}
            excludeDates={store.blockedDates[carId] && [...store.blockedDates[carId]]}
            selectsRange
            inline
          />

          <button 
          onClick={()=>{
            handleConfirmation()            
            }}>
            Confirm Booking
          </button>
          
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={() => setIsVisible(true)}>Check Availability</button>
      </div>
    );
  }
}
