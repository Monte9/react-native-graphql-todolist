import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Switch,
  TextInput,
} from 'react-native';

import { Badge, Icon, Text } from 'react-native-elements';

export const ListItem = props => {
  const {
    onPress,
    title,
    leftIcon,
    rightIcon,
    leftIconOnPress,
    leftIconOnLongPress,
    leftIconUnderlayColor,
    leftIconContainerStyle,
    avatarStyle,
    underlayColor,
    subtitle,
    subtitleStyle,
    containerStyle,
    wrapperStyle,
    titleNumberOfLines,
    titleStyle,
    titleContainerStyle,
    hideChevron,
    chevronColor,
    roundAvatar,
    component,
    fontFamily,
    rightTitle,
    rightTitleContainerStyle,
    rightTitleStyle,
    rightTitleNumberOfLines,
    subtitleContainerStyle,
    subtitleNumberOfLines,
    badge,
    label,
    onLongPress,
    switchButton,
    onSwitch,
    switchDisabled,
    switchOnTintColor,
    switchThumbTintColor,
    switchTintColor,
    switched,
    textInput,
    textInputAutoCapitalize,
    textInputAutoCorrect,
    textInputAutoFocus,
    textInputEditable,
    textInputKeyboardType,
    textInputMaxLength,
    textInputMultiline,
    textInputOnChangeText,
    textInputOnFocus,
    textInputOnBlur,
    textInputSelectTextOnFocus,
    textInputReturnKeyType,
    textInputValue,
    textInputSecure,
    textInputStyle,
    textInputContainerStyle,
    ...attributes
  } = props;

  let {avatar} = props;

  let Component = onPress || onLongPress ? TouchableHighlight : View;
  let LeftIconWrapper = leftIconOnPress || leftIconOnLongPress ? TouchableHighlight : View;
  if (component) {
    Component = component;
  }
  if (typeof avatar === 'string') {
    avatar = {uri: avatar};
  }
  return (
    <Component
      onLongPress={onLongPress}
      onPress={onPress}
      underlayColor={underlayColor}
      style={[styles.container, containerStyle && containerStyle]}
      {...attributes}
    >
      <View style={[styles.wrapper, wrapperStyle && wrapperStyle]}>
        {React.isValidElement(leftIcon)
          ? leftIcon
          : leftIcon &&
          leftIcon.name && (
            <LeftIconWrapper
              onLongPress={leftIconOnLongPress}
              onPress={leftIconOnPress}
              underlayColor={leftIconUnderlayColor}
              style={[styles.iconStyle, leftIconContainerStyle && leftIconContainerStyle]}>
              <View>
                <Icon
                  type={leftIcon.type}
                  iconStyle={[styles.icon, leftIcon.style && leftIcon.style]}
                  name={leftIcon.name}
                  color={leftIcon.color || 'grey'}
                  size={leftIcon.size || 24}
                />
              </View>
            </LeftIconWrapper>)}
        {avatar &&
        <Image
          style={[
            styles.avatar,
            roundAvatar && {borderRadius: 17},
            avatarStyle && avatarStyle,
          ]}
          source={avatar}
        />}
        <View style={styles.titleSubtitleContainer}>
          <View style={titleContainerStyle}>
            {title && (typeof title === 'string' || typeof title === 'number')
              ? <Text
                numberOfLines={titleNumberOfLines}
                style={[
                  styles.title,
                  !leftIcon && {marginLeft: 10},
                  titleStyle && titleStyle,
                  fontFamily && {fontFamily},
                ]}
              >
                {title}
              </Text>
              : <View>
                {title}
              </View>}
          </View>
          <View style={subtitleContainerStyle}>
            {subtitle &&
            (typeof subtitle === 'string' || typeof subtitle === 'number')
              ? <Text
                numberOfLines={subtitleNumberOfLines}
                style={[
                  styles.subtitle,
                  !leftIcon && {marginLeft: 10},
                  subtitleStyle && subtitleStyle,
                  fontFamily && {fontFamily},
                ]}
              >
                {subtitle}
              </Text>
              : <View>
                {subtitle}
              </View>}
          </View>
        </View>
        {rightTitle &&
        rightTitle !== '' &&
        !textInput &&
        <View style={[styles.rightTitleContainer, rightTitleContainerStyle]}>
          <Text
            numberOfLines={rightTitleNumberOfLines}
            style={[styles.rightTitleStyle, rightTitleStyle]}>
            {rightTitle}
          </Text>
        </View>}
        {textInput &&
        <View style={[styles.rightTitleContainer, textInputContainerStyle]}>
          <TextInput
            style={[styles.textInputStyle, textInputStyle]}
            defaultValue={rightTitle}
            value={textInputValue}
            autoCapitalize={textInputAutoCapitalize}
            autoCorrect={textInputAutoCorrect}
            autoFocus={textInputAutoFocus}
            editable={textInputEditable}
            keyboardType={textInputKeyboardType}
            maxLength={textInputMaxLength}
            multiline={textInputMultiline}
            onChangeText={textInputOnChangeText}
            onFocus={textInputOnFocus}
            onBlur={textInputOnBlur}
            secureTextEntry={textInputSecure}
            selectTextOnFocus={textInputSelectTextOnFocus}
            returnKeyType={textInputReturnKeyType}
          />
        </View>}
        {!hideChevron &&
        (React.isValidElement(rightIcon)
          ? rightIcon
          : <View style={styles.chevronContainer}>
            <Icon
              type={rightIcon.type}
              iconStyle={rightIcon.style}
              size={28}
              name={rightIcon.name || 'chevron-right'}
              color={rightIcon.color || chevronColor}
            />
          </View>)}
        {switchButton &&
        hideChevron &&
        <View style={styles.switchContainer}>
          <Switch
            onValueChange={onSwitch}
            disabled={switchDisabled}
            onTintColor={switchOnTintColor}
            thumbTintColor={switchThumbTintColor}
            tintColor={switchTintColor}
            value={switched}
          />
        </View>}
        {badge && !rightTitle && <Badge {...badge} />}
        {label && label}
      </View>
    </Component>
  );
};

