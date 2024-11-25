import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListarEquipos from './componentes/ListarEquipos';
import DetallesEquipos from './componentes/DetallesEquipos';
import AgregarEquipo from './componentes/AgregarEquipo';
import ActualizarEquipo from './componentes/ActualizarEquipo';

const Stack = createStackNavigator();

const RootLayout = () => {
  return (
    <Stack.Navigator>
      {/* {<Stack.Screen name="ActualizarEquipo" component={ActualizarEquipo} />} */}
      <Stack.Screen name="ListarEquipos" component={ListarEquipos} />
      <Stack.Screen name="DetallesEquipos" component={DetallesEquipos} />
      <Stack.Screen name="AgregarEquipo" component={AgregarEquipo} />
    </Stack.Navigator>
  );
};

export default RootLayout;