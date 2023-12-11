import React from 'react';
import { View, Text, Image } from 'react-native';

const ProfileHeader = ({ photoURL, username }) => {
  return (
    <View>
      <Image source={{ uri: photoURL }} style={{ width: 100, height: 100, borderRadius: 50 }} />
      <Text>{username}</Text>
    </View>
  );
};

export default ProfileHeader;
