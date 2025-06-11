import { useState } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import Titles from "./titles";

export default function CharContents({visibleSubCollection, charContents, issueData, styles, tsx}){

    const [ visible, setVisible ] = useState<Record<string,boolean>>({});
        
    const setVisibility = (e: string):void => {
        setVisible((prev)=>({
            ...prev,
            [e]: !prev[e]
        }))
    }



    // const tsx = (Object.entries(charContents).map(([titleType, title])=>(
    //         <View key={titleType} style={{borderBottomColor: 'black'}}>
    //             <Pressable onPress={()=>setVisibility(titleType)}>
    //                 <Text style={styles.titleType}>{titleType}</Text>
    //             </Pressable>
    //             < Titles titlesVisibility={visible[titleType]} title={title} character={character} type={titleType}/>
    //         </View>
    //         )))


    return (
        <>
        {visibleSubCollection && tsx(setVisibility)}
        </>
    )
}