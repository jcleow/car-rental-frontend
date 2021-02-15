import "../App.css";
import { useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function SignOutModal(ChildComponent) {
  const [isVisible, setIsVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
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
        <button onClick={() => setIsVisible(true)}>Sign Out</button>
      </div>
    );
  }
}
