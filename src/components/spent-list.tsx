import { CategorySpending } from '@/mocks/category-spending';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from "@/constants/colors";

type SpentListProps = {
    data: CategorySpending[];
    limit?: number;
}

const formatAmount = (value: number) =>
    "R$ " + value.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export function SpentList({ data, limit }: SpentListProps) {
    const total = data.reduce((sum, item) => sum + item.amount, 0);
    const max = Math.max(...data.map((item) => item.amount), 1);

    const items = data
        .filter((item) => item.amount > 0)
        .sort((a, b) => b.amount - a.amount)
        .slice(0, limit ?? data.length)
        .map((item) => ({
            ...item,
            percent: total > 0 ? Math.round((item.amount / total) * 100) : 0,
            bar: (item.amount / max) * 100,
        }));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gastos por categoria</Text>

            {items.length === 0 ? (
                <Text style={styles.emptyList}>Nenhum gasto registrado neste mês.</Text>
            ) : (
                items.map((item) => (
                    <View key={item.id} style={styles.row}>
                        <View style={styles.rowHeader}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.percent}>
                                <Text style={styles.amount}>{formatAmount(item.amount)}</Text>
                                {` · ${item.percent}%`}
                            </Text>
                        </View>

                        <View style={styles.track}>
                            <View style={[styles.fill, { width: `${item.bar}%` }]} />
                        </View>
                    </View>
                ))
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 8,
        backgroundColor: Colors.surface,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderWidth: 0.5,
        borderColor: 'lightgray',
        borderRadius: 12
    },
    title: {
        fontFamily: "Manrope_700Bold",
        fontSize: 16
    },
    emptyList: {
        fontFamily: "Manrope_400Regular",
        fontSize: 14,
        color: Colors.textMuted
    },
    row: {
        gap: 6
    },
    rowHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 8
    },
    name: {
        flex: 1,
        fontFamily: "Manrope_600SemiBold",
        fontSize: 13,
        color: Colors.text
    },
    percent: {
        fontFamily: "Manrope_400Regular",
        fontSize: 13,
        color: Colors.textMuted,
        fontVariant: ["tabular-nums"],
    },
    amount: {
        fontFamily: "Manrope_700Bold",
        color: Colors.text,
    },
    track: {
        height: 6,
        borderRadius: 3,
        backgroundColor: "#EAF0E8",
        overflow: "hidden",
    },
    fill: {
        height: "100%",
        borderRadius: 3,
        backgroundColor: Colors.primary,
    },
})