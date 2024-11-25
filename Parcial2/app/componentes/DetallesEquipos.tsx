import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { getTeamById } from '../server/api';

export default function TeamsDetails({ route }) {
  const { id } = route.params;
  const [team, setTeam] = useState(null);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    const data = await getTeamById(id);
    setTeam(data);
  };

  if (!team) return null;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: team.logo }} style={styles.image} />
      <Text style={styles.title}>{team.name}</Text>
      <Text style={styles.description}>{team.description}</Text>
      <Text style={styles.moons}>Puntos: {team.points}</Text>
      <Text style={styles.moonList}>Goles: {team.goals}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f4f9f9',
  },
  image: { 
    width: '100%', 
    height: 250, 
    borderRadius: 10, 
    marginBottom: 20,
    borderWidth: 1, 
    borderColor: '#ddd',
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 10, 
    textAlign: 'center', 
  },
  description: { 
    fontSize: 18, 
    color: '#555', 
    marginBottom: 15, 
    lineHeight: 24,
  },
  moons: { 
    fontSize: 18, 
    color: '#555', 
    marginBottom: 10, 
  },
  moonList: { 
    fontSize: 16, 
    color: '#555', 
    marginBottom: 20, 
    fontStyle: 'italic',
  },
});
