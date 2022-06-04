import React from 'react'
import { View, Text, FlatList, StyleSheet, Image, Alert, ImageBackground, Button } from 'react-native'
import { Card} from '@rneui/themed'

const API_KEY = '';
const imageSRC = { uri: "https://i.pinimg.com/originals/62/ac/64/62ac645d12a7f15aa0c6a1664e704bf8.jpg" };


const PickThree = ({ route, navigation }) => {
  let chosen = new Array();
  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
    }}>
      <ImageBackground source={imageSRC} style={styles.background}>
        <Text style={styles.title}>
          Select 3
        </Text>
        <View style={styles.done}>
          <Button title="Done" color="#3E658E" onPress={() => {
            if (chosen.length == 3) {
              navigation.navigate('PickOne', chosen);
            }
            else if (chosen.length < 3) {
              let need = 3 - chosen.length;
              Alert.alert("You need to pick " + need + " more restaurants.");
            }
          }} />
        </View>

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
                      let flag = false;
                      chosen.forEach(x => {
                        if (item.place_id == x.place_id) {
                          flag = true
                        }
                      })
                      if (!flag && chosen.length < 3) {
                        chosen.push(item);
                      }
                      else if (chosen.length >= 3) {
                        Alert.alert("You cannot pick more than 3 restaurants.");
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
  title: {
    color: 'black',
    fontSize: 40,
    fontFamily: 'PublicPixel-0W5Kv',
    textAlign: 'center',
    top: 30
  },
  done: {
    top: 40,
    width: 100
  },
  list: {
    top: 40,
  }
});
export default PickThree;