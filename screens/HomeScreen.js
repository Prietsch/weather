// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function HomeScreen({ navigation }) {
    const [city, setCity] = useState('');

    const handleSearch = () => {
        if (!city.trim()) {
            Alert.alert('Erro', 'Digite o nome da cidade.');
            return;
        }
        navigation.navigate('Weather', { city });
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Digite uma cidade"
                value={city}
                onChangeText={setCity}
                style={styles.input}
            />
            <Button title="Buscar Clima" onPress={handleSearch} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#87CEFA'
    },
    input: {
        borderWidth: 1,
        borderColor: '#FFFFFF',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
});