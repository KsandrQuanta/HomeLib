import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Header from './Header';
import {AuthContext} from '../navigation/AuthProvider';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

export default function BookAdd({route, navigation}) {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  return (
    <View style={styles.container}>
      <Header />
      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          marginLeft: 10,
          marginBottom: 10,
          color: '#465881',
        }}>
        Add Book
      </Text>
      <View style={{width: '80%', justifyContent: 'center'}}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#465881',
            marginBottom: 3,
          }}>
          Name:
        </Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Name..."
            value={name}
            placeholderTextColor="#2E86C1"
            onChangeText={book_name => setName(book_name)}
          />
        </View>
      </View>
      <View style={{width: '80%', justifyContent: 'center'}}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#465881',
            marginBottom: 3,
          }}>
          Author:
        </Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Author..."
            value={author}
            placeholderTextColor="#2E86C1"
            onChangeText={book_author => setAuthor(book_author)}
          />
        </View>
      </View>
      <View style={{width: '80%', justifyContent: 'center'}}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#465881',
            marginBottom: 3,
          }}>
          Year:
        </Text>
        <View style={styles.inputView}>
          <TextInput
            keyboardType="numeric"
            style={styles.inputText}
            placeholder="Year..."
            value={year.toString()}
            placeholderTextColor="#2E86C1"
            onChangeText={book_year => setYear(book_year)}
          />
        </View>
      </View>
      <View style={{width: '80%', justifyContent: 'center'}}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#465881',
            marginBottom: 3,
          }}>
          Comment:
        </Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Comment..."
            value={comment}
            placeholderTextColor="#2E86C1"
            onChangeText={book_comment => setComment(book_comment)}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          var user = firebase.auth().currentUser;

          firestore()
            .collection('Books')
            .add({
              name: name,
              author: author,
              comment: comment,
              year: parseInt(year),
              user_id: user.uid,
            })
            .then(() => {
              console.log('Book added!');
              const firestoreItems = firestore()
                .collection('Books')
                .where('user_id', '==', user.uid)
                .where('name', '==', name)
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(doc => {
                    let temp = doc.data();
                    temp.id = doc.id;
                    navigation.navigate('Home', {addedBook: temp});
                  });
                });
            });
        }}
        style={styles.loginBtn}>
        <Text style={styles.loginText}>Add book</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={{color: '#465881', fontSize: 16}}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
  },
  inputView: {
    width: '100%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 45,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
  },
  inputText: {
    height: 50,
    color: 'white',
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
