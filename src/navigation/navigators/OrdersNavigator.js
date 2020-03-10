import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'

import i18n from '../../i18n'
import screens, { defaultNavigationOptions, headerLeft } from '..'
// import HeaderRight from '../restaurant/components/HeaderRight'
import SettingsNavigator from '../restaurant/SettingsNavigator'

const MainNavigator = createStackNavigator({
  OrdersHome: {
    screen: screens.RestaurantAdminDashboard,
    navigationOptions: ({ navigation }) => {
      const restaurant = navigation.getParam('restaurant', { name: '' })

      return {
        title: i18n.t('ORDERS'),
        // headerRight: () => <HeaderRight navigation={ navigation } />,
        headerLeft: headerLeft(navigation),
      }
    },
  },
  RestaurantOrder: {
    screen: screens.RestaurantOrder,
    navigationOptions: ({ navigation }) => ({
      title: i18n.t('RESTAURANT_ORDER_TITLE', { order: navigation.state.params.order }),
    }),
  },
}, {
  initialRouteKey: 'OrdersHome',
  initialRouteName: 'OrdersHome',
  defaultNavigationOptions,
})

export default createStackNavigator({
  Main: {
    screen: MainNavigator,
    navigationOptions: ({ navigation }) => ({
      headerShown: false,
    }),
  },
  RestaurantOrderRefuse: {
    screen: screens.RestaurantOrderRefuse,
    navigationOptions: ({ navigation }) => ({
      title: 'Refuse order', // TODO Translate
    }),
  },
  RestaurantOrderDelay: {
    screen: screens.RestaurantOrderDelay,
    navigationOptions: ({ navigation }) => ({
      title: i18n.t('RESTAURANT_ORDER_DELAY_MODAL_TITLE'),
    }),
  },
  RestaurantOrderCancel: {
    screen: screens.RestaurantOrderCancel,
    navigationOptions: ({ navigation }) => ({
      title: i18n.t('RESTAURANT_ORDER_CANCEL_MODAL_TITLE'),
    }),
  },
  RestaurantDate: {
    screen: screens.RestaurantDate,
    navigationOptions: ({ navigation }) => ({
      title: i18n.t('PICK_DATE'),
    }),
  },
  RestaurantList: {
    screen: screens.RestaurantList,
    navigationOptions: ({ navigation }) => ({
      title: i18n.t('RESTAURANTS'),
    }),
  },
  RestaurantSettings: {
    screen: SettingsNavigator,
    navigationOptions: ({ navigation }) => ({
      title: i18n.t('SETTINGS'),
    }),
  },
}, {
  mode: 'modal',
  defaultNavigationOptions,
})