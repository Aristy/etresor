# eTresor — Monorepo (web • appmobile • apppos • ussd)

Ce dépôt regroupe les **quatre canaux d’accès** à eTresor :  
- **web** — portail web (Next.js recommandé)  
- **appmobile** — application mobile citoyen/agent (Expo/React Native)  
- **apppos** — application POS (Android FEITIAN F20 ou smartphone)  
- **ussd** — service USSD (agrégateur MNO, ex. Africa's Talking, Infobip, MTN MoMo API USSD)

## Prérequis
- Node.js 20+ et **pnpm** (`npm i -g pnpm`)
- Android Studio (SDK) pour mobile/POS
- Git

## Démarrage rapide
```bash
pnpm -v

# USSD (Node/Express) — local
cd apps/ussd
pnpm i
pnpm dev
# endpoint: http://localhost:8080/ussd
```

Pour **mobile** (Expo) :
```bash
cd apps/mobile
pnpm i
pnpm start
```

Le **POS** et le **Web** ont des README dédiés dans `apps/pos` et `apps/web`.