import React from 'react'

import MealList from '../components/MealList'
import { MEALS } from '../data/dummy-data'

import Colors from '../constants/Colors'

const FavoritesScreen = props => {
    const favoriteMeals = MEALS.filter(meal => meal.id === 'm3' || meal.id === 'm7')

    return (
        <MealList 
            listData={favoriteMeals} 
            navigation={props.navigation} 
            favColor={Colors.secondaryColor}
        />
    )
}
 
FavoritesScreen.navigationOptions = {
    headerTitle: 'My Favorites'
}




export default FavoritesScreen