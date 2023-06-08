import React, { useReducer, ReactNode } from 'react';
import { Action } from '../@types/reducer';
import { Post } from '../@types/post';
import { posts } from '../../posts';


interface iPostContext {
    posts: Post[];
    errorMessage: string | null;
    getPosts?: () => void;
    likePost?: ({ postId }: { postId: string }) => void;
    unlikePost?: ({ postId }: { postId: string }) => void;
    createPost?: (formData: any, navigation: any) => void;
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
                return { ...state, posts: [...state.posts, action.payload] }
            case 'show_posts':
                return { ...state, posts: action.payload }
        }

    }

    const [state, dispatch] = useReducer(reducer, defaultValue)

    const getPosts = async () => {
        try {
            dispatch({
                type: 'show_posts',
                payload: posts
            })

        } catch (err) {
            console.error(err)
        }
    }

    const createPost = async (formData: any, navigation: any) => {
        try {
            let description;

            if (formData._parts.length === 1) {
                description = formData._parts[0][1]
            } else {
                description = formData._parts[1][1]
            }

            let post = {
                name: 'Luísa Anjos',
                profileImage: true,
                pathProfileImage: require('../../assets/images/profile.jpg'),
                register: "123456",
                description: description,
                image: false,
                likes: []
            }

            dispatch({ type: 'create_post', payload: post })
            navigation.navigate('HomeNavigator', {screen: 'Home'})

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