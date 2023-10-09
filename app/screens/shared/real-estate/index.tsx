import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeStackParamsList } from '@routes/home.routes'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'
import { useRealEstateDetails } from '@hooks/queries/useRealEstateDetails'
import Loading from '@components/loading'
import { Avatar, Button, Divider, Text } from 'react-native-paper'
import { useUser } from '@stores/authStore'
import Carousel from '@components/carousel'
import { useRefreshOnFocus } from '@hooks/useRefreshOnFocus'
import CustomTitle from '@components/custom-title'

type Props = NativeStackScreenProps<HomeStackParamsList, 'realEstate'>

const RealEstate: React.FC<Props> = ({ route, navigation }: Props) => {
  const { id } = route.params
  const { userId } = useUser()

  const { data, isLoading, isError, refetch } = useRealEstateDetails(id)
  useRefreshOnFocus(refetch)

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
                onPress={() => navigation.getParent()?.navigate('realEstateRoutes', { screen: 'edit' })}
                icon='pencil'
                style={styles.primaryBtn}
              >
                <Text variant='titleMedium' style={styles.primaryBtnText}>Editar</Text>
              </Button>
              <Button
                mode='text'
                uppercase
              >
                <Text variant='titleMedium' style={styles.dangerBtn}>
                  Desativar
                </Text>
              </Button>
            </View>
          ) : (
            <View
              style={styles.buttons}
            >
              <Button
                mode='contained'
                onPress={() => console.log('hii')}
                style={styles.primaryBtn}
                icon='thumb-up'
              >
                <Text variant='titleMedium' style={styles.primaryBtnText}>Tenho interesse</Text>
              </Button>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default RealEstate