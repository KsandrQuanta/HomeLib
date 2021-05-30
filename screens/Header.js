import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import auth from '@react-native-firebase/auth';

export default function LoginScreen({navigation}) {
  const {logout} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 30,
            paddingLeft: 20,
            color: '#fb5b5a',
            width: '50%',
          }}>
          Libro
        </Text>
      </View>
      <View
        style={{width: '50%', justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            textAlign: 'right',
            marginLeft: 50,
          }}
          onPress={() => {
            logout();
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'right',
              fontSize: 22,
              textDecorationLine: 'underline',

              color: '#fb5b5a',
            }}>
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2E86C1',
    width: '100%',
    height: '8%',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
});
