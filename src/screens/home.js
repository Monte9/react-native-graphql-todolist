import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native';

import { graphql } from 'react-apollo';
import { Icon, List } from 'react-native-elements';
import gql from 'graphql-tag';

import { ListItem } from '../../rne-beta/ListItem';
import { COLORS } from '../config/colors';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../config/constants';

class Home extends Component {
  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      allItems: React.PropTypes.array
    }).isRequired,
    updateItem: React.PropTypes.func.isRequired
  };

  constructor() {
    super();

    this.state = {
      addItemValue: '',
      addItemValueInFocus: false
    };
  }

  itemCompleteIconStyle() {
    return {
      name: 'ios-checkmark-circle',
      type: 'ionicon',
      size: 30,
      color: COLORS.checkmarkGreen
    };
  }

  itemInCompleteIconStyle() {
    return {
      name: 'ios-radio-button-off',
      type: 'ionicon',
      size: 30,
      color: COLORS.checkmarkBlack
    };
  }

  renderAddItemIcon() {
    const { addItemValueInFocus } = this.state;

    if (addItemValueInFocus) {
      return (
        <Icon
          name="ios-radio-button-off"
          type="ionicon"
          color={COLORS.addItemIconWithValue}
          size={30}
        />
      );
    } else {
      return (
        <Icon
          name="md-add-circle"
          type="ionicon"
          color={COLORS.addItemIconNoValue}
          size={30}
        />
      );
    }
  }

  renderSubmitItemIcon() {
    const { addItemValueInFocus, addItemValue } = this.state;

    if (!addItemValueInFocus) {
      return null;
    } else if (addItemValue.length === 0) {
      return (
        <Icon
          name="arrow-down-bold-hexagon-outline"
          type="material-community"
          color={COLORS.addItemIconWithValue}
          size={30}
          style={{ transform: [{ rotate: '180deg' }] }}
        />
      );
    } else if (addItemValueInFocus) {
      return (
        <Icon
          name="arrow-down-bold-hexagon-outline"
          type="material-community"
          color={COLORS.addItemIconNoValue}
          size={30}
          style={{ transform: [{ rotate: '180deg' }] }}
        />
      );
    }
  }

  onListItemPress(item) {
    const { checked } = this.state;
    const { navigation } = this.props;

    this.setState({
      checked: !checked
    });

    navigation.navigate('ItemDetail', item);
  }

  handleOnSubmitEditing() {
    const { addItemValue } = this.state;

    if (addItemValue.isEmpty) {
      return this.setState({
        addItemValue: null,
        addItemValueInFocus: false
      });
    } else {
      return this.setState({
        addItemValue,
        addItemValueInFocus: false
      });
    }
  }

  handleUpdate = async item => {
    await this.props.updateItem({
      variables: {
        id: item.id,
        description: item.description,
        checked: !item.checked,
        category: item.category,
        notes: item.notes
      }
    });
  };

  renderTodoListContent() {
    if (this.props.data.error) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ fontSize: 18, textAlign: 'center' }}>
            An unexpected error occurred. Please try again!
          </Text>
        </View>
      );
    }

    if (this.props.data.loading || !this.props.data.allItems) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ fontSize: 18 }}>Loading...</Text>
        </View>
      );
    }

    return (
      <List containerStyle={styles.listContainerView}>
        {this.props.data.allItems.map((item, index) => (
          <ListItem
            key={item.id}
            hideChevron
            title={item.description}
            titleStyle={
              item.checked
                ? styles.itemCompleteTitle
                : styles.itemInCompleteTitle
            }
            subtitle={item.category}
            subtitleStyle={
              item.checked
                ? styles.itemCompleteSubtitle
                : styles.itemInCompleteSubtitle
            }
            leftIcon={
              item.checked
                ? this.itemCompleteIconStyle()
                : this.itemInCompleteIconStyle()
            }
            leftIconOnPress={this.handleUpdate.bind(this, item)}
            onPress={this.onListItemPress.bind(this, item)}
          />
        ))}
      </List>
    );
  }

  render() {
    const { addItemValueInFocus } = this.state;

    return (
      <View style={styles.flexView}>
        <Image
          style={styles.bgImage}
          source={require('../images/top_wallpaper.png')}
        />
        <View style={styles.headerViewToggleIcon}>
          <Icon name="menu" type="simple-line-icon" color="white" size={23} />
        </View>
        <View style={styles.headerViewInfoIcon}>
          <Icon name="md-bulb" type="ionicon" color="white" size={30} />
        </View>
        <ScrollView
          style={styles.flexView}
          contentContainerStyle={styles.flexView}
        >
          <View style={styles.headerView}>
            <View style={styles.headerTextView}>
              <Text style={styles.headerTextViewTitle}>My Day</Text>
              <Text style={styles.headerTextViewSubtitle}>
                Wednesday, May 17
              </Text>
            </View>
          </View>
          <View style={styles.listView}>
            {this.renderTodoListContent()}
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
                placeholder="Add a to-do"
                onFocus={() => this.setState({ addItemValueInFocus: true })}
                onSubmitEditing={this.handleOnSubmitEditing.bind(this)}
                placeholderTextColor={
                  addItemValueInFocus
                    ? COLORS.subtitleGreyInComplete
                    : COLORS.addItemIconNoValue
                }
                onChangeText={addItemValue => this.setState({ addItemValue })}
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
    height: SCREEN_HEIGHT * 0.38
  },
  headerViewToggleIcon: {
    position: 'absolute',
    top: 35,
    left: 18
  },
  headerViewInfoIcon: {
    position: 'absolute',
    top: 30,
    right: 18
  },
  headerView: {
    flex: 5
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
    marginTop: 0
  },
  itemCompleteTitle: {
    fontSize: 17,
    color: COLORS.titleGreyComplete,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  itemInCompleteTitle: {
    fontSize: 17,
    color: COLORS.titleGreyInComplete
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

const ItemsQuery = gql`query items {
  allItems {
		id
    description
    checked
    category
    notes
  }
}`;

const updateItem = gql`
  mutation updateItem($id: ID!, $description: String!, $checked: Boolean!, $category: String, $notes: String) {
    updateItem(id: $id, description: $description, checked: $checked, category: $category, notes: $notes) {
      id
      description
      checked
      category
      notes
    }
  }
`;

const HomeWithData = graphql(ItemsQuery)(
  graphql(updateItem, { name: 'updateItem' })(Home)
);

export default HomeWithData;
