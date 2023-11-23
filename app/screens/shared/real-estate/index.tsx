import { Alert, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar, Button, Divider, FAB, Text } from 'react-native-paper'

import Loading from '@components/loading'
import { useUser } from '@stores/authStore'
import Carousel from '@components/carousel'
import CustomTitle from '@components/custom-title'
import { toggleLeadStatus } from '@services/leads'
import { useMutation } from '@tanstack/react-query'
import { HomeTabNavigatorParams } from '@routes/types'
import { StackActions } from '@react-navigation/native'
import { parseRealEstate } from '@utils/parseRealEstate'
import { useRefreshOnFocus } from '@hooks/useRefreshOnFocus'
import { editStatusRealEstate } from '@services/real-estate'
import { useDeleteLeadMutation } from '@hooks/mutations/deleteLead'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useRealEstateDetails } from '@hooks/queries/useRealEstateDetails'

import { styles } from './styles'
import { toggleFavoriteStatus } from '@services/favorites'
import { useDeleteFavoriteMutation } from '@hooks/mutations/deleteFavorite'
import { theme } from '@theme'

type Props = NativeStackScreenProps<HomeTabNavigatorParams, 'realEstate'>

const RealEstate: React.FC<Props> = ({ route, navigation }: Props) => {
  const { id } = route.params
  const { userId, userType } = useUser()

  const { data, isLoading, isError, refetch } = useRealEstateDetails(id)

  useRefreshOnFocus(refetch)

  const editStatusMutation = useMutation({
    mutationFn: editStatusRealEstate,
    onSuccess: () => {
      refetch()
    }
  })

  const createLeadMutation = useMutation({
    mutationFn: toggleLeadStatus,
    onSuccess: () => {
      refetch()
    }
  })

  const createFavoriteMutation = useMutation({
    mutationFn: toggleFavoriteStatus,
    onSuccess: () => {
      refetch()
    }
  })
  
  const deleteLeadMutation = useDeleteLeadMutation(refetch)
  const deleteFavoriteMutation = useDeleteFavoriteMutation(refetch)

  if (isLoading) {
    return (
      <Loading />
    )
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>ERRO</Text>
      </SafeAreaView>
    )
  }

  const matchingLead = data.leads.find(lead => lead.author_id === userId)
  const matchingFavorite = data.favorites.find(favorite => favorite.author_id === userId)

  const handleToggleStatus = (status: boolean) => {
    if (status) {
      Alert.alert('Ativar anúncio', 'Ao ativar o anúncio do imóvel, ele se tornará visível no mapa e poderá ser encontrado por todos os usuários.', [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => editStatusMutation.mutate({ status: true, id: data.id })
        },
      ])

      return
    }

    Alert.alert('Desativar anúncio', 'Ao desativar o anúncio do imóvel, ele deixará de ser visível no mapa e não poderá ser encontrado por outros usuários.', [
      {
        text: 'Cancelar',
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: () => editStatusMutation.mutate({ status: false, id: data.id })
      },
    ])

    return
  }

  const handleToggleFavorite = (status: boolean) => {
    if (status) {
      Alert.alert('Adicionar aos favoritos', 'Deseja adicionar o imóvel aos favoritos? Assim, você pode encontrá-lo novamente com facilidade na lista de favoritos.', [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => createFavoriteMutation.mutate({ realEstateId: data.id })
        },
      ])
  
      return
    } else {
      Alert.alert('Remover dos favoritos', 'Tem certeza que deseja remover o imóvel dos favoritos?', [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => deleteFavoriteMutation.mutate({ favoriteId: matchingFavorite!.id })
        },
      ])
  
      return
    }
  }

  const handleToggleLead = (status: boolean) => {
    if (status) {
      Alert.alert('Enviar interesse', 'Enviando seu interesse no imóvel, o anunciante terá acesso às suas informações de contato no app (email, telefone), podendo entrar em contato para uma negociação.', [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => createLeadMutation.mutate({ realEstateId: data.id })
        },
      ])
  
      return
    } else {
      Alert.alert('Remover interesse', 'Ao remover seu interesse no imóvel, o anunciante deixará de ter acesso às suas informações de contato no app.', [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => deleteLeadMutation.mutate({ leadId: matchingLead!.id })
        },
      ])
  
      return
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Carousel 
          data={
            data.photos
          }
        />
        <View
          style={styles.content}
        >
          <CustomTitle>
            {data.title}
          </CustomTitle>
          <Divider 
            style={styles.divider}
          />
          <Text
            variant='titleMedium'
            style={styles.sectionTitle}
          >
            Anunciado por:
          </Text>
          <View
            style={styles.owner}
          >
            {data.owner.avatar_url ? (
              <Avatar.Image 
                size={36}
                source={{ uri: data.owner.avatar_url }}
              />
            ) : (
              <Avatar.Icon
                size={36}
                icon="account"
                style={styles.ownerIcon}
              />
            )}
            <Text
              variant='titleMedium'
            >
              {data.owner.name}
            </Text>
          </View>
          <Divider 
            style={styles.divider}
          />
          <Text
            variant='titleMedium'
            style={styles.sectionTitle}
          >
            Descrição:
          </Text>
          <Text
            variant='bodyLarge'
          >
            {data.description}
          </Text>
          <Divider 
            style={styles.divider}
          />
          <View>
            <Text
              variant='titleMedium'
              style={styles.sectionTitle}
            >
              Informações adicionais:
            </Text>
            <View
              style={styles.address}
            >
              <Text
                variant='titleMedium'
              >
                Endereço
              </Text>
              <Text
                variant='bodyMedium'
              >
                {data.address}
              </Text>
            </View>
            <View
              style={styles.info}
            >
              <Text variant='titleMedium'>
                Área:
              </Text>
              <Text
                variant='bodyMedium'
              >
                {data.area.toLocaleString('pt-BR')} m²
              </Text>
            </View>
            {data.selling_value ? (
              <View
                style={styles.info}
              >
                <Text variant='titleMedium'>
                  Preço de venda:
                </Text>
                <Text
                  variant='bodyMedium'
                >
                  {data.selling_value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </Text>
              </View>
            ) : null}
            {data.renting_value ? (
              <View
                style={styles.info}
              >
                <Text variant='titleMedium'>
                  Preço de locação:
                </Text>
                <Text
                  variant='bodyMedium'
                >
                  {data.renting_value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </Text>
              </View>
            ) : null}
            {data.tax_value ? (
              <View
                style={styles.info}
              >
                <Text variant='titleMedium'>
                  IPTU:
                </Text>
                <Text
                  variant='bodyMedium'
                >
                  {data.tax_value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </Text>
              </View>
            ) : null}
          </View>
          {userId === data.owner_id ? (
            <View
              style={styles.buttons}
            >
              <Button
                mode='contained'
                onPress={() => navigation.dispatch(StackActions.push('realEstateForm', { id: data.id, data: parseRealEstate(data) }))}
                icon='pencil'
                style={styles.primaryBtn}
              >
                <Text variant='titleMedium' style={styles.primaryBtnText}>Editar</Text>
              </Button>
              {data.isActive ? (
                <Button
                  mode='text'
                  uppercase
                  onPress={() => handleToggleStatus(false)}
                >
                  <Text variant='titleMedium' style={styles.dangerBtn}>
                  Desativar
                  </Text>
                </Button>
              ) : (
                <Button
                  mode='text'
                  uppercase
                  onPress={() => handleToggleStatus(true)}
                >
                  <Text variant='titleMedium' style={styles.dangerBtn}>
                  Ativar
                  </Text>
                </Button>
              )}
            </View>
          ) : !matchingLead ? (
            <View
              style={styles.buttons}
            >
              <Button
                mode='contained'
                onPress={() => handleToggleLead(true)}
                style={styles.primaryBtn}
                icon='thumb-up'
              >
                <Text variant='titleMedium' style={styles.primaryBtnText}>Tenho interesse</Text>
              </Button>
            </View>
          ) : (
            <View
              style={styles.buttons}
            >
              <Button
                mode='contained'
                onPress={() => handleToggleLead(false)}
                style={styles.primaryBtn}
                icon='thumb-down'
              >
                <Text variant='titleMedium' style={styles.primaryBtnText}>Remover interesse</Text>
              </Button>
            </View>
          )}
          {userType === 1 && !matchingFavorite ? (
            <FAB 
              icon='heart-plus'
              style={styles.fab}
              onPress={() => handleToggleFavorite(true)}
              color={theme.colors.surface}
            />
          ) : userType === 1 && matchingFavorite ? (
            <FAB 
              icon='heart-remove'
              style={styles.fab}
              onPress={() => handleToggleFavorite(false)}
              color={theme.colors.surface}
            />
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default RealEstate