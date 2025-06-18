import { View, Text, TextInput, StyleSheet, Pressable, KeyboardAvoidingView } from "react-native";
import { useFonts } from "expo-font";
import useAuth from "@/hooks/useAuth";


export default function Login(){
    const {error, creatingAccount, createAccountError, userData, setCreatingAccount, login, createAccount, switchTo, settingUserData} = useAuth();    
    const [ fontsLoaded ] = useFonts({
        'Spider-man-font': require('../../assets/fonts/The Amazing Spider-Man.ttf'),
        'header': require('../../assets/fonts/Springwood Display DEMO.otf'),
        'detail-font': require('../../assets/fonts/trebuc.ttf'),
        'comic-font': require('../../assets/fonts/digistrip.ttf'),
        'char-font': require('../../assets/fonts/Nexa-Heavy.ttf')
    })
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "rgb(219, 0, 0)",
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        authBody: {
            width: 275,
            height: 300,
            color: 'white',
            alignItems: 'center',
            justifyContent: 'center'
        },
        authHeader: {
            fontSize: 60,
            fontFamily: "header",
            color: 'rgb(255, 255, 255)',
            textShadowColor: 'rgb(0, 0, 0)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 0,
            shadowColor: 'black',       // Shadow color
            shadowOffset: { width: 0, height: 2 }, // Shadow direction
            shadowOpacity: .8,       // Shadow transparency (0 to 1)
            shadowRadius: 3,
            textAlign: 'center'
        },
        input: {
            backgroundColor: 'white',
            width: 280,
            height: 50,
            fontSize: 25,
            borderWidth: 3
        },
        authSubHeading: {
            margin: 10,
            fontFamily: 'header',
            color: 'yellow',
            fontSize: 25,
            textShadowColor: 'rgb(0, 0, 0)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 0,
            // justifyContent: 'center',
            // alignItems: 'center'
        },
        button: {
            alignItems: 'center',
        },
        buttonLabel: {
            backgroundColor: '#FFFFA8',
            fontFamily: 'comic-font',
            padding: 7,
            borderColor: 'black',
            borderWidth: 3,
            textAlign: 'center',
            fontSize: 20
    
        },
    })

    const errorMessage = <Text>Username and/or password is incorrect</Text>

    const createAccountErrorMessage = <Text>Username and Password must be at least 6 characters</Text>

    const loginBody = (
            <View style={styles.authBody}>
                <Text style={styles.authHeader}>Login</Text>
                <Text style={styles.authSubHeading}>Username</Text>
                <TextInput testID="username-login" style={styles.input} value={userData.username} onChangeText={text=>settingUserData("username", text)}/>
                <Text style={styles.authSubHeading}>Password</Text>
                <TextInput testID="password-login" textContentType='password' style={styles.input} value={userData.password} onChangeText={text=>settingUserData("password", text)}/>

                <View style={{gap: 10, alignItems: 'center', margin: 10}}>
                    <Pressable>
                        <Text testID="button-login" onPress={login} style={styles.buttonLabel}>Login</Text>
                    </Pressable>

                    <Pressable testID="create-account?" onPress={()=>setCreatingAccount(true)}>
                        <Text style={styles.buttonLabel}>Create an Account</Text>
                    </Pressable>

                    {error && errorMessage}
                </View>
            </View>
    )

    const createAccountBody = (
            <View style={styles.authBody}>
                <Text style={styles.authHeader}>Create Account</Text>
                <Text style={styles.authSubHeading}>Username</Text>
                <TextInput testID="username-create-account" style={styles.input} value={userData.username} onChangeText={text=>settingUserData("username", text)}/>
                <Text style={styles.authSubHeading}>Password</Text>
                <TextInput testID="password-create-account" textContentType='password' style={styles.input} value={userData.password} onChangeText={text=>settingUserData("password", text)}/>
                <Text style={styles.authSubHeading}>Email</Text>
                <TextInput placeholder="Optional" placeholderTextColor="rgb(187, 187, 187)" style={styles.input} value={userData.email} onChangeText={text=>settingUserData("email", text)}/>
                <Text style={styles.authSubHeading}>Phone Number</Text>
                <TextInput placeholder="Optional" placeholderTextColor="rgb(187, 187, 187)" style={styles.input} value={userData.number} onChangeText={text=>settingUserData("number", text)}/>

                <View style={{gap: 10, alignItems: 'center', margin: 10}}>

                    <Pressable testID="button-create-account" onPress={createAccount}>
                        <Text style={styles.buttonLabel}>Create Account</Text>
                    </Pressable>

                    <Pressable onPress={switchTo}>
                        <Text style={styles.buttonLabel}>Login</Text>
                    </Pressable>
                    {createAccountError && createAccountErrorMessage}
                </View>
            </View>
    )

    return fontsLoaded && (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={120} style={styles.container}>
            {creatingAccount?createAccountBody:loginBody}
        </KeyboardAvoidingView>
    )
}