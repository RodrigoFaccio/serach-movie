import { View, Text,StyleSheet, TextInput,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';

interface PropsCard {
    path: string;
    name: string;
    sinopse: string;
    selected: boolean;
    onSelect: (name:string) => void;
}
export default function Card({ name, path, sinopse,selected ,onSelect}: PropsCard) {
    console.log(selected)
  
  return (
      <View style={styles.container}>
          <View style={{width:'90%',flexDirection:'row',alignItems:'center'}}>
               <Image source={{ uri: 'https://image.tmdb.org/t/p/w500/'+path }} style={ styles.image} />
          
              <Text style={styles.text} >
                  Nome:{name} 
          </Text>
          </View>
              
         
          <View>
              {
                  selected ? (
                       <Ionicons name="remove-circle-sharp" size={24} style={{marginRight:20}} color="#c83c3c" onPress={()=>onSelect(name)} />
              
                  ) : (
                           <Ionicons name="add-circle" size={24} style={{marginRight:20}} color="#45ca39" onPress={()=>onSelect(name)} />
                  )
              }
         
              
          </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#262633',
    borderWidth: 1,
        borderColor: '#565656',
        flexDirection: 'row',
        justifyContent:'space-between',
    alignItems:'center',
    height: 100,
        width: '90%',
        marginTop: 20,
        borderRadius: 8,
        
    
    
    },
    image: {
        width: '20%',
        height: 90,
        marginLeft: 10,
        borderRadius: 8,
        
        
    },
    text: {
        color: 'white',
        paddingLeft: 10,
        fontSize: 16,
        width:250
    }
  
});
