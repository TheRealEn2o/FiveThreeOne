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
 } from 'react-native';
 
 import GetLocation from 'react-native-get-location';
 
 import { ListItem, Avatar, Card, Button } from '@rneui/themed';
 
 import Geocoder from 'react-native-geocoding';
 
 const Main = ({navigation}) => {
   Geocoder.init("AIzaSyCRi8kUBAKMnpQ9JdY8e2v9qnEZmAjO65I");
 
   const [state, setstate] = useState({
     "latitude": 60.1098678,
     "longitude": 24.7385084,
     "latitudeDelta": 0.1,
     "longitudeDelta": 0.1
   });
 
   const [places, setPlaces] = useState([]);
   const [chosen, setChosen] = useState([]);
 
   useEffect(() => {
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
           ',' + location.longitude + '&radius=20000.4&type=restaurant&key=AIzaSyCRi8kUBAKMnpQ9JdY8e2v9qnEZmAjO65I';
         fetch(url)
           .then((response) => response.json())
           .then((JsonResponse) => {
             // console.error(JsonResponse)
             let tmp = new Array(JsonResponse.results.length);
             let add = new Array();
 
             for (var i = 0; i < JsonResponse.results.length; i++) {
               tmp[i] = JsonResponse.results[i];
             }
 
             setPlaces(tmp);
           })
           .catch((error) => {
             console.warn(error);
           });
 
       })
       .catch(error => {
         const { code, message } = error;
         console.warn(code, message);
       })
   }, []);
 
   return (
     <View style={styles.body}>
       <Text style={styles.sectionTitle}>5 3 1!</Text>
       <Button title="Done" onPress={() => navigation.navigate('Results', chosen)}/>
       {places.length == 0 ?
        <Text>Loading...</Text> :
        <FlatList  
           data={places}
           keyExtractor={(item) => item.place_id}
           renderItem={({item, i}) => (
             <Card style={styles.card}>
               <Card.Title>{item.name}</Card.Title>
               <Text>{item.vicinity}</Text>
               <Button
               title={'Choose'}
               onPress={() => setChosen(chosen.concat(item))}
               />
             </Card>
           )}
           style={styles.list}
         />}
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