import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import { getApiBase, setApiBase } from "./api";

export default function SettingsScreen() {
  const [value, setValue] = useState("");

  useEffect(() => {
    (async () => setValue(await getApiBase()))();
  }, []);

  async function save() {
    try {
      await setApiBase(value);
      Alert.alert("OK", "API_BASE mis à jour. Redémarrez ou rechargez l'app.");
    } catch (e) {
      Alert.alert("Erreur", String(e.message || e));
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paramètres API</Text>
      <Text style={styles.label}>API Base URL</Text>
      <TextInput style={styles.input} value={value} onChangeText={setValue} autoCapitalize="none" />
      <Button title="Enregistrer" onPress={save} />
      <Text style={styles.help}>
        Exemples: http://10.0.2.2:8080 (émulateur), http://localhost:8080 (USB adb reverse),
        http://192.168.1.50:8080 (LAN), http://169.239.181.3 (cloud)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FB", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16, color: "#0F172A" },
  label: { marginBottom: 6, color: "#0F172A" },
  input: { width: "100%", backgroundColor: "white", borderRadius: 8, borderWidth: 1, borderColor: "#E5E7EB", padding: 10, marginBottom: 12 },
  help: { marginTop: 12, color: "#64748B", fontSize: 12 }
});