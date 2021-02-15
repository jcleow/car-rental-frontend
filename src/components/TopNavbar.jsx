import React,{useState,useContext, useEffect} from 'react'
import {BookingContext, updateAvailCarsAction,updateAvailCarCardsAction,genArrOfCarCards} from '../store.js';
import SignInModal from './SignInModal.jsx';
import SignOutModal from './SignOutModal.jsx';
import SignInForm from './SignInForm.jsx';
import DatePicker from 'react-datepicker';
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import {Navbar,Nav,Form,Button} from 'react-bootstrap'

export default function TopNavbar(){

  const signOutDisplay = () =>{
    return (<div>Sign Out</div>)
  }

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const { store, dispatchBooking } = useContext(BookingContext);

  //To Filter out all the unavailable car ids
  const filterUnavailCars = () =>{
    // Return a date object for each day between start and end date
    const selectedDatesArray = eachDayOfInterval({start: new Date(startDate),end: new Date(endDate)})  
    // Return list of unavailable car ids
    const listOfUnavailCarIds = Object.keys(store.blockedDates).filter((key) => {
      let isCarAvail = false      
      selectedDatesArray.forEach((selectedDate)=>{        
        //Perform serialization of each date in blockedDates and selected Date 
        // because [Object date] is not a function... you cannot compare 2 different objects because of its mutability
        if(store.blockedDates[key].map(Number).indexOf(+selectedDate) > -1)
        {
          isCarAvail = true
        }        
      })
      return isCarAvail      
    })

    //Get the filtered list of avail cars
    const filteredAvailCars = store.cars.filter((entry)=>{
      let isCarAvail = true
      listOfUnavailCarIds.forEach((unavailId)=>{              
        if(entry.id === Number(unavailId)){
          isCarAvail = false;
        }
      })
      return isCarAvail;
    })
    return filteredAvailCars;
    
  }

  useEffect(()=>{    
    if (endDate){      
      const filteredAvailCars = filterUnavailCars()  
      dispatchBooking(updateAvailCarsAction(filteredAvailCars));
      const filteredArrayOfCarCards = genArrOfCarCards(filteredAvailCars);
      dispatchBooking(updateAvailCarCardsAction(filteredArrayOfCarCards));
      console.log(store.cars,'store.cars-1');     
    }
    //specify use effect to listen for changes in enddate to re-render,
    // if not it will only run once
  },[endDate])
   
  return(
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">Car Rental App</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">        
          {SignInModal(SignInForm)}
          {SignOutModal(signOutDisplay)}        
      </Nav>
      <Form inline>
      <div className='mr-2'> <b>Filter By Booking Dates</b></div>
      <div className='mr-2'>Start: </div>        
       <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <div className='ml-2 mr-2'>End:</div>        
      <DatePicker
        selected={endDate}
        onChange={(date) => {
          setEndDate(date)          
        }}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />              
      </Form>
    </Navbar.Collapse>
  </Navbar>
  )
}