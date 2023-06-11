import Profile from "../screens/Profile";

export interface Auth {
    email: string;
    password: string;
    name?: string;
    register?: string;
    cpf?: string;
    profileImage?: string;
    
}
