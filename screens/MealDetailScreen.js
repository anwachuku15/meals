import React, { useEffect, useState, useCallback } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView,
    Image, 
} from 'react-native'
import { useSelector } from 'react-redux'
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

    const [isFavorited, setIsFavorited] = useState(false)

    const addFav = useCallback(() => {
        if (!isFavorited) {
            console.log(selectedMeal.title + ' was favorited')
        }
        setIsFavorited(!isFavorited)
    }, [isFavorited])
    
    useEffect(() => {
        props.navigation.setParams({addFav: addFav})
        if (!isFavorited) {
            console.log(selectedMeal.title + ' is not favorited')
        }
    }, [addFav])
    
    /* 
    useEffect(() => { 
        props.navigation.setParams({mealTitle: selectedMeal.title})
    }, [selectedMeal])
    useEffect: pass Redux data to Navigation Options when selectedMeal changes (dependency)
    
    NOTE: useEffect will cause UI latency in this case 
          because it will display the mealTitle header after
          the component fully renders
    UI Latency Solution: pass mealTitle when user selects meal on 
                         CategoryMealsScreen and/or FavScreen (MealList.js)
    */

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
    // const selectedMeal = MEALS.find(meal => meal.id === mealId)

    return {
        // headerTitle: mealTitle,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title='Favorite' 
                    iconName='ios-heart-empty' 
                    // onPress={() => {console.log('mark as favorite')}}
                    onPress={navData.navigation.getParam('addFav')}
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