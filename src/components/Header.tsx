import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useThemeChange } from '../apptheme/ThemeChange'

const Header = ({ currentType }: any) => {

  const useCustomTheme = useThemeChange()


  return (
    <View style={{ ...styles.mainView, backgroundColor: currentType === 'dark' ? useCustomTheme.darkMode.Header : useCustomTheme.lightMode.Header }}>
      <Text
        style={
          { ...styles.headingText, color: currentType === 'dark' ? useCustomTheme.darkMode.Text : useCustomTheme.lightMode.Text }
        }>
        Daily Step Counter
      </Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  mainView: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 20,
    backgroundColor: '#e9eaee',
    alignItems:'center'
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 10, // Adjust to fit your layout
    justifyContent: 'center',
  },

})