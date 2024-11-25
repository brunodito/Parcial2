import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { getTeams, deleteTeam } from '../server/api';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

interface Team {
  id: number;
  name: string;
  description: string;
  goals: number;
  points: number;
  logo: string;
}

export default function TeamList() {
  const [teams, setTeams] = useState<Team[]>([]);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      fetchTeams();
    }, [])
  );

  const fetchTeams = async () => {
    try {
      const data = await getTeams();
      console.log('Teams data:', data); 
      setTeams(data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteTeam(id);
    fetchTeams();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Equipos</Text>
      <FlatList
        data={teams}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.logo }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity 
                onPress={() => navigation.navigate('DetallesEquipos', { id: item.id })} 
                style={styles.detailsButton}>
                <Text style={styles.buttonText}>Detalles</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => handleDelete(item.id)} 
                style={styles.deleteButton}>
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
              {/* {<TouchableOpacity 
                onPress={() => navigation.navigate('ActualizarEquipo', { id: item.id })} 
                style={styles.detailsButton}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>} */}
            </View>
          </View>
        )}
      />
      <TouchableOpacity 
        onPress={() => navigation.navigate('AgregarEquipo')} 
        style={styles.addButton}>
        <Text style={styles.addButtonText}>Agregar Equipo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f4f9f9',
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20, 
    color: '#333', 
  },
  card: { 
    backgroundColor: '#fff', 
    padding: 15, 
    marginBottom: 15, 
    borderRadius: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, 
    shadowRadius: 5, 
    elevation: 3,
  },
  image: { 
    width: 100, 
    height: 100, 
    borderRadius: 10, 
    marginBottom: 10, 
  },
  name: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 10, 
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsButton: {
    backgroundColor: 'darkgrey', 
    padding: 10, 
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red', 
    padding: 10, 
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: { 
    backgroundColor: '#4CAF50', 
    padding: 15, 
    borderRadius: 5, 
    alignSelf: 'center',
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  addButtonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16,
  },
});