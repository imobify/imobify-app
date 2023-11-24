import { SafeAreaView } from 'react-native-safe-area-context'

import { ProfileTabNavigatorParams } from '@routes/types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StackActions } from '@react-navigation/native'

import { styles } from './styles'
import SignupForm from '../signup/components/signup-form'
import CustomTitle from '@components/custom-title'
import { editUserSchema } from '../signup/schemas/edit-user'
import { useMutation } from '@tanstack/react-query'
import { editUser } from '@services/user'
import { SignupFormType } from '../signup/schemas/signup-form'

type Props = NativeStackScreenProps<ProfileTabNavigatorParams, 'editProfile'>

const EditProfile: React.FC<Props> = ({ route, navigation }: Props) => {
  const { id, initialValues } = route.params

  const editMutation = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      navigation.dispatch(
        StackActions.popToTop()
      )
    }
  })

  const handleSubmit = async (data: SignupFormType) => {
    const validatedData = await editUserSchema.validate(data)

    editMutation.mutateAsync({ form: validatedData, id })
  }

  return (
    <SafeAreaView 
      style={styles.container}
    >
      <CustomTitle>
        Edite seus dados
      </CustomTitle>
      <SignupForm 
        mode='edit'
        initialValues={initialValues}
        onFormSubmit={handleSubmit}
        submitButtonText='Salvar'
      />
    </SafeAreaView>
  )
}

export default EditProfile
