import React from 'react'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import { useSelector } from 'react-redux'
// import { MEALS } from '../data/dummy-data'
import MealList from '../components/MealList'


import Colors from '../constants/Colors'

const FavoritesScreen = props => {
    const favoriteMeals = useSelector(state => state.meals.favoriteMeals)
    // const favoriteMeals = MEALS.filter(meal => meal.id === 'm3' || meal.id === 'm7')

    return (
        <MealList 
            listData={favoriteMeals} 
            navigation={props.navigation} 
            favColor={Colors.secondaryColor}
        />
    )
}
 
FavoritesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Favorite Meals',
        headerLeft: () =>  (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title='Menu' 
                    iconName='ios-menu' 
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }} 
                />
            </HeaderButtons>
        )
    }             
}




export default FavoritesScreen