import React from 'react'
import { View, Text, FlatList, StyleSheet, Image, Alert, ImageBackground } from 'react-native'
import { Card } from '@rneui/themed'
import { style } from '@mui/system';

const API_KEY = 'AIzaSyCRi8kUBAKMnpQ9JdY8e2v9qnEZmAjO65I';
const imageSRC = { uri: "https://i.pinimg.com/originals/62/ac/64/62ac645d12a7f15aa0c6a1664e704bf8.jpg" };

const FinalChoice = ({ route, navigation }) => {
  //https://developers.google.com/maps/documentation/places/web-service/details
  return (
    <ImageBackground source={imageSRC} style={styles.background}>
      <Text style={styles.title}> Let's eat at...</Text>
      <Text style={styles.chosen}>{route.params.name}!</Text>

      <Card containerStyle={{ minWidth: 320, minHeight: 320, alignItems: 'center', }}>
        <View style={styles.card}>
          {'photos' in route.params ?
            <View style={styles.cardLeft}>
              <Image
                style={styles.image}
                resizeMode="cover"
                source={{
                  uri: 'https://maps.googleapis.com/maps/api/place/photo' +
                    '?maxwidth=' + 400 +

                    '&photo_reference=' + route.params.photos[0].photo_reference +
                    '&key=' + API_KEY
                }} />
            </View> : <></>}
        </View>
        <Text style={styles.contents}>{route.params.vicinity}</Text>
        <Text style={styles.contents}>Customer Ratings ({route.params.user_ratings_total}): {route.params.rating}</Text>
        <Text style={styles.contents}>Price Level: {route.params.price_level}</Text>
      </Card>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    color: 'black',
    fontSize: 21,
    fontFamily: 'PublicPixel-0W5Kv',
    textAlign: 'center',
    bottom: 140,
  },
  chosen: {
    color: 'black',
    fontSize: 37,
    fontFamily: 'PublicPixel-0W5Kv',
    textAlign: 'center',
    bottom: 100,
    left: 10,
  },
  card: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    alignItems: 'center',
    height: 150,
    width: 290,
  },
  cardLeft: {
    flex: 1,
    width: '50%',
  },
  contents: {
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: 'black',
    fontSize: 20,
  }
});

export default FinalChoice;