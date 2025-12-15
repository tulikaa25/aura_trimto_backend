
// App.js

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AddUserScreen from './src/screens/AddUserScreen';
import UserListScreen from './src/screens/UserListScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserList">
        <Stack.Screen name="UserList" component={UserListScreen} options={{ title: 'All Users' }} />
        <Stack.Screen name="AddUser" component={AddUserScreen} options={{ title: 'Add New User' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
