import { Link, router } from "expo-router";
import {
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useEffect, useState } from "react";

import { Colors } from "@/constants/colors";

import { AccountStep } from "@/components/signup/account";
import { GoalId, GoalsSetupStep } from "@/components/signup/goals-setup";
import { centsToNumber, IncomeData, IncomeSetupStep, isIncomeValid } from "@/components/signup/income-setup";
import { UsageModeStep } from "@/components/signup/usage-mode";

export default function Index() {

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const stepText = `Passo ${currentStep} de ${totalSteps}`;
  const isLastStep = currentStep === totalSteps;

  // Dados de todas as etapas ficam aqui, para não se perderem ao voltar
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [usageMode, setUsageMode] = useState<"solo" | "couple" | null>(null);
  const [income, setIncome] = useState<IncomeData>({ myIncome: "", partnerName: "", partnerIncome: "" });
  const [goals, setGoals] = useState<GoalId[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canContinue = (() => {
    switch (currentStep) {
      case 1:
        return (
          form.name.trim() !== "" &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) &&
          form.password.length >= 8
        );
      case 2:
        return usageMode !== null;
      case 3:
        return isIncomeValid(income, usageMode);
      default:
        return true; // passo 4: objetivos são opcionais
    }
  })();

  const finishSignUp = async (selectedGoals: GoalId[]) => {
    if (isSubmitting || !usageMode) return;
    setIsSubmitting(true);

    const payload = {
      account: {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password
      },
      usageMode,
      myIncome: centsToNumber(income.myIncome),
      ...(usageMode === "couple" && {
        partnerName: income.partnerName.trim(),
        partnerIncome: centsToNumber(income.partnerIncome),
      }),
      goals: selectedGoals,
    };

    try {
      // await api.completeOnboarding(payload);
      console.log("payload do cadastro", payload);
      router.replace("/" as never); // troque pela rota da tela inicial do app
    } catch (error) {
      // mostrar mensagem de erro para o usuário
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = () => {
    if (!canContinue) return;

    if (currentStep === 1) {
      // Criar a conta no Cognito (signUp) aqui
    }

    if (!isLastStep) {
      setCurrentStep(currentStep + 1);
    } else {
      finishSignUp(goals);
    }
  };

  const handleBackStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Botão voltar do Android volta uma etapa em vez de sair do cadastro
  useEffect(() => {
    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      if (currentStep > 1) {
        handleBackStep();
        return true;
      }
      return false;
    });
    return () => subscription.remove();
  }, [currentStep]);

  const stepBarView = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerRow}>
          <Pressable
            onPress={handleBackStep}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
            hitSlop={12}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>
          <Text style={styles.stepText}>{stepText}</Text>
          <View style={styles.backButton} />
        </View>

        <View style={styles.stepBarContainer}>
          {Array.from({ length: totalSteps }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.stepBarSegment,
                { backgroundColor: index < currentStep ? Colors.primary : Colors.borderInput },
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {currentStep > 1 && stepBarView()}

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {currentStep === 1 && (
            <AccountStep
              data={form}
              onChange={(data) => setForm((current) => ({ ...current, ...data }))}
            />
          )}
          {currentStep === 2 && <UsageModeStep usageMode={usageMode} onChange={setUsageMode} />}
          {currentStep === 3 && (<IncomeSetupStep mode={usageMode} data={income} onChange={setIncome} />)}
          {currentStep === 4 && (<GoalsSetupStep mode={usageMode} selected={goals} onChange={setGoals} />)}

        </ScrollView>

        <View style={styles.footerContainer}>
          <Pressable
            onPress={handleNextStep}
            disabled={!canContinue || isSubmitting}
            style={[styles.confirmButton, (!canContinue || isSubmitting) && styles.confirmButtonDisabled]}
            accessibilityRole="button"
            accessibilityState={{ disabled: !canContinue || isSubmitting }}
          >
            <Text style={styles.buttonText}>
              {isLastStep ? "Começar a usar" : "Continuar"}
            </Text>
          </Pressable>

          {isLastStep && (
            <Pressable
              onPress={() => finishSignUp([])}
              disabled={isSubmitting}
              hitSlop={8}
              style={styles.skipButton}
              accessibilityRole="button"
            >
              <Text style={styles.skipText}>Pular por agora</Text>
            </Pressable>
          )}

          {currentStep === 1 && (
            <Text style={styles.footerText}>
              Já tem uma conta?{" "}
              <Link href={"/signin" as never} style={styles.link}>Entrar</Link>
            </Text>
          )}
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
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 8,
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 32,
    lineHeight: 34,
    color: Colors.text,
  },
  stepText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: Colors.textMuted,
  },
  stepBarContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  stepBarSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
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
  skipButton: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  skipText: {
    color: Colors.textMuted,
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14,
  },
});