import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Alert, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { apiGet } from "./api";

export default function QRScreen({ navigation }) {
  const [amount, setAmount] = useState("10000");
  const [ref, setRef] = useState("TR-2025-DEMO");
  const [qr, setQr] = useState(null);

  async function generateQR() {
    try {
      const data = await apiGet(`/mock/qr?amount=${encodeURIComponent(amount)}&ref=${encodeURIComponent(ref)}`);
      if (data.qrText) setQr(data.qrText);
      else Alert.alert("Erreur", "Réponse QR invalide");
    } catch (e) { Alert.alert("Erreur", String(e.message || e)); }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>eTresor — Démo</Text>
      <Text style={styles.subtitle}>QR de paiement</Text>

      <Text style={styles.label}>Montant (XAF)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={amount} onChangeText={setAmount} />

      <Text style={styles.label}>Référence</Text>
      <TextInput style={styles.input} value={ref} onChangeText={setRef} />

      <Button title="Générer QR" onPress={generateQR} />

      <View style={{ height: 24 }} />

      {qr ? (
        <View style={styles.qrBox}>
          <QRCode value={qr} size={220} />
          <Text style={styles.qrText}>{qr}</Text>
        </View>
      ) : (
        <Text style={{ color: "#64748B" }}>Aucun QR généré pour l’instant.</Text>
      )}

      <View style={{ height: 24 }} />

      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.navigate("Payment")} style={styles.linkBtn}>
          <Text style={styles.linkTxt}>Aller à Paiement MoMo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")} style={styles.linkBtn}>
          <Text style={styles.linkTxt}>Paramètres API</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#F5F7FB", alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 8, color: "#0F172A" },
  subtitle: { fontSize: 14, marginBottom: 16, color: "#0F172A" },
  label: { alignSelf: "flex-start", marginTop: 8, marginBottom: 4, color: "#0F172A" },
  input: { width: "100%", backgroundColor: "white", borderRadius: 8, borderWidth: 1, borderColor: "#E5E7EB", padding: 10, marginBottom: 8 },
  qrBox: { alignItems: "center", marginTop: 12 },
  qrText: { marginTop: 12, fontSize: 12, color: "#64748B" },
  row: { flexDirection: "row", gap: 12 },
  linkBtn: { padding: 10 },
  linkTxt: { color: "#2563EB" }
});