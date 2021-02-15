import "../App.css";
import { useState } from "react";
import DatePicker from 'react-datepicker';
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
        <button onClick={() => setIsVisible(true)}>Sign In</button>
      </div>
    );
  }
}
