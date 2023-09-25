import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Actions from "../database/store/actions"
const Card = (props) => {
    const{data}=props


const dispatch=useDispatch()
const navigation = useNavigation();

const handleSelectDestinations=(data)=>{

    dispatch(Actions.setCurrentDestination(data))

    navigation.navigate('Activities')

}









    
  return (
    <View style={styles.card}>
        <TouchableOpacity onPress={()=>handleSelectDestinations(data)}>
        <Image
        style={styles.image}
        source={{ uri: 'https://www.imf.org/-/media/Images/IMF/News/news-article-images/2020/CF-570x312-Tourism-Preto-perola-Getty-Images-iStock-1011241694.ashx?mh=304&la=en&h=304&w=556&mw=561' }}
      />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.subtitle}>{data.destinationName}</Text>
        <Text style={styles.subtitle2}>{data.startDate}</Text>
      </View>
        </TouchableOpacity>
    
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    margin: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
  },
  subtitle2:{
    fontSize: 14,
    color: '#8888',
  }
});

export default Card;
