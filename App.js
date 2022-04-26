/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React , {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MapView from 'react-native-maps';

import GetLocation from 'react-native-get-location'

export default function App() {
  const [state, setstate] = useState({
    "latitude": 60.1098678,
    "longitude": 24.7385084,
    "latitudeDelta": 0.1,
    "longitudeDelta": 0.1
  });
  
useEffect(() => {
    GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
    .then(location => {
      setstate({...state,
      "latitude" : location.latitude,
      "longitude" : location.longitude,
      });

      const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' + 'location=' + location.latitude +
       ',' + location.longitude + '&radius=16093.4&type=restaurant&key=AIzaSyCRi8kUBAKMnpQ9JdY8e2v9qnEZmAjO65I';
        fetch(url)
            .then((response) => response.json())
            .then((JsonResponse) => {
                // console.error(JsonResponse)
                console.warn(JsonResponse.results)
            })
            .catch((error) => {
                alert('error')
            });

    })
    .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
    })
}, []);
    
  return (
    <View style={styles.body}>
      <MapView
        style={styles.map}
        region={state}
        showsUserLocation={true}
      />
    </View>
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
  map: {
    width: '100%',
    height: '100%',
  },
  body: {
    flex: 1,
    alignItems: 'center',
  },
});