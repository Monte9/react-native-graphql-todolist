import { Dimensions } from 'react-native';

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;

export const LIST = [
  {
    description: 'Buy groceries on my way home',
    category: 'To-Do',
    notes: 'Don\'t forget or wifey won\'t make you any dinner',
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
];
