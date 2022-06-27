import  React, {useState} from 'react';
import {View, Image, Text, TextInput,StyleSheet,SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebaseConfig';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  async function EfetuarLogin() {
    await signInWithEmailAndPassword(auth, email, password)
    .then(value=>{
      navigation.navigate('receber')
    })
    .catch(error => alert("Login ou senha incorretos"))
  }

  return ( 
    <SafeAreaView style={{flex:1}} >
    <LinearGradient style={{flex:1, alignItems:"center",justifyContent: 'flex-star'}}
        colors={['#522892','#A683DC','#A683DC','#A683DC']} 
      >
      <Image style={{position: 'relative', width:41, height:48.41,justifyContent: 'flex-start', top:5, alignContent:'center'}}
        source={require('../../assets/owl.png')}
      />
      
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          width: "100%",
          position:'absolute',
          top:63
          
        }}
      />
      <TextInput
        style={styles.input1}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={value => setEmail(value)}
        
      /> 

      <TextInput
        style={ styles.input2}
        placeholder="Senha"
        secureTextEntry={true} 
        value={password}
        onChangeText={value => setPassword(value)}

      /> 
      <View style={{width: 184, height: 39, backgroundColor:"#4CE573",borderRadius: 68,justifyContent: 'center', alignItems:"center", marginTop: 23}} >
      <Text style={{textDecorationColor:'#22142B', fontSize: 14, fontWeight:700, }} onPress={() => EfetuarLogin()}> Iniciar secao </Text>
      </View>
      <Text onPress={() => navigation.navigate('registrar')} style={{marginTop:13}}> Registrar-se </Text>

    </LinearGradient>
    </SafeAreaView >
  );
}


const styles = StyleSheet.create({
  input1: {
    width:293,
    height: 30,
    borderWidth: 1,
    borderRadius: 68,
    borderColor:"#4CE573",
    backgroundColor: "white",
    paddingLeft: 10,
    marginTop:150
  },
input2: {
    width:293,
    height: 30,
    borderWidth: 1,
    borderRadius: 68,
    borderColor:"#4CE573",
    backgroundColor: "white",
    paddingLeft: 10,
    marginTop:23
  },

});