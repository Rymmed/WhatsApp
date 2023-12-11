import React from 'react';
import { TextInput, Button, View } from 'react-native';

const StatusUpdate = ({ status, onUpdateStatus }) => {
  return (
    <View>
      <TextInput
        value={status}
        onChangeText={onUpdateStatus}
        placeholder="Status"
      />
      <Button title="Update Your Status!" onPress={onUpdateStatus} />
    </View>
  );
};

export default StatusUpdate;
