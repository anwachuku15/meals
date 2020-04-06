import React from 'react'
import { Button, View, Text, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import { MEALS } from '../data/dummy-data'
import HeaderButton from '../components/HeaderButton'
import { Header } from 'react-native/Libraries/NewAppScreen'

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
        headerTitle: displayedMeal.title,
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton} >
                        <Item 
                            title='Favorite' 
                            iconName='ios-star-outline' 
                            onPress={() => {
                                console.log('mark as favorite')
                            }} 
                        />
                     </HeaderButtons>
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