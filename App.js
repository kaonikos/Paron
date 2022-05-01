import React from 'react'
import Body from './Body'
import { Provider } from 'react-redux'
import reducer from './reducer/reducer'
import {createStore} from "redux"
import {Platform, SafeAreaView, StatusBar} from "react-native";
import { Provider as PaperProvider } from 'react-native-paper';
import styles from "./styles.css";

export const store = createStore(reducer)

const App = () => {

  return (
      <Provider store={store}>
          <PaperProvider>
              <SafeAreaView
                  className={styles.app}
                  style={{paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0}}
              >
                  <Body/>
              </SafeAreaView>
          </PaperProvider>
      </Provider>
  );
}

export default App
