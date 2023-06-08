
export interface Post {
    id: number;
    name: string;
    profileImage: boolean;
    pathProfileImage?: string | undefined;
    description: string;
    register: string;
    image: boolean;
    pathImage?: string | undefined;
    likes: string[];
}
