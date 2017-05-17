import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const IMAGES = [
  {
    source: require('./src/images/wallpaper_1.jpg')
  },
  {
    source: require('./src/images/wallpaper_2.jpg')
  },
  {
    source: require('./src/images/wallpaper_3.jpg')
  },
  {
    source: require('./src/images/wallpaper_4.jpg')
  },
]

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      index: 0
    }
  }

  renderNextImage() {
    const { index } = this.state

    this.setState({
      index: (index + 1) % 4
    })
  }

  render() {
    const { index } = this.state

    return (
      <TouchableOpacity style={styles.container} activeOpacity={1} onPress={this.renderNextImage.bind(this)}>
        <Image style={styles.bgImage} source={IMAGES[index].source} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bgImage: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    position: 'absolute',
    top: 0,
    left: 0
  }
});

Expo.registerRootComponent(App);
