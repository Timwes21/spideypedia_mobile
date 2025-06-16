import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const TOKENNAME = "comicManagementToken";


export const getToken = async() => {
    if (Platform.OS === "ios"){
        return await AsyncStorage.getItem(TOKENNAME);
    }
}

export const setToken = async(token: string) => {
    if (Platform.OS === "ios"){
        await AsyncStorage.setItem(TOKENNAME, token);
    }
}

export const removeToken = async() => {
    if (Platform.OS === "ios"){
        await AsyncStorage.removeItem(TOKENNAME);
    }
}