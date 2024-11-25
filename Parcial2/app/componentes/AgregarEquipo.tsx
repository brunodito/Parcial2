import React, { useState } from 'react'; 
import { View, TextInput, Button, StyleSheet, Text, ScrollView } from 'react-native';
import { addTeam } from '../server/api';
import { useNavigation } from '@react-navigation/native';

export default function AddTeam() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [goals, setGoals] = useState('');
  const [points, setPoints] = useState('');
  const [logo, setLogo] = useState('');
  const navigation = useNavigation();

  const handleAddTeam = async () => {
    if (!name || !description || !goals || !points || !logo) {
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    const newTeam = {
      name,
      description,
      goals,
      points,
      logo,
    };
  
    try {
      await addTeam(newTeam);
      navigation.goBack();
    } catch (error) {
      console.error('Error al agregar equipo:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Agregar Nuevo Equipo</Text>
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
      />
      <Button 
        title="Agregar Equipo" 
        onPress={handleAddTeam} 
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
  
  button: { 
    backgroundColor: '#4CAF50', 
    padding: 10, 
    borderRadius: 5, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 10,
  },
});