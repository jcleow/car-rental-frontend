import React,{useContext} from 'react';
import {BookingContext} from '../store';

export default function CarCards () {
  const {store} = useContext(BookingContext);
  console.log(store,'store');
  return(
      <div className="container">
        <div className="row">          
            {store.carCards}          
        </div>
      </div>
  )
}