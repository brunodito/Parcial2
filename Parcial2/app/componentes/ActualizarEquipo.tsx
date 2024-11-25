import React, { useState, useEffect } from 'react';
import {TextInput, Button, StyleSheet, Text, ScrollView } from 'react-native';
import { getTeamById, updateTeam } from '../server/api';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function UpdateTeam({ route }) {
    const { id } = route.params;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [goals, setGoals] = useState('');
    const [points, setPoints] = useState('');
    const [logo, setLogo] = useState('');

    const navigation = useNavigation();

    const fetchTeam = async () => {
        try {
            const team = await getTeamById(id);
            setName(team.name);
            setDescription(team.description);
            setGoals(String(team.goals));
            setPoints(String(team.points));
            setLogo(team.logo);
        } catch (error) {
            console.error('Error al cargar los datos del equipo:', error);
        }
    };
    useEffect(() => {

        fetchTeam();
    }, []);

    const handleUpdateTeam = async () => {
        if (!name || !description || !goals || !points || !logo) {
            alert('Completa todos los campos.');
            return;
        }

        const updatedTeam = {
            name,
            description,
            goals: parseInt(goals, 10),
            points: parseInt(points, 10),
            logo,
        };

        try {
            await updateTeam(id, updatedTeam);
            navigation.goBack();
        } catch (error) {
            console.error('Error al actualizar equipo:', error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Editar Equipo</Text>
            <TextInput
                placeholder="Nombre del equipo"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Descripción"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />
            <TextInput
                placeholder="URL de la Imagen"
                value={logo}
                onChangeText={setLogo}
                style={styles.input}
            />
            <TextInput
                placeholder="Goles"
                value={goals}
                onChangeText={setGoals}
                style={styles.input}
                keyboardType="numeric"
            />
            <TextInput
                placeholder="Puntos"
                value={points}
                onChangeText={setPoints}
                style={styles.input}
                keyboardType="numeric"
            />
            <Button
                title="Actualizar Equipo"
                onPress={handleUpdateTeam}
                color="#4CAF50"
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f8ff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        backgroundColor: '#f7f7f7',
        fontSize: 16,
        color: '#333',
    },
});
