# eTresor — USSD

Run local:
```bash
pnpm i
pnpm dev
# POST http://localhost:8080/ussd
```

Payload (ex. Africa's Talking):
```x-www-form-urlencoded
sessionId=XYZ
serviceCode=*123#
phoneNumber=+242061234567
text=1*2
```

Réponse doit être `CON` (continuer) ou `END` (fin).