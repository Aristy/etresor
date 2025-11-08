import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Alert } from "react-native";
import { apiPost, apiGet } from "./api";

export default function PaymentScreen() {
  const [niu, setNiu] = useState("000000123456");
  const [service, setService] = useState("1");
  const [amount, setAmount] = useState("10000");
  const [msisdn, setMsisdn] = useState("+242061234567");
  const [ref, setRef] = useState("");
  const [status, setStatus] = useState("IDLE");
  const timer = useRef(null);

  async function createInvoice() {
    try {
      const inv = await apiPost("/mock/invoice", { niu, service, amount });
      setRef(inv.ref);
      setStatus(`FACTURE ${inv.ref}`);
    } catch (e) { Alert.alert("Erreur", String(e.message || e)); }
  }

  async function initiateMoMo() {
    if (!ref) return Alert.alert("Info", "Crée d'abord la facture.");
    try {
      await apiPost("/mock/momo/initiate", { ref, msisdn, amount });
      setStatus("PENDING");
      if (timer.current) clearInterval(timer.current);
      let count = 0;
      timer.current = setInterval(async () => {
        try {
          const p = await apiGet(`/mock/payment/${encodeURIComponent(ref)}`);
          setStatus(p.status || "PENDING");
          if (p.status === "PAID" || ++count >= 30) {
            clearInterval(timer.current);
          }
        } catch { /* ignore */ }
      }, 2000);
    } catch (e) { Alert.alert("Erreur", String(e.message || e)); }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Paiement Mobile Money (démo)</Text>

      <Text style={styles.label}>NIU</Text>
      <TextInput style={styles.input} value={niu} onChangeText={setNiu} />

      <Text style={styles.label}>Service (1..n)</Text>
      <TextInput style={styles.input} value={service} onChangeText={setService} />

      <Text style={styles.label}>Montant (XAF)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={amount} onChangeText={setAmount} />

      <Text style={styles.label}>MSISDN</Text>
      <TextInput style={styles.input} value={msisdn} onChangeText={setMsisdn} />

      <View style={{ height: 6 }} />
      <Button title="1) Créer facture" onPress={createInvoice} />

      <View style={{ height: 6 }} />
      <Button title="2) Initier MoMo" onPress={initiateMoMo} />

      <View style={{ height: 16 }} />
      <Text style={styles.status}>Statut: {status}{ref ? ` (ref ${ref})` : ""}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#F5F7FB", alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 8, color: "#0F172A" },
  label: { alignSelf: "flex-start", marginTop: 8, marginBottom: 4, color: "#0F172A" },
  input: { width: "100%", backgroundColor: "white", borderRadius: 8, borderWidth: 1, borderColor: "#E5E7EB", padding: 10, marginBottom: 8 },
  status: { fontSize: 16, color: "#0F172A" }
});