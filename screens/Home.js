/* eslint-disable */
/////////// IMPORTS
///
import {
  TestIds,
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  AdEventType,
} from 'react-native-google-mobile-ads';
import React, {useEffect, useState} from 'react';
import TrackPlayer from 'react-native-track-player';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import LinearGradient from 'react-native-linear-gradient';
import {hColors, hStyles} from '../helpers/hAssets';

import {CButton} from '../components/ui/CButton';

///
/////////// HELPER VARIABLES & FUNCTIONS
///
// ads
const bannerAdUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-5441143845943034~1265183543';

const interstitialAdUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-5441143845943034~1265183543';
const interstitialAd = InterstitialAd.createForAdRequest(interstitialAdUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});
// ./ads

let networkUnsubscribe;
let textToShow = 'Click on START to start our service';
const track1 = {
  url: require('../assets/appRingtone.mp3'), // Load media from the network
  // title: 'Avaritia',
  // artist: 'deadmau5',
  // album: 'while(1<2)',
  // genre: 'Progressive House, Electro House',
  // date: '2014-05-20T07:00:00+00:00',
  // duration: 36, // Duration in seconds
};

const startImg = require('../assets/start.png');
let imageToShow = startImg;
const alreadyConnectedImg = require('../assets/alreadyConnected.png');
const manReadingImg = require('../assets/manReading.png');
const manSleepingImg = require('../assets/manSleeping.png');
const womanRelaxingImg = require('../assets/womanRelaxing.png');
const connectionIsBackImg = require('../assets/connectionIsBack.png');

const serviceIsRunningImgs = [manReadingImg, manSleepingImg, womanRelaxingImg];
const imgIndex = Math.floor(Math.random() * serviceIsRunningImgs.length);
const serviceIsRunningImg = serviceIsRunningImgs[imgIndex];
///
export const Home = () => {
  /////////// VARIABLES
  ///
  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES
  ///
  const [bannerAdFailedToLoad, bannerAdFailedToLoadUpdater] = useState(false);
  const [interstitialAdLoaded, interstitialAdLoadedUpdater] = useState(false);
  const [playerInitialized, playerInitializedUpdater] = useState(false);
  /* APP STATES
  - notRunning
  - alreadyConnected
  - serviceIsRunning
  - connectionIsBack
  */
  const [appState, appStateUpdater] = useState({
    triggered: false,
    state: 'notRunning',
  });

  ///
  /////////// SIDE EFFECTS
  ///
  useEffect(() => {
    // interstitialAd
    const unsubscribe = interstitialAd.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitialAdLoadedUpdater(true);
      },
    );
    // Start loading the interstitialAd straight away
    interstitialAd.load();

    // init player if not
    if (!playerInitialized) initThePlayer();

    return unsubscribe;
  }, []);

  ///

  /////////// IF CASES
  ///
  //imageToShow && textToShow
  if (appState.state === 'alreadyConnected') {
    imageToShow = alreadyConnectedImg;
    textToShow = 'You are already connected to WIFI';
  } else if (appState.state === 'connectionIsBack') {
    imageToShow = connectionIsBackImg;
    textToShow =
      'Hey 😉, Your connection is back. You can stop our service now';
  } else if (appState.state === 'serviceIsRunning') {
    imageToShow = serviceIsRunningImg;
    textToShow =
      'Take a break now and we will let you know when your WIFI connection is back';
  } else {
    imageToShow = startImg;
    textToShow = 'Click on START to start our service';
  }
  ///
  /////////// FUNCTIONS & EVENTS
  ///
  const initThePlayer = async () => {
    playerInitializedUpdater(true);
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add([track1]);
      TrackPlayer.setRepeatMode(1);
    } catch (error) {}
  };

  const triggerFunctionality = () => {
    showAd();
    NetInfo.refresh().then(state => {
      if (state.type === 'wifi' && state.isConnected) {
        appStateUpdater(prev => ({...prev, state: 'alreadyConnected'}));
        return;
      }

      // OUR USE CASE // OPEN THE SUBSCRIPTION
      appStateUpdater({
        triggered: true,
        state: 'serviceIsRunning',
      });
      networkUnsubscribe = NetInfo.addEventListener(state => {

        if (state.type === 'wifi' && state.isConnected) {
          appStateUpdater(prev => ({...prev, state: 'connectionIsBack'}));
          TrackPlayer.play();
        }
      });
    });
  };

  const resetFunctionality = () => {
    showAd();
    TrackPlayer.pause();
    if (networkUnsubscribe !== undefined) networkUnsubscribe();
    appStateUpdater({
      triggered: false,
      state: 'notRunning',
    });
  };

  const showAd = () => {
    if (interstitialAdLoaded) interstitialAd.show();
    interstitialAdLoadedUpdater(false);
    interstitialAd.load();
  };
  ///
  /////////// RETURN & RETURN CONDITIONALLY
  ///

  ///
  return (
    <>
      <StatusBar barStyle="default" animated={true} />
      <SafeAreaView style={{flex: 1}}>

        <LinearGradient
          // start={{x: 0, y: 0}}
          // end={{x: 1, y: 0}}
          colors={['#d268cc', '#F4F4F4', '#fff']}
          style={[styles.overallView, hStyles.flexOne]}>
          <ScrollView
            contentContainerStyle={[hStyles.flexOne, {paddingHorizontal: 12}]}
            // contentInsetAdjustmentBehavior="automatic"
          >
            <View
              style={[
                hStyles.centerVertical,
                styles.imageContainer,
                hStyles.flexOne,
              ]}>
              <Image source={imageToShow} style={styles.image} />
            </View>
            <Text style={[hStyles.centerText, styles.text]}>{textToShow}</Text>
          </ScrollView>

          <View
            style={[
              styles.buttons,
              // hStyles.centerHorizontalBetween
            ]}>
            <CButton
              primary
              onPress={
                appState.triggered ? resetFunctionality : triggerFunctionality
              }
              iconName={appState.triggered ? 'stop' : 'play'}
              title={appState.triggered ? 'STOP' : 'START'}
              color="#fff"
            />

            {/* <CButton
              onPress={() => {}}
              iconName="menu"
              color={hColors.primary}
            /> */}
          </View>
        </LinearGradient>
        {!bannerAdFailedToLoad && (
          <BannerAd
            onAdFailedToLoad={() => bannerAdFailedToLoadUpdater(true)}
            unitId={bannerAdUnitId}
            size={BannerAdSize.FULL_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  overallView: {
    alignItems: 'center',
  },
  imageContainer: {
    maxHeight: 400,
  },
  image: {
    maxHeight: 400,
    minWidth: '85%',
    maxWidth: '85%',
    resizeMode: 'contain',
    marginTop: 70,
  },
  buttons: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 50,
    width: '85%',
  },
  text: {
    fontSize: 25,
    marginTop: 90,
    color: hColors.text,
  },
});
