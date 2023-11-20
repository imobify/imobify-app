import { theme } from '@theme'
import { Alert, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar, Button, Divider, IconButton, Surface, Text } from 'react-native-paper'

import Loading from '@components/loading'
import CustomTitle from '@components/custom-title'
import { useAuthActions } from '@stores/authStore'
import { ProfileTabNavigatorParams } from '@routes/types'
import { useRefreshOnFocus } from '@hooks/useRefreshOnFocus'
import { useCurrentUser } from '@hooks/queries/useCurrentUser'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { styles } from './styles'

type Props = NativeStackScreenProps<ProfileTabNavigatorParams, 'myProfile'>

const Profile: React.FC<Props> = ({ navigation }: Props) => {
  const { signOut } = useAuthActions()
  const { data, isLoading, isError, refetch } = useCurrentUser()

  useRefreshOnFocus(refetch)

  if (isLoading) {
    return (
      <Loading />
    )
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>
          ERROR...
        </Text>
      </SafeAreaView>
    )
  }

  const handleEditAvatar = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    if (status !== 'granted') {
      alert('É necessário conceder permissão de acesso à galeria!')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      selectionLimit: 1,
      quality: 1,
      allowsEditing: true
    })

    if (!result.canceled) {
      navigation.navigate('editAvatar', { avatar: result.assets[0].uri })
    }
  }

  const handleLogout = () => {
    Alert.alert('Logout', 'Deseja mesmo fazer logout?', [
      {
        text: 'Cancelar',
        style: 'cancel'
      },
      {
        text: 'Continuar',
        onPress: () => signOut()
      },
    ])

    return
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {data.avatar_url ? (
          <Avatar.Image
            size={168}
            source={{
              uri: data.avatar_url
            }}
          />
        ) : (
          <Avatar.Icon
            size={168}
            icon="account"
            style={styles.userIcon}
          />
        )}

        {data.avatar_url ? (
          <IconButton 
            mode='contained'
            containerColor={theme.colors.secondary}
            icon='pencil'
            iconColor='white'
            size={28}
            style={styles.editAvatarBtn}
            onPress={handleEditAvatar}
          />
        ) : (
          <IconButton 
            mode='contained'
            containerColor={theme.colors.secondary}
            icon='camera'
            iconColor='white'
            size={28}
            style={styles.editAvatarBtn}
            onPress={handleEditAvatar}
          />
        )}
      </View>

      <CustomTitle
        style={styles.title}
      >
        {data.name}
      </CustomTitle>

      <Surface style={styles.card}>
        <View style={styles.info}>
          <Text variant='titleMedium'>
            CPF/CNPJ:
          </Text>
          <Text>
            {data.document}
          </Text>
        </View>

        <Divider />

        <View style={styles.info}>
          <Text variant='titleMedium'>
            Email:
          </Text>
          <Text>
            {data.email}
          </Text>
        </View>

        <Divider />

        <View style={styles.info}>
          <Text variant='titleMedium'>
            Telefone:
          </Text>
          <Text>
            {data.phone}
          </Text>
        </View>
        
      </Surface>

      <Button
        mode='contained'
        icon={() => <MaterialCommunityIcons name='pencil' size={18} color='white'  />}
        style={styles.editBtn}
        onPress={() => navigation.navigate('editProfile', {
          id: data?.id,
          document: data?.document,
          email: data?.email,
          phone: data?.phone,
          name: data?.name
        })}
      >
        Editar
      </Button>

      <Button
        mode='text'
        uppercase
        onPress={handleLogout}
        style={styles.signOutBtn}
      >
        <Text
          variant='titleMedium'
          style={{ color: 'red' }}
        >
          Sair
        </Text>
      </Button>
    </SafeAreaView>
  )
}

export default Profile
