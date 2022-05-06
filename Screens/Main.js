/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Alert
} from 'react-native';

import GetLocation from 'react-native-get-location';

import { Card, Button } from '@rneui/themed';

import Geocoder from 'react-native-geocoding';

const API_KEY = 'AIzaSyCRi8kUBAKMnpQ9JdY8e2v9qnEZmAjO65I';

const Main = ({ route, navigation }) => {
  const range = route.params * 1609.34;
  Geocoder.init("AIzaSyCRi8kUBAKMnpQ9JdY8e2v9qnEZmAjO65I");

  const [state, setstate] = useState({
    "loading": true,
    "locationEnabled": true,
    "latitude": 60.1098678,
    "longitude": 24.7385084,
    "latitudeDelta": 0.1,
    "longitudeDelta": 0.1,
    "chosen": []
  });

  const [places, setPlaces] = useState([]);


  const getPlaces = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        setstate({
          ...state,
          "latitude": location.latitude,
          "longitude": location.longitude,
        });

        const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' + 'location=' + location.latitude +
          ',' + location.longitude + '&radius=' + range + '&type=restaurant&key=' + API_KEY;

        fetch(url)
          .then((response) => response.json())
          .then((JsonResponse) => {
            let tmp = new Array(JsonResponse.results.length);

            for (var i = 0; i < JsonResponse.results.length; i++) {
              tmp[i] = JsonResponse.results[i];
            }

            setPlaces(tmp);
            setstate({
              ...state,
              "locationEnabled": true,
              "loading": false,
            });

          }
          )
          .catch(error => {
            console.log(error);
            setstate({
              ...state,
              "locationEnabled": false,
              "loading": false,
            });
          });
      })
  }
  useEffect(() => {
    getPlaces();
  }, []);

  return (
    <View style={styles.body}>

      {state.loading ? <ActivityIndicator size="large" /> :
        state.locationEnabled ?
          <View>
            <View style={{ alignItems: 'center' }}>
              <Text>Select 5</Text>
              <Button title="Done" onPress={() => {
                if (state.chosen.length == 5) {
                  navigation.navigate('Results', state.chosen);
                }
              }} />
            </View>
            <FlatList
              data={places}
              keyExtractor={(item) => item.place_id}
              renderItem={({ item, i }) => (
                <Card containerStyle={{minWidth: 320}}>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Divider />

                  <View style={styles.card}>
                    {'photos' in item ?
                      <View style={styles.cardLeft}>
                        <Image
                          style={styles.image}
                          resizeMode="cover"
                          source={{
                            uri: 'https://maps.googleapis.com/maps/api/place/photo' +
                              '?maxwidth=' + 400 +

                              '&photo_reference=' + item.photos[0].photo_reference +
                              '&key=' + API_KEY
                          }} />
                      </View> : <></>}

                    <View style={styles.cardRight}>
                      <Text>{item.vicinity}</Text>

                      <Button
                        title={'Choose'}
                        onPress={() => {
                          let flag = false;
                          state.chosen.forEach( x => {
                            if(item.place_id == x.place_id){
                              flag = true}
                          })
                          if(!flag && state.chosen.length < 5){
                            setstate({
                                ...state,
                                "chosen": state.chosen.concat(item),
                            })}
                            else if (state.chosen.length >= 5) {
                              Alert.alert("You cannot pick more than 5 restaurants.");
                            }
                            else{
                                Alert.alert("This restaurant is already added");
                            }
                        }}
                      />
                    </View>
                  </View>
                </Card>

              )}
              style={styles.list}
            />
          </View> :
          <View>
            <Text>Please Enable Location Services </Text>
            <Button title="Enable" onPress={() => getPlaces()} />
          </View>
      }
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
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    width: '95%',
    margin: 30,
    padding: 5,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    height: 100,
    width: 120,
  },
  cardLeft: {
    flex: 1,
    width: '50%',
  },
  cardRight: {
    flex: 1,
    width: '50%',
  }
});

export default Main;