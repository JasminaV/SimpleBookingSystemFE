import React, { useState } from 'react';
import './style.css';
import DataItem from '../src/Components/data-item';
import Modal from '../src/Components/modal';
import useFetch from './Components/UseFetch';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [currentResource, setCurrentResource] = useState(null);
  const { data } = useFetch('/api/Resource')

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  const bookResourceHandler = resource => {
    setCurrentResource(resource);
    toggleModal();
  }
  return (
    <div>
      <div className="header">
        <span className="title">Booking resources</span>
      </div>
      {data && <DataItem data={data} onEdit={bookResourceHandler} />}
      <Modal show={showModal} onCancel={toggleModal} currentResource={currentResource} />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )

}

export default App;
