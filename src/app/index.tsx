import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// @ts-ignore SVG module declarations are not configured in this project.

export default function Index() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* <Logo width={200} height={200}/> */}
        <Text>Crie sua conta</Text>
        <Text>Crie sua conta</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
