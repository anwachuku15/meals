import React from 'react'
import { useSelector } from 'react-redux'

import { CATEGORIES, /*MEALS*/ } from '../data/dummy-data'
import MealList from '../components/MealList'

import Colors from '../constants/Colors'

const CategoryMealsScreen = props => {
    const catId = props.navigation.getParam('categoryId')

    // Removed MEALS import
    // useSelector: access to Global State (store.js:6)
    const availableMeals = useSelector(state => state.meals.filteredMeals)
    const displayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(catId) >= 0)
    // const displayedMeals = MEALS.filter(meal => meal.categoryIds.indexOf(catId) >= 0)

    return (
        <MealList 
            listData={displayedMeals} 
            navigation={props.navigation}
            primaryColor={Colors.primaryColor}
        />
    )
}

CategoryMealsScreen.navigationOptions = (navigationData) => {
    // console.log(navigationData)
    const catId = navigationData.navigation.getParam('categoryId')
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId)

    return {
        headerTitle: selectedCategory.title
    }
}




export default CategoryMealsScreen