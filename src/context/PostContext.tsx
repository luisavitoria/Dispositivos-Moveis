import React, { useReducer, ReactNode } from 'react';
import { Action } from '../@types/reducer';
import { Post } from '../@types/post';

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { orderBy, Timestamp, addDoc, getDoc, doc, getFirestore, getDocs, collection, query } from '@firebase/firestore';

interface iPostContext {
    posts: Post[];
    errorMessage: string | null;
    getPosts?: () => void;
    likePost?: ({ postId }: { postId: string }) => void;
    unlikePost?: ({ postId }: { postId: string }) => void;
    createPost?: (description: string, image: string, imageName: string) => void;
}
const defaultValue = {
    posts: [],
    errorMessage: null,
}

const Context = React.createContext<iPostContext>(defaultValue)

const Provider = ({ children }: { children: ReactNode }) => {
    const reducer = (state: any, action: Action) => {
        switch (action.type) {
            case 'create_post':
                return { ...state, posts: [...state.posts] }
            case 'show_posts':
                return { ...state, posts: action.payload }
        }

    }

    const [state, dispatch] = useReducer(reducer, defaultValue)

    const getPosts = async () => {

        try {
            const db = getFirestore()
            let posts: any[] = []

            const q = query(collection(db, "posts"), orderBy('created', 'asc'));

            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                const d = {...doc.data(), id: doc.id}
                posts.push(d)
            });

            dispatch({
                type: 'show_posts',
                payload: posts
            })

        } catch (err) {
            console.error(err)
        }
    }

    const createPost = async (description: string, image: string, imageName: string) => {
        try {
            let post;
            let pathImage: any;
            if (image) {
                const blob = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        resolve(xhr.response);
                    };
                    xhr.onerror = function () {
                        reject(new TypeError('Network request failed'));
                    };
                    xhr.responseType = 'blob';
                    xhr.open('GET', image, true);
                    xhr.send(null);
                })
                const fileRef = ref(getStorage(), imageName);
                const result = await uploadBytes(fileRef, blob);

                pathImage = await getDownloadURL(fileRef);
            }

            const auth = getAuth();
            await onAuthStateChanged(auth, async (user) => {
                if (user != null) {
                    const db = getFirestore()
                    const u = await getDoc(doc(db, 'users', user.uid))

                    const { register, name, profileImage } = await u.data()
                    let hasImage = image

                    try {
                        post = await addDoc(collection(db, 'posts'), {
                            description: description,
                            image: hasImage ? true : false,
                            pathImage: hasImage ? pathImage : '',
                            register: register,
                            name: name,
                            pathProfileImage: profileImage,
                            profileImage: profileImage ? true : false,
                            likes: [],
                            created: Timestamp.now()
                        })

                        alert('Post realizado com sucesso!')

                    } catch (error) {
                        console.log(error)
                    }

                }
            });

            dispatch({ type: 'create_post' })
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Context.Provider
            value={{
                ...state,
                getPosts,
                createPost,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export { Provider, Context }