import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastWarn = () => toast.warn('No availible booking for the selected dates or invalid reqest data!');
const toastSuccess = () => toast.success('Succefull booking!');

const Modal = ({ show, onCancel, currentResource, toast }) => {
  const startDate = new Date();

  useEffect(() => {
    if (currentResource) setFormData({ resourceId: currentResource.id });
  }, [currentResource]);

  const initialFormState = () => {
    return currentResource ? { resourceId: currentResource.id, dateFrom: startDate, dateTo: startDate, bookedQuantity: 0 } : { resourceId: null, dateFrom: startDate, dateTo: startDate, bookedQuantity: 0 };
  }

  const [formData, setFormData] = useState(initialFormState);

  const submitData = (e) => {
    e.preventDefault();
    const requestBody = {
      dateFrom: formData.dateFrom ? formData.dateFrom : moment(startDate).format('YYYY-MM-DD'),
      dateTo: formData.dateTo ? formData.dateTo : moment(startDate).format('YYYY-MM-DD'),
      bookedQuantity: parseInt(formData.bookedQuantity),
      resourceId: currentResource.id,
    }
    fetch('/api/Booking', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    }).then((response) => {
      if (response.ok) {
        toastSuccess()
        return response.json()
      }
      throw new Error('Something went wrong or no available booking for requested dates.');

    }).catch((error) => {
      toastWarn()

    })
    onCancel();
  }

  return (
    show ? (
      <div className="modal-overlay">
        <div className='modal'>
          <form style={{ margin: "10px" }} onSubmit={submitData}>
            <div className="modal-header">
              <h3>{currentResource ? currentResource.name : 'no resource selected'}</h3>
            </div>
            <div className="modal-section">
              <div className='modal-section-label'>
                <label>Date from</label>
              </div>
              <div className="datepicker">
                {<DatePicker
                  name="DateFrom"
                  dateFormat="yyyy/MM/dd"
                  value={formData.dateFrom}
                  selected={startDate}
                  onChange={date => { setFormData({ ...formData, dateFrom: moment(date).format('YYYY-MM-DD') }) }}
                  placeholderText="mm/dd/yyyy"
                />}
              </div>
            </div>

            <div className="modal-section">
              <div className='modal-section-label'>
                <label >Date to</label>
              </div>
              <div className="datepicker">
                {formData && <DatePicker
                  name="DateTo"
                  dateFormat="yyyy/MM/dd"
                  value={formData.dateTo}
                  selected={startDate}
                  onChange={date => { setFormData({ ...formData, dateTo: moment(date).format('YYYY-MM-DD') }) }}
                  placeholderText="mm/dd/yyyy"
                />}
              </div>

            </div>
            <div className="modal-section">
              <div className='modal-section-label'>
                <label >Quantity</label>
              </div>
              <div className="modal-section-input">
                <input type="number" id="quantity" name="quantity" min="0" max="100" onChange={quantity => { setFormData({ ...formData, bookedQuantity: quantity.target.value }) }} />
              </div>
            </div>
            <div className="modal-footer" >
              <button type="submit" onClick={submitData}>Book</button>
              <button type="button" onClick={onCancel}>Cancel</button>
            </div>

          </form>
        </div>
      </div>
    ) : null

  );
}

export default Modal;