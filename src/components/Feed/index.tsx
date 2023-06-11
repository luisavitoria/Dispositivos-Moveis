
import React, { useContext, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack'
import PostItem from '../PostItem';

import { Context as PostContext } from '../../context/PostContext';

interface FeedProps {
  screenName?: string;
  navigation?: StackNavigationProp<any, any>;
}

const Feed = ({ screenName, navigation }: FeedProps) => {
  const { getPosts, posts } = useContext(PostContext)

  useEffect(() => {
    getPosts && getPosts()
  }, [])

  return (
    <View>
      {posts &&
        <FlatList
          data={posts.slice(0).reverse()}
          renderItem={({ item }) => <PostItem post={item} screenName={screenName} navigation={navigation} />}
        />
      }

    </View>
  )
}

export default Feed;