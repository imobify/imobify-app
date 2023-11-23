import { Divider } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

import Loading from '@components/loading'
import ListItem from '@components/list-item'
import CustomTitle from '@components/custom-title'
import { FlashList } from '@shopify/flash-list'
import { useRefreshOnFocus } from '@hooks/useRefreshOnFocus'
import { RealEstateTabNavigatorParams } from '@routes/types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { usePaginatedRealEstates } from '@hooks/queries/usePaginatedRealEstates'

type Props = NativeStackScreenProps<RealEstateTabNavigatorParams, 'list'>

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
      <CustomTitle
        style={{ marginLeft: 16 }}
      >
        Meus imóveis
      </CustomTitle>
      <FlashList
        estimatedItemSize={100}
        data={flattenedData}
        renderItem={({ item }) => (
          <ListItem.Root
            onPress={() => navigation.navigate('realEstate', { id: item.id })}
          >
            {item.photos[0]?.photoUrl && (<ListItem.Left
              imageSource={{
                uri: item.photos[0].photoUrl
              }}
            />)}
            <ListItem.Content
              title={item.title}
              subtitles={[`${item._count.leads} interesse(s)`]}
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