import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Header from './Header';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import {SearchBar} from 'react-native-elements';

export default function BookScreen({route, navigation}) {
  const {item} = route.params;
  return (
    <View style={styles.container}>
      <Header />
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            marginLeft: 10,
            marginBottom: 10,
            marginTop: 40,
            color: '#465881',
          }}>
          {item.name}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 26,
          fontWeight: 'bold',
          marginLeft: 10,
          marginTop: 40,
          marginBottom: 10,
          color: '#465881',
        }}>
        Author:
        <Text
          style={{
            fontSize: 26,
            fontWeight: 'bold',
            marginLeft: 10,
            color: '#fb5b5a',
          }}>
          {' '}
          {item.author}
        </Text>
      </Text>
      <Text
        style={{
          fontSize: 26,
          fontWeight: 'bold',
          marginLeft: 10,
          marginTop: 40,
          marginBottom: 10,
          color: '#465881',
        }}>
        Year:
        <Text
          style={{
            fontSize: 26,
            fontWeight: 'bold',
            marginLeft: 10,
            color: '#fb5b5a',
          }}>
          {' '}
          {item.year}
        </Text>
      </Text>
      <Text
        style={{
          fontSize: 26,
          fontWeight: 'bold',
          marginLeft: 10,
          marginTop: 40,
          marginBottom: 10,
          color: '#465881',
        }}>
        Comment:
        <Text
          style={{
            fontSize: 26,
            fontWeight: 'bold',
            marginLeft: 10,
            color: '#fb5b5a',
          }}>
          {' '}
          {item.comment}
        </Text>
      </Text>
      <View style={{width: '100%', alignItems: 'center', marginTop: 50}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={styles.loginBtn}>
          <Text style={styles.loginText}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
    fontSize: 18,
  },
});
