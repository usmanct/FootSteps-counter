import { Canvas, Circle } from "@shopify/react-native-skia";

type Props = {
    size: number;
};

export const CanvasProgress = ({ size }: Props) => {
    const radius = size * 0.5;
    const circleThickness = radius * 0.05;
    const circleFillGap = 0.05 * radius;
    const fillCircleMargin = circleThickness + circleFillGap;
    const fillCircleRadius = radius - fillCircleMargin;

    return (
        <Canvas style={{ width: size, height: size }}>
            <Circle
                cx={radius}
                cy={radius}
                r={radius - circleThickness * 0.5}
                color="#178BCA"
                style="stroke"
                strokeWidth={circleThickness}
            />
            <Circle
                cx={radius}
                cy={radius}
                r={fillCircleRadius}
                color="#178BCA"
            />
        </Canvas>
    );
}; 