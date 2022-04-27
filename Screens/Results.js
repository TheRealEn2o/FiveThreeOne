import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { Card } from '@rneui/themed'

const Results = ({ route, navigation }) => {
    console.log(route.params);
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
          }}>
              <Text>
                  Results:
              </Text>
            <FlatList
                data={route.params}
                keyExtractor={(item) => item.place_id}
                renderItem={({ item }) => (
                    <Card>
                    <Card.Title>{item.name}</Card.Title>
                    <Text>{item.vicinity}</Text>
                  </Card>
                )}
            />
        </View>
    )
}
/*{places.map((place) =>
          (
              <Text>{place.name}</Text>   
          ))} */
export default Results;