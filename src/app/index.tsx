import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/colors";

export default function Index() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Image
          source={require("@/assets/logo-completa.svg")}
          style={styles.logo}
          contentFit="contain"
        />
        <Text 
          style={styles.title}>Crie sua conta
        </Text>
        <Text 
          style={styles.subtitle}>Leva menos de 2 minutos para organizar suas finanças.
        </Text>
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.label}>Seu nome</Text>
        <TextInput
          placeholder="Digite seu nome"
          style={styles.input}
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          placeholder="voce@email.com"
          style={styles.input}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          placeholder="Mínimo de 8 caracteres"
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.footerContainer}>
        <Pressable style={styles.confirmButton}>
          <Text style={styles.buttonText}>Continuar</Text>
        </Pressable>

        <Text>Já tem uma conta? <Text style={styles.link}>Entrar</Text></Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg
  },
  headerContainer: {
    marginLeft: '8%',
    gap: 16,
  },
  logo: {
    width: 200,
    height: 40,
  },
  title: {
    fontFamily: "Manrope_800ExtraBold",
    fontSize: 28,
  },
  subtitle: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    letterSpacing: 0.2,
    color: Colors.textMuted,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    marginTop: 32,
    backgroundColor: 'Green',
    marginLeft: '8%',
    
  },
  label: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 16,
  }, 
  input: {
    borderWidth: 1,
    borderColor: Colors.borderInput,
    borderRadius: 12,
    padding: 12,
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    height: 48,
    width: '90%'
  },
  footerContainer: {
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButton: {
    backgroundColor: Colors.primary,
    width: '90%',
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  buttonText: {
    color: Colors.surface,
    fontFamily: "Manrope_600SemiBold",
    fontSize: 16,

  },
  link: {
    color: Colors.primary,
    fontFamily: "Manrope_600SemiBold",
    fontSize: 16,
  }
});
