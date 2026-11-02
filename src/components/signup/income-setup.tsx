import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/colors";
import { TextFieldComponent } from "../text-field";

export type UsageMode = "solo" | "couple";

export type IncomeData = {
    myIncome: string;
    partnerName: string;
    partnerIncome: string;
}

type Props = {
    mode: UsageMode | null;
    data: IncomeData;
    onChange: (data: IncomeData) => void;
}

const MAX_DIGITS = 10; // até 9.999.999,99

export function formatBRL(cents: string) {
    const value = Number(cents || "0");
    const reais = Math.floor(value / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const centavos = (value % 100).toString().padStart(2, "0");
    return `R$ ${reais},${centavos}`;
}

export function centsToNumber(cents: string) {
    return Number(cents || "0") / 100;
}
 
const onlyDigits = (text: string) =>
    text.replace(/\D/g, "").replace(/^0+/, "").slice(0, MAX_DIGITS);

export function isIncomeValid(data: IncomeData, mode: UsageMode | null) {
    const myIncomeOk = Number(data.myIncome || "0") > 0;
    if (mode !== "couple") return myIncomeOk;
    return (
        myIncomeOk &&
        data.partnerName.trim() !== "" &&
        Number(data.partnerIncome || "0") > 0
    );
}

export function IncomeSetupStep({ mode, data, onChange }: Props) {
    const isCouple = mode === "couple";

    const myCents = Number(data.myIncome || "0");
    const partnerCents = Number(data.partnerIncome || "0");
    const totalCents = myCents + partnerCents;
    const showPreview = isCouple && myCents > 0 && partnerCents > 0;
    const myPercent = showPreview ? Math.round((myCents / totalCents) * 100) : 0;
    const partnerPercent = 100 - myPercent;
    const partnerLabel = data.partnerName.trim() || "Parceiro(a)";

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{isCouple ? "Renda do Casal" : "Sua Renda"}</Text>
                <Text style={styles.description}>Use a renda líquida mensal, o que cai na conta.</Text>
            </View>

            <TextFieldComponent
                label="Sua renda mensal"
                placeholder="R$ 0,00"
                keyboardType="number-pad"
                value={data.myIncome ? formatBRL(data.myIncome) : ""}
                onChangeText={(text) => onChange({ ...data, myIncome: onlyDigits(text)})}
                required={true}
            />

            {isCouple && (
                <View style={styles.partnerCard}>
                    <Text style={styles.partnerTag}>PARCEIRO(A)</Text>
 
                    <TextFieldComponent
                        label="Nome"
                        placeholder="Nome do parceiro(a)"
                        autoCapitalize="words"
                        value={data.partnerName}
                        onChangeText={(text) => onChange({ ...data, partnerName: text })}
                        required={true}
                    />
 
                    <TextFieldComponent
                        label="Renda mensal"
                        placeholder="R$ 0,00"
                        keyboardType="number-pad"
                        value={data.partnerIncome ? formatBRL(data.partnerIncome) : ""}
                        onChangeText={(text) => onChange({ ...data, partnerIncome: onlyDigits(text) })}
                        required={true}
                    />
                </View>
            )}

            {showPreview && (
                <View style={styles.preview} accessible accessibilityLabel={`Renda do casal ${formatBRL(String(totalCents))}. Você ${myPercent}%, ${partnerLabel} ${partnerPercent}%`}>
                    <View style={styles.previewRow}>
                        <Text style={styles.previewLabel}>Renda do casal</Text>
                        <Text style={styles.previewTotal}>{formatBRL(String(totalCents))}</Text>
                    </View>
 
                    <View style={styles.previewBar}>
                        <View style={[styles.previewBarMine, { flex: myPercent }]} />
                        <View style={[styles.previewBarPartner, { flex: partnerPercent }]} />
                    </View>
 
                    <View style={styles.previewRow}>
                        <Text style={styles.previewMine}>Você {myPercent}%</Text>
                        <Text style={styles.previewPartner}>{partnerLabel} {partnerPercent}%</Text>
                    </View>
                </View>
            )}
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
    partnerCard: {
        gap: 16,
        padding: 16,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: Colors.borderInput,
        backgroundColor: Colors.surface,
    },
    partnerTag: {
        fontFamily: "Manrope_800ExtraBold",
        fontSize: 12,
        letterSpacing: 0.5,
        color: Colors.primary,
    },
    preview: {
        gap: 10,
        padding: 16,
        borderRadius: 18,
        backgroundColor: "#0F3B28",
    },
    previewRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
    },
    previewLabel: {
        fontFamily: "Manrope_600SemiBold",
        fontSize: 13,
        color: "rgba(255,255,255,0.8)",
    },
    previewTotal: {
        fontFamily: "Manrope_800ExtraBold",
        fontSize: 18,
        color: Colors.surface,
        fontVariant: ["tabular-nums"],
    },
    previewBar: {
        flexDirection: "row",
        height: 10,
        gap: 2,
        borderRadius: 5,
        overflow: "hidden",
    },
    previewBarMine: {
        backgroundColor: "#B9E07A",
    },
    previewBarPartner: {
        backgroundColor: "rgba(255,255,255,0.35)",
    },
    previewMine: {
        fontFamily: "Manrope_700Bold",
        fontSize: 13,
        color: "#B9E07A",
    },
    previewPartner: {
        fontFamily: "Manrope_700Bold",
        fontSize: 13,
        color: "rgba(255,255,255,0.85)",
    },
})