const BASE_URL = "http://161.35.143.238:8000/bdittommaso";

export const getTeams = async () => {
  try {
    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) {
      throw new Error('Error fetching equipos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching equipos:', error);
    return [];
  }
};

export const getTeamById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Error fetching equipo por ID');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching equipo por ID:', error);
    return null;
  }
};

export const addTeam = async (team) => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(team),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Error agregando equipo');
    }
    console.log('Equipo agregado correctamente:', data); 
    return data;
  } catch (error) {
    console.error('Error agregando equipo:', error);
  }
};


export const deleteTeam = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error('Error eliminando equipo');
    }
    return await response.json();
  } catch (error) {
    console.error('Error eliminando equipo:', error);
  }
};

export const updateTeam = async (id, team) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(team),
    });
    if (!response.ok) {
      throw new Error('Error actualizando equipo');
    }
    return await response.json();
  } catch (error) {
    console.error('Error actualizando equipo:', error);
  }
};
