import './App.css';
import React from 'react';
import axios from 'axios';
import { CarProvider } from './store';
import CarCards from './components/CarCards';


import TopNavbar from './components/TopNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const BACKEND_URL = 'http://localhost:3004';
export default function App() {
// Default all axios requests to have withCredentialsTrue
  axios.defaults.withCredentials = true;
 
  return (
    <div>
      <CarProvider>
        <TopNavbar />
        <CarCards />
      </CarProvider>
    </div>
  );
}