ListItem.defaultProps = {
  underlayColor: 'white',
  leftIconUnderlayColor: 'white',
  chevronColor: 'grey',
  rightIcon: {name: 'chevron-right'},
  hideChevron: false,
  roundAvatar: false,
  switchButton: false,
  textInputEditable: true,
  titleNumberOfLines: 1,
  subtitleNumberOfLines: 1,
  rightTitleNumberOfLines: 1
};

ListItem.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  avatar: PropTypes.any,
  icon: PropTypes.any,
  onPress: PropTypes.func,
  rightIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
  underlayColor: PropTypes.string,
  subtitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  subtitleStyle: PropTypes.any,
  subtitleNumberOfLines: PropTypes.number,
  containerStyle: PropTypes.any,
  wrapperStyle: PropTypes.any,
  titleStyle: PropTypes.any,
  titleContainerStyle: PropTypes.any,
  titleNumberOfLines: PropTypes.number,
  hideChevron: PropTypes.bool,
  chevronColor: PropTypes.string,
  roundAvatar: PropTypes.bool,
  badge: PropTypes.any,
  switchButton: PropTypes.bool,
  onSwitch: PropTypes.func,
  switchDisabled: PropTypes.bool,
  switchOnTintColor: PropTypes.string,
  switchThumbTintColor: PropTypes.string,
  switchTintColor: PropTypes.string,
  switched: PropTypes.bool,
  textInput: PropTypes.bool,
  textInputAutoCapitalize: PropTypes.bool,
  textInputAutoCorrect: PropTypes.bool,
  textInputAutoFocus: PropTypes.bool,
  textInputEditable: PropTypes.bool,
  textInputKeyboardType: PropTypes.oneOf([
    'default',
    'email-address',
    'numeric',
    'phone-pad',
    'ascii-capable',
    'numbers-and-punctuation',
    'url',
    'number-pad',
    'name-phone-pad',
    'decimal-pad',
    'twitter',
    'web-search',
  ]),
  textInputMaxLength: PropTypes.number,
  textInputMultiline: PropTypes.bool,
  textInputOnChangeText: PropTypes.func,
  textInputOnFocus: PropTypes.func,
  textInputOnBlur: PropTypes.func,
  textInputSelectTextOnFocus: PropTypes.bool,
  textInputReturnKeyType: PropTypes.string,
  textInputValue: PropTypes.string,
  textInputSecure: PropTypes.bool,
  textInputStyle: PropTypes.any,
  textInputContainerStyle: PropTypes.any,
  component: PropTypes.any,
  fontFamily: PropTypes.string,
  rightTitle: PropTypes.string,
  rightTitleContainerStyle: View.propTypes.style,
  rightTitleStyle: Text.propTypes.style,
  rightTitleNumberOfLines: PropTypes.number,
  subtitleContainerStyle: View.propTypes.style,
  label: PropTypes.any,
  onLongPress: PropTypes.func,
  leftIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
  leftIconOnPress: PropTypes.func,
  leftIconOnLongPress: PropTypes.func,
  leftIconUnderlayColor: PropTypes.string,
  leftIconContainerStyle: View.propTypes.style,
  avatarStyle: View.propTypes.style,
};

const styles = StyleSheet.create({
  avatar: {
    width: 34,
    height: 34,
  },
  container: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
  },
  wrapper: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  iconStyle: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    color: 'grey'
  },
  subtitle: {
    color: 'grey',
    fontSize: 12,
    marginTop: 1,
  },
  titleSubtitleContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  chevronContainer: {
    flex: 0.15,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  switchContainer: {
    flex: 0.15,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 5,
  },
  rightTitleContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rightTitleStyle: {
    marginRight: 5,
    color: 'grey'
  },
  textInputStyle: {
    height: 20,
    textAlign: 'right',
  },
});
