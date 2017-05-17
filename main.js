import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

import { Icon, List, ListItem } from 'react-native-elements'

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const LIST = [
  {
    description: 'Buy groceries on my way home',
    category: 'Home',
    notes: "Don't forget or wifey won't make you any dinner",
  },
  {
    description: 'Finish React Native GraphQL Todo List App',
    category: 'Projects',
    notes: 'GraphQL is :fire:',
  },
  {
    description: 'Release v3.1',
    category: 'Work',
    notes: 'Need to codepush it. QA it before release',
  },
]

const COLORS = {
  titleGreyInComplete: 'rgba(0, 0, 0, 1)',
  titleGreyComplete: 'rgba(117, 117, 119, 1)',
  subtitleGreyInComplete: 'rgba(117, 117, 119, 1)',
  subtitleGreyComplete: 'rgba(172, 171, 173, 1)',
  checkmarkGreen: 'rgba(131, 175, 41, 1)',
  checkmarkBlack: 'rgba(0, 0, 0, 1)'
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      checked: false
    }
  }

  itemCompleteIconStyle() {
    return {
      name: 'ios-checkmark-circle',
      type: 'ionicon',
      size: 30,
      color: COLORS.checkmarkGreen
    }
  }

  itemInCompleteIconStyle() {
    return {
      name: 'ios-radio-button-off',
      type: 'ionicon',
      size: 30,
      color: COLORS.checkmarkBlack
    }
  }

  onListItemPress() {
    const { checked } = this.state

    this.setState({
      checked: !checked
    })
  }

  render() {
    const { checked } = this.state

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
          <List containerStyle={styles.listContainerView}>
            {
              LIST.map((item, index) => (
                <ListItem
                  key={index}
                  hideChevron
                  title={item.description}
                  titleStyle={checked ? styles.itemCompleteTitle : styles.itemInCompleteTitle}
                  subtitle={item.category}
                  subtitleStyle={checked ? styles.itemCompleteSubtitle : styles.itemInCompleteSubtitle}
                  leftIcon={checked ? this.itemCompleteIconStyle() : this.itemInCompleteIconStyle()}
                  onPress={this.onListItemPress.bind(this)}
                />
              ))
            }
          </List>
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
  listContainerView: {
    marginTop: -3
  },
  itemCompleteTitle: {
    fontSize: 17,
    color: COLORS.titleGreyComplete,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  itemInCompleteTitle: {
    fontSize: 17,
    color: COLORS.titleGreyInComplete,
  },
  itemCompleteSubtitle: {
    fontSize: 14,
    color: COLORS.subtitleGreyComplete,
    fontWeight: '400'
  },
  itemInCompleteSubtitle: {
    fontSize: 14,
    color: COLORS.subtitleGreyInComplete,
    fontWeight: '400'
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
