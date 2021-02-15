import "../App.css";
import { useState } from "react";
import {Button} from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";

export default function SignOutModal(ChildComponent) {
  const [isVisible, setIsVisible] = useState(false);
  if (isVisible) {
    return (
      <div className="rental-modal-container">
        <div className="rental-modal">
          <button className="rental-modal-close" onClick={() => setIsVisible(false)}>
            x
          </button>
          {<ChildComponent />}          
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Button variant='outline-danger' onClick={() => setIsVisible(true)}>Sign Out</Button>
      </div>
    );
  }
}
