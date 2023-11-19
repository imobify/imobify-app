import { View } from 'react-native'
import { Avatar, Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ProfileTabNavigatorParams } from '@routes/types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { styles } from './styles'
import { useUser } from '@stores/authStore'
import { useMutation } from '@tanstack/react-query'
import { updateAvatar } from '@services/user'
import { StackActions } from '@react-navigation/native'

type Props = NativeStackScreenProps<ProfileTabNavigatorParams, 'editAvatar'>

const EditAvatar: React.FC<Props> = ({ route, navigation }: Props) => {
  const { avatar } = route.params
  const { userId } = useUser()

  const updateAvatarMutation = useMutation({
    mutationFn: updateAvatar,
    onSuccess: () => {
      navigation.dispatch(
        StackActions.popToTop()
      )
    }
  })

  const handleSave = (uri: string) => {
    updateAvatarMutation.mutate({ uri, userId: userId! })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Avatar.Image
          size={320}
          source={{
            uri: avatar
          }}
        />
      </View>
      <Button
        mode='contained'
        style={styles.saveBtn}
        onPress={() => handleSave(avatar)}
      >
          Salvar
      </Button>
    </SafeAreaView>
  )
}

export default EditAvatar
