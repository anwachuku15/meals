import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, Switch, Platform } from 'react-native'

// import FilterSwitch from '../components/FilterSwitch'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'

import Colors from '../constants/Colors'

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.filter}</Text>
            <Switch
                trackColor={{true: Colors.primaryColor}} 
                thumbColor={Colors.secondaryColor}
                value={props.state} 
                onValueChange={props.onChange}
            />
        </View>
    )
}

const FiltersScreen = props => {
    const { navigation } = props

    const [isGlutenFree, setIsGlutenFree] = useState(false)
    const [isLactoseFree, setIsLactoseFree] = useState(false)
    const [isVegan, setIsVegan] = useState(false)
    const [isVegetarian, setIsVegetarian] = useState(false)

    // useCallback so function is cached by React
    // this component function is recreated when any of its dependencies change
    // if anything else causes this component to re-render, this function won't update
    // therefore, useEffect will not run
    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        }
        console.log(appliedFilters)
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian])

    // useEffect - execute code whenever state changes
    useEffect(() => {
        navigation.setParams({save: saveFilters})
    }, [saveFilters])
    
    return (
        <View style={styles.screen} >
            <Text style={styles.title}>Filters</Text>

            <FilterSwitch
                filter='Gluten-Free'
                state={isGlutenFree}
                onChange={newValue => {
                    setIsGlutenFree(newValue)
                }}
            />
            <FilterSwitch
                filter='Lactose-Free'
                state={isLactoseFree}
                onChange={newValue => setIsLactoseFree(newValue)}
            />
            <FilterSwitch
                filter='Vegan'
                state={isVegan}
                onChange={newValue => setIsVegan(newValue)}
            />
            <FilterSwitch
                filter='Vegetarian'
                state={isVegetarian}
                onChange={newValue => setIsVegetarian(newValue)}
            />
            
            
            
        </View>
    )
}

FiltersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Filters',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title='Menu' 
                    iconName='ios-menu' 
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }} 
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title='Save' 
                    iconName='ios-bookmark' 
                    onPress={navData.navigation.getParam('save')} 
                />
            </HeaderButtons>
    ),
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%'
    },
})

export default FiltersScreen