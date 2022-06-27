import * as React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
// or any pure javascript modules available in npm

export default function Splash({navigation}) {
  return ( 
    <LinearGradient style={{flex:1, alignContent:'center', justifyContent:'center', }}
        colors={['#522892','#A683DC','#A683DC','#A683DC']} 
        
      >

      <TouchableOpacity onPress={() => navigation.navigate('login')} > 
      <Image  style={{ flex:1, position: 'relative', width: 145.69, height: 172,alignSelf:'center' }} source={require('../../assets/owl.png')}
      />
      </TouchableOpacity>
      

      </LinearGradient>
  );
}

