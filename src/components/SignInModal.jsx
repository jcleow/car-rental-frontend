import "../App.css";
import { useState } from "react";
import {Button} from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";


export default function SignInModal(ChildComponent) {
  const [isVisible, setIsVisible] = useState(false);
  if (isVisible) {
    return (
      <div className="signin-modal-container">
        <div className="signin-modal">
          <button className="signin-modal-close" onClick={() => setIsVisible(false)}>
            x
          </button>
          {<ChildComponent setIsVisible={setIsVisible} />}          
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Button variant='primary' onClick={() => setIsVisible(true)}>Sign In</Button>
      </div>
    );
  }
}
