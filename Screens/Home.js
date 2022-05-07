import React, { useState } from 'react'
import { View, Text, Alert, ImageBackground, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Button } from '@rneui/themed'
import { Picker } from '@react-native-picker/picker'
const imageSRC = { uri: "https://i.pinimg.com/originals/62/ac/64/62ac645d12a7f15aa0c6a1664e704bf8.jpg" };
const buttonIMG = require('../images/start.png');

const Home = ({ navigation }) => {
    const [selectedRange, setSelectedRange] = useState();
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <ImageBackground source={imageSRC} style={styles.background} imageStyle={{ opacity: 0.9 }}>
                <Text style={styles.title}>
                    5 3 1!
                </Text>
                <Picker
                    selectedValue={selectedRange}
                    onValueChange={(itemValue, itemIndex) => {
                        if (!itemValue == "")
                            setSelectedRange(itemValue)
                    }
                    }
                    mode='dropdown'
                    style={styles.picker}
                >
                    <Picker.Item style={{ fontFamily: 'PublicPixel-0W5Kv', fontStyle: 'bold' }} label="Select A Range (Miles)" value="" />
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="10" value="10" />
                    <Picker.Item label="15" value="15" />
                    <Picker.Item label="20" value="20" />
                    <Picker.Item label="25" value="25" />
                </Picker>

                <TouchableOpacity style={styles.button} onPress={() => {
                    if (selectedRange) {
                        navigation.navigate('Main', selectedRange)
                    }
                    else {
                        Alert.alert("Please select a range");
                    }
                }}>
                    <Image source={buttonIMG} style={styles.start} />
                </TouchableOpacity>
            </ImageBackground>
        </View>

    )
}

const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontSize: 60,
        fontFamily: 'PublicPixel-0W5Kv',
        bottom: 150,
        left: 10
    },
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    picker: {
        minWidth: 250,
        color: 'black',
        backgroundColor: 'white',
        bottom: 90
    },
    start: {
        top: 190,
    }
});
export default Home;
