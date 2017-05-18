import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { Icon } from 'react-native-elements';

import { COLORS } from '../config/colors';

export default class Detail extends Component {
  render() {
    const { navigation } = this.props;

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
});
