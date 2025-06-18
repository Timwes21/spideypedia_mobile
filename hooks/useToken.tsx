import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const TOKENNAME = "comicManagementToken";


const getToken = async() => {
        return await AsyncStorage.getItem(TOKENNAME);
    }

const setAsyncToken = async(possibleToken: string) => {
    await AsyncStorage.setItem(TOKENNAME, possibleToken);
}

interface TokenContents{
    token: string | undefined,
    setAsyncToken: (possibleToken: string) => Promise<void>
}

export default function useToken(): TokenContents{
    const [token, setToken] = useState<string>();

    useEffect(()=> {
        const fetchToken = async() => {
            const fetchedToken = await getToken();
            fetchedToken && setToken(fetchedToken);
        }
        fetchToken();
    }, [])

    
    return { token , setAsyncToken};

}