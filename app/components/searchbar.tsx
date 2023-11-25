import { useEffect, useState } from 'react'

import { FlatList, StyleSheet, View, ViewStyle } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Searchbar } from 'react-native-paper'

import { searchRealEstates } from '@services/real-estate'
import { SearchRealEstate } from '@models/realEstate/SearchRealEstate'
import { theme } from '@theme'

import ListItem from './list-item'
import { HomeTabNavigatorParams } from '@routes/types'

type SearchResultProps = {
  item: SearchRealEstate
}

type SearchBarProps = {
  style?: ViewStyle
}

type NavigationType = NativeStackNavigationProp<HomeTabNavigatorParams, 'home'>

const SearchResult: React.FC<SearchResultProps> = ({ item }: SearchResultProps) => {
  const navigation = useNavigation<NavigationType>()

  return (
    <ListItem.Root
      onPress={() => navigation.navigate('realEstate', { id: item.id })}
      customStyle={styles.resultItem}
    >
      <ListItem.Left 
        imageSource={{ uri: item.photoUrl }}
        imageSize={40}
      />
      <ListItem.Content 
        title={item.title}
        subtitles={[]}
      />
    </ListItem.Root>
  )}

const SearchBar: React.FC<SearchBarProps> = ({ style }: SearchBarProps) => {
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchRealEstate[]>([])

  const handleSearch = async (query: string) => {
    setLoading(true)
    const data = await searchRealEstates(query)
    setSearchResults(data)
    setLoading(false)
  }

  const handleClear = () => {
    setQuery('')
    setSearchResults([])
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query !== '') {
        handleSearch(query)
      }
    }, 1500)

    return () => clearTimeout(timer)
  }, [query])

  return (
    <View
      style={{...styles.container, ...style}}
    >
      <Searchbar
        style={styles.input}
        value={query}
        onChangeText={(query) => setQuery(query)}
        placeholder='Pesquisar'
        loading={loading}
        onClearIconPress={handleClear}
      />
      <FlatList 
        contentContainerStyle={styles.results}
        data={searchResults}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => <SearchResult item={item} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 8,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.secondary
  },
  results: {
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 4
  },
  resultItem: {
    backgroundColor: theme.colors.surface,
    padding: 8,
    borderWidth: 2,
    borderColor: theme.colors.secondary
  }
})

export default SearchBar