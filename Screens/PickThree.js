import React from 'react'
import { View, Text, FlatList, StyleSheet, Image, Alert } from 'react-native'
import { Card, Button } from '@rneui/themed'

const API_KEY = 'AIzaSyCRi8kUBAKMnpQ9JdY8e2v9qnEZmAjO65I';

const PickThree = ({ route, navigation }) => {
  let chosen = new Array();
  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
    }}>
      <Text>
        Next Player, choose 3 out of the 5
      </Text>
      <Button title="Done" onPress={() => {
        if (chosen.length == 3) {
          navigation.navigate('PickOne', chosen);
        }
        else if (chosen.length < 3) {
          let need =  3 - chosen.length;
          Alert.alert("You need to pick " + need + " more restaurants.");
        }
      }} />

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
  }
});
export default PickThree;