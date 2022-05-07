import React from 'react'
import { View, Text, FlatList, StyleSheet, Image, Alert, ImageBackground } from 'react-native'
import { Card, Button } from '@rneui/themed'

const API_KEY = 'AIzaSyCRi8kUBAKMnpQ9JdY8e2v9qnEZmAjO65I';
const imageSRC = { uri: "https://i.pinimg.com/originals/62/ac/64/62ac645d12a7f15aa0c6a1664e704bf8.jpg" };


const PickOne = ({ route, navigation }) => {
  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
    }}>
       <ImageBackground source={imageSRC} style={styles.background}>
      <Text style={styles.title}>
        Lastly, Select 1
      </Text>

      <FlatList
        data={route.params}
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
                    navigation.navigate('FinalChoice', item);
                  }}
                />
              </View>
            </View>
          </Card>

        )}
        style={styles.list}
      />
      </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
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
  list: {
    top: 40
  },
  title: {
    color: 'black',
    fontSize: 40,
    fontFamily: 'PublicPixel-0W5Kv',
    textAlign: 'center',
    top: 30
  },
  done: {
    top: 40
  },
});
export default PickOne;