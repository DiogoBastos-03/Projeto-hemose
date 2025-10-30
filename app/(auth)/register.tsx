// app/(auth)/register.jsx
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

export default function Register() {
  const router = useRouter();

  // states
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("M");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");

  function handleRegister() {
    // validações simples
    if (!name || !email || !pass || !pass2) {
      return alert("Preencha todos os campos obrigatórios.");
    }
    if (pass !== pass2) {
      return alert("As senhas não coincidem.");
    }

    // TODO: chamar API de cadastro
    // se tudo certo:
    router.replace("/(tabs)"); // vai pra Home
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F1F1F1" }}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          {/* Header simples com voltar + título */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
              <AntDesign name="arrowleft" size={22} color="#111" />
            </TouchableOpacity>
            <Text style={styles.title}>Preencha os campos</Text>
            <View style={{ width: 22 }} />
          </View>

          {/* CARD 1 - Dados pessoais */}
          <View style={styles.card}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Seu nome completo"
              placeholderTextColor="#9AA0A6"
              style={styles.inputUnderline}
            />

            <Text style={[styles.label, styles.mt16]}>Data de nascimento</Text>
            <TextInput
              value={birth}
              onChangeText={setBirth}
              keyboardType="numeric"
              placeholder="dd/mm/aaaa"
              placeholderTextColor="#9AA0A6"
              style={styles.inputUnderline}
            />

            <Text style={[styles.label, styles.mt16]}>Celular</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder="(00) 00000-0000"
              placeholderTextColor="#9AA0A6"
              style={styles.inputUnderline}
            />

            <Text style={[styles.label, styles.mt16]}>Sexo</Text>
            <View style={styles.segment}>
              <TouchableOpacity
                style={[
                  styles.segmentItem,
                  gender === "M" && styles.segmentItemActive,
                ]}
                onPress={() => setGender("M")}
                activeOpacity={0.9}
              >
                <Text
                  style={[
                    styles.segmentText,
                    gender === "M" && styles.segmentTextActive,
                  ]}
                >
                  Masculino
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.segmentItem,
                  gender === "F" && styles.segmentItemActive,
                ]}
                onPress={() => setGender("F")}
                activeOpacity={0.9}
              >
                <Text
                  style={[
                    styles.segmentText,
                    gender === "F" && styles.segmentTextActive,
                  ]}
                >
                  Feminino
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* CARD 2 - Acesso */}
          <View style={styles.card}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Seu e-mail"
              placeholderTextColor="#9AA0A6"
              style={styles.inputUnderline}
            />

            <Text style={[styles.label, styles.mt16]}>Senha</Text>
            <TextInput
              value={pass}
              onChangeText={setPass}
              secureTextEntry
              placeholder="Crie uma senha"
              placeholderTextColor="#9AA0A6"
              style={styles.inputUnderline}
            />

            <Text style={[styles.label, styles.mt16]}>
              Confirmação de senha
            </Text>
            <TextInput
              value={pass2}
              onChangeText={setPass2}
              secureTextEntry
              placeholder="Repita a senha"
              placeholderTextColor="#9AA0A6"
              style={styles.inputUnderline}
            />
          </View>

          {/* CTA */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.primaryBtn}
              activeOpacity={0.9}
              onPress={handleRegister}
            >
              <Text style={styles.primaryBtnText}>CADASTRAR</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              Já possui conta?{" "}
              <Link href="/(auth)/login" style={styles.loginLink}>
                entrar
              </Link>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const MAX_W = 357;

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 28,
    backgroundColor: "#F1F1F1",
  },
  topBar: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  /* Cards */
  card: {
    width: "100%",
    alignSelf: "center",
    maxWidth: MAX_W,
    marginTop: 12,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },

  label: {
    fontSize: 13,
    color: "#4A4A4A",
    marginBottom: 8,
  },
  inputUnderline: {
    height: 42,
    borderBottomWidth: 1.2,
    borderBottomColor: "#1f2937",
    paddingHorizontal: 2,
  },
  mt16: { marginTop: 16 },
  segment: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 999,
    padding: 4,
    gap: 6,
  },
  segmentItem: {
    flex: 1,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    height: 36,
  },
  segmentItemActive: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  segmentText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "600",
  },
  segmentTextActive: {
    color: "#111827",
  },
  actions: {
    width: "100%",
    maxWidth: MAX_W,
    alignSelf: "center",
    marginTop: 18,
    paddingHorizontal: 0,
  },
  primaryBtn: {
    height: 58,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#B71C1C",
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  footerText: {
    textAlign: "center",
    marginTop: 14,
    color: "#6B7280",
    fontSize: 13,
  },
  loginLink: {
    color: "#2563EB",
    fontWeight: "600",
  },
});
