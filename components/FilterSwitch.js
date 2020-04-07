import React from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'


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

const styles = StyleSheet.create({
    filterContainer: {
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%'
    },
})

export default FilterSwitch