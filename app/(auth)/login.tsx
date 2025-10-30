// app/(auth)/login.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useRouter, Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import LogoLogin from "../../assets/icons/logoLogin.svg";
import LogoHemose from "../../assets/icons/LogoHemose.svg";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn() {
    router.replace("/(tabs)");
  }

  function handleGoogle() {
    console.log("Login com Google");
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          {/* HEADER COM LOGO */}
          <View style={styles.header}>
            {/* O fundo com ondas */}
            <LogoLogin
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              style={styles.logoFull}
            />

            {/* O logo Hemose sobreposto */}
            <View style={styles.overlayLogoContainer}>
              <LogoHemose width={160} height={60} style={styles.overlayLogo} />
            </View>
          </View>

          {/* CONTEÚDO CENTRALIZADO */}
          <View style={styles.contentOuter}>
            <View style={styles.content}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Seu e-mail"
                placeholderTextColor="#9AA0A6"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />

              <Text style={[styles.label, { marginTop: 16 }]}>Senha</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Sua senha"
                placeholderTextColor="#9AA0A6"
                secureTextEntry
                style={styles.input}
              />

              {/* BOTÕES */}
              <View style={styles.actions}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={handleSignIn}
                  style={[styles.primaryBtn, { backgroundColor: "#B71C1C" }]}
                >
                  <Text style={styles.primaryBtnText}>ENTRAR</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.googleBtn}
                  activeOpacity={0.85}
                  onPress={handleGoogle}
                >
                  <AntDesign name="google" size={22} color="#4285F4" />
                  <Text style={styles.googleText}>Entrar com Google</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.footerText}>
                Não possui uma conta?{" "}
                <Link href="/(auth)/register" style={styles.registerLink}>
                  cadastre-se
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const MAX_W = 394;
const styles = StyleSheet.create({
  /* HEADER */
  header: {
    height: 232,
    width: 440,
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#fff",
    margin: 0,
    padding: 0,
  },
  logoFull: {
    position: "absolute",
    top: 0,
    left: -5,
    right: 0,
    bottom: 0,
  },

  logoWave: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },

  overlayLogoContainer: {
    position: "absolute",
    top: 0,
    left: -55,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  overlayLogo: {
    resizeMode: "contain",
  },

  /* CONTEÚDO */
  contentOuter: {
    flex: 1,
    alignItems: "center",
    paddingTop: 18,
    paddingBottom: 24,
  },
  content: {
    width: "100%",
    maxWidth: MAX_W,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  label: {
    fontSize: 13,
    color: "#4A4A4A",
    marginBottom: 8,
  },
  input: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },

  /* BOTÕES */
  actions: {
    marginTop: 28,
    gap: 14,
  },
  primaryBtn: {
    height: 56,
    width: "100%",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  googleBtn: {
    height: 56,
    width: "100%",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E6E6E6",
    backgroundColor: "#fff",
    gap: 8,
  },
  googleText: {
    fontSize: 15,
    color: "#333",
    fontWeight: "600",
  },

  /* RODAPÉ */
  footerText: {
    textAlign: "center",
    marginTop: 36,
    color: "#6B7280",
    fontSize: 13,
  },
  registerLink: {
    color: "#2563EB",
    fontWeight: "600",
  },
});
