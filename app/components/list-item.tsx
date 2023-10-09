import { theme } from '@theme'
import { StyleSheet, Text } from 'react-native'
import { TouchableOpacityProps } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { Avatar, IconButton, Tooltip } from 'react-native-paper'
import { AvatarImageSource } from 'react-native-paper/lib/typescript/components/Avatar/AvatarImage'
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon'

type ListItemLeftProps = {
  imageSource?: AvatarImageSource
  icon?: IconSource
}

const ListItemLeft: React.FC<ListItemLeftProps> = ({ imageSource, icon }: ListItemLeftProps) => {
  if (imageSource) {
    return (
      <Avatar.Image 
        source={imageSource}
        size={64}
      />
    )
  } else {
    return (
      <Avatar.Icon 
        icon={icon || 'account'}
        size={64}
        style={{ backgroundColor: theme.colors.onSurfaceDisabled }}
      />
    )
  }
}

type ListItemRightProps = {
  icon: IconSource
  iconContainerColor: string
  tooltipTitle: string
}

const ListItemRight: React.FC<ListItemRightProps> = ({ icon, iconContainerColor, tooltipTitle }: ListItemRightProps) => {
  return (
    <View
      style={styles.rightIcon}
    >
      <Tooltip
        title={tooltipTitle}
      >
        <IconButton
          // icon='check'
          icon={icon}
          // containerColor='#4ee44e'
          containerColor={iconContainerColor}
          iconColor='white'
          size={16}
        />
      </Tooltip>
    </View>
  )
}

type ListItemContentProps = {
  title: string
  subtitle: string
}

const ListItemContent: React.FC<ListItemContentProps> = ({ title, subtitle }: ListItemContentProps) => {
  return (
    <View
      style={styles.content}
    >
      <Text 
        style={styles.title}
        numberOfLines={1}
      >
        {title}
      </Text>
      <Text
      >
        {subtitle}
      </Text>
    </View>
  )
}

type Props = {
  children: React.ReactNode
} & TouchableOpacityProps

const ListItemRoot: React.FC<Props> = ({ children, ...rest }: Props) => {
  return (
    <TouchableOpacity
      {...rest}
      style={styles.container}
    >
      {children}
    </TouchableOpacity>
  )
}

const ListItem = {
  Root: ListItemRoot,
  Left: ListItemLeft,
  Content: ListItemContent,
  Right: ListItemRight
}

export default ListItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    width: '100%',
    padding: 8,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
  },
  title: { 
    fontSize: 20,
    maxWidth: '90%',
    fontWeight: '700'
  },
  rightIcon: {
    position: 'absolute',
    right: 4,
    top: 4
  }
})