import Expo from 'expo';
import React from 'react';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import { StackNavigator } from 'react-navigation';

import Home from './src/screens/home';
import Detail from './src/screens/detail';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://api.graph.cool/simple/v1/cj2sggzz385xb01604yo6g0r2'
  })
});

const HomeScreen = ({ navigation }) => (
  <Home banner="Home Screen" navigation={navigation} />
);

HomeScreen.navigationOptions = {
  title: 'Todo List',
  header: null
};

const ItemDetail = ({ navigation }) => (
  <Detail banner="Item Detail" navigation={navigation} />
);

ItemDetail.navigationOptions = {
  title: 'Edit Todo Item',
  header: null
};

const MainRoot = StackNavigator({
  Home: {
    path: 'home',
    screen: HomeScreen
  },
  ItemDetail: {
    path: 'item/:id',
    screen: ItemDetail
  }
});

const MainRootWrapper = () => (
  <ApolloProvider client={client}>
    <MainRoot />
  </ApolloProvider>
);

Expo.registerRootComponent(MainRootWrapper);
