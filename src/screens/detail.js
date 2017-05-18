import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Icon } from 'react-native-elements';

import { COLORS } from '../config/colors';

export default class Detail extends Component {
  render() {
    const { navigation } = this.props;
    const { id, description, checked, category, notes } = navigation.state.params;

    return (
      <View style={styles.flexView}>
        <View style={styles.headerViewToggleIcon}>
          <Icon
            name='arrow-left'
            type='font-awesome'
            color={COLORS.addItemIconWithValue}
            size={30}
            onPress={() => navigation.goBack(null)}
          />
        </View>
        <View style={styles.center}>
          <Text>{id}</Text>
          <Text>{description}</Text>
          <Text>{checked}</Text>
          <Text>{category}</Text>
          <Text>{notes}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexView: {
    flex: 1
  },
  headerViewToggleIcon: {
    position: 'absolute',
    top: 35,
    left: 18,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
