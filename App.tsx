import 'react-native-gesture-handler';
import React from 'react'
import { StatusBar, LogBox } from 'react-native'
import { useFonts } from 'expo-font'

import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Rajdhani_500Medium, Rajdhani_700Bold  } from '@expo-google-fonts/rajdhani';
import AppLoading from 'expo-app-loading'; 

import { AuthProvider } from './scr/hooks/auth'

import { Routes } from './scr/routes';
import { Background } from './scr/components/Background'

LogBox.ignoreLogs(['You are not currently signed in to Expo on your development machine.']);

export default function App() {
  const [fontsLoader] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold
  })

  if(!fontsLoader){
    return <AppLoading/>
  }
  
  return (
    <Background>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Background>
  )
}