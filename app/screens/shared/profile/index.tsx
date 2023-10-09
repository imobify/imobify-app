import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'
import { useCurrentUser } from '@hooks/queries/useCurrentUser'
import Loading from '@components/loading'
import { Avatar, Button, Divider, IconButton, Surface, Text } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { theme } from '@theme'
import CustomTitle from '@components/custom-title'
import { useAuthActions } from '@stores/authStore'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ProfileStackParamList } from '@routes/profile.routes'

type Props = NativeStackScreenProps<ProfileStackParamList, 'userProfile'>

const Profile: React.FC<Props> = ({ navigation }: Props) => {
  const { signOut } = useAuthActions()
  const { data, isLoading, isError } = useCurrentUser()

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
          />
        ) : (
          <IconButton 
            mode='contained'
            containerColor={theme.colors.secondary}
            icon='camera'
            iconColor='white'
            size={28}
            style={styles.editAvatarBtn}
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
        onPress={signOut}
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
