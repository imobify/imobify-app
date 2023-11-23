import { format } from 'date-fns'
import { Alert } from 'react-native'
import { Divider } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

import Loading from '@components/loading'
import { useUser } from '@stores/authStore'
import ListItem from '@components/list-item'
import { PaginatedLead } from '@models/lead'
import { FlashList } from '@shopify/flash-list'
import CustomTitle from '@components/custom-title'
import { getPaginatedLeads } from '@services/leads'
import { LeadsTabNavigatorParams } from '@routes/types'
import { useNavigation } from '@react-navigation/native'
import { useRefreshOnFocus } from '@hooks/useRefreshOnFocus'
import { usePaginatedList } from '@hooks/queries/usePaginatedList'
import { useDeleteLeadMutation } from '@hooks/mutations/deleteLead'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'

type Props = NativeStackScreenProps<LeadsTabNavigatorParams, 'list'>

type ListItemAnnouncerProps = {
  item: PaginatedLead,
}

type ListItemSeekerProps = {
  item: PaginatedLead
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refetch: () => any
}

type NavigationType = NativeStackNavigationProp<LeadsTabNavigatorParams, 'list'>

const ListItemAnnouncer: React.FC<ListItemAnnouncerProps> = ({ item }: ListItemAnnouncerProps) => {
  const navigation = useNavigation<NavigationType>()


  return (
    <ListItem.Root
      onPress={() => navigation.navigate('realEstate', { id: item.realEstate_id })}
    >
      {item.author && item.author.avatar_url ? (
        <ListItem.Left
          imageSource={{ uri: item.author!.avatar_url }}
        />
      ) : (
        <ListItem.Left />
      )}
      <ListItem.Content
        title={item.author!.name}
        subtitles={[`${item.author!.email} - ${item.author!.phone}`, `${item.realEstate!.title}`]}
      />
    </ListItem.Root>
  )
}

const ListItemSeeker: React.FC<ListItemSeekerProps> = ({ item, refetch }: ListItemSeekerProps) => {
  const navigation = useNavigation<NavigationType>()
  const date = format(new Date(item.createdAt), 'dd/MM/yyyy - HH:mm')
  const deleteMutation = useDeleteLeadMutation(refetch)

  const handleDelete = () => {
    Alert.alert('Remover interesse', 'Ao remover seu interesse no imóvel, o anunciante deixará de ter acesso às suas informações de contato no app.', [
      {
        text: 'Cancelar',
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: () => deleteMutation.mutate({ leadId: item.id })
      },
    ])

    return
  }

  return (
    <ListItem.Root
      onPress={() => navigation.navigate('realEstate', { id: item.realEstate_id })}
    >
      {item.realEstate!.photos[0] && item.realEstate!.photos[0].photoUrl ? (
        <ListItem.Left
          imageSource={{ uri: item.realEstate!.photos[0].photoUrl }}
        />
      ) : null}
      <ListItem.Content
        title={item.realEstate!.title}
        subtitles={[`${date}`]}
      />
      <ListItem.Right 
        icon='close-thick'
        tooltipTitle='Remover interesse.'
        iconContainerColor='red'
        onPress={handleDelete}
      />
    </ListItem.Root>
  )
}

const Leads: React.FC<Props> = () => {
  const { userType } = useUser()
  const { data, isLoading, isError, fetchNextPage, refetch } = usePaginatedList<PaginatedLead>('leads', getPaginatedLeads, 10)

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
        {userType === 1 ? 'Meus Interesses' : 'Clientes Interessados'}
      </CustomTitle>
      <FlashList 
        estimatedItemSize={100}
        data={flattenedData}
        renderItem={({ item }) => (
          <>
            {userType === 1 ? (
              <ListItemSeeker item={item} refetch={refetch} />
            ) : userType === 2 ? (
              <ListItemAnnouncer item={item} />
            ) : null}
            {/* <Text>{JSON.stringify(item, undefined, '\n')}</Text> */}
          </>
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

export default Leads