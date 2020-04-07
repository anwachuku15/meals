import React, { useState } from 'react'
import { View, Text, StyleSheet, Switch, Platform } from 'react-native'

import FilterSwitch from '../components/FilterSwitch'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'

import Colors from '../constants/Colors'

const FiltersScreen = props => {

    const [isGlutenFree, setIsGlutenFree] = useState(false)
    const [isLactoseFree, setIsLactoseFree] = useState(false)
    const [isVegan, setIsVegan] = useState(false)
    const [isVegetarian, setIsVegetarian] = useState(false)
    


    return (
        <View style={styles.screen} >
            <Text style={styles.title}>Available Filters</Text>

            <FilterSwitch
                filter='Gluten-Free'
                state={isGlutenFree}
                onChange={newValue => setIsGlutenFree(newValue)}
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
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item 
                            title='Menu' 
                            iconName='ios-menu' 
                            onPress={() => {
                                navData.navigation.toggleDrawer()
                            }} 
                        />
                    </HeaderButtons>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%'
    },
})

export default FiltersScreen