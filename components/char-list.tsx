import useToken from "@/hooks/useToken";
import { useFonts } from "expo-font";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CharContents from "./char-contents";

export default function CharList(){
    const [ characters, setCharacters ] = useState<object>({})
    const {token} = useToken();
    

    const ws = useRef<WebSocket | null>(null);
    const [ visible, setVisible ] = useState<Record<string,boolean>>({});
    
    
    const setVisibility = (e: string):void => {
        setVisible((prev)=>({
            ...prev,
            [e]: !prev[e]
        }))
    }
    useFonts({

        'header': require('../assets/fonts/Springwood Display DEMO.otf'),
        'detail-font': require('../assets/fonts/trebuc.ttf'),
        'comic-font': require('../assets/fonts/digistrip.ttf'),
        'char-font': require('../assets/fonts/Nexa-Heavy.ttf')
    
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
          },
          noComics: {
            alignItems: 'center',
          },
          noComicsText: {

          }   
        });
    
    
        
        useEffect(()=> {
            const loadChars = async ()=> {

                const wsLink = "wss://spideypedia-production.up.railway.app";
                
                ws.current = new WebSocket(wsLink);
                ws.current.onopen = () =>{
                    ws.current?.send(JSON.stringify(token));
                }
                
                ws.current.onmessage = (event) =>{
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

        }, [token])
        
    
    const characterEntries = (Object.entries(characters).length === 0)
    


    return !characterEntries?(
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
    ):(
        <View style={styles.noComics}>
            <Text style={styles.noComicsText}>No Comics Yet!</Text>
        </View>

    ) 
}