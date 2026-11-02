import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/colors";

import { UsageMode } from "@/components/signup/income-setup";

export const GOAL_OPTIONS = [
    { id: "emergency_fund", label: "Reserva de emergência" },
    { id: "travel", label: "Viagem" },
    { id: "home", label: "Comprar imóvel" },
    { id: "pay_debts", label: "Quitar dívidas" },
    { id: "car", label: "Trocar de carro" },
    { id: "invest", label: "Investir mais" },
    { id: "wedding", label: "Casamento ou festa" },
    { id: "other", label: "Outro objetivo" },
] as const;

export type GoalId = (typeof GOAL_OPTIONS)[number]["id"];

type Props = {
    mode: UsageMode | null;
    selected: GoalId[];
    onChange: (selected: GoalId[]) => void;
}

export function GoalsSetupStep({ mode, selected, onChange }: Props) {
    const isCouple = mode === "couple";

    const toggleGoal = (id: GoalId) => {
        onChange(
            selected.includes(id)
                ? selected.filter((goal) => goal !== id)
                : [...selected, id]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    {isCouple ? "O que vocês querem conquistar?" : "O que você quer conquistar?"}
                </Text>
                <Text style={styles.description}>
                    Escolha quantos quiser. Valores e prazos você define depois.
                </Text>
            </View>

            <View style={styles.grid}>
                {GOAL_OPTIONS.map((goal) => {
                    const isSelected = selected.includes(goal.id);

                    return (
                        <Pressable
                            key={goal.id}
                            onPress={() => toggleGoal(goal.id)}
                            accessibilityRole="checkbox"
                            accessibilityState={{ checked: isSelected }}
                            accessibilityLabel={goal.label}
                            style={({ pressed }) => [
                                styles.chip,
                                isSelected && styles.chipSelected,
                                pressed && styles.chipPressed,
                            ]}
                        >
                            <Text style={styles.chipLabel}>{goal.label}</Text>
                            <Text style={[styles.chipStatus, isSelected && styles.chipStatusSelected]}>
                                {isSelected ? "✓ Selecionado" : "Selecionar"}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 24
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
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    chip: {
        width: "47%", // 2 por linha; o flexGrow completa o espaço que sobra
        flexGrow: 1,
        minHeight: 76,
        padding: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.borderInput,
        backgroundColor: Colors.surface,
        justifyContent: "space-between",
        gap: 6,
    },
    chipSelected: {
        borderWidth: 2,
        padding: 13, // compensa a borda mais grossa
        borderColor: Colors.primary,
        backgroundColor: "#EEF7F0",
    },
    chipPressed: {
        opacity: 0.85,
    },
    chipLabel: {
        fontFamily: "Manrope_700Bold",
        fontSize: 14,
        lineHeight: 18,
        color: Colors.text,
    },
    chipStatus: {
        fontFamily: "Manrope_700Bold",
        fontSize: 12,
        color: Colors.textMuted,
    },
    chipStatusSelected: {
        color: Colors.primary,
    },
})