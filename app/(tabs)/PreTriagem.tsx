// pre-triagem.tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  FlatList,
  Pressable,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

type Option = { label: string; value: string | number | boolean };
type Question = {
  id: string;
  chipLabel: string; // << novo: rótulo mostrado no “passo” (ex.: Peso)
  text: string;
  options: Option[];
  required?: boolean;
};

type Props = {
  questions?: Question[];
  onFinish?: (answers: Record<string, Option["value"]>) => void;
};

const RED = "#D32F2F";
const GRAY_CARD = "#EDEDED";
const GRAY_TEXT = "#434343";

export default function PreTriagemScreen({
  questions = [
    {
      id: "peso_maior_50",
      chipLabel: "Peso",
      text: "Você pesa mais de 50 kg?",
      options: [
        { label: "Sim", value: true },
        { label: "Não", value: false },
      ],
      required: true,
    },
    {
      id: "idade",
      chipLabel: "Idade",
      text: "Você tem entre 16 e 69 anos?",
      options: [
        { label: "Sim", value: true },
        { label: "Não", value: false },
      ],
      required: true,
    },
    {
      id: "descanso",
      chipLabel: "Descanso",
      text: "Dormiu bem nas últimas 24 horas?",
      options: [
        { label: "Sim", value: true },
        { label: "Não", value: false },
      ],
    },
  ],
  onFinish,
}: Props) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Option["value"]>>({});

  const current = questions[step];
  const isLast = step === questions.length - 1;
  const selectedValue = answers[current?.id];

  function handleSelect(value: Option["value"]) {
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
  }

  function handleNext() {
    if (current?.required && selectedValue === undefined) return;
    if (isLast) return onFinish?.(answers);
    setStep((s) => s + 1);
  }

  function handleBack() {
    if (step === 0) router.back();
    else setStep((s) => s - 1);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Card do título */}
      <View style={styles.titleCard}>
        <Text style={styles.titleCardTitle}>Formulário de pré-triagem</Text>
        <Text style={styles.titleCardSubtitle}>Preencha todos os campos</Text>
      </View>

      {/* ==== NOVO: “faixa de etapas” no lugar da barra vermelha ==== */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsRow}
        
      >
        {questions.map((q, i) => {
          const selected = i === step;
          return (
            <TouchableOpacity
              key={q.id}
              activeOpacity={0.9}
              onPress={() => setStep(i)}
              style={[styles.chip, selected && styles.chipSelected]}
            >
              <Text
                style={[styles.chipText, selected && styles.chipTextSelected]}
              >
                {q.chipLabel}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {/* =========================================================== */}

      {/* Pergunta atual */}
      <View style={{ paddingHorizontal: 20, marginTop: 0 }}>
        <Text style={styles.questionText}>{current.text}</Text>

        <FlatList
          data={current.options}
          keyExtractor={(opt) => String(opt.value)}
          contentContainerStyle={{ gap: 12, paddingVertical: 120 }}
          renderItem={({ item }) => {
            const checked = selectedValue === item.value;
            return (
              <Pressable
                onPress={() => handleSelect(item.value)}
                style={({ hovered, pressed }) => [
                  styles.option,
                  hovered && styles.optionHover, // hover (web)
                  pressed && styles.optionPressed, // press (mobile)
                  checked && styles.optionChecked, // selecionada
                ]}
              >
                <View
                  style={[styles.radioOuter, checked && { borderColor: RED }]}
                >
                  {checked ? <View style={styles.radioInner} /> : null}
                </View>
                <Text style={styles.optionLabel}>{item.label}</Text>
              </Pressable>
            );
          }}
        />
      </View>

      {/* Rodapé */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.btnGhost} onPress={handleBack}>
          <Text style={styles.btnGhostText}>VOLTAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          disabled={current?.required && selectedValue === undefined}
          style={[
            styles.btnPrimary,
            current?.required &&
              selectedValue === undefined && { opacity: 0.6 },
          ]}
        >
          <Text style={styles.btnPrimaryText}>
            {isLast ? "FINALIZAR" : "PRÓXIMO"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 4 },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
    textAlign: "center",
  },

  titleCard: {
    backgroundColor: RED,
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  titleCardTitle: {
    color: "#FFF",
    fontWeight: "800",
    fontSize: 16,
    marginBottom: 30,
  },
  titleCardSubtitle: { color: "#FFECEC", fontSize: 12, opacity: 0.95 },

  // Faixa de etapas (chips)
  chipsRow: { paddingHorizontal: 16, gap: 10, paddingTop: 14 },
  chip: {
    paddingHorizontal: 14,
    height: 32,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#1A1A1A",
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  chipSelected: { backgroundColor: "#EBEBEB" },
  chipText: { color: "#000000", fontSize: 13, fontWeight: "600" },
  chipTextSelected: { color: "#1A1A1A" },

  questionText: {
    marginTop: 0,
    color: GRAY_TEXT,
    fontSize: 22,
    fontWeight: "600",
  },

  option: {
    minHeight: 84,
    backgroundColor: GRAY_CARD,
    borderRadius: 16,
    paddingHorizontal: 16,
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "transparent",
    transitionDuration: "120ms" as any, // RN web
  },
  optionHover: {
    transform: [{ scale: 1.01 }],
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  optionPressed: { transform: [{ scale: 0.99 }] },
  optionChecked: {
    borderColor: RED,
    backgroundColor: "#F9F9F9",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#888",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: RED },
  optionLabel: { fontSize: 16, color: "#222", fontWeight: "500" },

  footer: { marginTop: "auto", padding: 20, flexDirection: "row", gap: 14 },
  btnGhost: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    justifyContent: "center",
  },
  btnGhostText: { fontWeight: "800", color: "#222" },
  btnPrimary: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    backgroundColor: RED,
    alignItems: "center",
    justifyContent: "center",
  },
  btnPrimaryText: { color: "#FFF", fontWeight: "800", letterSpacing: 0.5 },
});
