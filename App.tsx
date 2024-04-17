import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Carousel } from './src/components/Carousel'

const App = () => {
  return (
    <View style={styles .container}>
     <Carousel/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:40
  }
})

export default App
