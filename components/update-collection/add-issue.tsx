import React, { useState } from 'react';
import {Pressable, View, StyleSheet, ActivityIndicator, TextInput, Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useFonts } from 'expo-font';
import useToken from '@/hooks/useToken';
import useRoutes from '@/hooks/useRoutes';




export default function AddIssue(){
    const {token} = useToken();
    const {comicsBase, uploadPicRoute } = useRoutes()

    

    const [uploading, setUploading] = useState(false);
    const [ optionsOpen, setOptionsOpen ] = useState(false);
    const [ adding, setAdding ] = useState<boolean>(false)

    interface IssueForm {
        character: string,
        type: string,
        titleName: string,
        vol: string,
        issueNumber: string
    }


    const [fontsLoaded] = useFonts({
        "button-font": require("../../assets/fonts/digistrip.ttf")
    });

    const [ formVisible, setFormVisible ] = useState(false);
    const [ issueData, setIssueData ] = useState<IssueForm>({
        character: "",
        type: "",
        titleName: "",
        vol: "",
        issueNumber: ""
    });
    const [typeOpen, setTypeOpen] = useState(false);
    const [ errorAdding, setErrorAdding ] = useState(false);

    const selectImage = async (useLibrary: boolean) => {
		let result;
		const options: ImagePicker.ImagePickerOptions = {
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 0.75
		};


		if (useLibrary) {
            result = await ImagePicker.launchImageLibraryAsync(options);
		} else {
			await ImagePicker.requestCameraPermissionsAsync();
			result = await ImagePicker.launchCameraAsync(options);

		}
        if (!result.canceled && result.assets && result.assets.length > 0) {
                const uri: string = result.assets[0].uri;
                uploadImage(uri);
            }

		
	};

    
    const titleTypes: string[] = ["Series", "Mini-Series", "One-Shot"];
    
    function add(){
        setAdding(true);
        const formData = new FormData();
        token && formData.append('token', token);
        
        const valid: boolean[] = Object.entries(issueData).map(([_, value])=>{
            if (value === ""){
                console.log(value);
                
                return false;
            }
            return true;
        })
        
        if (valid.includes(false)){
            setErrorAdding(true);
            setAdding(false);
            console.log("error");        
            return;
        }
        formData.append('issueDetails', JSON.stringify(issueData));
        console.log(issueData);
        
        console.log(formData);
        

        fetch(comicsBase + "/add-issue", {
            method: "POST",
            body: formData
                
        })
        .then(response=>response.json())
        .then(()=>{
            setFormVisible(!formVisible);
            setIssueData({
                character: "",
                type: "",
                titleName: "",
                vol: "",
                issueNumber: ""
            })
            setAdding(false);   
            
        })
        .catch(err=>console.log(err))
    }

    const uploadImage = async (uri: string) => {
        setUploading(true);
    
        token && await FileSystem.uploadAsync(uploadPicRoute, uri, {
            httpMethod: 'POST',
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: 'file',
            parameters: {token: token}
        });
    
        setUploading(false);
    };


    const cancel = () => {
        setIssueData({
            character: "",
            type: "",
            titleName: "",
            vol: "",
            issueNumber: ""
        })   
        setFormVisible(false);
        setTypeOpen(false);
        setErrorAdding(false);
    }

    const selectTitleType = (type: string) => {
        setIssueData((prev)=>({...prev, type: type}));
        setTypeOpen(false);
    }





    const styles = StyleSheet.create({
        container: {
            // flex: 1,
            alignItems: 'center'
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
            textAlign: 'center'
            
    
        },
        inputContainer: {
            alignSelf:'center',
            alignItems: 'center',
            margin: 10,
            padding: 10,
            gap: 5,
            justifyContent: 'center',
            width: 300,
            height: 500
        },
        inputHeader: {
            fontFamily: 'header',
            color: 'yellow',
            fontSize: 20,
            textShadowColor: 'rgb(0, 0, 0)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 0,
        },
        input: {
            backgroundColor: 'black',
            color: 'white',
            padding: 3,
            borderRadius: 7,
            width: 200,
            height: 40,
        },
        selectedType: {
            fontSize: 20,            
            backgroundColor: 'black',
            color: 'white',
            padding: 3,
            width: 150,
            textAlign: 'center',
        },
        titleTypes: {
            backgroundColor: 'rgba(164, 164, 164, 0.51)',
            color: 'white',
            shadowColor: 'black', 
            shadowOffset: { width: 0, height: 2 }, 
            shadowOpacity: 1,
            shadowRadius: 3.84,
            position: "absolute",
            zIndex: 10,
            top: 140,
            padding: 5,
            borderColor: 'white',
            borderWidth: 1,
            width: 150,
            alignItems: 'center',
            
        },
        typeOption: {
            color: 'white', 
            fontSize: 20,
            padding: 3,
            textShadowColor: 'rgb(0, 0, 0)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 0,
        },
        buttonContainer: {
            flex: 1,
            flexDirection: 'row',
            gap: 10
        },
        errorMessage: {
            color: 'red'
        }
    })

    const showButtons = (
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={add}>
                <Text style={styles.buttonLabel}>Add</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={cancel}>
                <Text style={styles.buttonLabel}>Cancel</Text>
            </Pressable>
        </View>
    )
    const showAddMessage = <Text>Adding Issue...</Text>


    const addIssueButton = (
        <Pressable style={styles.button} onPress={()=>setFormVisible(!formVisible)}>
            <Text style={styles.buttonLabel}>Add Issue</Text>
        </Pressable>
    )

    const addIssueForm = (
        <Pressable onPress={()=>setTypeOpen(false)} style={styles.inputContainer}>
            <Text style={styles.inputHeader}>Character</Text>
            <TextInput style={styles.input} value={issueData.character} onChangeText={(text)=>setIssueData((prev)=>({...prev, character: text}))}/>

            <Text style={styles.inputHeader}>Type</Text>
            <Pressable onPress={()=>setTypeOpen(!typeOpen)}><Text style={styles.selectedType}>{issueData.type?issueData.type:"--Select Type--" }</Text></Pressable>
            
            {typeOpen && 
            <View style={styles.titleTypes}>
                {titleTypes.map((type, i)=>(
                    <Pressable key={type} onPress={()=>selectTitleType(type)}>
                        <Text style={i!==1?styles.typeOption:{...styles.typeOption, borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'white'}}>{type}</Text>

                    </Pressable>
                ))}
            </View>}

            <Text style={styles.inputHeader}>Title</Text>
            <TextInput style={styles.input} value={issueData.titleName} onChangeText={(text)=>setIssueData((prev)=>({...prev, titleName: text}))}/>

            <Text style={styles.inputHeader}>Vol</Text>
            <TextInput style={styles.input} value={issueData.vol} onChangeText={(text)=>setIssueData((prev)=>({...prev, vol: text}))}/>

            <Text style={styles.inputHeader}>Issue Number</Text>
            <TextInput style={styles.input} value={issueData.issueNumber} onChangeText={(text)=>setIssueData((prev)=>({...prev, issueNumber: text}))}/>

            {adding? showAddMessage: showButtons}

            {errorAdding && <Text style={{color: 'yellow'}}>You need to fill out the entire form</Text>}
        </Pressable>
    )

    const addByPhotoButton = (
        <Pressable testID='button-add-by-photo' style={styles.button} onPress={()=>{setOptionsOpen(true)}}>
            <Text style={styles.buttonLabel}>Add By Photo</Text>
        </Pressable>
    )


    const options = (
        <>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, }}>
            <Pressable style={styles.button} onPress={() => selectImage(false)}>
                <Text style={{...styles.buttonLabel, width: 90}}>Take Photo</Text>
            </Pressable>

            <Pressable testID='open-gallery' style={styles.button} onPress={() => selectImage(true)}>
                <Text style={{...styles.buttonLabel, width: 90}}>Add from gallery</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={() => setOptionsOpen(false)}>
                <Text style={{...styles.buttonLabel, width: 90}}>Cancel</Text>
            </Pressable>
        </View>



		{uploading && (
			<View
            style={[
                StyleSheet.absoluteFill,
                {
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    alignItems: 'center',
                    justifyContent: 'center'
                }
            ]}>
				<ActivityIndicator color="#fff" animating size="large" />
			</View>
		)}
        </>
    );

    const renderPhotoButton = optionsOpen? options: addByPhotoButton; 

    const addOptions = (
        <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'space-around'}}>
            {!optionsOpen && addIssueButton}
            {renderPhotoButton}
        </View>
    )

    const buttons = formVisible?addIssueForm: addOptions

    return fontsLoaded && buttons
}