import React, { Component } from 'react';
import {
  Text,
  View,
  Animated,
  ScrollView,
  Dimensions,
  StyleSheet
} from 'react-native';

import { Icon } from 'react-native-elements';

/**
 * BlurView temporarily removed until semver stuff is set up properly
 */
//var BlurView /* = require('react-native-blur').BlurView */;

// var ScrollableMixin = require('react-native-scrollable-mixin');
const SCREEN = Dimensions.get('window');
const ScrollViewPropTypes = ScrollView.propTypes;

export default class ParallaxScrollView extends Component {
  // mixins: [ScrollableMixin],

  constructor() {
    super();

    this.state = {
      scrollY: new Animated.Value(0)
    };
  }

  /**
  * IMPORTANT: You must return the scroll responder of the underlying
  * scrollable component from getScrollResponder() when using ScrollableMixin.
  */
  getScrollResponder() {
    return this._scrollView.getScrollResponder();
  }

  setNativeProps(props) {
    this._scrollView.setNativeProps(props);
  }

  renderBackground() {
    var { windowHeight, backgroundSource, blur } = this.props;
    var { scrollY } = this.state;
    if (!windowHeight || !backgroundSource) {
      return null;
    }

    return (
      <Animated.Image
        style={[
          styles.background,
          {
            height: windowHeight,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-windowHeight, 0, windowHeight],
                  outputRange: [windowHeight / 2, 0, -windowHeight / 3]
                })
              },
              {
                scale: scrollY.interpolate({
                  inputRange: [-windowHeight, 0, windowHeight],
                  outputRange: [2, 1, 1]
                })
              }
            ]
          }
        ]}
        source={backgroundSource}
      >
        {/*
          !!blur && (BlurView || (BlurView = require('react-native-blur').BlurView)) &&
          <BlurView blurType={blur} style={styles.blur} />
        */}
      </Animated.Image>
    );
  }

  renderHeaderView() {
    var { windowHeight, backgroundSource } = this.props;
    var { scrollY } = this.state;
    if (!windowHeight || !backgroundSource) {
      return null;
    }

    const newWindowHeight = windowHeight - 65;

    return (
      <Animated.View
        style={{
          position: 'relative',
          height: newWindowHeight,
          opacity: scrollY.interpolate({
            inputRange: [-windowHeight, 0, windowHeight / 2],
            outputRange: [1, 1, 0]
          })
        }}
      >
        {this.props.headerView}
      </Animated.View>
    );
  }

  renderHeaderTitle() {
    var { windowHeight, backgroundSource } = this.props;
    var { scrollY } = this.state;
    if (!windowHeight || !backgroundSource) {
      return null;
    }

    const newWindowHeight = windowHeight - 65;

    return (
      <Animated.View
        style={{
          opacity: scrollY.interpolate({
            inputRange: [-windowHeight, 0, windowHeight / 1.3],
            outputRange: [0, 0, 1]
          })
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: '600', color: 'white' }}>
          My Day
        </Text>
      </Animated.View>
    );
  }

  navBarStyle() {
    var { windowHeight, backgroundSource } = this.props;
    var { scrollY } = this.state;
    if (!windowHeight || !backgroundSource) {
      return null;
    }

    var backgroundColor = scrollY.interpolate({
      inputRange: [-windowHeight, 0, windowHeight / 1.3],
      outputRange: ['transparent', 'transparent', 'rgba(0, 0, 0, 1.0)']
    });

    return backgroundColor;
  }

  rendernavBar() {
    return (
      <Animated.View
        style={{
          height: 65,
          width: SCREEN.width,
          flexDirection: 'row',
          backgroundColor: this.navBarStyle()
        }}
      >
        <View
          style={{
            flex: 1,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Icon name="menu" type="simple-line-icon" color="white" size={23} />
        </View>
        <View
          style={{
            flex: 5,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center'
          }}
        >
          {this.renderHeaderTitle()}
        </View>
        <View style={{ flex: 1, marginTop: 22 }}>
          <Icon name="md-bulb" type="ionicon" color="white" size={30} />
        </View>
      </Animated.View>
    );
  }

  render() {
    var { style, ...props } = this.props;
    return (
      <View style={[styles.container, style]}>
        {this.renderBackground()}
        {this.rendernavBar()}
        <ScrollView
          ref={component => {
            this._scrollView = component;
          }}
          {...props}
          style={styles.scrollView}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
          ])}
          scrollEventThrottle={16}
        >
          {this.renderHeaderView()}
          <View style={[styles.content, props.scrollableViewStyle]}>
            {this.props.children}
          </View>
        </ScrollView>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'transparent'
  },
  scrollView: {
    backgroundColor: 'transparent'
  },
  background: {
    position: 'absolute',
    backgroundColor: '#2e2f31',
    width: SCREEN.width,
    resizeMode: 'cover'
  },
  blur: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'transparent'
  },
  content: {
    shadowColor: '#222',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column'
  }
});

ParallaxScrollView.defaultProps = {
  windowHeight: 300,
  contentInset: {
    top: SCREEN.scale
  }
};

ParallaxScrollView.propTypes = {
  ...ScrollViewPropTypes,
  windowHeight: React.PropTypes.number,
  backgroundSource: React.PropTypes.oneOfType([
    React.PropTypes.shape({
      uri: React.PropTypes.string
    }),
    // Opaque type returned by require('./image.jpg')
    React.PropTypes.number
  ]),
  header: React.PropTypes.node,
  blur: React.PropTypes.string,
  contentInset: React.PropTypes.object
};
