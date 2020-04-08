import React, { useEffect, useState, useCallback } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView,
    Image, 
} from 'react-native'
// REDUX
import { useSelector, useDispatch } from 'react-redux'
import { toggleFavorite } from '../redux/actions/meals'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'

// import { MEALS } from '../data/dummy-data'
import HeaderButton from '../components/HeaderButton'
import DefaultText from '../components/DefaultText'


const ListItem = props => {
    return (
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    )
}

const MealDetailScreen = props => {
    const availableMeals = useSelector(state => state.meals.meals)
    const mealId = props.navigation.getParam('mealId')
    const selectedMeal = availableMeals.find(meal => meal.id === mealId)
    const [isFavorite, setIsFavorite] = useState(false)

    const dispatch = useDispatch()
    
    const toggleFavHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId))
        setIsFavorite(!isFavorite)
    }, [dispatch, mealId, isFavorite])
    
    
    useEffect(() => {
        props.navigation.setParams({
            toggleFav: toggleFavHandler,
            isFavorite: isFavorite
        })
    }, [toggleFavHandler])

    return (
        <ScrollView>
            <Image source={{uri: selectedMeal.imageUrl}} style={styles.image} />

            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>

            
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(ingredient => (
                <ListItem key={ingredient}>{ingredient}</ListItem>
            ))}
            
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(step => (
                <ListItem key={step}>{step}</ListItem>
            ))}

            
        </ScrollView>
    )
}

MealDetailScreen.navigationOptions = (navData) => {
    const mealId = navData.navigation.getParam('mealId')
    const mealTitle = navData.navigation.getParam('mealTitle')
    const isFavorite = navData.navigation.getParam('isFavorite')
    const toggleFavorite = navData.navigation.getParam('toggleFav')

    return {
        // headerTitle: mealTitle,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title='Favorite' 
                    iconName={!isFavorite ? 'ios-heart-empty' : 'ios-heart' }
                    onPress={toggleFavorite}
                />
            </HeaderButtons>
        )
    }
}



const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center'
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    },
})

export default MealDetailScreen