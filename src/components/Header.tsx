import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style={styles.mainView}>
      <Text style={styles.headingText}>Daily Step Counter </Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    mainView:{
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 20,
    },
    headingText:{
        fontSize: 20,
        fontWeight: 'semibold',
        flex: 1,
        textAlign: 'center',
        
    }

})