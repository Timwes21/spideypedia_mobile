import { StyleSheet, View, Text, Pressable } from "react-native";
import { useState } from "react";
import IssueDetails from "./issue-details";
import DeleteIssue from "./update-collection/delete-issue";

type IssuesProps = Readonly<{
    visibleIssues: boolean, 
    issuesList: object, 
    character: string, 
    type: string, 
    title: 
    string, 
    vol: string
}>


export default function Issues({visibleIssues, issuesList, character, type, title, vol }: IssuesProps){
    const [ visible, setVisible ] = useState<Record<string,boolean>>({});
    
    
        
        const setVisibility = (e: string):void => {
            setVisible((prev)=>({
                ...prev,
                [e]: !prev[e]
            }))
        }
        
    const styles = StyleSheet.create({
        issueElement: {
            borderTopColor: 'black',
            borderTopWidth: 1
        },
        issue: {
            fontSize: 20,
            margin: 5
        }
 
    })
    return(
        <>
            {visibleIssues && Object.entries(issuesList).map(([issue, issueDetails])=>(
                <View style={styles.issueElement} key={issue}>
                <Pressable onPress={(()=>setVisibility(issue))}><Text style={styles.issue}>{`${issue}: ${issueDetails.issueRundown.Name || ""}`}</Text></Pressable>
                <DeleteIssue character={character} type={type} title={title} vol={vol} issueNumber={issue}/>
                <IssueDetails visibleDetails={visible[issue]} issueDetails={issueDetails} character={character} type={type} titleName={title} vol={vol} issueNumber={issue}/>
                </View>
            ))}

        </>
    )
}