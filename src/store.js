/* eslint-disable no-unused-expressions */
import React,{useReducer,useEffect} from 'react';
import axios from 'axios';
import CarCard from './components/CarCard';
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
axios.defaults.withCredentials=true;
const BACKEND_URL = 'http://localhost:3004';

const initialState = {  
  cars :[],
  carCards: [],
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
    case 'updateBlockedDates':      
      return {...state, blockedDates:{...state.blockedDates,...action.payload}}
    case 'updateAvailCars':
      return {...state, cars:[...action.payload]}
    case 'updateAvailCarCards':
      return {...state, carCards:[...action.payload]}
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

export const updateAvailCarCardsAction = (arrayOfAvailCarCards) =>{
  return{
    type:'updateAvailCarCards',
    payload: [...arrayOfAvailCarCards]    
  }
}

export const updateAvailCarsAction = (arrayOfAvailCars) => {
  return{
    type:'updateAvailCars',
    payload: [...arrayOfAvailCars]
  }
}

// export const cancelCarAction = (bookingId,carId) => {
//   return{
//     type:'book',
//     payload:{
//       bookingId,
//       userId:null,
//       carId,
//       booking: null
//     }
//   }
// }

export const updateBookedDatesAction = (bookedDates,carId)=>{
  const arrOfBookedDates = bookedDates.map((booking)=>{
    const blockDates = eachDayOfInterval({start: new Date(booking.startDate),end: new Date(booking.endDate)})
    return blockDates
  })
  
  const mergedBookedDates = [].concat.apply([],arrOfBookedDates)
  const setOfDates = new Set();
  mergedBookedDates.forEach((date)=>{setOfDates.add(date)})

  const allBlockedDates = Array.from(setOfDates);
  
  return{
    type:'updateBlockedDates',
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

  //Helper to get all cars
  const getAllCars = () => {
    axios.get(`${BACKEND_URL}/availableCars`)
      .then((result) => {
        const arrayOfCarCards = result.data.availableCars.map((car, index) => (
          <div className="col-12">
            <CarCard key={index} car={car} />
          </div>
        ));
        dispatchBooking(updateAvailCarCardsAction(arrayOfCarCards));
        dispatchBooking(updateAvailCarsAction(result.data.availableCars))
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllCars();
  }, []);
  console.log('test');

  return (<Provider value={{store, dispatchBooking}}>
    {children}
  </Provider>)
}