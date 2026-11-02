import { Image } from "expo-image";
import { Link, router } from "expo-router";
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

export default function SignIn() {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) &&
    form.password.length > 0;

  const handleSignIn = async () => {
    if (!canSubmit || isSubmitting) return;
    setIsSubmitting(true);

    const payload = {
      email: form.email.trim().toLowerCase(),
      password: form.password,
    };

    try {
      console.log("payload do login:", JSON.stringify(payload, null, 2));
      router.replace("/" as never); // troque pela rota da tela inicial do app
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    console.log("esqueci minha senha:", form.email.trim().toLowerCase());
  };

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
          <View style={styles.header}>
            <Image
              source={require("@/assets/logo-completa.svg")}
              style={styles.logo}
              contentFit="contain"
              accessibilityLabel="Fin2Gether"
            />
            <Text style={styles.title}>Bem-vindo de volta</Text>
            <Text style={styles.subtitle}>Entre para ver como estão as suas finanças.</Text>
          </View>

          <View style={styles.form}>
            <TextFieldComponent
              label="E-mail"
              placeholder="voce@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
              required={false}
            />

            <TextFieldComponent
              label="Senha"
              placeholder="Sua senha"
              secureTextEntry={true}
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect={false}
              value={form.password}
              onChangeText={(text) => setForm({ ...form, password: text })}
              required={false}
            />

            <Pressable
              onPress={handleForgotPassword}
              hitSlop={8}
              style={styles.forgotButton}
              accessibilityRole="button"
            >
              <Text style={styles.link}>Esqueci minha senha</Text>
            </Pressable>
          </View>
        </ScrollView>

        <View style={styles.footerContainer}>
          <Pressable
            onPress={handleSignIn}
            disabled={!canSubmit || isSubmitting}
            style={[styles.confirmButton, (!canSubmit || isSubmitting) && styles.confirmButtonDisabled]}
            accessibilityRole="button"
            accessibilityState={{ disabled: !canSubmit || isSubmitting }}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </Pressable>

          <Text style={styles.footerText}>
            Não tem uma conta?{" "}
            <Link href={"/signup" as never} style={styles.link}>Criar conta</Link>
          </Text>
        </View>
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
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 32,
  },
  header: {
    gap: 16,
  },
  logo: {
    width: 200,
    height: 40,
  },
  title: {
    fontFamily: "Manrope_800ExtraBold",
    fontSize: 28,
    letterSpacing: -0.5,
    color: Colors.text,
  },
  subtitle: {
    fontFamily: "Manrope_400Regular",
    fontSize: 15,
    color: Colors.textMuted,
  },
  form: {
    gap: 16,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    minHeight: 44,
    justifyContent: 'center',
  },
  footerContainer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 16,
    alignItems: 'center',
    gap: 16,
  },
  confirmButton: {
    alignSelf: 'stretch',
    backgroundColor: Colors.primary,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: Colors.surface,
    fontFamily: "Manrope_600SemiBold",
    fontSize: 16,
  },
  footerText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    color: Colors.textMuted,
  },
  link: {
    color: Colors.primary,
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14,
  },
});