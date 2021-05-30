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

export default function HomeScreen({route, navigation}) {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [flag, setFlag] = useState(true);
  const [counter, setCount] = useState(0);
  const [masterDataSource, setMasterDataSource] = useState(
    route.params ? route.params.addedBook : [],
  );

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    console.log('awfwa');
    setMasterDataSource([]);
    setFilteredDataSource([]);
    var user = firebase.auth().currentUser;
    var getItems = [];
    const firestoreItems = firestore()
      .collection('Books')
      .where('user_id', '==', user.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let temp = doc.data();
          temp.id = doc.id;
          getItems.push(temp);
          setMasterDataSource(old => [...old, temp]);
          setFilteredDataSource(old => [...old, temp]);
        });
      })
      .catch(e => console.log('fwafaw'));
  }, [route.params]);
  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(item => {
        return item.name.toLowerCase().startsWith(text.toLowerCase());
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
    return (
      <View
        style={{
          height: 80,
          width: '100%',
          flex: 1,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{width: '55%', flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Book', {item: item})}
            style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{height: 40, width: 40, marginLeft: 16}}
              source={require('../img/book.png')}
            />
            <Text style={{fontSize: 18, marginLeft: 16, fontWeight: 'bold'}}>
              {item.name}, {item.year}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '42%',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginLeft: 4,
            paddingRight: 2,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('BookUpdate', {item: item})}>
            <Image
              style={{height: 50, width: 50, marginLeft: 16}}
              source={require('../img/edit.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              var temList = masterDataSource.filter(master_item => {
                if (master_item.id !== item.id) {
                  return master_item;
                }
              });

              setMasterDataSource(temList);
              setFilteredDataSource(temList);

              firestore()
                .collection('Books')
                .doc(item.id)
                .delete()
                .then(() => {
                  console.log('Book deleted!');
                });
            }}>
            <Image
              style={{height: 50, width: 50, marginLeft: 20}}
              source={require('../img/delete.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header />
      <SearchBar
        round
        onChangeText={text => searchFilterFunction(text)}
        onClear={text => searchFilterFunction('')}
        placeholder="Type Here..."
        value={search}
        color="white"
        lightTheme
      />
      <FlatList
        data={filteredDataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
      />
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            setCount(counter + 1);
            navigation.navigate('BookAdd');
          }}
          style={styles.loginBtn}>
          <Text style={styles.loginText}>ADD BOOK</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
    fontSize: 18,
  },
});
