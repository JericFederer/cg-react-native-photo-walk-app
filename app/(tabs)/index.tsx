import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import AllPlaces from '@/screens/AllPlaces';
import AddPlace from '@/screens/AddPlace';
import IconButton from '@/components/UI/IconButton';
import { Colors } from '@/constants/colors';
import Map from '@/screens/Map';
import { init } from '@/util/database';
import PlaceDetails from '@/screens/PlaceDetails';

// * Keep the splash screen visible while app checks login status
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  // * useEffect to initialize the database upon starting the app
  useEffect(() => {
    init().then(() => {
      setDbInitialized(true);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  // * Removes loading screen when datebase has been initialized
  if (dbInitialized) {
    SplashScreen.hideAsync();    
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer independent={ true }>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={ AllPlaces }
            options={({ navigation }) => ({
              title: 'Your Favorite Places',
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={ 24 }
                  color={ tintColor }
                  onPress={ () => navigation.navigate('AddPlace') }
                />
              ),
            })}
          />

          <Stack.Screen
            name="AddPlace"
            component={ AddPlace }
            options={{
              title: 'Add a new Place',
            }}
          />

          <Stack.Screen
            name="PlaceDetails"
            component={ PlaceDetails }
            options={{
              title: 'Loading Place...',
            }}
          />
          
          <Stack.Screen name="Map" component={ Map } />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}