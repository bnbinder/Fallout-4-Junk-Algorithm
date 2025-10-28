import { useState, useEffect } from 'react';
import './App.css'
import MapComponent from './MapComponent';
import ListOfJunkComponent from './ListOfJunkComponent';
import { runOnceHashMap } from './APICall';

function App() {
  const [mapStr, setMapStr] = useState("Select Location");

  const handleChildData = (string : string) => {
    setMapStr(string);
  };

  useEffect(() => {
    runOnceHashMap();
  }, []);

  return (
    <>

      <div>
        <h1>This Is The Junk Algorithm</h1>
      </div>
      <MapComponent onDataReceived={handleChildData}/>
      <div className="card">
        <h3>
        {mapStr}
        </h3>
        <ListOfJunkComponent />
      </div>
    </>
  )
}

export default App
