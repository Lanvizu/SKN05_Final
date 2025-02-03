import React from 'react';
import Intro from './Intro';
import Home from './Home';
import Footer from './Footer';
import NavigationLinks from './NavigationLinksBeforeLogin';

const LandingPage = () => {
    return (
    <div>
      <NavigationLinks />
      <Intro />
      <Home />
      <Footer />
    </div>
  );
};

export default LandingPage;