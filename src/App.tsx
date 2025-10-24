import { useEffect } from 'react';
import './App.css'
import MapComponent from './MapComponent';

function App() {
  return (
    <>

      <div>
        <h1>This Is The Junk Algorithm</h1>
      </div>
      <MapComponent />
      <div className="card">
        <button onClick={() => console.log("hi")}>
        Get info
        </button>
      </div>
      <p className="read-the-docs">
        Click here to learn more about fallout 4 junk
      </p>
    </>
  )
}

export default App
