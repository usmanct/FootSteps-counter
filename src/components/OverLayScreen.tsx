import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext } from 'react'
import { AppContext } from '../contextApi/AppContext'
import { useThemeChange } from '../apptheme/ThemeChange'

const OverLayScreen = ({ modalVisible, showOverLay, type }: any) => {

  const { currentType }: any = useContext(AppContext)
  const useCustomTheme = useThemeChange()

  return (
    <View style={
      {
        ...styles.overlay,
        display: modalVisible || showOverLay ? '' : 'none',
        backgroundColor: currentType === 'dark' ? 'white' : 'black'
      }
    }>

      {
        type === 'Complete_Animation' ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require('../../assets/waterTrackScreenAssets/achievement_gif.gif')}
              resizeMode="cover"
              style={{
                height: 300,
                width: 300
              }}
            />
            <Text>
              
            </Text>
          </View>
          : null
      }

    </View>
  )
}

export default OverLayScreen

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    // display: 'none'

  },
})