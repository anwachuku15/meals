import React from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    TouchableNativeFeedback, 
    Platform,
    ImageBackground 
} from 'react-native'

import Colors from '../constants/Colors'

const MealItem = props => {
    let TouchableCmp = TouchableOpacity
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback
    }
    
    return (
        <View style={styles.mealItem}>
            <TouchableCmp onPress={props.onSelectMeal}>
                <View>
                    <View style={{...styles.mealRow, ...styles.mealHeader}}>
                        <ImageBackground source={{uri: props.image}} style={styles.bgImage}>   
                            <View style={styles.titleContainer}>
                                <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
                            </View>
                        </ImageBackground>
                    </View>

                    <View style={{...styles.mealRow, ...styles.mealDetail}}>
                        <Text style={styles.detailText}>{props.duration}m</Text>
                        <Text style={styles.detailText}>{props.complexity.toUpperCase()}</Text>
                        <Text style={styles.detailText}>{props.affordability.toUpperCase()}</Text>
                    </View>
                </View>   
            </TouchableCmp>
        </View>
    )
}

const styles = StyleSheet.create({
    mealItem: {
        height: 200,
        width: '100%',
        backgroundColor: Colors.primaryColor,
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10
    },
    mealRow: {
        flexDirection: 'row'
    },
    mealHeader: {
        height: '85%'
    },
    mealDetail: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '15%'
    },
    detailText: {
        color: 'white'
    },
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    titleContainer: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingVertical: 5,
        paddingHorizontal: 12,
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        color: 'white',
        textAlign: 'center'
    }
})

export default MealItem