import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import CustomTitle from '@components/custom-title'
import { RealEstateTabNavigatorParams } from '@routes/types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { styles } from './styles'
import AddEditForm from './components/add-edit-form'

type Props = NativeStackScreenProps<RealEstateTabNavigatorParams, 'realEstateForm'>

const RealEstateForm: React.FC<Props> = ({ route }: Props) => {
  const { id, data } = route.params

  return (
    <SafeAreaView
      style={styles.container}
    >
      <ScrollView
        style={styles.container}
      >
        <CustomTitle>
          {id !== undefined ? 'Editar imóvel' : 'Cadastre um imóvel'}
        </CustomTitle>
        <AddEditForm
          id={id}
          data={data}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default RealEstateForm