import React from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import MealItem from '../components/MealItem'

const MealList = props => {
    const favMeals = useSelector(state => state.meals.favoriteMeals)

    const renderMealItem = itemData => {
        return (
            <MealItem 
                title={itemData.item.title}
                image={itemData.item.imageUrl} 
                onSelectMeal={() => {
                    props.navigation.navigate({ 
                        routeName: 'MealDetail', 
                        params: {
                            mealId: itemData.item.id,
                            mealTitle: itemData.item.title,
                            isFavorite: favMeals.indexOf(itemData.item >= 0)
                        }
                    })
                }} 
                duration={itemData.item.duration}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}
                primaryColor={props.primaryColor}
                favColor={props.favColor}
            />
        )
    }

    return (
        <View style={styles.list} >
            <FlatList
                data={props.listData}
                keyExtractor={(item, index) => item.id}
                renderItem={renderMealItem}
                style={{width: '100%'}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    }
})

export default MealList