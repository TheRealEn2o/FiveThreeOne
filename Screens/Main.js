/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import GetLocation from 'react-native-get-location';

import { Card, Button } from '@rneui/themed';

import Geocoder from 'react-native-geocoding';

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
          ',' + location.longitude + '&radius=' + range + '&type=restaurant&key=AIzaSyCRi8kUBAKMnpQ9JdY8e2v9qnEZmAjO65I';

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
                <Text>Select 5 {console.log("Places Length:" + places.length)}</Text>
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
                  <Card style={styles.card}>
                    <Card.Title>{item.name}</Card.Title>
                    <Text style={{ alignItems: 'center' }}>{item.vicinity}</Text>
                    <Card.Divider />
                    <Button
                      title={'Choose'}
                      onPress={() => setstate({
                        ...state,
                        "chosen": state.chosen.concat(item),
                      })}
                    />
                  </Card>
                )}
                style={styles.list}
              />
            </View> :
            <View>
              <Text>Please Enable Location Services {console.log(state.locationEnabled)}</Text>
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
      alignItems: 'center',
    }
  });

  export default Main;