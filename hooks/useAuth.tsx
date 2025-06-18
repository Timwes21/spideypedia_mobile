import { useState } from "react";
import { useRouter } from 'expo-router';
import useRoutes from "@/hooks/useRoutes";
import useToken from "@/hooks/useToken";

interface UseAuthContents {
    error: boolean, 
    creatingAccount: boolean,
    createAccountError: boolean, 
    userData: UserData
    setCreatingAccount: (condition: boolean) => void
    login: () => void, 
    createAccount: () => void, 
    switchTo: () => void,
    settingUserData: (key: string, value: string) => void
}

interface UserData {
    username: string,
    password: string,
    email: string,
    number: string
}


export default function useAuth():UseAuthContents{
    const { setAsyncToken } = useToken();
    const router = useRouter();
    const [creatingAccount, setCreatingAccount ] = useState<boolean>(false);
    const [ userData, setUserData ] = useState<UserData>({
            username: "",
            password: "",
            email: "",
            number: ""
        });
    const [ error, setError ] = useState<boolean>(false);
    const [ createAccountError, setCreateAccountError ] = useState<boolean>(false);
    const { authBase } = useRoutes()
    const login = () => {
        if (userData.username.length < 1 && userData.password.length < 1){
            setError(true);
            return;
        }

        fetch(authBase + "/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username: userData.username, password: userData.password})
        })
        .then(async(response)=>{
            
            
            const status = response.status;
            const data = await response.json()
            
            if (status === 200){
                const { message, token } = data;
                await setAsyncToken(token);
                router.replace("/(tabs)");

            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    const createAccount = () => {
        if (userData.username.length < 6 || userData.password.length < 6){
            setCreateAccountError(true);
            return;
        }
        
        
        fetch(authBase + "/create-user", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username: userData.username, password: userData.password, email: userData.email, phoneNumber: userData.number})
        })
        .then(async(response) => {
            const status = response.status;
            const data = await response.json();
            if (status === 200){
                await setAsyncToken(data.token);
                router.replace("/(tabs)");
            }
            return data.message;
        })
        .catch(err=>{
            console.log(err);    
        })
    }

    const switchTo = () => {
        setCreatingAccount(!creatingAccount);
        setError(false);
        setCreateAccountError(false);
        setUserData({
            username: "",
            password: "",
            email: "",
            number: ""
        })
    }

    const settingUserData = (key:string, value: string) => {
        setUserData(prev=>({
            ...prev,
            [key]: value

        }))
    }


    return {error, creatingAccount, createAccountError, userData, setCreatingAccount, login, createAccount, switchTo, settingUserData}
}