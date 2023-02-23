import { useState, useEffect } from 'react';
import Axios from 'axios';

const useCRUD = () => {
  const [locationList, setLocationList] = useState([]);
  const [hoursList, setHoursList] = useState([]);
  const createLocation = (name, address) => {
    Axios.post('https://localhost:3001/create', { name, address })
      .then(() => {
        fetchLocations();
      });
  };
 const createHours = (date, hours, locations) => {
  Axios.post('https://localhost:3001/createHours', { date, hours, locations })
    .then(() => {
      console.log('Created hours');
    })
    .catch((error) => {
      console.log(error);
    });
};
  const fetchLocations = () => {
    Axios.get('https://localhost:3001/read')
      .then((response) => {
        setLocationList(response.data);
      });
  };

  const fetchHours = () => {
    Axios.get('https://localhost:3001/readHours')
      .then((response) => {
        setHoursList(response.data);
      });
  };


  const updateLocation = (id, name, address) => {
    Axios.put('https://localhost:3001/update', { id, name, address })
      .then(() => {
        setLocationList(locationList.map((val) => {
          return val._id === id ? { _id: val._id, name, address } : val;
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteLocation = (id) => {
    Axios.delete(`https://localhost:3001/delete/${id}`)
      .then(() => {
        setLocationList(locationList.filter((val) => {
          return val._id !== id;
        }));
      });
  };

  const deleteHours = (id) => {
    Axios.delete(`https://localhost:3001/deleteHours/${id}`)
      .then(() => {
        setHoursList(hoursList.filter((val) => {
          return val._id !== id;
        }));
      });
  };

  useEffect(() => {
    fetchLocations();
    fetchHours();
  }, []);

  return { locationList,hoursList, createHours, createLocation, updateLocation, deleteLocation, deleteHours, fetchLocations, fetchHours };
};

export default useCRUD;