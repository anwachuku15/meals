import React from 'react'
import { Platform } from 'react-native'
import { createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'

import { Ionicons } from '@expo/vector-icons'


import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import FiltersScreen from '../screens/FiltersScreen'

import Colors from '../constants/Colors'

// DEFAULT STACK NAV OPTIONS
const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    headerBackTitleVisible: false
}

// MEALS STACK
const MealsNavigator = createStackNavigator({
    Categories: {
            screen: CategoriesScreen,
            navigationOptions: {
                headerTitle: 'Meal Categories',
            }
        },
    CategoryMeals: {
        screen: CategoryMealsScreen,
    },
    MealDetail: {
        screen: MealDetailScreen,
    },
    }, {
        defaultNavigationOptions: defaultStackNavOptions
    }
)

// FAVORITES STACK
const FavNavigator = createStackNavigator({
    Favorites: {
        screen: FavoritesScreen,
        navigationOptions: {
            headerTitle: 'Favorite Meals'
        }
    },
    MealDetail: {
        screen: MealDetailScreen
    }
}, {
    defaultNavigationOptions: defaultStackNavOptions
})

// TAB CONFIG - Includes Meals Stack & Favorites Stack
const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons 
                        name='ios-restaurant' 
                        size={25} 
                        color={tabInfo.tintColor}
                    />
                )
            },
            tabBarColor: Colors.primaryColor
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            // tabBarLabel: 'Favorites!',
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons 
                        name='ios-heart-empty' 
                        size={25} 
                        color={tabInfo.tintColor}
                    />
                )
            },
            tabBarColor: Colors.secondaryColor
        }
    }

}

// BOTTOM TAB NAVIGATION
const MealsFavTabNavigator = 
    Platform.OS === 'android' 
        ? createMaterialBottomTabNavigator(
            tabScreenConfig, {
            activeColor: 'white',
            barStyle: {
                backgroundColor: Colors.primaryColor
            },
            shifting: true,
        }) 
        : createBottomTabNavigator(
            tabScreenConfig, {
            tabBarOptions: {
                activeTintColor: Colors.primaryColor,
            }
        })

// FILTERS STACK (just to use navigationOptions ])
const FiltersNavigator = createStackNavigator({
    Filters: {
        screen: FiltersScreen,
    }
}, {
    defaultNavigationOptions: defaultStackNavOptions
})

// MAIN DRAWER NAVIGATION
const MainNavigator = createDrawerNavigator({
    MealsFav: {
        screen: MealsFavTabNavigator,
        navigationOptions: {
            drawerLabel: 'Meals'
        }
    },
    Filters: {
        screen: FiltersNavigator
    },
}, {
    // drawerBackgroundColor: 'rgba(255,64,129,0.4)',
    contentOptions: {
        activeTintColor: 'magenta',
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
})


export default createAppContainer(MainNavigator) 