import { useState } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import TitleContents from "./title-contents";

type TitleProps = Readonly<{
    titlesVisibility: boolean, 
    title: object, 
    character: string, 
    type: string
}>


export default function Title({titlesVisibility, title, character, type}: TitleProps){
    const [ visible, setVisible ] = useState<Record<string,boolean>>({});


    const styles = StyleSheet.create({
        titleName: {
            fontSize: 30,
            marginLeft: 20,
            fontFamily: 'char-font'
        },

    })
            
    const setVisibility = (e: string):void => {
        setVisible((prev)=>({
            ...prev,
            [e]: !prev[e]
        }))
    }
    
    return(
        <>
            {titlesVisibility && Object.entries(title).map(([titleName, titleContents])=>(
                <View key={titleName}>
                <Pressable onPress={()=>setVisibility(titleName)}><Text style={styles.titleName}>{titleName}</Text></Pressable>
                <TitleContents titleContents={titleContents} contentsVisibility={visible[titleName]} character={character} type={type} title={titleName}/>
                </View>
            ))}
        </>
    )
}