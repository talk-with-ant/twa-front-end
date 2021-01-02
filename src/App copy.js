import React from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';
import { useLiff, useState, useEffect } from 'react-liff';
import RegisFormAllCourses from './components/RegisFormAllCourses';
import Routing from './routes/index';




function App() {
  return (
    <div className="App">

      <Routing />

    </div>
  );
}



export default App;
