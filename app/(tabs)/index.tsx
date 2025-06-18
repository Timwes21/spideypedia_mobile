import { Text, StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";
import CharList from "../../components/char-list";
import AddIssue from "../../components/update-collection/add-issue";


export default function Comics() {

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'white',
        color: 'black',
        overflow: 'scroll',
        borderColor: 'black',
        borderWidth:7,
        margin: 10,
        
        },
        buttonContainer: {
          justifyContent: 'space-between',
          flexDirection: 'row',
        }
    })
    
    return (
      <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={90} style={{flex: 1, backgroundColor: 'rgb(219,0,0)'}}>
        <ScrollView style={styles.container}>
          <CharList/>
        </ScrollView>
        <AddIssue/>
      </KeyboardAvoidingView>
    );
}
