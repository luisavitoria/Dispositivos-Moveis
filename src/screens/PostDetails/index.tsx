
import React, {useEffect, useState, useContext} from 'react';
import { View } from 'react-native';
import { Context as PostContext} from '../../context/PostContext';
import { styles } from './styles';

import PostItem from '../../components/PostItem';

const PostDetails = ({ route }: {route: any, navigation: any}) => {
    const { postId } = route.params;

    const [postDetail, setPostDetail] = useState<any>({})


    const {getPosts, posts} = useContext(PostContext)

    useEffect(() => {
      getPosts && getPosts()
      getPostDetail()
    },[])
  
    function getPostDetail() {
        for(const post of posts) {
            if(post.id === postId) {
                setPostDetail(post)
            }
        }
    }

  return (
    <View style={styles.container}>
        {postDetail && <PostItem post={postDetail} />}
    </View>
  )
}

export default PostDetails;