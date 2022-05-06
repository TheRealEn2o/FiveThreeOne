import React from 'react'
import { View, Text, FlatList, StyleSheet, Image, Alert } from 'react-native'
import { Card, Button } from '@rneui/themed'

const API_KEY = 'AIzaSyCRi8kUBAKMnpQ9JdY8e2v9qnEZmAjO65I';

const Results = ({ route, navigation }) => {
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
                                        
                                        if(!(item in state.chosen)){
                                        setstate({
                                            ...state,
                                            "chosen": state.chosen.concat(item),
                                        })}
                                        else{
                                            Alert.alert("This restaurant is already added");
                                        }
                                    }}
                                />
                            </View>
                        </View>
                    </Card>
                )}
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
export default Results;