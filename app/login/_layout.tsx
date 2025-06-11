import { StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function Layout() {


    const styles = StyleSheet.create({
        header: {
            backgroundColor: 'blue',
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 2},
            shadowRadius: 10, 
    }
    })

    return (
        <Tabs 
        screenOptions={
            {
                tabBarActiveTintColor: '#ffd33d',
                headerStyle: styles.header,
                headerTintColor: '#fff',
                tabBarStyle: 
                {
                    backgroundColor: 'black',
                },
                headerTitle: "SPIDEYPEDIA",
                headerTitleStyle: {fontFamily: 'Spider-man-font',
                textShadowColor: 'black',
                textShadowOffset: {width: 0, height: 0}}, 
            }}>
            <Tabs.Screen name="auth"     options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name='log-in' color={color} size={24}/>
          ),
        }}/>
        </Tabs>
    );
}