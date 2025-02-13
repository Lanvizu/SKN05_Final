import React from 'react';
import NavigationLinks from '../NavigationLinks';
import Intro from './Intro';
import Home from './Home';
import Footer from './Footer';

const MainPage = () => {
  return (
    <div>
      <NavigationLinks />
      <Intro />
      <Home />
      <Footer />
    </div>
  );
};

export default MainPage;