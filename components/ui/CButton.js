/* eslint-disable */
/////////// IMPORTS
///
import {Pressable, StyleSheet, Text, View} from 'react-native';
import { hColors, hStyles } from '../../helpers/hAssets';
import Ionicons from 'react-native-vector-icons/Ionicons';
///
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const CButton = ({iconName,title, onPress, primary, color }) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// IF CASES
  ///

  ///
  /////////// FUNCTIONS & EVENTS
  ///

  ///
  /////////// RETURN & RETURN CONDITIONALLY
  ///
  return (
    <>
      <Pressable
        style={({pressed}) => [
          styles.button,
          {
            backgroundColor: primary ? hColors.primary : 'transparent',
            borderWidth: title ? 0 : 2,
            borderColor: title ? 'transparent' : '#bbb',
            opacity: pressed? 0.8 : 1
          },
        ]}
        onPress={onPress}>
        <View style={hStyles.centerHorizontal}>
          {iconName ? (
            <Ionicons color={color} size={30} name={iconName} />
          ) : null}
          {title ? (
            <Text style={[styles.buttonText, {color: color}]}>{title}</Text>
          ) : null}
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 200,
    // overflow: 'hidden'
  },
  buttonText:{
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 8
  }
});
