import { signOut } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Image, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Modal, FlatList } from 'react-native';
import { auth, app } from '../config/firebaseConfig';




export default function Login({ navigation }) {
  const db = getFirestore(app)
  const userCollectionRef = collection(db, 'venda')
  const [state, setState] = useState(false);
  const [modal, setModal] = useState(false);
  const [cliente, setCliente] = useState('');
  const [vendas, setVendas] = useState([])
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [upCliente, setUpCliente] = useState('');
  const [upValor, setUpValor] = useState('');
  const [upData, setUpData] = useState('');


  async function CriarVenda() {
    const prod = await addDoc(userCollectionRef, {
      cliente,
      data,
      valor,
    }).then(() => {
    })
    .catch()
  }

  async function deleteVenda(id) {
    const userDoc = doc(db, 'venda', id)
    await deleteDoc(userDoc).then(()=> {
    })
  }

  async function updateVenda(id) {
    const userDoc = doc(db, 'venda', id)
    await updateDoc(userDoc, {
      cliente: upCliente,
      data: upData,
      valor:upValor
    })
  }

  async function Logout() {
    await signOut(auth)
      .then(value => {
        navigation.navigate('login')
      })
      .catch(error => alert(error))
  }

  useEffect(() => {
    const unsbscribe = navigation.addListener('focus', () => {
      const getUsers = async () => {
        const data = await getDocs(userCollectionRef);
        setVendas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      }
      getUsers()
    })


  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          height: 62,
          width: '100%',
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 24,
            lineHeight: 30.17,
            color: '#A683DC',
            fontWeight: 700,
          }}>
          {' '}
          A Receber{' '}
        </Text>

        <TouchableOpacity
          onPress={() => Logout()}
          style={{
            justifyContent: 'flex-end',
            alignSelf: 'flex-end',
            marginRight: 10.25,
          }}>
          <Image
            onPress={() => navigation.navigate('login')}
            style={{
              position: 'absolute',
              width: 25,
              height: 25,
              alignSelf: 'flex-end',
              tintColor: '#A683DC',
            }}
            source={require('../../assets/logout.svg')}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: '#22142B',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#4CE573',
            width: 312,
            height: 65,
            borderRadius: 11,
            marginTop: 18,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: 'white', fontWeight: 700, fontSize: 22 }}>
            Valor a Receber
          </Text>
          <Text style={{ color: 'white', fontWeight: 700, fontSize: 22 }}>
            R$ 87,00
          </Text>
        </View>
        <View
          style={{
            position: 'relative',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignSelf: 'flex-end',
            marginTop: 9,
          }}>
          <Image
            style={{
              width: 20,
              height: 20,
              tintColor: '#A683DC',
              alignSelf: 'flex-end',
              marginRight: 7,
            }}
            source={require('../../assets/search.svg')}
          />
          <Image
            style={{
              width: 20,
              height: 20,
              tintColor: '#A683DC',
              alignSelf: 'flex-end',
              marginRight: 7,
            }}
            source={require('../../assets/options.svg')}
          />
        </View>

        <FlatList data={vendas} renderItem={({ item }) =>
          <View
            style={{
              backgroundColor: '#C4C4C4',
              width: 312,
              height: 100,
              borderRadius: 11,
              marginTop: 18,
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: '50%',
                justifyContent: 'center',
                alignSelf: 'flex-start',
                marginLeft: 11,
                marginTop: 4,
              }}>
              <Text style={{ fontWeight: 700, fontSize: 14, lineHeight: 18 }}>
                {'Valor:' + item.valor}
              </Text>
              <Text style={{ fontWeight: 400, fontSize: 11, lineHeight: 18 }}>
                {'Cliente:' + item.cliente}
              </Text>
              <Text style={{ fontWeight: 400, fontSize: 11, lineHeight: 18 }}>
                {'Data da Compra:' + item.data}
              </Text>
            </View>
            <View
              style={{
                position: 'relative',
                width: '50%',
                alignSelf: 'flex-start',
                marginTop: 4,
                flexDirection: 'column',
              }}>


              <View
                style={{
                  position: 'relative',
                  width: '50%',
                  alignSelf: 'center',
                  marginTop: 4,
                  marginRight: 4,
                  flexDirection: 'row',
                  justifyContent: 'flex-end'
                }}>
                <Text style={{ fontWeight: 700, fontSize: 14, lineHeight: 18 }}>
                  {'R$ ' + item.valor}
                </Text>

                <TouchableOpacity onPress={() => setModal(true)}>
                  <Image
                    style={{
                      width: 15,
                      height: 15,
                      tintColor: '#000000',
                      alignSelf: 'center',
                      marginRight: 7,
                      marginLeft: 7
                    }}
                    source={require('../../assets/edit.svg')}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteVenda(item.id).then(() => {
                  alert("Deletado")
                  navigation.navigate('produtos')
                  navigation.navigate('receber')
                }).catch((error) => alert(error.message))}>
                  <Image
                    style={{
                      width: 15,
                      height: 15,
                      tintColor: '#FF0000',
                      alignSelf: 'flex-end',
                      marginRight: 7,
                    }}
                    source={require('../../assets/delete.svg')}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Modal visible={modal} transparent={true}>
              <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
                <View
                  style={{
                    backgroundColor: 'gray',
                    flex: 1,
                    padding: 25,
                    margin: 275,
                    borderRadius: 11,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    flexDirection: 'column',
                  }}>
                  <TouchableOpacity onPress={() => setModal(false)}>
                    <Image
                      style={{
                        position: 'relative',
                        width: 30,
                        height: 30,
                        alignSelf: 'flex-end',
                        tintColor: 'black',
                        padding: 15,
                      }}
                      source={require('../../assets/close.svg')}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      alignSelf: 'center',
                      marginBottom: 25,
                    }}>
                    Nova Venda{' '}
                  </Text>

                  <TextInput
                    style={styles.input2}
                    placeholder="Cliente"
                    value={upCliente}
                    onChangeText={value => setUpCliente(value)} />

                  <TextInput
                    style={styles.input2}
                    placeholder="Valor"
                    value={upValor}
                    onChangeText={value => setUpValor(value)} />

                  <TextInput
                    style={styles.input2}
                    placeholder="Data"
                    value={upData}
                    onChangeText={value => setUpData(value)} />
                    
                  <TouchableOpacity onPress={() => updateVenda(item.id).then(() => {
                    setModal(false)
                    navigation.navigate('clientes')
                    navigation.navigate('receber')
                    

                  }).catch(error => {
                    console.log(error)
                    console.log(upData)
                    console.log(upCliente)
                    console.log(upValor)
                  })}

                    style={{
                      width: 200,
                      height: 30,
                      backgroundColor: '#7EE9DD',
                      borderRadius: 11,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      marginTop: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        alignSelf: 'center',
                        fontWeight: 700,
                      }}>
                      Atualizar venda
                    </Text>
                  </TouchableOpacity>


                </View>
              </View>
            </Modal>
          </View>
        } />

        <TouchableOpacity
          onPress={() => setState(true)}
          style={{
            position: 'relative',
            justifyContent: 'flex-end',
            alignSelf: 'flex-end',
            flex: 1,
            marginBottom: 24,
            marginRight: '24',
          }}>
          <View
            style={{
              position: 'relative',
              justifyContent: 'center',
              alignSelf: 'flex-end',
              width: 66,
              height: 66,
              backgroundColor: '#7EE9DD',
              borderRadius: 100,
              marginRight: 24,
            }}>
            <View>
              <Image
                style={{
                  alignSelf: 'center',
                  width: 35,
                  height: 35,
                  tintColor: 'black',
                }}
                source={require('../../assets//add.svg')}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <Modal visible={state} transparent={true}>
        <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
          <View
            style={{
              backgroundColor: 'gray',
              flex: 1,
              padding: 25,
              margin: 275,
              borderRadius: 11,
              justifyContent: 'center',
              alignSelf: 'center',
              flexDirection: 'column',
            }}>
            <TouchableOpacity onPress={() => setState(false)}>
              <Image
                style={{
                  position: 'relative',
                  width: 30,
                  height: 30,
                  alignSelf: 'flex-end',
                  tintColor: 'black',
                  padding: 15,
                }}
                source={require('../../assets/close.svg')}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 700,
                alignSelf: 'center',
                marginBottom: 25,
              }}>
              Nova Venda{' '}
            </Text>

            <TextInput
              style={styles.input2}
              placeholder="Cliente"
              value={cliente}
              onChangeText={value => setCliente(value)} />

            <TextInput
              style={styles.input2}
              placeholder="Valor"
              value={valor}
              onChangeText={value => setValor(value)} />

            <TextInput
              style={styles.input2}
              placeholder="Valor"
              value={data}
              onChangeText={value => setData(value)} />

            <TouchableOpacity
              onPress={() => CriarVenda().then(() => {
                setState(false)
                navigation.navigate('produtos')
                navigation.navigate('receber')
              })}
              style={{
                width: 200,
                height: 30,
                backgroundColor: '#7EE9DD',
                borderRadius: 11,
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  alignSelf: 'center',
                  fontWeight: 700,
                }}>
                Adicionar Venda
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input2: {
    width: 206,
    height: 30,
    borderWidth: 1,
    borderRadius: 68,
    borderColor: '#4CE573',
    backgroundColor: 'white',
    paddingLeft: 10,
    marginBottom: 12,
  },
});
