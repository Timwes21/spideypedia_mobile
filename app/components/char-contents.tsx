import { useState } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import Titles from "./titles";

type CharContentsProps = Readonly<{
    visibleCharContents: boolean, 
    charContents: object, 
    character: string
}>

export default function CharContents({visibleCharContents, charContents, character}: CharContentsProps){

    const [ visible, setVisible ] = useState<Record<string,boolean>>({});
        
    const setVisibility = (e: string):void => {
        setVisible((prev)=>({
            ...prev,
            [e]: !prev[e]
        }))
    }

    const styles = StyleSheet.create({
    titleType: {
        fontSize: 35,
        marginLeft: 20,
        fontFamily: 'header'
    }
    })
 
    return (
        <>
        {visibleCharContents && Object.entries(charContents).map(([titleType, title])=>(
            <View key={titleType} style={{borderBottomColor: 'black'}}>
                <Pressable onPress={()=>setVisibility(titleType)}>
                    <Text style={styles.titleType}>{titleType}</Text>
                </Pressable>
                < Titles titlesVisibility={visible[titleType]} title={title} character={character} type={titleType}/>
            </View>
            ))}
        </>
    )
}