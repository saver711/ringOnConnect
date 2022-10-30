/* eslint-disable */
import React, {useEffect, useState} from 'react';
import TrackPlayer from 'react-native-track-player';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

///
/////////// HELPER VARIABLES & FUNCTIONS
///
let networkUnsubscribe;
let timer;
const track1 = {
  url: require('./assets/3ien_elshams.mp3'), // Load media from the network
  title: 'Avaritia',
  artist: 'deadmau5',
  album: 'while(1<2)',
  genre: 'Progressive House, Electro House',
  date: '2014-05-20T07:00:00+00:00', // RFC 3339
  // artwork: "http://example.com/cover.png", // Load artwork from the network
  duration: 402, // Duration in seconds
};

const App = () => {
  ///
  /////////// STATES
  ///
  const [loading, loadingUpdater] = useState(true);
  const [playerInitialized, playerInitializedUpdater] = useState(false);
  const [functionalityTriggered, functionalityTriggeredUpdater] =
    useState(false);
  const [msg, msgUpdater] = useState('Click Trigger');

  const [connection, connectionUpdater] = useState({
    type: 'wifi',
    connected: true,
  });

  const [dataSourceIsConnected, dataSourceIsConnectedUpdater] = useState(true);

  console.log(connection);
  ///
  /////////// SIDE EFFECTS
  ///
  useEffect(() => {
    if (!playerInitialized) initThePlayer();
  }, []);

  useEffect(() => {
    loadingUpdater(true);
    networkUnsubscribe = NetInfo.addEventListener(state => {
      dataSourceIsConnectedUpdater(state.isConnected);
      timer = setTimeout(() => {
        return fetch('http://www.google.com')
          .then(response => {
            // this is the success callback
            // you could check if the app was previously offline
            // and set it back to online to get rid of the offline hint
            loadingUpdater(false);
            connectionUpdater({
              type: state.type,
              connected: true,
            });
          })
          .catch(err => {
            // error callback
            // use this to handle some sort of notification for the user
            // you could update a state within your root container
            // or redux to update the app with some visual hints
            loadingUpdater(false);
            connectionUpdater({
              type: state.type,
              connected: false,
            });
          });
      }, 5000);
    });

    if (connection.type === 'cellular' && functionalityTriggered) {
      msgUpdater(
        'This is cellular, We only trigger the alarm when it is WIFI connection',
      );
      functionalityTriggeredUpdater(false);
    }

    if (
      connection.type === 'wifi' &&
      connection.connected &&
      functionalityTriggered
    ) {
      msgUpdater('CONGRATULATIONS! Your internet connection is back.');
      TrackPlayer.play();
    }

    // return () => {
    //   unsubscribe();
    //   clearTimeout(timer);
    // };
  }, [connection.connected, functionalityTriggered, dataSourceIsConnected]);
  ///
  /////////// FUNCTIONS & EVENTS
  ///

  const initThePlayer = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add([track1]);
    TrackPlayer.setRepeatMode(1);
    playerInitializedUpdater(true);
  };

  const triggerFunctionality = () => {
    // IF CONNECTED
    if (connection.connected) {
      msgUpdater(
        'You are already connected to internet - Try removing the app from the background and reopen it',
      );
      return;
    }

    // OUR USE CASE // OPEN THE SUBSCRIPTION
    functionalityTriggeredUpdater(true);
    msgUpdater('Service is running...');
  };
  const disableFunctionality = () => {
    TrackPlayer.pause();
    if (networkUnsubscribe !== undefined) networkUnsubscribe();
    msgUpdater('Click Trigger');
    functionalityTriggeredUpdater(false);
  };
  ////
  return (
    <SafeAreaView>
      <StatusBar barStyle="default" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text>AHMED</Text>
        {!loading &&
          (functionalityTriggered ? (
            <View style={{marginTop: 100}}>
              <Button title="Stop" onPress={disableFunctionality} />
            </View>
          ) : (
            <Button title="Trigger" onPress={triggerFunctionality} />
          ))}
        {loading ? <Text>LOADING...</Text> : <Text>{msg}</Text>}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
