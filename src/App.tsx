import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import 'Styles/globals.css';
import 'Assets/Fonts/Dosis-Regular.ttf';
import 'Assets/Fonts/Dosis-Bold.ttf';
import AllCalls from 'Pages/AllCalls';
import Archived from 'Pages/Archived';
import Inbox from 'Pages/Inbox';
import NotFound from 'Pages/NotFound';

import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import { PageBody } from './Styles/common.styles';

function App() {
  const location = useLocation();

  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (location !== displayLocation) setTransitionStage('fadeOut');
  }, [location, displayLocation]);

  return (
    <>
      <Header />
      <PageBody
        className={`${transitionStage}`}
        onAnimationEnd={() => {
          if (transitionStage === 'fadeOut') {
            setTransitionStage('fadeIn');
            setDisplayLocation(location);
          }
        }}
      >
        <Routes location={displayLocation}>
          <Route path="/" index element={<Inbox />} />
          <Route path="archived" element={<Archived />} />
          <Route path="all-calls" element={<AllCalls />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageBody>
      <Footer />
    </>
  );
}

export default App;
