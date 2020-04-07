import React, { useState } from 'react';

import { Text, View } from 'react-native';

import { Provider } from 'react-redux'
import store from './redux/store';

// import * as Font from 'expo-font'
import { useFonts } from '@use-expo/font'
import { AppLoading } from 'expo'
import { enableScreens } from 'react-native-screens'

import AppNavigator from './navigation/AppNavigator'


enableScreens()

// const fetchFonts = () => {
//   Font.loadAsync({
//     'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
//     'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
//   })
// }

export default function App() {
  // const [fontLoaded, setFontLoaded] = useState(false)
  let [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })

  if(!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
  
}


