import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignupScreen from './src/screens/loginSignupScreens/SignupScreen';
import welcomeScreen from './src/screens/loginSignupScreens/welcomeScreen';
import LoginScreen from './src/screens/loginSignupScreens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserProfile from './src/screens/UserProfile';
import Productpage from './src/screens/loginSignupScreens/Productpage';
import UserCart from './src/screens/loginSignupScreens/UserCart';
import PlaceOrderComponent from './src/screens/loginSignupScreens/PlaceOrderComponent';







export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="welcomepage">
        <Stack.Screen
          name="welcomepage"
          component={welcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="userprofile"
          component={UserProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="productpage"
          component={Productpage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="cart"
          component={UserCart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="placeorder"
          component={PlaceOrderComponent}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

