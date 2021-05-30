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

export default function BookUpdate({route, navigation}) {
  const {item} = route.params;
  const [name, setName] = useState(item.name);
  const [year, setYear] = useState(item.year);
  const [author, setAuthor] = useState(item.author);
  const [comment, setComment] = useState(item.comment);
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
        Update Book
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
          firestore()
            .collection('Books')
            .doc(item.id)
            .update({
              name: name,
              author: author,
              comment: comment,
              year: parseInt(year),
              user_id: item.user_id,
            })
            .then(() => {
              console.log('Book edited!');
              navigation.navigate('Home');
            });
        }}
        style={styles.loginBtn}>
        <Text style={styles.loginText}>EDIT</Text>
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
