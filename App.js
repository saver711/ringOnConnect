/* eslint-disable */

import {Home} from './screens/Home';
import SplashScreen from 'react-native-splash-screen';
import {useEffect} from 'react';
import mobileAds from 'react-native-google-mobile-ads';

///
/////////// HELPER VARIABLES & FUNCTIONS
///
SplashScreen.show();
///
const App = () => {
  ///
  /////////// VARS
  ///
  ///
  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///

  useEffect(() => {
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        // console.log('Initialization complete!');
      });
    SplashScreen.hide();
  }, []);

  ///
  /////////// FUNCTIONS & EVENTS
  ///

  ////
  return <Home />;
};

export default App;
