import './App.css';
import {useState} from 'react';

function App() {

  const [formData, setFormData] = useState({startingPoint: '', destination: '', travelMode: ''});
  const [resData, setResData] = useState({distanceData: '', durationData: ''});

  const updateFormData = (evt) => {
    const {name, value} = evt.target;
    setFormData((currData) => ({...currData, [name]: value}));
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/calculate', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      console.log(response)
      if (response.ok) {
        const result = await response.json();
        const distance = result.rows[0].elements[0].distance.text;
        const duration = result.rows[0].elements[0].duration.text;
        setResData({distanceData: distance, durationData: duration});
        console.log(resData);
      } 
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <h1>Google Maps Distance Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='startingPoint'>Enter Starting Point</label>
        <input id='startingPoint' value={formData.startingPoint} onChange={updateFormData} name='startingPoint'></input> <br/>
        <label htmlFor='destination'>Enter Destination</label>
        <input id='destination' value={formData.destination} onChange={updateFormData} name='destination'></input> <br/>
        <button>Calculate Distance!</button>
      </form>
      <div>
        {resData.distanceData && resData.durationData && 
          <p>Distance: {resData.distanceData} Duration: {resData.durationData}</p>}
      </div>
    </>
  );
}

export default App;
