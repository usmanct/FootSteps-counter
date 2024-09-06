import { Canvas, Circle, Group, Image as SkiaImage, Skia, useImage } from "@shopify/react-native-skia";
import { area, scaleLinear } from "d3";
import React, { useEffect, useState } from "react";
import {
    Easing,
    useDerivedValue,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";
import { useThemeChange } from "../../apptheme/ThemeChange";


export const WaterWave = ({ size, value, currentType }: any) => {
        const radius = size * 0.5; // outer circle
    const circleThickness = radius * 0.05; // 0.05 just coefficient can be anything you like
    const useCustomTheme = useThemeChange()
    // const [imageUri, setImageUri] = useState<String>(require('../../../assets/waterTrackScreenAssets/water_icon.png'));
    const circleFillGap = 0.05 * radius; // 0.05 just coefficient can be anything you like
    const fillCircleMargin = circleThickness + circleFillGap;
    const fillCircleRadius = radius - fillCircleMargin; // inner circle radius

    const minValue = 0; // min possible value
    const maxValue = 200; // max possible value
    const fillPercent = Math.max(minValue, Math.min(maxValue, value)) / maxValue; // percent of how much progress filled 

    const waveCount = 1; // how many full waves will be seen in the circle
    const waveClipCount = waveCount + 1; // extra wave for translate x animation
    const waveLength = (fillCircleRadius * 2) / waveCount; // wave length base on wave count 
    const waveClipWidth = waveLength * waveClipCount; // extra width for translate x animation
    const waveHeight = fillCircleRadius * 0.1; // wave height relative to the circle radius, if we change component size it will look same
    const translateXAnimated = useSharedValue(0); // animated value translate wave horizontally
    useEffect(() => {
        translateXAnimated.value = withRepeat(
            // repeat animation
            withTiming(1, {
                // animate from 0 to 1
                duration: 2000, // animation duration
                easing: Easing.linear, // easing function
            }),
            -1, // repeat forever
        );
    }, []);


    // Data for building the clip wave area.
    // [number, number] represent point
    // we have 40 points per wave
    // we generate as many points as 40 * waveClipCount
    const data: Array<[number, number]> = [];
    for (let i = 0; i <= 40 * waveClipCount; i++) {
        data.push([i / (40 * waveClipCount), i / 40]);
    }

    const waveScaleX = scaleLinear().range([0, waveClipWidth]).domain([0, 1]); // interpolate value between 0 and 1 to value between 0 and waveClipWidth 
    const waveScaleY = scaleLinear().range([0, waveHeight]).domain([0, 1]); // interpolate value between 0 and 1 to value between 0 and waveHeight

    // area take our data points 
    // output area with points (x, y0) and (x, y1)
    const clipArea = area()
        .x(function (d) {
            return waveScaleX(d[0]); // interpolate value between 0 and 1 to value between 0 and waveClipWidth 
        })
        .y0(function (d) {
            // interpolate value between 0 and 1 to value between 0 and waveHeight
            return waveScaleY(
                Math.sin(d[1] * 2 * Math.PI),
            );
        })
        .y1(function (_d) {
            // same y1 value for each point 
            return fillCircleRadius * 2 + waveHeight;
        });

    const clipSvgPath: any = clipArea(data); // convert data points as wave area and output as svg path string 
    const clipPath = useDerivedValue(() => {
        // animated value for clip wave path
        const clipP: any = Skia.Path.MakeFromSVGString(clipSvgPath); // convert svg path string to skia format path
        const transformMatrix = Skia.Matrix(); // create Skia tranform matrix
        transformMatrix.translate(
            fillCircleMargin - waveLength * translateXAnimated.value, // translate left from start of the first wave to the length of first wave
            fillCircleMargin + (1 - fillPercent) * fillCircleRadius * 2 - waveHeight, // translate y to position where lower point of the wave in the innerCircleHeight * fillPercent
        );
        clipP.transform(transformMatrix); // apply transform matrix to our clip path
        return clipP;
    }, [translateXAnimated, fillPercent]);


    return (
        <Canvas style={{ width: size, height: size }}>
            <Circle
                cx={radius}
                cy={radius}
                r={radius - circleThickness * 0.5}
                color={currentType === 'dark' ? useCustomTheme.darkMode.activeStroke : useCustomTheme.lightMode.activeStroke}
                style="stroke"
                strokeWidth={circleThickness}
            />

            {/* clip everything inside this group with clip path */}
            <Group clip={clipPath}>
                <Circle cx={radius} cy={radius} r={fillCircleRadius}
                    color={currentType === 'dark' ? useCustomTheme.darkMode.activeStroke : useCustomTheme.lightMode.activeStroke} />

                {/* Add Image */}
                {/* <SkiaImage
                    x={radius - fillCircleRadius}
                    y={radius - fillCircleRadius}
                    width={fillCircleRadius * 2}
                    height={fillCircleRadius * 2}
                    href={imageUri} // Provide the URI for the image
                /> */}

            </Group>
        </Canvas>
    );
};
