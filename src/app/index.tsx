import { router } from "expo-router";

import { AnimatedSplash } from "@/components/animated-splash";

// Primeira tela do app: splash animada e, ao terminar, o login.
// Quando houver sessão salva, troque o destino por: usuário logado ? "/(tabs)" : "/sign-in"
export default function Index() {
  return (
    <AnimatedSplash onFinish={() => router.replace("/signin" as never)} />
  );
}