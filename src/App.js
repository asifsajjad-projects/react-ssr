import React from 'react';
import { Route, Routes, Link, Navigate } from 'react-router-dom';

const Home = () => {
  return <div><h1>Home Page</h1></div>;
};

const NotFound = () => {
  return <div><h1>Dang! the page not found.</h1></div>;
};

const About = () => {
  return <div><h1>About Page</h1></div>;
};

const App = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
