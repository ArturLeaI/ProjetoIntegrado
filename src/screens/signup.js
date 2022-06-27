import  React,{ useState }  from 'react';
import {View, Image, Text, TextInput,StyleSheet,SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, app } from '../config/firebaseConfig';
import login from './login'
import { addDoc, collection, getFirestore } from 'firebase/firestore';
// or any pure javascript modules available in npm

export default function Registrar({navigation}) {
  const db = getFirestore(app)
  const userCollectionRef = collection(db, 'user')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');



  async function criarUsuario() {
    const prod = await addDoc(userCollectionRef, {
      nome,
      email,
    }).then(() => {
    })
      .catch()
  }

  async function createUser() {
    await createUserWithEmailAndPassword(auth, email, password)
    .then(value=>{
      navigation.navigate('login')
      criarUsuario()
    })
    .catch(error => alert(error))
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
          width: '100%',
          position:'absolute',
          top:63
          
        }}
      />
      <TextInput
        style={styles.input1}
        placeholder="Nome"
        value={nome}
        onChangeText={value => setNome(value)}
      /> 

      <TextInput
        style={ styles.input2}
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


      <View style={{width: 184, height: 39, backgroundColor:"#4CE573",borderRadius: 68,justifyContent: 'center', alignItems:"center", marginTop: 23}}>
      <Text onPress={() => {
        createUser()
      }} 
        style={{textDecorationColor:'#22142B', fontSize: 14, fontWeight:700, }}> Registrar  </Text>
      </View>

      <Text onPress={() => navigation.goBack()} style={{marginTop:13}}> Voltar </Text>

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


