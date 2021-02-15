import '../App.css';
import { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import { BookingContext, bookCarAction } from '../store.js';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import moment from 'moment';

import { Button } from 'react-bootstrap';
import getUserIdFromCookie from '../getUserIdFromCookie';

const BACKEND_URL = 'http://localhost:3004';

export default function Modal({ children, carId }) {
  const [isVisible, setIsVisible] = useState(false);

  // State management for date picker
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [startDateString, setStartDateString] = useState(null);
  const [endDateString, setEndDateString] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setStartDateString(moment(start).format('DD-MMM-YYYY'));
    setEndDate(end);
    if (end) {
      setEndDateString(moment(end).format('DD-MMM-YYYY'));
    }
  };

  const loggedInUserId = getUserIdFromCookie();

  const bookingInfo = {
    userId: loggedInUserId,
    carId,
    startDate,
    endDate,
  };

  const { store, dispatchBooking } = useContext(BookingContext);

  const handleConfirmation = () => {
    console.log(bookingInfo, 'bookingInfo');
    axios.post(`${BACKEND_URL}/confirmBooking`, bookingInfo, { withCredentials: true })
      .then((result) => {
        const bookingId = result.data.id;
        dispatchBooking(bookCarAction(bookingId, bookingInfo));
        setIsVisible(false);
      })
      .catch((error) => console.log(error));
  };

  if (isVisible) {
    return (
      <div className="rental-modal-container">
        <div className="rental-modal">
          <button className="rental-modal-close" onClick={() => setIsVisible(false)}>
            x
          </button>
          {children}
          <DatePicker
            selected={startDate}
            onChange={onChange}
            minDate={new Date()}
            startDate={startDate}
            endDate={endDate}
            excludeDates={store.blockedDates[carId] && [...store.blockedDates[carId]]}
            selectsRange
            inline
          />
          { (startDateString && endDateString)
          && (
          <div>
            <div>
              {' '}
              You have chosen to book from
              {startDateString}
              {' '}
              to
              {endDateString}
            </div>
            <button
              onClick={() => {
                handleConfirmation();
              }}
            >
              Confirm Booking
            </button>
          </div>
          )}

        </div>
      </div>
    );
  }
  return (
    <div>
      <Button variant="outline-dark" onClick={() => setIsVisible(true)}>Check Availability</Button>
    </div>
  );
}
