import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QRScreen from "./QRScreen";
import PaymentScreen from "./PaymentScreen";
import SettingsScreen from "./SettingsScreen";

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: "#F5F7FB" }
};

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen name="QR" component={QRScreen} options={{ title: "QR de paiement (démo)" }} />
        <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: "Paiement MoMo (démo)" }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: "Paramètres" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}