import React from 'react'
import { View, Text, FlatList, StyleSheet, Image, Alert } from 'react-native'

const FinalChoice = ({route, navigation}) => {
  return (
    <Text>Final Choice: {route.params.name}</Text>
  )
}

export default FinalChoice;