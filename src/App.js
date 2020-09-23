import React, { useEffect, useState } from 'react';
import { useLiff } from 'react-liff';
import Routing from './routes/index';
import RegisFormAllCourses from './components/RegisFormAllCourses';
// import './App.css';
import { Button } from 'react-bootstrap';

import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import BannerTop from './components/HeaderBanner';

const App = () => {
  const [displayName, setDisplayName] = useState('');
  const { error, liff, isLoggedIn, ready } = useLiff();

  useEffect(() => {
    if (!isLoggedIn) return;

    (async () => {
      const profile = await liff.getProfile();
      setDisplayName(profile.displayName);
    })();
  }, [liff, isLoggedIn]);

  const showDisplayName = () => {
    if (error) return <p>Something is wrong.</p>;
    if (!ready) return <p>Loading...</p>;

    if (!isLoggedIn) {
      return <button className="App-button" onClick={liff.login}>Login</button>;
    }
    return (
      <>
        <p>Welcome to the react-liff demo app, {displayName}!</p>
        <button className="App-button" onClick={liff.logout}>Logout</button>
      </>
    );
  }

  return (
    <div className="App">
      <BannerTop />
      {/* <header className="App-header">{showDisplayName()}</header> */}
      <Routing />
      {/* <RegisFormAllCourses /> */}
      {/* <Success/> */}
    </div>
  );
}

export default App;