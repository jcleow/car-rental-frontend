import React,{useState,useContext} from 'react'
import {BookingContext} from '../store.js';
import SignInModal from './SignInModal.jsx';
import SignOutModal from './SignOutModal.jsx';
import SignInForm from './SignInForm.jsx';
import DatePicker from 'react-datepicker';
import {Navbar,Nav,Form,Button} from 'react-bootstrap'

export default function TopNavbar(){

  const signOutDisplay = () =>{
    return (<div>Sign Out</div>)
  }

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const { store, dispatchBooking } = useContext(BookingContext);

  // const filterByAvailableDates = () =>{
  //   store.bookings
  // }

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
        onChange={date => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
      <Button variant="outline-success" className='ml-2'>Search for Available Cars</Button>        
      </Form>
    </Navbar.Collapse>
  </Navbar>
  )
}