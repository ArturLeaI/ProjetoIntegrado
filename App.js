import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/login';
import Registrar from './src/screens/signup';
import Clientes from './src/screens/client';
import Splash from './src/screens/splash';
import Receber from './src/screens/receive';
import Produtos from './src/screens/product';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-web';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (

    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBarOptions={{
        
        activeTintColor: '#4CE573',
        inactiveTintColor: '#000000',
        showLabel: true,
        
      }}
    >
      <Tab.Screen name="receber" component={Receber} options={{}} />
      <Tab.Screen name="clientes" component={Clientes} options={{}} />
      <Tab.Screen name="produtos" component={Produtos} options={{}} />
    </Tab.Navigator>

  )
}

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="splash" component={Splash} options={{ tabBar: false }} />
          <Stack.Screen name="login" component={Login} options={{}} />
          <Stack.Screen name="registrar" component={Registrar} options={{}} />
          <Tab.Screen name="receber" component={Tabs} options={{}} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
