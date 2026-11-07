import { Pressable, StyleSheet, Text, View } from "react-native";

import Ionicons from '@expo/vector-icons/Ionicons';

import { Colors } from "@/constants/colors";

type UserHeaderProps = {
    userName: string;
    userPartnerName?: string;
}

export function UserHeader({ userName, userPartnerName }: UserHeaderProps) {
    const isCouple = !!userPartnerName;
    const userFirstLetter = userName.trim().charAt(0).toUpperCase();
    const partnerFirstLetter = userPartnerName?.trim().charAt(0).toUpperCase();

    const MONTHS = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
    ];

    const today = new Date();
    const month = MONTHS[today.getMonth()];
    const year = today.getFullYear();

    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
                <View style={[styles.avatar, { backgroundColor: Colors.primary }]}>
                    <Text style={[styles.avatarText, { color: Colors.surface }]}>{userFirstLetter}</Text>
                </View>

                {isCouple && (
                    <View style={[styles.avatar, styles.avatarOverlap, { backgroundColor: Colors.accent }]}>
                        <Text style={[styles.avatarText, { color: Colors.primaryDark ?? Colors.primary }]}>{partnerFirstLetter}</Text>
                    </View>
                )}
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.userName}>
                    {userName}
                    {isCouple && ` & ${userPartnerName}`}
                </Text>
                <Text style={styles.monthTitle}>
                    {month} {year}
                </Text>
            </View>

            <Pressable
                style={styles.iconContainer}
                onPress={() => { }}
                accessibilityRole="button"
                accessibilityLabel="Alertas"
                hitSlop={4}
            >
                <Ionicons name="notifications-outline" size={20} color={Colors.text} />
            </Pressable>
        </View>
    )
}

const AVATAR_SIZE = 48;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
        gap: 12,
    },
    avatarContainer: {
        flexDirection: "row",
    },
    avatar: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: Colors.bg
    },
    avatarOverlap: {
        marginLeft: -12,
    },
    avatarText: {
        fontFamily: "Manrope_800ExtraBold",
        fontSize: 20,
        includeFontPadding: false, // Android: tira o espaço extra que desalinha a letra
    },
    userName: {
        fontFamily: "Manrope_400Regular",
        fontSize: 14,
        color: Colors.textMuted,
    },
    monthTitle: {
        fontFamily: "Manrope_800ExtraBold",
        fontSize: 20
    },
    textContainer: {
        flex: 1,
        gap: 2
    },
    iconContainer: {
        backgroundColor: Colors.surfaceAlt,
        width: 40,
        height: 40,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: .8,
        borderColor: Colors.border,
        marginLeft: "8%"
    }
})