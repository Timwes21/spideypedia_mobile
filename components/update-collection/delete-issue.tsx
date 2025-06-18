import { Pressable, Text, StyleSheet, View } from "react-native";
import { useState } from "react";
import useToken from "@/hooks/useToken";
import useRoutes from "@/hooks/useRoutes";


export default function DeleteIssue({character, type, title, vol, issueNumber}: Record<string, string>){
    const [visible, setVisible] = useState(false);
    const { comicsBase } = useRoutes()

    const { token } = useToken();
    

        
    const deleteIssue = ()=>{
        console.log(token);
        
        fetch(comicsBase + "/delete-issue", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({token: token, 
                characterData:{
                    character: character, 
                    type: type, 
                    titleName: title, 
                    vol: vol, 
                    issueNumber: issueNumber
                } 
            })
        })
        .then(()=>{setVisible(!visible)})
        .catch(err=>console.log(err))
    }


    const styles = StyleSheet.create({
        buttonLabel: {
        backgroundColor: 'red',
        fontFamily: 'comic-font',
        padding: 3,
        borderColor: 'black',
        borderWidth: 3,
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
        },
    })

    const deleteButton = (
        <View style={{flex: 1, alignItems:'flex-end'}}>
            <Pressable onPress={()=>setVisible(!visible)}>
                <Text style={styles.buttonLabel}>Delete</Text>
            </Pressable>        
        </View>
    )

    const confirmButtons = (
        <View style={{flex: 1, alignItems:'flex-end', flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Pressable onPress={deleteIssue}>
                <Text style={styles.buttonLabel}>Yes</Text>
            </Pressable>

            <Pressable onPress={()=>setVisible(!visible)}>
                <Text style={styles.buttonLabel}>Cancel</Text>
            </Pressable>
        </View>
    )
    
    return visible?confirmButtons:deleteButton
}   