import { useState } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import Issues from "./issues";


type TitleContentProps = Readonly<{
    contentsVisibility: boolean, 
    titleContents: object, 
    character: string, 
    type: string, 
    title: string
}>


export default function TitleContents({contentsVisibility, titleContents, character, type, title}: TitleContentProps){
    const [ visible, setVisible ] = useState<Record<string,boolean>>({});


    
    const setVisibility = (e: string):void => {
        setVisible((prev)=>({
            ...prev,
            [e]: !prev[e]
        }))
    }
    const styles = StyleSheet.create({
        titleName: {
            fontSize: 30
        },
        vol: {
            fontSize: 25,
            marginLeft: 20,
            fontFamily: 'char-font'
        },
    })

    return(
        <>
            {contentsVisibility && Object.entries(titleContents).map(([vol, issuesList])=>(
                <View key={`vol:${vol}`}>
                <Pressable onPress={()=>setVisibility(vol)}><Text style={styles.vol}>{`${vol}`}</Text></Pressable>
                <Issues visibleIssues={visible[vol]} issuesList={issuesList} character={character} type={type} title={title} vol={vol}/>
                </View>
            ))}

        </>
    )
}