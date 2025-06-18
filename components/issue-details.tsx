import { StyleSheet, View, Text, Pressable, TextInput } from "react-native"
import { useState } from "react";
import useToken from "../hooks/useToken";
import useRoutes from "@/hooks/useRoutes";

type IssueDetailsProps = Readonly<{
    visibleDetails: boolean , 
    issueDetails: {issueRundown: Record<string, string>}, 
    character: string, 
    type: string, 
    titleName: string, 
    vol: string, 
    issueNumber: string
}>





export default function IssueDetails({visibleDetails, issueDetails, character, type, titleName, vol, issueNumber}: IssueDetailsProps){
    const [ edit, setEdit ] = useState(false);
    const [issueDetailList, setIssueDetailList ] = useState({
        ...issueDetails.issueRundown
    });
    const [ issueDetailsKeys, setIssueDetailsKeys ] = useState<string[]>(Object.keys(issueDetailList));
    const [ issueDetailsValues, setIssueDetailsValues ] = useState<string[]>(Object.values(issueDetailList));
    const {token} = useToken();
    const { comicsBase } = useRoutes()
    

    const styles = StyleSheet.create({
        issueDetailsContainer: {
            borderColor: 'black',
            backgroundColor: '#FFFFA8',
            margin: 10,
            padding: 5,
            borderWidth: 3
        },
        issueDetails: {
            fontSize: 20,
            padding: 2,
            fontFamily: 'Arial'
          },
          detailTitle: {
            fontWeight: 'bold'
          },
          button: {
            alignItems: 'center',
        },
        buttonLabel: {
            backgroundColor: 'rgb(255, 115, 115)',
            fontFamily: 'comic-font',
            padding: 7,
            borderColor: 'black',
            borderWidth: 3,
            // width: 80,
            textAlign: 'center'
        },
        input: {
            backgroundColor: 'white',
            width: 150,
            margin: 5,
            height: 25,
            fontSize: 20
        }
    })
    

    const details = <View style={styles.issueDetailsContainer}>
                {Object.entries(issueDetailList).map(([detailTitle, detail], i)=>(
                    <View key={detailTitle}>
                    <Text style={styles.issueDetails}>
                        <Text style={styles.detailTitle}>{detailTitle}</Text>: {detail}
                    </Text>

                    </View>  
                ))}
                <Pressable onPress={()=>setEdit(true)} style={styles.button}>
                    <Text style={styles.buttonLabel}>Edit Details</Text>
                </Pressable>
                </View>


    const cancel = () => {
        setIssueDetailsKeys(Object.keys(issueDetailList));
        setIssueDetailsValues(Object.values(issueDetailList));
        setEdit(false);
    }

    const deleteDetail = (index: number) => {
        setIssueDetailsValues(prev=>prev.filter((_, i)=>i !== index));
        setIssueDetailsKeys(prev=>prev.filter((_, i)=>i !== index));
    }

    const save = () => {
        const issueDetailsKeysCopy = [...issueDetailsKeys]
        const combine = Object.fromEntries((issueDetailsKeysCopy).map((key, index)=>[key, issueDetailsValues[index]]))
        setEdit(!edit);
        setIssueDetailList({...combine});

        const formData = new FormData();
        token && formData.append('token', token);
        formData.append('characterData', JSON.stringify({
            character: character, 
            type: type, 
            titleName: titleName, 
            vol: vol, 
            issueNumber: issueNumber
        }));
        formData.append("issueDetailList", JSON.stringify({...combine}));
        fetch(comicsBase + "/update-details", {
            method: "POST",
            body: formData
            })
            .then(data=>console.log(data))
            .catch(err=>console.log(err))
    }

    const updateDetailList = (text: string, prev: string[], index: number) => {
        const updated = [...prev];
        updated[index] = text;
        return updated
    }


    const addNewField = () => {
        setIssueDetailsValues(prev=>[...prev, ""])
        setIssueDetailsKeys(prev=>[...prev, ""])
    }

    const inputDetails = (
        <View style={styles.issueDetailsContainer}>
            {issueDetailsKeys.map((_, index)=>(
                <View key={`detail${index}`}>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput
                        style={styles.input}
                        value={issueDetailsKeys[index]} 
                        onChangeText={text=>setIssueDetailsKeys(prev=>updateDetailList(text, prev, index))}/><Text>: </Text>
                        <TextInput 
                        style={styles.input} 
                        value={issueDetailsValues[index]}
                        onChangeText={text=>setIssueDetailsValues(prev=>updateDetailList(text, prev, index))}/>
                    </View>  
                    <Pressable onPress={()=>deleteDetail(index)} style={{...styles.button, padding: 1}}>
                        <Text style={{...styles.buttonLabel, backgroundColor: 'red'}}>Delete</Text>
                    </Pressable>
                </View>
            ))}
            <View style={{flexDirection: 'row', justifyContent: 'center', gap: 10}}>

                <Pressable onPress={cancel} style={styles.button}>
                        <Text style={styles.buttonLabel}>Cancel</Text>
                </Pressable>

                <Pressable onPress={save} style={styles.button}>
                        <Text style={styles.buttonLabel}>Save</Text>
                </Pressable>

                <Pressable onPress={addNewField} style={styles.button}>
                        <Text style={styles.buttonLabel}>Add New Field</Text>
                </Pressable>
            </View>
        </View>
    ) 


    const setDetails = edit? inputDetails: details
        
    return visibleDetails && setDetails
}