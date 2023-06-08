import React, { useReducer, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store'
import { Auth } from '../@types/auth';
import { Action } from '../@types/reducer';

interface iAuthContext {
    userRegister: string | null;
    userName: string | null;
    isLoading: boolean;
    errorMessage: string | null;
    login?: (auth: Auth) => {};
    register?: () => void;
    tryLocalLogin?: () => void;
    logout?: () => void;
}

const defaultValue = {
    userRegister: null,
    userName: null,
    isLoading: true,
    errorMessage: null
}
const Context = React.createContext<iAuthContext>(defaultValue)

const Provider = ({ children }: { children: ReactNode }) => {
    const reducer = (state: any, action: Action) => {
        switch (action.type) {
            case 'login':
                return {
                    ...state,
                    ...action.payload,
                    errorMessage: null
                }
            case 'logout':
                return { userRegister: null, userName: null, errorMessage: null }
            case "add_error":
                return { ...state, errorMessage: action.payload }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, defaultValue)

    const login = async ({ cpf, password }: Auth) => {
        try {
            if (cpf === '96233753600' && password === '123456') {
                await SecureStore.setItemAsync('userRegister', '123456')
                await SecureStore.setItemAsync('userName', 'Luísa Anjos')
            } else {
                throw 'CPF ou senha incorreta'
            }
            dispatch({
                type: 'login',
                payload: { userRegister: '123456', userName: 'Luísa Anjos' }
            })
        } catch (err) {
            dispatch({
                type: 'add_error',
                payload: 'Houve algum erro no login...'
            })
        }
    }

    const tryLocalLogin = async () => {
        let userRegister, userName;

        try {
            userRegister = await SecureStore.getItemAsync('userRegister')
            userName = await SecureStore.getItemAsync('userName')

            dispatch({ type: 'login', payload: { userRegister, userName } })

        } catch (err) {
            console.error(err)
        }
    }

    const logout = async () => {
        try {
            await SecureStore.deleteItemAsync('userRegister')
            await SecureStore.deleteItemAsync('userName')

            dispatch({
                type: 'logout',
            })
        } catch (err) {
            console.error(err)
        }
    }


    return (
        <Context.Provider
            value={{
                ...state,
                login,
                tryLocalLogin,
                logout
            }}
        >
            {children}
        </Context.Provider>
    )
}

export { Provider, Context }