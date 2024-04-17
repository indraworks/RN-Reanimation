import { View, Text,StyleSheet,FlatList,Image,Dimensions,Animated } from 'react-native'
import React,{FC,useState,useEffect} from 'react'
import {Extrapolation, interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
 
//declare guanakan reanimated 


const SRC_WIDTH = Dimensions.get('window').width;
const CARD_LENGTH= SRC_WIDTH * 0.8;
const SPACING = SRC_WIDTH * 0.02;
const SIDECARD_LENGTH = (SRC_WIDTH*0.18)/2
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

interface itemProps {
  index:number,
 scrollX:number
}

const Item:FC<itemProps> = ({index,scrollX})=> {
  //item ini adalah component yg akan dirender di fucntion utama di Carousel
  //kita gunakan Flatlist ( bawaan function component dari react native )
  //usheShareValue adalah nilai yg akan dishare utk component amimated2 yg akan kitagubakan
  
  const size= useSharedValue(0.8)
  //utk stylecard kita buat sesuai potongannya dan kita tambahkan conditonal di stylenya 
  //biasanya kalau tambahan pakai [] atau array
  //jika index 0 

  //inputRange
  const inputRange =[
    (index-1 ) * CARD_LENGTH,
    index * CARD_LENGTH,
    (index +1) * CARD_LENGTH
  ]
  //size value 
  size.value = interpolate(
    scrollX,
    inputRange, //input range diatas masuk sini 
    [0.8,1,0.8],
    Extrapolation.CLAMP
  )
  //opacity 
  const opacity = useSharedValue(1)
  //opacityRange 

  const opacityInputRange =[
    (index-1)* CARD_LENGTH,
    index * CARD_LENGTH,
    (index +1)* CARD_LENGTH
  ]

  //opacityValue 
  opacity.value = interpolate(
    scrollX,
    opacityInputRange, //opacityRagne masuk sini 
    [0.5,1,0.5],
    Extrapolation.CLAMP
  )


  const cardStyle = useAnimatedStyle(()=> {
    return {
      transform:[{scaleY:size.value}],
      opacity:opacity.value
    }
  })



  return (
    //old
    <Animated.View  style={[styles.card,{
        marginLeft:index == 0? SIDECARD_LENGTH:SPACING,
        marginRight:index == 2?SIDECARD_LENGTH:SPACING
    }]}>
      <Image 
         source={require('./images/img1.jpg')}
         style={{width:'100%',height:'100%'}}
      />
    </Animated.View>
  )
    
  
}




export const Carousel = () => {
  //set offset Scrooln ya 
  const [scrollX,setScrollX] = useState(0)
  const DATA=[
    {
      id:'01',
      title:'First Item'
    },
    {
      id:'02',
      title:'Second Item'
    },
    {
      id:'03',
      title:'Third Item'
    },

  ]
  return (
    <Animated.View>
  
      <AnimatedFlatList 
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0.8}
        snapToInterval={CARD_LENGTH + (SPACING*1.5)}
        disableIntervalMomentum={true}
        disableScrollViewPanResponder={true}
        snapToAlignment={"center"}
        data={DATA}
        horizontal={true}
        renderItem={({item,index})=>{
          return (
            <Item index={index} scrollX={scrollX}/>
          )
        }}
        //@ts-ignore
        keyExtractor={(item)=>item.id}
        onScroll={(event)=>{
          setScrollX(event.nativeEvent.contentOffset.x)
        }}
      
      />


   
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  card:{
    width:CARD_LENGTH,
    height:150,
    overflow:"hidden",
    borderRadius:15
  }
})


/*
smua di jelaskan ada pada catatan pada buku ! 
-jadi buat dulu carousel ,trus item yg mau dirender,
stlahnya kita buat interface index dan scrox nmbernya utk tahu waktu discroll index yg mana?


*/