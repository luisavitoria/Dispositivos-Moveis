import React, { useReducer, ReactNode } from 'react';
import { setDoc, getDoc, doc, getFirestore } from '@firebase/firestore';

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

import { Auth } from '../@types/auth';
import { Action } from '../@types/reducer';

interface iAuthContext {
    token: boolean | null;
    userRegister: string | null;
    userName: string | null;
    profileImage: string | null;
    cpf: string | null;
    email: string | null;
    isLoading: boolean;
    errorMessage: string | null;
    login?: (auth: Auth) => {};
    signUp?: (auth: Auth) => void;
    tryLocalLogin?: () => void;
    logout?: () => void;
}

const defaultValue = {
    token: false,
    userRegister: null,
    userName: null,
    profileImage: null,
    cpf: null,
    email: null,
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
            case 'user_created':
                return { ...state, errorMessage: null }
            case 'logout':
                return { token: false, userRegister: null, userName: null, errorMessage: null }
            case "add_error":
                return { ...state, errorMessage: action.payload }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, defaultValue)

    const signUp = async ({ email, password, name, cpf, register }: Auth) => {
        try {

            const auth = getAuth();
            const response = await createUserWithEmailAndPassword(auth, email, password)

            const db = getFirestore()
            setDoc(doc(db, 'users', response.user.uid), {
                name,
                email,
                cpf,
                register
            })

            alert('Usuário cadastrado com sucesso!')

            dispatch({
                type: 'user_created',
            })
        } catch (err) {
            console.error(err)
            dispatch({
                type: 'add_error',
                payload: 'Houve algum erro no cadastro...'
            })
        }
    }

    const login = async ({ email, password }: Auth) => {
        try {
            const auth = getAuth();
            const response = await signInWithEmailAndPassword(auth, email, password)

            const uid = response.user.uid
            const db = getFirestore()

            const user = await getDoc(doc(db, 'users', uid))

            const { register, name, profileImage, cpf } = user.data()

            dispatch({
                type: 'login',
                payload: { token: true, userRegister: register, userName: name, profileImage, cpf, email: user.data().email }
            })
        } catch (err) {
            dispatch({
                type: 'add_error',
                payload: 'Houve algum erro no login...'
            })
        }
    }

    const tryLocalLogin = async () => {
        let token = false

        try {
            const auth = getAuth();
            await onAuthStateChanged(auth, user => {
                if (user != null) {
                    token = true
                }
            });

            dispatch({ type: 'login', payload: { token } })

        } catch (err) {
            console.error(err)
        }
    }

    const logout = async () => {
        try {
            const auth = getAuth()
            await auth.signOut()

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
                signUp,
                tryLocalLogin,
                logout
            }}
        >
            {children}
        </Context.Provider>
    )
}

export { Provider, Context }