import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext } from 'react'
import { AppContext } from '../contextApi/AppContext'
import { useThemeChange } from '../apptheme/ThemeChange'

const OverLayScreen = ({ modalVisible, showOverLay, type, waterdrinked, measuringUnit, drinkGoal }: any) => {

  const { currentType }: any = useContext(AppContext)
  const useCustomTheme = useThemeChange()

  return (
    <View style={
      {
        ...styles.overlay,
        display: modalVisible || showOverLay ? 'flex' : 'none',
        backgroundColor: currentType === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',  // Only the background has opacity
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
            <Text style={{ textAlign: 'center', fontSize: 46, fontWeight: '900', color: currentType === 'dark' ? useCustomTheme.lightMode.Text : useCustomTheme.darkMode.Text }}>
              {waterdrinked}/{drinkGoal} {measuringUnit}
            </Text>
            <Text style={{ textAlign: 'center', fontSize: 32, fontWeight: 'bold', color: currentType === 'dark' ? useCustomTheme.lightMode.Text : useCustomTheme.darkMode.Text }}>
              Congratulations! You have successfully completed the drinking goal.
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
    justifyContent: 'center',
    alignItems: 'center',
  },
})
