import React from 'react'
import { Button, View, Text, StyleSheet } from 'react-native'

import { MEALS } from '../data/dummy-data'


const MealDetailScreen = props => {
    const mealId = props.navigation.getParam('mealId')
    const displayedMeal = MEALS.find(meal => meal.id === mealId)
    return (
        <View style={styles.screen} >
            <Text>{displayedMeal.title}</Text>
            <Button
                title='Go Back to Categories'
                onPress={() => {
                    props.navigation.popToTop()
                }}
            />
        </View>
    )
}

MealDetailScreen.navigationOptions = (navigationData) => {
    const mealId = navigationData.navigation.getParam('mealId')
    const displayedMeal = MEALS.find(meal => meal.id === mealId)

    return {
        headerTitle: displayedMeal.title
    }
}



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default MealDetailScreen