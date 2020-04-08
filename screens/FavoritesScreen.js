import React from 'react'
import { View, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import { useSelector } from 'react-redux'
// import { MEALS } from '../data/dummy-data'
import MealList from '../components/MealList'

import DefaultText from '../components/DefaultText'
import Colors from '../constants/Colors'

const FavoritesScreen = props => {
    const favoriteMeals = useSelector(state => state.meals.favoriteMeals)
    // const favoriteMeals = MEALS.filter(meal => meal.id === 'm3' || meal.id === 'm7')

    if (favoriteMeals.length === 0 || !favoriteMeals) {
        return (
            <View style={styles.container}>
                <DefaultText style={styles.text}>You have no favorites yet</DefaultText>
            </View>
        )
    }

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default FavoritesScreen