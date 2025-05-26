// globalStyles.js
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f8ff'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    temp: {
        fontSize: 40,
        textAlign: 'center'
    },
    description: {
        textAlign: 'center',
        marginBottom: 20
    },
    icon: {
        width: 100,
        height: 100,
        alignSelf: 'center'
    },
    forecastCard: {
        padding: 15,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 10
    }
});