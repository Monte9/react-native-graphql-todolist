import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

import { Icon } from 'react-native-elements'

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.bgImage} source={require('./src/images/top_wallpaper.png')} />
        <View style={styles.headerView}>
          <View style={styles.headerViewToggleIcon}>
            <Icon
              name='menu'
              type='simple-line-icon'
              color='white'
              size={23}
            />
          </View>
          <View style={styles.headerViewInfoView}>
            <Icon
              name='md-bulb'
              type='ionicon'
              color='white'
              size={30}
            />
          </View>
          <View style={styles.headerTextView}>
            <Text style={styles.headerTextViewTitle}>My Day</Text>
            <Text style={styles.headerTextViewSubtitle}>Tuesday, May 16</Text>
          </View>
        </View>
        <View style={styles.listView}>
        </View>
        <View style={styles.addNewItemView}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.36,
  },
  headerView: {
    flex: 4,
  },
  headerViewToggleIcon: {
    position: 'absolute',
    top: 35,
    left: 18,
  },
  headerViewInfoView: {
    position: 'absolute',
    top: 30,
    right: 18,
  },
  headerTextView: {
    position: 'absolute',
    left: 25,
    bottom: 25,
    backgroundColor: 'transparent'
  },
  headerTextViewTitle: {
    fontSize: 35,
    color: 'white',
    fontWeight: '300',
    paddingBottom: 10
  },
  headerTextViewSubtitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: '300'
  },
  listView: {
    flex: 7,
    backgroundColor: 'rgba(247,247, 250, 1)'
  },
  addNewItemView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 60,
    width: SCREEN_WIDTH,
    backgroundColor: 'white'
  },
});

Expo.registerRootComponent(App);
