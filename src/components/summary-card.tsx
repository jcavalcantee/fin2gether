import { StyleSheet, Text, View } from 'react-native';

import { Colors } from "@/constants/colors";

type SummaryCardProps = {
    incomePercentage: number;
    totalSpent: string;
    spaceIncome: string;
    incomeWarning: number;
    userName: string;
    userPartnerName?: string
    userTotalSpent: string;
    userPartnerTotalSpent?: string
}

export function SummaryCard({
    incomePercentage,
    totalSpent,
    spaceIncome,
    incomeWarning,
    userName,
    userPartnerName,
    userTotalSpent,
    userPartnerTotalSpent
}: SummaryCardProps) {

    const isCouple = !!userPartnerName;

    const clamp = (value: number) => Math.min(Math.max(value, 0), 100);

    const fillPercent = clamp(incomePercentage);
    const warningPercent = clamp(incomeWarning);

    return (
        <View style={styles.summaryCard}>
            <View style={styles.summaryTopRow}>
                <Text style={styles.summaryLabel}>{isCouple ? "Gasto do casal no mês" : "Gastos do mês"}</Text>
                <View style={styles.summaryBadge}>
                    <Text style={styles.summaryBadgeText}>{incomePercentage}% da renda</Text>
                </View>
            </View>

            <Text style={styles.summaryValue}>
                {totalSpent}
            </Text>

            <View style={styles.progressWrapper}>
                <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, { width: `${fillPercent}%` }]} />
                </View>
                <View style={[styles.progressMarker, { left: `${warningPercent}%` }]} />
            </View>

            <View style={styles.summaryLegendRow}>
                <Text style={styles.summaryLegendText}>Renda do espaço: {spaceIncome}</Text>
                <Text style={styles.summaryLegendText}>Alerta em: {incomeWarning}%</Text>
            </View>

            {isCouple && (
                <View style={styles.paidRow}>
                    <View style={styles.paidBox}>
                        <Text style={styles.paidLabel}>{userName} gastou</Text>
                        <Text style={styles.paidValue}>{userTotalSpent}</Text>
                    </View>
                    <View style={styles.paidBox}>
                        <Text style={styles.paidLabel}>{userPartnerName} gastou</Text>
                        <Text style={styles.paidValue}>{userPartnerTotalSpent}</Text>
                    </View>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    summaryCard: {
        backgroundColor: Colors.primaryDark,
        borderRadius: 24,
        padding: 20,
        gap: 14
    },
    summaryTopRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8
    },
    summaryLabel: {
        flex: 1,
        fontFamily: "Manrope_400Regular",
        fontSize: 13,
        color: "rgba(255,255,255,0.8)",
    },
    summaryBadge: {
        backgroundColor: Colors.accent,
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 4
    },
    summaryBadgeText: {
        fontFamily: "Manrope_700Bold",
        fontSize: 12
    },
    summaryValue: {
        fontFamily: "Manrope_700Bold",
        color: Colors.surface,
        fontSize: 26,
        letterSpacing: -0.5,
        fontVariant: ["tabular-nums"]
    },
    progressWrapper: {
        position: "relative",
        justifyContent: "center",
        height: 16, // espaço para a marca passar acima e abaixo do trilho
    },
    progressTrack: {
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(255,255,255,0.14)",
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        borderRadius: 4,
        backgroundColor: Colors.accent,
    },
    progressMarker: {
        position: "absolute",
        top: 0,
        width: 2,
        height: 16,
        borderRadius: 1,
        backgroundColor: Colors.surface,
    },
    summaryLegendRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8
    },
    summaryLegendText: {
        fontFamily: "Manrope_400Regular",
        fontSize: 12,
        color: "rgba(255,255,255,0.8)"
    },
    paidRow: {
        flexDirection: "row",
        gap: 12,
        paddingTop: 4
    },
    paidBox: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.08)",
        borderRadius: 14,
        paddingVertical: 10,
        paddingHorizontal: 12,
        gap: 2
    },
    paidLabel: {
        fontFamily: "Manrope_400Regular",
        fontSize: 12,
        color: "rgba(255,255,255,0.8)"
    },
    paidValue: {
        fontFamily: "Manrope_700Bold",
        fontSize: 14,
        color: Colors.surface,
        fontVariant: ["tabular-nums"],
    }
})