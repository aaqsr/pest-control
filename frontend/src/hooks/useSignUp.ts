import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { APP_URL } from "../global";

export const useSignUp = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch }: any = useAuthContext();

    const signup = async (name:string, email: string, password: string) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(APP_URL + '/api/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        
        if (response.ok) {
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            // update authContext
            dispatch({ type: 'LOGIN', payload: json });

            setIsLoading(false);
        }
    }

    return { signup, isLoading, error };
}