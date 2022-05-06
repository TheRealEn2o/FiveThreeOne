import React, { useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { Button } from '@rneui/themed'
import { Picker } from '@react-native-picker/picker'

const Home = ({ navigation }) => {
    const [selectedRange, setSelectedRange] = useState();
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Text style={{ fontSize: 48 }}>
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
        </View>

    )
}
export default Home;
