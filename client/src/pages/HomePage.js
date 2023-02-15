import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import useCRUD from '../hooks/useCRUD';

export default function HomePage() {
  const { locationList, hoursList,  createLocation, updateLocation, deleteLocation } = useCRUD();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [showInputFields, setShowInputFields] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);


 

  const addToList = () => {
    createLocation(name, address);
    setName("");
    setAddress("");
    setShowInputFields(false);
  };

  const deleteLocationItem = (id) => {
    deleteLocation(id);
  };

  const updateLocationItem = (id) => {
    if (editName === "" || editAddress === "") {
      alert("Please fill in all fields");
      return;
    }
    updateLocation(id, editName, editAddress);
    setSelectedItem(null);
    setEditAddress("");
    setEditName("");
    setName("");
    setAddress("");
  };

  const addSelectedItems = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((val) => {
        return val !== id;
      }));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };
  if (!selectedDate) {
    return (
      <div>
        <h2 className='text-center'>Select a date</h2>
        <div className='mb-3 h-100 d-flex align-items-center justify-content-center'>
          <input type='date' onChange={(e) => setSelectedDate(e.target.value)} />
        </div>
        {hoursList.length > 0 &&
          <div>
            <div className='mb-3 h-100 d-flex align-items-center justify-content-center'>
            <h3>Past logs</h3>
            </div>
            {hoursList.map((hours) => {
              return (
                <div key={hours._id}>
                  <div className='mb-3 h-100 d-flex align-items-center justify-content-center'>
                    <p className='m-2'>{hours.date}</p>
                    <p className='m-2'>{hours.hours}</p>
                  </div>
                </div>
              );
            })}
          </div>
        }
      </div>
    );
}
  return (
    <div>
      <h2 className='text-center'>Selected date: {selectedDate} </h2>
      <div className='mb-3 h-100 d-flex align-items-center justify-content-center'>
            <button className='btn btn-primary' onClick={() => setSelectedDate("")}>Edit date</button>
          </div>
      {showInputFields ? (
        <div>
          <h2 className='text-center mt-5 mb-3'>Enter name and address of work location</h2>
          <div className='mb-3 h-100 d-flex align-items-center justify-content-center'>
            <input onChange={(e) => setName(e.target.value)} type='text' placeholder='Enter name of location' value={name} />
            <input onChange={(e) => setAddress(e.target.value)} type='text' placeholder='Enter address of location' value={address} />
          </div>
          <div className='mb-3 h-100 d-flex align-items-center justify-content-center '>
            <button className='btn btn-primary ' onClick={() => addToList()}>Add to list</button>
          </div>
        </div>
      ) : (
        
        <div className='mt-5 mb-3 h-100 d-flex align-items-center justify-content-center'>
          <button className='btn btn-primary' onClick={() => setShowInputFields(true)}>New Location</button>
        </div>
      )}
      <h2 className='text-center'>Or select existing</h2>
      <div className='mb-3 h-100 d-flex align-items-center justify-content-center'>
        <ul>
          {locationList.map((val, index) => {
            return (
              <li key={index}>
                {val.name} / {val.address}
                {selectedItem === index ? (
                  <>
                   <div className=''>
                   <input  onChange={(e) => setEditName(e.target.value)} type='text' value={editName}/>
                  <input onChange={(e) => setEditAddress(e.target.value)} type='text' value={editAddress} />
        <button className='btn btn-warning m-2' onClick={() => setSelectedItem(null)}>Cancel</button>
        <button className='btn btn-primary m-2' onClick={() => val && updateLocationItem(val._id)}>Save</button>
                    </div>
                  </>
                ) : (
                  <>
                  <div className=''>
                  <button className='btn btn-primary m-2' onClick={() => addSelectedItems(val._id)}>Select</button>
                    <button className='btn btn-warning m-2' onClick={() =>  {setSelectedItem(index); setEditAddress(val.address); setEditName(val.name);}}>Edit</button>
                    <button className='btn btn-danger m-2' onClick={() => deleteLocationItem(val._id)}>Delete</button>
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ul>
        </div>
        {selectedItems.length > 0 && (
          <div>
          <div className='mb-3 h-100 d-flex align-items-center justify-content-center'>
            <button className='btn btn-danger' onClick={() => setSelectedItems([])}>Clear selected</button>
            <ul>
              {selectedItems.map((val, index) => {
                return (
                  <li key={index}>
                    {locationList.filter((location) => {
                      return location._id === val;
                    })[0].name}
                  </li>
                );
                
              })}
              
            </ul>
          </div>
          <div className='mt-5 mb-3 h-100 d-flex align-items-center justify-content-center'>
          <Link  to={{
    pathname: '/logging',
    search: `?selectedDate=${selectedDate}&selectedItems=${selectedItems}`
  }}><button className='btn btn-primary '>Start logging hours</button></Link>
          </div>
          </div>
        )}
      
    </div>
  );
}
