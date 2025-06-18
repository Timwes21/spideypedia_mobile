import {Text, View, StyleSheet, TextInput, Pressable, ScrollView, KeyboardAvoidingView} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import useRoutes from '@/hooks/useRoutes';
import useToken from '@/hooks/useToken';

export default function Agent(){
    const [ messages, setMessages] = useState<object[]>([]);
    const [ currentMessage, setCurrentMessage ] = useState('');
    const { token } = useToken();
    const { submitToAgentWs, undoRoute } = useRoutes()
    const ws = useRef<WebSocket | null>(null);

    useEffect(()=>{
        ws.current = new WebSocket(submitToAgentWs);
        ws.current.onopen  = () =>{
            console.log("ai assistant ready");
        }
        ws.current.onerror = (err) => {
            console.log(err);
        }
        ws.current.onmessage = async(event) =>{
            const data: string = event.data;
            const parsedData: Record<string, string> = JSON.parse(data);
            const { loading, output } = parsedData
            loading && setMessages(prev=>[...prev, {AIMessage: loading}])
            output && setMessages(prev=>[...prev, {AIMessage: output}])
        }

        return () => {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                ws.current.close();
            }
        };

    }, [submitToAgentWs])


    



    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "rgb(219,0,0)",

        },
        text: {
            backgroundColor: "blue",
        },
        inputContainer: {
            backgroundColor: 'rgb(41, 41, 41)',
            alignItems: 'center',
            justifyContent: 'space-around',
            height: 60,
            flexDirection: 'row'
            
        },
        input: {
            width: '70%',
            height: 40,
            backgroundColor: 'white',
            borderRadius: 10
        },
        messageContainer: {
            flex: 1,
            // backgroundColor: 'white',
            // flexDirection:'column-reverse'
        },
        messages: {
            flexDirection:'column',
            gap: 10
        },
        humanMessage: {
            backgroundColor: "black",
            alignSelf: 'flex-end',
            shadowColor: 'black',       // Shadow color
            shadowOffset: { width: 0, height: 2 }, // Shadow direction
            shadowOpacity: 1,       // Shadow transparency (0 to 1)
            shadowRadius: 3.84,
            fontSize: 25,
            padding: 3,
            borderRadius: 10,
            color: 'white',
            maxWidth: '80%'
        },
        AIMessage: {
            backgroundColor: 'yellow',
            alignSelf: 'flex-start',
            shadowColor: 'black',       // Shadow color
            shadowOffset: { width: 0, height: 2 }, // Shadow direction
            shadowOpacity: 1,       // Shadow transparency (0 to 1)
            shadowRadius: 3.84,
            fontSize: 25,
            padding: 3,
            borderRadius: 10,
            maxWidth: '80%'
        },
        buttonLabel: {
        backgroundColor: '#FFFFA8',
        fontFamily: 'comic-font',
        padding: 3,
        borderColor: 'black',
        borderWidth: 3,
        // flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
        },
    })



    const send = () => {
        ws.current?.send(JSON.stringify({
                token: token,
                input: currentMessage
            }));
        setMessages(prev=>[
            ...prev,   
            {humanMessage: currentMessage}
        ])
        setCurrentMessage("");
    }

    const undo = () =>{
        fetch(undoRoute, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({token: token})
        })
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding' keyboardVerticalOffset={85}>
            <ScrollView style={styles.messageContainer}>
                <View style={styles.messages}>
                    {messages.map((obj, i)=>(
                        Object.entries(obj).map(([key, value])=>(
                            <Text key={i} style={styles[key]}>{value}</Text>
                        ))
                    ))}
                </View>
            </ScrollView>
            <View style={styles.inputContainer}>
                <Pressable onPress={undo}>
                    <Text style={styles.buttonLabel}>Undo</Text>
                </Pressable>
            
                <TextInput onChangeText={text=>setCurrentMessage(text)} value={currentMessage} style={styles.input}/>
            
                <Pressable onPress={()=> currentMessage.length > 0 && send()}>
                    <Text style={styles.buttonLabel}>Send</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    )


}