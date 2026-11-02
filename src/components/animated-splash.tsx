import { useEffect, useRef } from "react";
import { AccessibilityInfo, Animated, Easing, StyleSheet, View } from "react-native";

import { Colors } from "@/constants/colors";

type AnimatedSplashProps = {
    onFinish: () => void;
}

export const AnimatedSplash = ({ onFinish }: AnimatedSplashProps) => {
    const leftCircle = useRef(new Animated.Value(-28)).current;
    const rightCircle = useRef(new Animated.Value(28)).current;
    const wordmark = useRef(new Animated.Value(0)).current;
    const screen = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        let cancelled = false;

        const fadeOut = Animated.timing(screen, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        });

        AccessibilityInfo.isReduceMotionEnabled().then((reduceMotion) => {
            if (cancelled) return;

            // Quem desativou animações no celular vê a logo pronta, sem movimento
            if (reduceMotion) {
                leftCircle.setValue(0);
                rightCircle.setValue(0);
                wordmark.setValue(1);
                Animated.sequence([Animated.delay(600), fadeOut]).start(() => onFinish());
                return;
            }

            Animated.sequence([
                Animated.parallel([
                    Animated.timing(leftCircle, {
                        toValue: 0,
                        duration: 550,
                        easing: Easing.out(Easing.cubic),
                        useNativeDriver: true,
                    }),
                    Animated.timing(rightCircle, {
                        toValue: 0,
                        duration: 550,
                        easing: Easing.out(Easing.cubic),
                        useNativeDriver: true,
                    }),
                ]),
                Animated.timing(wordmark, {
                    toValue: 1,
                    duration: 300,
                    easing: Easing.out(Easing.quad),
                    useNativeDriver: true,
                }),
                Animated.delay(500),
                fadeOut,
            ]).start(() => onFinish());
        });

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <Animated.View
            style={[styles.container, { opacity: screen }]}
            accessible
            accessibilityLabel="Fin2Gether"
        >
            <View style={styles.logo}>
                <Animated.View
                    style={[styles.circle, styles.circleLeft, { transform: [{ translateX: leftCircle }] }]}
                />
                <Animated.View
                    style={[styles.circle, styles.circleRight, { transform: [{ translateX: rightCircle }] }]}
                />
            </View>

            <Animated.Text
                style={[
                    styles.wordmark,
                    {
                        opacity: wordmark,
                        transform: [{
                            translateY: wordmark.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }),
                        }],
                    },
                ]}
            >
                Fin2Gether
            </Animated.Text>
        </Animated.View>
    )
}

const CIRCLE_SIZE = 48;
const OVERLAP_OFFSET = 19; // mesma proporção da logo (deslocamento de 8 para raio 10)

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFill,
        backgroundColor: Colors.bg,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        zIndex: 10,
    },
    logo: {
        width: CIRCLE_SIZE + OVERLAP_OFFSET,
        height: CIRCLE_SIZE,
    },
    circle: {
        position: 'absolute',
        top: 0,
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
    },
    circleLeft: {
        left: 0,
        backgroundColor: Colors.primary,
    },
    circleRight: {
        left: OVERLAP_OFFSET,
        backgroundColor: "#B9E07A",
        opacity: 0.85,
    },
    wordmark: {
        fontFamily: "Manrope_800ExtraBold",
        fontSize: 28,
        letterSpacing: -0.5,
        color: Colors.text,
    },
})