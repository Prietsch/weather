// screens/WeatherScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../api';

export default function WeatherScreen({ route }) {
    const { city } = route.params;
    const [data, setData] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/weather`, {
                    params: { q: city, appid: API_KEY, units: 'metric', lang: 'pt_br' }
                });

                const forecastRes = await axios.get(`${BASE_URL}/forecast`, {
                    params: { q: city, appid: API_KEY, units: 'metric', lang: 'pt_br' }
                });

                // Agrupar previsão por dia (uma a cada 8 entradas)
                const daily = forecastRes.data.list.filter((item, i) => i % 8 === 0).slice(0, 3);

                setData(res.data);
                setForecast(daily);
                setLoading(false);
            } catch (error) {
                console.error(error);
                alert('Erro ao buscar informações do clima. Tente outra cidade.');
            }
        };

        fetchWeather();
    }, [city]);

    if (loading) {
        return <ActivityIndicator size="large" style={{ flex: 1 }} />;
    }

    const getIcon = () => {
        const desc = data.weather[0].description.toLowerCase();
        console.log("objeto abaixo:");
        console.log (desc);
        if (desc.includes('céu limpo')) return require('../assets/sun.png');
        if (desc.includes('nublado')) return require('../assets/cloudy.png');
        if (desc.includes('chuva')) return require('../assets/rain.png');
        if (desc.includes('névoa')) return require('../assets/fog.png');
        if (desc.includes('parcialmente nublado')) return require('../assets/partly-cloudy.png');
        if (desc.includes('trovoada')) return require('../assets/thunderstorm.png');
        if (desc.includes('neve')) return require('../assets/snow.png');
        if (desc.includes('algumas nuvens')) return require('../assets/partly-cloudy.png');



        return require('../assets/default.png');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{data.name}</Text>
            <Image source={getIcon()} style={styles.icon} />
            <Text style={styles.temp}>{Math.round(data.main.temp)}°C</Text>
            <Text style={styles.desc}>{data.weather[0].description}</Text>
            <Text>Min: {Math.round(data.main.temp_min)}°C | Max: {Math.round(data.main.temp_max)}°C</Text>

            <FlatList
                data={forecast}
                keyExtractor={(item) => item.dt.toString()}
                renderItem={({ item }) => (
                    <View style={styles.forecastItem}>
                        <Text>{new Date(item.dt * 1000).toLocaleDateString()}</Text>
                        <Text>{Math.round(item.main.temp)}°C</Text>
                        <Text>{item.weather[0].description}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#87CEFA',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    icon: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginVertical: 10,
        shadowColor: '#FFFFFF', // Cor do brilho (branco ou azul claro)
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8, // Intensidade do brilho
        shadowRadius: 10, // Tamanho do brilho
        elevation: 10, // Para Android (similar a shadow)
    },
    temp: {
        fontSize: 40,
        textAlign: 'center',
    },
    desc: {
        textAlign: 'center',
        marginBottom: 10,
    },
    forecastItem: {
        padding: 15,
        backgroundColor: '#fff',
        marginVertical: 5,
        borderRadius: 8,
        alignItems: 'center',
    },
});