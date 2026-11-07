import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SummaryCard } from "@/components/summary-card";
import { UserHeader } from "@/components/user-header";

import { Colors } from "@/constants/colors";

export default function Home() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <UserHeader userName={"Jefferson"}  userPartnerName={"Ana"}/>

                <SummaryCard
                    incomePercentage={57} 
                    totalSpent={"R$ 6.842,30"} 
                    spaceIncome={"R$ 12.000,00"}
                    incomeWarning={70} 
                    userName={"Jefferson"} 
                    userPartnerName={"Ana"} 
                    userTotalSpent={"R$ 2.324,42"} 
                    userPartnerTotalSpent={"R$ 4.517,88"}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.bg,
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 32,
        gap: 16,
    },
})