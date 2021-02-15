import React from 'react'
import SignInModal from './SignInModal.jsx';
import SignOutModal from './SignOutModal.jsx';
import SignInForm from './SignInForm.jsx';
import {Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap'

export default function TopNavbar(){

  const signOutDisplay = () =>{
    return (<div>Sign Out</div>)
  }

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
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form>
    </Navbar.Collapse>
  </Navbar>
  )
}