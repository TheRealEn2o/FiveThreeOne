import React from 'react'
import { View, Text, FlatList, StyleSheet, Image, Alert } from 'react-native'
import { Card, Button } from '@rneui/themed'

const API_KEY = 'AIzaSyCRi8kUBAKMnpQ9JdY8e2v9qnEZmAjO65I';

const PickOne = ({ route, navigation }) => {

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
    }}>
      <Text>
        Lastly, choose 1 out of the 3
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
export default PickOne;