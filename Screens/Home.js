import React, { useState } from 'react'
import { View, Text, Alert, ImageBackground } from 'react-native'
import { Button } from '@rneui/themed'
import { Picker } from '@react-native-picker/picker'

const imageSRC = {uri: "https://i.pinimg.com/736x/11/6c/07/116c0701b419544cad5d13fc26138422.jpg"};

const Home = ({ navigation }) => {
    const [selectedRange, setSelectedRange] = useState();
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
        <ImageBackground source={imageSRC} style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
        }}>
            <Text style={{  color: 'white', fontSize: 90, fontFamily: 'BratsyScriptDemoReguler-9YYB0' }}>
                5 3 1!
            </Text>
            <Picker
                selectedValue={selectedRange}
                onValueChange={(itemValue, itemIndex) =>{
                    if(!itemValue == "")
                        setSelectedRange(itemValue)}
                }
                mode='dropdown'
                prompt='Select Range in Miles'
                style={{minWidth: 250}}
            >
                <Picker.Item label="Select A Range (Miles)" value="" />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="15" value="15" />
                <Picker.Item label="20" value="20" />
                <Picker.Item label="25" value="25" />
            </Picker>
            <Button
                title={"Start"}
                onPress={() => {
                    if(selectedRange){
                        navigation.navigate('Main', selectedRange)
                    }
                    else{
                        Alert.alert("Please select a range");
                    }
                    }} />
            </ImageBackground>
        </View>

    )
}
/*        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Text style={{ fontSize: 48 }}>
                5 3 1!
            </Text>
            <Picker
                selectedValue={selectedRange}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedRange(itemValue)
                }
                mode='dropdown'
                prompt='Select Range in Miles'
                >
                <Picker.Item label="5" value="5" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="15" value="15" />
                <Picker.Item label="20" value="20" />
                <Picker.Item label="25" value="25" />
            </Picker>
            <Button
                title={"Start"}
                onPress={() => navigation.navigate('Main')} />
        </View> */
export default Home;
