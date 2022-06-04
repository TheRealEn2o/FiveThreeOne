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
  Alert,
  ImageBackground,
  Button
} from 'react-native';

import GetLocation from 'react-native-get-location';

import { Card } from '@rneui/themed';

import Geocoder from 'react-native-geocoding';

const API_KEY = '';
const imageSRC = { uri: "https://i.pinimg.com/originals/62/ac/64/62ac645d12a7f15aa0c6a1664e704bf8.jpg" };

const Main = ({ route, navigation }) => {
  const range = route.params * 1609.34;
  Geocoder.init(API_KEY);

  const [state, setstate] = useState({
    "loading": true,
    "locationEnabled": true,
    "latitude": 60.1098678,
    "longitude": 24.7385084,
    "latitudeDelta": 0.1,
    "longitudeDelta": 0.1,
    "noResults": false,
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
            let tmp = new Array();
            var j = 0;
            for (var i = 0; i < JsonResponse.results.length; i++) {
              if (JsonResponse.results[i].business_status == "OPERATIONAL") {
                if ("opening_hours" in JsonResponse.results[i]) {
                  if (JsonResponse.results[i].opening_hours.open_now) {
                    tmp[j] = JsonResponse.results[i];
                    j++;
                  }
                }
                else {
                  tmp[j] = JsonResponse.results[i];
                  j++;
                }
              }
            }

            setPlaces(tmp);
            if (tmp.length == 0) {

              setstate({
                ...state,
                "locationEnabled": true,
                "loading": false,
                "noResults": true,
              });
            }
            else {
              setstate({
                ...state,
                "locationEnabled": true,
                "loading": false,
              });
            }

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
      <ImageBackground source={imageSRC} style={styles.background}>

        {state.loading ? <ActivityIndicator size="large" /> :
          state.locationEnabled ?

            state.noResults ?
              <Text style={{ alignItems: 'center', justifyContent: 'center' }}>No restaurants are open in the range you provided. Try later or increase your range.</Text> :
              <View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.title}>Select 5</Text>
                  <View style={styles.done}>
                    <Button title="Done" color="#3E658E" onPress={() => {
                      if (state.chosen.length == 5) {
                        navigation.navigate('PickThree', state.chosen);
                      }
                      else if (state.chosen.length < 5) {
                        let need = 5 - state.chosen.length;
                        Alert.alert("You need to pick " + need + " more restaurants.");
                      }
                    }} />
                  </View>
                </View>
                <FlatList
                  data={places}
                  keyExtractor={(item) => item.place_id}
                  renderItem={({ item, i }) => (
                    <Card containerStyle={{ minWidth: 320 }}>
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
                            color="#FCB1A0"
                            onPress={() => {
                              let flag = false;
                              state.chosen.forEach(x => {
                                if (item.place_id == x.place_id) {
                                  flag = true
                                }
                              })
                              if (!flag && state.chosen.length < 5) {
                                setstate({
                                  ...state,
                                  "chosen": state.chosen.concat(item),
                                })
                              }
                              else if (state.chosen.length >= 5) {
                                Alert.alert("You cannot pick more than 5 restaurants.");
                              }
                              else {
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
      </ImageBackground>
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
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    fontFamily: 'PublicPixel-0W5Kv',
    fontSize: 40,
    color: 'black',
    top: 20
  },
  done: {
    top: 35,
    width: 100
  },
});

export default Main;