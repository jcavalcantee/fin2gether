import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import { TextFieldComponent } from "@/components/text-field";
import { Colors } from "@/constants/colors";

export type AccountData = {
  name: string;
  email: string;
  password: string;
};

type Props = {
  data: AccountData;
  onChange: (data: AccountData) => void;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Usado pelo signup.tsx para habilitar ou não o botão "Continuar"
export function isAccountValid(data: AccountData) {
  return (
    data.name.trim().length > 0 &&
    EMAIL_REGEX.test(data.email.trim()) &&
    data.password.length >= 8
  );
}

export function AccountStep({ data, onChange }: Props) {
  const update = (field: keyof AccountData) => (text: string) =>
    onChange({ ...data, [field]: text });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/logo-completa.svg")}
          style={styles.logo}
          contentFit="contain"
          accessibilityLabel="Fin2Gether"
        />
        <Text style={styles.title}>Crie a sua conta</Text>
        <Text style={styles.subtitle}>
          Leva menos de 2 minutos para organizar suas finanças.
        </Text>
      </View>

      <View style={styles.form}>
        <TextFieldComponent
          label="Seu nome"
          placeholder="Digite seu nome"
          autoCapitalize="words"
          autoComplete="name"
          value={data.name}
          onChangeText={update("name")}
          required={true}
        />

        <TextFieldComponent
          label="E-mail"
          placeholder="voce@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          value={data.email}
          onChangeText={update("email")}
          required={true}
        />

        <TextFieldComponent
          label="Senha"
          placeholder="Mínimo de 8 caracteres"
          secureTextEntry={true}
          autoCapitalize="none"
          autoComplete="new-password"
          autoCorrect={false}
          value={data.password}
          onChangeText={update("password")}
          required={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
});