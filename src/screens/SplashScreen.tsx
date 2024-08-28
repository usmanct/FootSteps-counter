import { ImageBackground, StyleSheet, Text, Dimensions, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width

const SplashScreen = () => {
    const [progress, setProgress] = useState<boolean>()
    const [loaderWidth, setLoaderWidth] = useState<number>(0)

    useEffect(() => {
        // Set the interval to gradually fill the bar
        const interval = setInterval(() => {
            setLoaderWidth((prevWidth) => {
                // Calculate the step increment based on the total width
                const step = (screenWidth - 80) / 30; // Example: 50 steps to fill the bar

                // Update the width, ensuring it doesn't exceed the outer bar's width
                return prevWidth + step > screenWidth - 80 ? screenWidth - 80 : prevWidth + step;
            });
        }, 100); // Adjust the time interval (in ms) for faster or slower filling

        // Cleanup the interval when the component is unmounted
        return () => clearInterval(interval);
    }, []);

    return (
        <ImageBackground
            source={require('../../assets/splashScreenAssets/bg.png')}
            style={{ ...styles.container, height: screenHeight, width: screenWidth }}
            resizeMode='contain'
        >
            <View>
                <Image
                    source={require('../../assets/splashScreenAssets/circle.png')}
                    style={{ height: 300, width: 300, position: 'relative' }}
                    resizeMode='contain'
                />
                <Image
                    source={require('../../assets/splashScreenAssets/1.png')}
                    style={{ height: 170, width: 170, position: "absolute", top: 100, left: 20 }}
                    resizeMode='contain'
                />
                <Image
                    source={require('../../assets/splashScreenAssets/2.png')}
                    style={{ height: 170, width: 170, position: "absolute", right: 20, top: 70 }}
                    resizeMode='contain'
                />
            </View>
            <View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/splashScreenAssets/Outer_loading_bar.png')}
                        style={{ height: 70, width: screenWidth - 70, position: 'relative' }}
                        resizeMode='contain'
                    />
                    <Image
                        source={require('../../assets/splashScreenAssets/INNER_LOADING_BAR.png')}
                        style={{ height: 70, width: loaderWidth, position: 'absolute' }}
                        resizeMode='contain'
                    />
                </View>
                <View
                    style={
                        {
                            justifyContent: 'center', alignItems: 'center',
                            flexDirection: 'row',
                            gap: 5
                        }
                    }
                >
                    <Image
                        source={require('../../assets/splashScreenAssets/Loading_.png')}
                        resizeMode='contain'
                        style={{ height: 20, width: screenWidth / 3 - 50 }}
                    />
                    <Image
                        source={require('../../assets/splashScreenAssets/dot.png')}
                        resizeMode='contain'
                        style={{ height: 5, width: 5 }}
                    />
                    <Image
                        source={require('../../assets/splashScreenAssets/dot.png')}
                        resizeMode='contain'
                        style={{ height: 5, width: 5 }}
                    />
                    <Image
                        source={require('../../assets/splashScreenAssets/dot.png')}
                        resizeMode='contain'
                        style={{ height: 5, width: 5 }}
                    />
                    <Image
                        source={require('../../assets/splashScreenAssets/dot.png')}
                        resizeMode='contain'
                        style={{ height: 5, width: 5 }}
                    />
                </View>
            </View>
        </ImageBackground>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
})