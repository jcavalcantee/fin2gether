import { Image } from "expo-image";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useState } from "react";

import { Colors } from "@/constants/colors";

import { TextFieldComponent } from "@/components/text-field";

export default function Index() {

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
  })

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerContainer}>
            <Image
              source={require("@/assets/logo-completa.svg")}
              style={styles.logo}
              contentFit="contain"
            />

            <Text style={styles.title}>Crie sua conta</Text>

            <Text style={styles.subtitle}>
              Leva menos de 2 minutos para organizar suas finanças.
            </Text>
          </View>

          <View style={styles.formContainer}>

            <TextFieldComponent
              label="Seu nome"
              placeholder="Digite seu nome"
              value={form.nome}
              onChangeText={(text) => setForm({...form, nome: text})}
              required={true}
            />

            <TextFieldComponent
              label="E-mail"
              placeholder="voce@email.com"
              keyboardType="email-address"
              value={form.email}
              onChangeText={(text) => setForm({...form, email: text})}
              required={true}
            />

            <TextFieldComponent
              label="Senha"
              placeholder="Mínimo de 8 caracteres"
              keyboardType="ascii-capable" 
              secureTextEntry={true}
              value={form.senha}
              onChangeText={(text) => setForm({...form, senha: text})}
              required={true}
            />
          </View>

          <View style={styles.footerContainer}>
            <Pressable style={styles.confirmButton}>
              <Text style={styles.buttonText}>Continuar</Text>
            </Pressable>

            <Text style={{ fontFamily: "Manrope_400Regular", fontSize: 14, marginTop: 16 }}>
              Já tem uma conta? 
              <Text style={styles.link}> Entrar</Text>
            </Text>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg
  },
  keyboard: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    gap: 32,
    paddingVertical: 24,
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
    // marginTop: 32,
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
    // marginTop: 32,
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
    fontSize: 14,
  }
});
