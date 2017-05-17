import Expo from 'expo';
import React from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions
} from 'react-native';

import { Icon, List, ListItem } from 'react-native-elements'

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const LIST = [
  {
    description: 'Buy groceries on my way home',
    category: 'To-Do',
    notes: "Don't forget or wifey won't make you any dinner",
    checked: true
  },
  {
    description: 'Release v3.1',
    category: 'Work',
    notes: 'Need to codepush it. QA it before release',
    checked: true
  },
  {
    description: 'Finish React Native GraphQL Todo List App',
    category: 'Projects',
    notes: 'GraphQL is :fire:',
    checked: false
  },
]

const COLORS = {
  titleGreyInComplete: 'rgba(0, 0, 0, 1)',
  titleGreyComplete: 'rgba(117, 117, 119, 1)',
  subtitleGreyInComplete: 'rgba(117, 117, 119, 1)',
  subtitleGreyComplete: 'rgba(172, 171, 173, 1)',
  checkmarkGreen: 'rgba(131, 175, 41, 1)',
  checkmarkBlack: 'rgba(0, 0, 0, 1)',
  addItemIconWithValue: 'rgba(193, 193, 193, 1)',
  addItemIconNoValue: 'rgba(79, 94, 248, 1)'
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      checked: false,
      addItemValue: '',
      addItemValueInFocus: false
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

  renderAddItemIcon() {
    const { addItemValueInFocus } = this.state

    if (addItemValueInFocus) {
      return (
        <Icon
          name='ios-radio-button-off'
          type='ionicon'
          color={COLORS.addItemIconWithValue}
          size={30}
        />
      )
    } else {
      return (
        <Icon
          name='md-add-circle'
          type='ionicon'
          color={COLORS.addItemIconNoValue}
          size={30}
        />
      )
    }
  }

  renderSubmitItemIcon() {
    const { addItemValueInFocus, addItemValue } = this.state

    if(!addItemValueInFocus) {
      return null
    } else if (addItemValue.length === 0) {
      return (
        <Icon
          name='arrow-down-bold-hexagon-outline'
          type='material-community'
          color={COLORS.addItemIconWithValue}
          size={30}
          style={{transform: [{ rotate: '180deg'}]}}
        />
      )
    } else if (addItemValueInFocus) {
      return (
        <Icon
          name='arrow-down-bold-hexagon-outline'
          type='material-community'
          color={COLORS.addItemIconNoValue}
          size={30}
          style={{transform: [{ rotate: '180deg'}]}}
        />
      )
    }
  }

  onListItemPress() {
    const { checked } = this.state

    this.setState({
      checked: !checked
    })
  }

  handleOnSubmitEditing() {
    const { addItemValue, addItemValueInFocus } = this.state

    if(addItemValue.isEmpty) {
      return this.setState({
        addItemValue: nil,
        addItemValueInFocus: false
      })
    } else {
      return this.setState({
        addItemValue, addItemValueInFocus: false
      })
    }
  }

  render() {
    const { addItemValue, addItemValueInFocus } = this.state

    console.log(this.state)

    return (
      <View style={styles.flexView}>
        <Image style={styles.bgImage} source={require('./src/images/top_wallpaper.png')} />
        <View style={styles.headerViewToggleIcon}>
          <Icon
            name='menu'
            type='simple-line-icon'
            color='white'
            size={23}
          />
        </View>
        <View style={styles.headerViewInfoIcon}>
          <Icon
            name='md-bulb'
            type='ionicon'
            color='white'
            size={30}
          />
        </View>
        <ScrollView style={styles.flexView} contentContainerStyle={styles.flexView}>
          <View style={styles.headerView}>
            <View style={styles.headerTextView}>
              <Text style={styles.headerTextViewTitle}>My Day</Text>
              <Text style={styles.headerTextViewSubtitle}>Wednesday, May 17</Text>
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
                    titleStyle={item.checked ? styles.itemCompleteTitle : styles.itemInCompleteTitle}
                    subtitle={item.category}
                    subtitleStyle={item.checked ? styles.itemCompleteSubtitle : styles.itemInCompleteSubtitle}
                    leftIcon={item.checked ? this.itemCompleteIconStyle() : this.itemInCompleteIconStyle()}
                    onPress={this.onListItemPress.bind(this)}
                  />
                ))
              }
            </List>
          </View>
        </ScrollView>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.addNewItemContainerView}>
            <View style={styles.addItemIconContainer}>
              {this.renderAddItemIcon()}
            </View>
            <View style={styles.addItemTextInputContainer}>
              <TextInput
                style={styles.textInputStyle}
                placeholder='Add a to-do'
                onFocus={() => this.setState({addItemValueInFocus: true})}
                onSubmitEditing={this.handleOnSubmitEditing.bind(this)}
                placeholderTextColor={addItemValueInFocus ? COLORS.subtitleGreyInComplete : COLORS.addItemIconNoValue}
                onChangeText={(addItemValue) => this.setState({addItemValue})}
              />
            </View>
            <View style={styles.submitItemIconContainer}>
              {this.renderSubmitItemIcon()}
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexView: {
    flex: 1
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.36,
  },
  headerViewToggleIcon: {
    position: 'absolute',
    top: 35,
    left: 18,
  },
  headerViewInfoIcon: {
    position: 'absolute',
    top: 30,
    right: 18,
  },
  headerView: {
    flex: 5,
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
    marginTop: -14
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
  addNewItemContainerView: {
    height: 60,
    width: SCREEN_WIDTH,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.addItemIconWithValue
  },
  addItemIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15
  },
  addItemTextInputContainer: {
    flex: 10,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  textInputStyle: {
    height: 40,
    fontSize: 18,
    fontWeight: '400'
  },
  submitItemIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 15
  }
});

Expo.registerRootComponent(App);
