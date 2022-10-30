/* eslint-disable */
import {StyleSheet, Platform} from 'react-native';

// COLORS
export const hColors = {
  text: '#888',
  primary: '#9E59AA',
  primary_dark: '#703E78',
  primary_light: '#C886D3',
};

// VARIABLES
export const hValues = {};

// STYLES
export const hStyles = StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: hColors.primary,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.15,
        shadowRadius: 2,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  capitalize: {
    textTransform: 'capitalize',
  },

  flexOne: {flex: 1},

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowDirection: {
    flexDirection: 'row',
  },
  centerHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerHorizontalBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  centerVertical: {
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  HorizontalScrollContainer: {
    paddingVertical: 12,
    paddingStart: 12,
  },
});
