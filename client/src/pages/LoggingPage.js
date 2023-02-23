import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useCRUD from '../hooks/useCRUD';

export default function LoggingPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedDate = searchParams.get('selectedDate');
  const selectedItems = searchParams.get('selectedItems');
  const [selectedLocations , setSelectedLocations] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [numbers, setNumbers] = useState([]);
  const [endNumbers, setEndNumbers] = useState([]);
  const { locationList , createHours} = useCRUD();

  if(selectedLocations.length === 0){
    setSelectedLocations(selectedItems.split(','));
  }
  console.log(selectedLocations)



  const handleInputChange = (index, type, value) => {
    if (value.includes(',')) {
        value = value.replace(',', '.');
    }
    const newValues = type === 'start' ? [...numbers] : [...endNumbers];
    newValues[index] = value;
    type === 'start' ? setNumbers(newValues) : setEndNumbers(newValues);
  }

  const calculateTotalHours = () => {
    let totalMinutes = 0;
    filteredLocationList.forEach((location, index) => {
      const start = numbers[index];
      const end = endNumbers[index];
      if (start && end) {
        const startMinutes = convertToMinutes(start);
        const endMinutes = convertToMinutes(end);
        if(endMinutes < startMinutes){
            alert("End time cannot be before start time")
            return;
        }
        totalMinutes += endMinutes - startMinutes;
      }
    });
    const totalHours = Math.floor(totalMinutes / 60);
    const totalMinutesRemainder = totalMinutes % 60;
    setTotalHours(`${totalHours} hours and ${totalMinutesRemainder} minutes`);
  }

  const convertToMinutes = (timeString) => {
    const parts = timeString.split('.');
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]) || 0;
    return hours * 60 + minutes;
  }

  //filter locationList to only show locations that are selected
  const filteredLocationList = locationList.filter((location) => {
    return selectedItems.includes(location._id);
  });

  return (
    <div className='appBackground' >
      <div >
        <h1 className='text-center'>Logging page</h1>
      </div>
      <div className="mb-3 h-100 d-flex align-items-center justify-content-center">
        <div>
          <p className=''>Selected date: {selectedDate} </p>
        </div>
      </div>
      {filteredLocationList.map((location, index) => {
        return (
          <div key={location._id}>
            <div className="mb-3 h-100 d-flex align-items-center justify-content-center">
              <h4 className=''>{location.name} {location.address} </h4>
            </div>
            <div className="mb-3 h-100 d-flex align-items-center justify-content-center">
              <p className='m-2'>Start time</p>
              <input
                onChange={(e) => handleInputChange(index, 'start', e.target.value)}
                placeholder='example: 9.00'
                type='text'
              />
              <p className='m-2'>End time</p>
              <input
                onChange={(e) => handleInputChange(index, 'end', e.target.value)}
                placeholder='example: 17.00'
                type='text'
                />
            </div>
            </div>
        )
        })}
        <div className="mb-3 h-100 d-flex align-items-center justify-content-center">
            <button className='btn btn-primary' onClick={calculateTotalHours}>Calculate total hours</button>
        </div>
        <div className="mb-3 h-100 d-flex align-items-center justify-content-center">
            <p className='m-2'>Total hours: {totalHours}</p>
        </div>
        {totalHours ? <div className="mb-3 h-100 d-flex align-items-center justify-content-center">
            <Link to="/"><button className='btn btn-success' onClick={() => createHours(selectedDate, totalHours, selectedLocations)}>Save</button></Link>
        </div> : null}
        <div className="mb-3 h-100 d-flex align-items-center justify-content-center">
        <Link to="/"><button className='btn btn-danger'>go back</button></Link>
        </div>
    </div>
    );
}
