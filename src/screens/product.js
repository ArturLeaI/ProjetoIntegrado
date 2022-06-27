import React, { useEffect, useState } from 'react';
import { View, Image, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import { auth, app } from '../config/firebaseConfig';
import { signOut } from 'firebase/auth'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, QuerySnapshot, setDoc, updateDoc } from 'firebase/firestore'
import { FlatList } from 'react-native-web';

// or any pure javascript modules available in npm

export default function Produtos({ navigation }) {
  const db = getFirestore(app)
  const userCollectionRef = collection(db, 'produto')
  const [state1, setState1] = useState(false);
  const [produtos, setProdutos] = useState([])
  const [produto, setProduto] = useState('')
  const [valor, setValor] = useState('')
  const [upProduto, setUpProduto] = useState('')
  const [upValor, setUpValor] = useState('')
  const [modal, setModal] = useState(false);




  async function CriarProduto() {
    const prod = await addDoc(userCollectionRef, {
      produto,
      valor,
    }).then(() => {
    })
      .catch()
  }

  async function deleteProduto(id) {
    const userDoc = doc(db, 'produto', id)
    await deleteDoc(userDoc).then(()=> {
    })
  }

  async function updateProduto(id) {
    const userDoc = doc(db, 'produto', id)
    await updateDoc(userDoc, {
      produto: upProduto,
      valor: upValor,
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
        setProdutos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
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
          Produtos{' '}
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



          <TouchableOpacity >
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
          </TouchableOpacity>

        </View>

        <FlatList data={produtos} renderItem={({ item }) =>
          <View
            style={{
              backgroundColor: '#C4C4C4',
              width: 312,
              height: 80,
              borderRadius: 11,
              margin: 10,
              flexDirection: 'row',
              padding: 2
            }}>

            <View
              style={{
                width: '50%',
                justifyContent: 'center',
                alignSelf: 'flex-start',
                marginTop: 4,
                padding: 5
              }}>
              <Text style={{ fontWeight: 700, fontSize: 14, lineHeight: 18 }}>
                {item.produto}
              </Text>
              <Text style={{ fontWeight: 400, fontSize: 11, lineHeight: 18 }}>
                {'ID: ' + item.id}
              </Text>
              <Text style={{ fontWeight: 400, fontSize: 11, lineHeight: 18 }}>
                Vendas: 1
              </Text>
            </View>

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
              <TouchableOpacity onPress={() => deleteProduto(item.id).then(() => {
                alert('Deletado')
                navigation.navigate('clientes')
                navigation.navigate('produtos')
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
            <Modal visible={modal} transparent={true}>
              <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
                <View
                  style={{
                    backgroundColor: '#C4C4C4',
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
                        width: 10,
                        height: 10,
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
                    Novo Produto{' '}
                  </Text>
                  <TextInput style={styles.input2}
                    placeholder="Atualizar porduto"
                    value={upProduto}
                    onChangeText={value => setUpProduto(value)}
                  />

                  <TextInput
                    style={styles.input2}
                    placeholder="Valor"
                    value={upValor}
                    onChangeText={value => setUpValor(value)}
                  />

                  <TouchableOpacity onPress={() => updateProduto(item.id).then(() => {
                setModal(false)
                navigation.navigate('clientes')
                navigation.navigate('produtos')

                  }).catch(error => console.log(error))}

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
                      Editar Produto
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>

        } />

        <TouchableOpacity
          onPress={() => setState1(true)}
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
            <Image
              style={{
                alignSelf: 'center',
                width: 35,
                height: 35,
                tintColor: 'black',
              }}
              source={require('../../assets/add.svg')}
            />
          </View>
        </TouchableOpacity>
      </View>

      <Modal visible={state1} transparent={true}>
        <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
          <View
            style={{
              backgroundColor: '#C4C4C4',
              flex: 1,
              padding: 25,
              margin: 275,
              borderRadius: 11,
              justifyContent: 'center',
              alignSelf: 'center',
              flexDirection: 'column',
            }}>
            <TouchableOpacity onPress={() => setState1(false)}>
              <Image
                style={{
                  position: 'relative',
                  width: 10,
                  height: 10,
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
              Novo Produto{' '}
            </Text>
            <TextInput style={styles.input2}
              placeholder="Produto"
              value={produto}
              onChangeText={value => setProduto(value)}
            />

            <TextInput
              style={styles.input2}
              placeholder="Valor"
              value={valor}
              onChangeText={value => setValor(value)}
            />

            <TouchableOpacity
              onPress={() => setState1(false)}
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
                onPress={() => CriarProduto().then(() => {
                  setState1(false)
                  navigation.navigate('clientes')
                  navigation.navigate('produtos')

                })}
                style={{
                  fontSize: 15,
                  alignSelf: 'center',
                  fontWeight: 700,
                }}>
                Adicionar Produto
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
