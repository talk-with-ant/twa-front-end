import React from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';
import { useLiff, useState, useEffect } from 'react-liff';
// import './components/regisFormAllCourses';
import RegisFormAllCourses from './components/RegisFormAllCourses';
import Routing from './routes/index';
// import Success from './components/Success';




function App() {
  return (
    <div className="App">

      <Routing />
      {/* <RegisFormAllCourses /> */}
      {/* <Success/> */}
    </div>
  );
}



export default App;
