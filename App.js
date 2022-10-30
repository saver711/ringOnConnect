/* eslint-disable */

import {Home} from './screens/Home';
import SplashScreen from 'react-native-splash-screen';
import {useEffect} from 'react';

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
    SplashScreen.hide();
  }, []);

  ///
  /////////// FUNCTIONS & EVENTS
  ///

  ////
  return <Home />;
};

export default App;
