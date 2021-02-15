/* eslint-disable no-unused-expressions */
import React,{useReducer} from 'react';
import axios from 'axios';
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
axios.defaults.withCredentials=true;
const BACKEND_URL = 'http://localhost:3004';

const initialState = {  
  cars :[],
  bookings:[],
  blockedDates:{},
  currentCarIndex:null,
}

// const initialState = getInitialStates();

const bookingReducer=(state,action)=>{
  switch(action.type){
    case 'book':
      return {...state, bookings:[...state.bookings,action.payload ]}
    case 'cancel':
      const selectedIndex = state.bookings.findIndex((booking)=>booking.bookingId === action.payload.bookingId)
      state.bookings[selectedIndex] = action.payload      
      return {...state}
    case 'update':
      console.log({...state, blockedDates:{...state.blockedDates,...action.payload}},'blocked dates');
      return {...state, blockedDates:{...state.blockedDates,...action.payload}}
    default:
      return null;
  }
}

//Create actions
export const bookCarAction = (bookingId,bookingInfo) => {
  const {userId,carId,startDate,endDate}  = bookingInfo; 
  return{
    type:'book',
    payload:{
      bookingId,
      userId,
      carId,
      startDate,
      endDate
    }
  }
}

export const cancelCarAction = (bookingId,carId) => {
  return{
    type:'book',
    payload:{
      bookingId,
      userId:null,
      carId,
      booking: null
    }
  }
}

export const updateBookedDatesAction = (bookedDates,carId)=>{
  const arrOfBookedDates = bookedDates.map((booking)=>{
    const blockDates = eachDayOfInterval({start: new Date(booking.startDate),end: new Date(booking.endDate)})
    return blockDates
  })
  console.log(arrOfBookedDates,'arrOfBookedDates')

  const mergedBookedDates = [].concat.apply([],arrOfBookedDates)
  const setOfDates = new Set();
  mergedBookedDates.forEach((date)=>{setOfDates.add(date)})

  console.log(setOfDates);
  const allBlockedDates = Array.from(setOfDates);
  
  return{
    type:'update',
    payload: {[carId]:allBlockedDates}              
  }
}


//Create a provider
export const BookingContext = React.createContext(null);

// create the provider to use below
const {Provider} = BookingContext;

export function CarProvider({children}) {
  // create the dispatch function in one place and put in into context
  // where it will be accessible to all of the children
  const [store, dispatchBooking] = useReducer(bookingReducer, initialState);
  // surround the children elements with
  // the context provider we created above
  return (<Provider value={{store, dispatchBooking}}>
      {children}
    </Provider>)
}