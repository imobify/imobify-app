import { NativeStackScreenProps } from '@react-navigation/native-stack'
import ListItem from '@components/list-item'
import Loading from '@components/loading'
import { usePaginatedRealEstates } from '@hooks/queries/usePaginatedRealEstates'
import { useRefreshOnFocus } from '@hooks/useRefreshOnFocus'
import { FlashList } from '@shopify/flash-list'
import { Divider } from 'react-native-paper'
// import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RealEstateStackParamList } from '@routes/announcer.routes'

type Props = NativeStackScreenProps<RealEstateStackParamList, 'list'>

const RealEstateList: React.FC<Props> = ({ navigation }: Props) => {
  const { data, isLoading, isError, fetchNextPage, refetch } = usePaginatedRealEstates(10)

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
  
  const flattenedData = data.pages.flatMap(page => page.realEstates)
  
  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: 32 }}
    >
      <FlashList
        estimatedItemSize={100}
        data={flattenedData}
        renderItem={({ item }) => (
          <ListItem.Root
            onPress={() => navigation.getParent()?.navigate('home', { screen: 'realEstate', params: {
              id: item.id
            } })}
          >
            {item.photos[0]?.photoUrl && (<ListItem.Left
              imageSource={{
                uri: item.photos[0].photoUrl
              }}
            />)}
            <ListItem.Content
              title={item.title}
              subtitle={`${item._count.leads} interesse(s)`}
            />
            <ListItem.Right
              icon={item.isActive ? 'check' : 'close'}
              tooltipTitle={item.isActive ? 'O imóvel está ativo, ou seja, é visível no mapa.' : 'O imóvel está inativo, ou seja, está invisível no mapa.'}
              iconContainerColor={item.isActive ? '#4ee44e' : 'red'}
            />
          </ListItem.Root>
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

export default RealEstateList