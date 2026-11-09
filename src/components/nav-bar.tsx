import { Pressable, StyleSheet, Text, View } from 'react-native';

import Feather from '@expo/vector-icons/Feather';

import { Colors } from "@/constants/colors";
import { router, usePathname } from 'expo-router';

type FeatherName = React.ComponentProps<typeof Feather>["name"];

const TABS: { route: string; label: string; icon: FeatherName }[] = [
    { route: "/home", label: "Início", icon: "home" },
    { route: "/fixed", label: "Fixos", icon: "repeat" },
    { route: "/cards", label: "Cartões", icon: "credit-card" },
    { route: "/profile", label: "Perfil", icon: "user" },
];

const LEFT_TABS = TABS.slice(0, 2);  // Início, Fixos
const RIGHT_TABS = TABS.slice(2);    // Cartões, Perfil

export function NavBar() {
    const pathname = usePathname();

    const renderTab = (tab: (typeof TABS)[number]) => {
        const isActive = pathname.startsWith(tab.route);
        const color = isActive ? Colors.primary : Colors.textMuted;

        return (
            <Pressable
                key={tab.route}
                onPress={() => router.navigate(tab.route as never)}
                style={styles.option}
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive }}
                accessibilityLabel={tab.label}
            >
                <Feather name={tab.icon} size={22} color={color} />
                <Text style={[styles.optionText, { color }, isActive && styles.optionTextActive]}>
                    {tab.label}
                </Text>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            {LEFT_TABS.map(renderTab)}

            <View style={styles.addSlot}>
                <Pressable
                    onPress={() => router.push("/new-expense" as never)}
                    style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}
                    accessibilityRole="button"
                    accessibilityLabel="Novo gasto"
                >
                    <Feather name="plus" size={26} color={Colors.surface} />
                </Pressable>
            </View>

            {RIGHT_TABS.map(renderTab)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingHorizontal: 12,
        paddingTop: 10,
        backgroundColor: Colors.surface,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    option: {
        flex: 1,
        minHeight: 44,
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
    },
    optionText: {
        fontFamily: "Manrope_600SemiBold",
        fontSize: 11,
    },
    optionTextActive: {
        fontFamily: "Manrope_800ExtraBold",
    },
    addSlot: {
        flex: 1,
        alignItems: "center",
    },
    addButton: {
        width: 50,
        height: 50,
        borderRadius: 28,
        backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center",
        marginTop: -20, 
        shadowColor: Colors.primaryDark,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    addButtonPressed: {
        transform: [{ scale: 0.95 }],
    },
})