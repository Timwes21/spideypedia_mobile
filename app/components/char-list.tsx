import { View, Text, Pressable, StyleSheet } from "react-native"
import { useRef, useState, useEffect } from "react";
import { useFonts } from "expo-font";
import CharContents from "./char-contents";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function CharList(){
    const [ characters, setCharacters ] = useState<object>({})
    
    

    const ws = useRef<WebSocket | null>(null);
    const [ visible, setVisible ] = useState<Record<string,boolean>>({});
    
    
    const setVisibility = (e: string):void => {
        setVisible((prev)=>({
            ...prev,
            [e]: !prev[e]
        }))
    }
    useFonts({
        'header': require('../../assets/fonts/Springwood Display DEMO.otf'),
        'detail-font': require('../../assets/fonts/trebuc.ttf'),
        'comic-font': require('../../assets/fonts/digistrip.ttf'),
        'char-font': require('../../assets/fonts/Nexa-Heavy.ttf')
    
    })
    


    const styles = StyleSheet.create({
          charList: {
            borderBottomColor: 'black', 
            borderBottomWidth: 1,
            
          },
          charName: {
            fontSize: 40,
            fontFamily: 'char-font',
            fontWeight: 'bold',
            color: 'rgb(255, 0, 0)',
            textShadowColor: 'rgb(0, 0, 0)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 0,
            shadowColor: 'black',       // Shadow color
            shadowOffset: { width: 0, height: 2 }, // Shadow direction
            shadowOpacity: .8,       // Shadow transparency (0 to 1)
            shadowRadius: 3,
          },
          charContainer: {
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row'
          }   
        });
    
    
        
        useEffect(()=> {
            const loadChars = async ()=> {

                const wsLink = "wss://spideypedia-production.up.railway.app";
                const token = await AsyncStorage.getItem("comicManagementToken");
                console.log(token);
                
                ws.current = new WebSocket(wsLink);
                ws.current.onopen = () =>{
                    ws.current?.send(JSON.stringify(token));
                }
                
                ws.current.onmessage = (event) =>{
                    console.log(JSON.parse(event.data));
                    const data = JSON.parse(event.data);
                    console.log(typeof data.message);
                    
                    setCharacters(data.message);            
                }
                
                ws.current.onerror = (error) =>{
                    console.log(error);  
                }
            }
            loadChars()
                return () => {
                    ws.current?.close() 
                }

          }, [])
        
    
    



    return(
        <>
            {Object.entries(characters).map(([charName, charContents])=>(
                <View key={charName} style={styles.charList}>
                    <View style={styles.charContainer}>
                        <Pressable onPress={()=>setVisibility(charName)}><Text style={styles.charName}>{charName}</Text></Pressable>
                    </View>
                    <CharContents visibleCharContents={visible[charName]} charContents={charContents} character={charName}/>
                </View>
            ))}
        </>
    )
}