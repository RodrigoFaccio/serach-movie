import { View, Text,StyleSheet, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MultiSelect from 'react-native-multiple-select';
import Card from '../../components/Card';
const apiKey = 'c21423006a220205b03494791e5e849e';
const query = 'Star Wars';

interface MovieProps{
  overview: string;
  poster_path: string;
  title: string;
  selected:boolean
}

export default function Home() {
    const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [sorteado, setSorteado] = useState<string|undefined>();


    const [search, setSearch] = useState('');
  

    useEffect(() => {
        const getMovies = async() => {
        
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${'paris'}&language=pt-BR`)
  .then((response:any) => {
    console.log(response.data.results);
    const usuariosComStatus = response.data.results.map((value:any) => {
      return { ...value, selected: false };
    });
      setMovies(usuariosComStatus)
  })
  .catch((error:any) => {
    console.log(error);
  });
    }
    getMovies()

    }, [search]);
    
    if (movies.length < 0) {
        return null
    }
  const handleTextChange = (newText:string) => {
    setSearch(newText);
  };

  const handleSelect = (name: string) => {
    const findMovie = selected.find(item => item === name);
    if (!findMovie) {
      setSelected(prev => [...prev, name])
      const newMovies = movies.map((item) => {
      if (item.title === name) {
        return { ...item, selected: true };
      }
      return item;
      });
      setMovies(newMovies)
      
    } else {
      const removedMovies = selected.filter(item => item !== name)
      setSelected(removedMovies)
      
      const newMovies = movies.map((item) => {
      if (item.title === name) {
        return { ...item, selected: false };
      }
      return item;
      });
      setMovies(newMovies)
    }
  }
  const sortedMovies = () => {
    const indice = Math.floor(Math.random() * selected.length);
    setSorteado(selected[indice])
}
  console.log(selected)
  return (
    <View style={styles.container}>
      <Text style={{color:'white'}}>{sorteado}</Text>
      <TextInput value={search} onChangeText={handleTextChange} style={styles.input} />
      <Button title='Sortear' onPress={sortedMovies} />

      {
        movies.map(item => (
          <Card name={item.title} selected={item.selected} path={item.poster_path} onSelect={handleSelect} sinopse={ item.overview} />
        ))
      }
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D29',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    height: 30,
    backgroundColor: 'white',
    marginTop: 100,
    borderRadius:5

    
  }
});
