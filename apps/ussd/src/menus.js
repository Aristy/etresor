export function mainMenu() {
  return `CON eTresor
1. Payer service
2. Suivi dossier
3. Quitter`;
}

export function payMenu() {
  return `CON Choisir service
1. Passeport
2. Amende
3. CNI
0. Retour`;
}

export function trackMenu() {
  return `CON Entrer N° dossier (ex: TR-2025-0001)`;
}

export function finish(msg = "Votre demande a été prise en compte.") {
  return `END ${msg}`;
}