import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const BottomNavigationBar = ({}) => {
    const [isActive, setIsActive] = useState('Home')
    const navigation = useNavigation();

    const tabs = [
        { title: 'Home', icon: <MaterialIcons name="home" size={24} color={isActive === 'Home' ? '#2ecc71' : "grey"} /> },
        { title: 'WaterTrack', icon: <Fontisto name="blood-drop" size={24} color={isActive === 'WaterTrack' ? '#2ecc71' : "grey"} /> },
        { title: "LetsRun", icon: <MaterialCommunityIcons name="run-fast" size={24} color={isActive === "LetsRun" ? '#2ecc71' : "grey"} /> },
        { title: 'Account', icon: <MaterialCommunityIcons name="account" size={24} color={isActive === 'Account' ? '#2ecc71' : "grey"} /> },
    ];


    const navigationHandler = (s: string) => {
        console.log('active' , isActive);
        console.log(s)
        setIsActive(s)
        navigation.navigate(s as never)
    }

    return (
        <View style={styles.navRow}>
            {tabs.map((tab, index) => (
                <TouchableOpacity key={index} style={{ padding: 10 }} onPress={() => navigationHandler(tab.title)}>
                    {tab.icon}
                    <Text style={{ ...styles.iconTitles, }}>{tab.title}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default BottomNavigationBar

const styles = StyleSheet.create({
    navRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center', height: 70,
        backgroundColor: '#f0f0f0',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    iconTitles: { fontSize: 12, color: 'grey' }
})