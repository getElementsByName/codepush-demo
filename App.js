/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import CodePush from 'react-native-code-push'

type Props = {};

class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>CodePush Demo 1.0 v10</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const codePushOptions = { 
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME, 
  installMode: CodePush.InstallMode.ON_NEXT_RESUME 
}
const AppWithCodePush = CodePush(codePushOptions)(App)
export default AppWithCodePush