import { StyleSheet, Text, Pressable } from 'react-native';
import { useFonts } from 'expo-font';
import { Tabs, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authBase } from '../routes';


export default function TabLayout() {
  const router = useRouter();
  const logout = async() => {
        const token = await AsyncStorage.getItem("comicManagementToken")
        fetch(authBase + "/logout", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({token: token})
        })
        .then(async()=>{
            await AsyncStorage.removeItem("comicManagementToken");
            router.replace("/login/auth")
        })
        .catch(err=>console.log("something went wrong", err))
    }

  (async()=> {
    const loggedIn = await AsyncStorage.getItem("comicManagementToken")
    
    if (loggedIn === null){
      console.log("loggedIn: ", loggedIn);      
      router.replace("/login/auth")
    }
  })()

  const [ fontsLoaded ] = useFonts({
    'Spider-man-font': require('../../assets/fonts/The Amazing Spider-Man.ttf')
  })


  

  if (!fontsLoaded) return null
  const styles = StyleSheet.create({
    header: {
      backgroundColor: 'blue',
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 10, 
    },
    buttonLabel: {
            borderWidth: 2,
            alignSelf: 'center',
            padding: 5,
            backgroundColor: 'red'
        }
  })

  const logoutButton = (
    <Pressable onPress={logout}>
            <Text style={styles.buttonLabel}>Logout</Text>
        </Pressable>
  )


  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: '#ffd33d',
      // headerShown: false,
      headerStyle: styles.header,
      headerTintColor: '#fff',
      tabBarStyle: {
      backgroundColor: 'black',
    },
    headerTitle: "SPIDEYPEDIA",
    headerTitleStyle: {fontFamily: 'Spider-man-font',
        textShadowColor: 'black',
      textShadowOffset: {width: 0, height: 0}},
  }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="list-outline" color={color} size={24}/>
          ),
          headerRight: () => (
            logoutButton
          )
        }}
      />
      <Tabs.Screen
        name="agent"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name='chatbox-sharp' color={color} size={24}/>
          ),
          headerRight: () => (
            logoutButton
          )
        }}
      />
    </Tabs>
  );
}



