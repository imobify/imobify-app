import { Alert } from 'react-native'
import { Divider } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

import Loading from '@components/loading'
import ListItem from '@components/list-item'
import { FlashList } from '@shopify/flash-list'
import CustomTitle from '@components/custom-title'
import { PaginatedFavorite } from '@models/favorites'
import { useNavigation } from '@react-navigation/native'
import { FavoritesTabNavigatorParams } from '@routes/types'
import { getPaginatedFavorites } from '@services/favorites'
import { useRefreshOnFocus } from '@hooks/useRefreshOnFocus'
import { usePaginatedList } from '@hooks/queries/usePaginatedList'
import { useDeleteFavoriteMutation } from '@hooks/mutations/deleteFavorite'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'

type Props = NativeStackScreenProps<FavoritesTabNavigatorParams, 'list'>

type FavoriteListItemProps = {
  item: PaginatedFavorite
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refetch: () => any
}

type NavigationType = NativeStackNavigationProp<FavoritesTabNavigatorParams, 'list'>

const FavoriteListItem: React.FC<FavoriteListItemProps> = ({ item, refetch }: FavoriteListItemProps) => {
  const navigation = useNavigation<NavigationType>()
  const deleteMutation = useDeleteFavoriteMutation(refetch)

  const handleDelete = () => {
    Alert.alert('Remover dos favoritos', 'Tem certeza que deseja remover o imóvel dos favoritos?', [
      {
        text: 'Cancelar',
        style: 'cancel'
      },
      {
        text: 'Continuar',
        onPress: () => deleteMutation.mutate({ favoriteId: item.id })
      },
    ])

    return
  }

  return (
    <ListItem.Root
      onPress={() => navigation.navigate('realEstate', { id: item.realEstate.id })}
    >
      {item.realEstate.photos[0] && item.realEstate.photos[0].photoUrl ? (
        <ListItem.Left
          imageSource={{ uri: item.realEstate!.photos[0].photoUrl }}
        />
      ) : null}
      <ListItem.Content
        title={item.realEstate.title}
        subtitles={[`${item.realEstate.address}`]}
      />
      <ListItem.Right 
        icon='close-thick'
        tooltipTitle='Remover dos favoritos.'
        iconContainerColor='red'
        onPress={handleDelete}
      />
    </ListItem.Root>
  )
}

const Favorites: React.FC<Props> = () => {
  // const { data, isLoading, isError, fetchNextPage, refetch } = usePaginatedFavorites(10)
  const { data, isLoading, isError, fetchNextPage, refetch } = usePaginatedList<PaginatedFavorite>('favorites', getPaginatedFavorites ,10)

  useRefreshOnFocus(refetch)

  if (isLoading || !data) {
    return (
      <Loading />
    )
  }

  if (isError) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 }}>
        ERROR...
      </SafeAreaView>
    )
  }

  const flattenedData = data.pages.flatMap(page => page.content)

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 32 }}>
      <CustomTitle
        style={{ marginLeft: 16 }}
      >
        Meus favoritos
      </CustomTitle>
      <FlashList 
        estimatedItemSize={100}
        data={flattenedData}
        renderItem={({ item }) => (
          <FavoriteListItem item={item} refetch={refetch} />
        )}
        keyExtractor={({ id }) => id.toString()}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.2}
        onRefresh={refetch}
        refreshing={isLoading}
        ItemSeparatorComponent={() => <Divider style={{ marginVertical: 8 }} />}
      />
    </SafeAreaView>
  )
}

export default Favorites