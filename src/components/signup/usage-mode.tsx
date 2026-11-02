import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/colors";

import { SelectableCard } from "@/components/selectable-card";

import Feather from "@expo/vector-icons/Feather";

export type UsageMode = "solo" | "couple";

type Props = {
    usageMode: UsageMode | null;
    onChange: (mode: UsageMode) => void;
}

export function UsageModeStep({ usageMode, onChange }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Como você deseja usar o app?</Text>
                <Text style={styles.description}>Isso define como a renda e os gastos são calculados.</Text>
            </View>
           
           <SelectableCard
                title="Individual"
                description="Só a sua renda e os seus gastos."
                icon={<Feather name="user" size={24} color={Colors.primary} />}
                selected={usageMode === "solo"}
                onPress={() => onChange("solo")}
            />

            <SelectableCard
                title="Em casal"
                description="Você informa o nome e a renda do parceiro(a). O app soma as rendas e calcula a divisão dos gastos."
                icon={<Feather name="users" size={24} color={Colors.primary} />}
                selected={usageMode === "couple"}
                onPress={() => onChange("couple")}
            />

            <Text style={styles.alert}>Você pode trocar de modo depois, no seu perfil.</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 32
    },
    header: {
        gap: 16
    },
    title: {
        fontFamily: "Manrope_800ExtraBold",
        fontSize: 28,
        letterSpacing: -0.5,
        color: Colors.text,
    }, 
    description: {
        fontFamily: "Manrope_400Regular",
        fontSize: 15,
        color: Colors.textMuted,
    },
    alert: {
        fontFamily: "Manrope_400Regular",
        fontSize: 13,
        color: Colors.textMuted,
    }
})