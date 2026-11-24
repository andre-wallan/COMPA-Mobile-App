import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Card } from "../../src/components/Card";
import { Screen } from "../../src/components/Screen";
import { quizQuestions } from "../../src/data/content";
import { colors } from "../../src/theme";

export default function QuizScreen() {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [complete, setComplete] = useState(false);
  const question = quizQuestions[index];

  function choose(option: string) {
    if (answer !== null) return;
    setAnswer(option);
    if (option === question.answer) setScore((value) => value + 1);
  }

  function next() {
    if (index === quizQuestions.length - 1) {
      setComplete(true);
      return;
    }
    setIndex((value) => value + 1);
    setAnswer(null);
  }

  function restart() {
    setIndex(0);
    setAnswer(null);
    setScore(0);
    setComplete(false);
  }

  if (complete) {
    return (
      <Screen>
        <Text style={styles.title}>Quiz complete</Text>
        <Card>
          <Text style={styles.score}>{score}/{quizQuestions.length}</Text>
          <Text style={styles.caption}>Keep practicing to improve your score.</Text>
          <Pressable style={styles.primaryButton} onPress={restart}>
            <Text style={styles.primaryText}>Try again</Text>
          </Pressable>
        </Card>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text style={styles.eyebrow}>{question.subject}</Text>
      <Text style={styles.title}>Question {index + 1} of {quizQuestions.length}</Text>
      <Card>
        <Text style={styles.prompt}>{question.prompt}</Text>
        <View style={styles.options}>
          {question.options.map((option) => {
            const selected = answer === option;
            const correct = answer !== null && option === question.answer;
            const wrong = selected && option !== question.answer;
            return (
              <Pressable
                key={option}
                onPress={() => choose(option)}
                style={[styles.option, correct && styles.correct, wrong && styles.wrong]}
              >
                <Text style={[styles.optionText, (correct || wrong) && styles.optionTextSelected]}>{option}</Text>
              </Pressable>
            );
          })}
        </View>
        {answer !== null && (
          <View style={styles.feedback}>
            <Text style={styles.feedbackTitle}>{answer === question.answer ? "Correct" : "Not quite"}</Text>
            <Text style={styles.caption}>{question.explanation}</Text>
            <Pressable style={styles.primaryButton} onPress={next}>
              <Text style={styles.primaryText}>{index === quizQuestions.length - 1 ? "See score" : "Next question"}</Text>
            </Pressable>
          </View>
        )}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  eyebrow: { color: colors.primary, fontSize: 13, fontWeight: "800", textTransform: "uppercase", marginBottom: 4 },
  title: { color: colors.text, fontSize: 26, fontWeight: "800", marginBottom: 16 },
  prompt: { color: colors.text, fontSize: 20, fontWeight: "800", lineHeight: 28 },
  options: { gap: 10, marginTop: 18 },
  option: { borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 14 },
  correct: { backgroundColor: colors.successSoft, borderColor: colors.success },
  wrong: { backgroundColor: colors.dangerSoft, borderColor: colors.danger },
  optionText: { color: colors.text, fontWeight: "700" },
  optionTextSelected: { color: colors.text },
  feedback: { marginTop: 18, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 16 },
  feedbackTitle: { color: colors.text, fontWeight: "800", fontSize: 16, marginBottom: 4 },
  caption: { color: colors.muted, lineHeight: 20 },
  primaryButton: { marginTop: 16, borderRadius: 10, backgroundColor: colors.primary, alignItems: "center", paddingVertical: 13 },
  primaryText: { color: "#422006", fontWeight: "800" },
  score: { color: colors.primary, fontSize: 48, fontWeight: "900", textAlign: "center" },
});
