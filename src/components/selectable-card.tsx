
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/colors';

type SelectableCardProps = {
    title: string;
    description: string;
    icon: React.ReactNode;
    selected: boolean;
    onPress: () => void;
}

export const SelectableCard = ({
    title,
    description,
    icon,
    selected,
    onPress,
}: SelectableCardProps) => {
    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="radio"
            accessibilityState={{ checked: selected }}
            accessibilityLabel={`${title}. ${description}`}
            style={({ pressed }) => [
                styles.card,
                selected && styles.cardSelected,
                pressed && styles.cardPressed,
            ]}
        >
            <View style={[styles.icon, selected && styles.iconSelected]}>
                {icon}
            </View>
 
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
 
            <View style={[styles.radio, selected && styles.radioSelected]} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 14,
        padding: 18,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.borderInput,
        backgroundColor: Colors.surface,
    },
    cardSelected: {
        borderWidth: 2,
        padding: 17, 
        borderColor: Colors.primary,
        backgroundColor: '#EEF7F0',
    },
    cardPressed: {
        opacity: 0.85,
    },
    icon: {
        width: 48,
        height: 48,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.bg,
    },
    iconSelected: {
        backgroundColor: '#D7EEDD',
    },
    content: {
        flex: 1,
        gap: 4,
    },
    title: {
        fontFamily: "Manrope_800ExtraBold",
        fontSize: 16,
        color: Colors.text,
    },
    description: {
        fontFamily: "Manrope_400Regular",
        fontSize: 13,
        lineHeight: 18,
        color: Colors.textMuted,
    },
    radio: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: '#B8C4B9',
        marginTop: 2,
    },
    radioSelected: {
        borderWidth: 6,
        borderColor: Colors.primary,
    },
})