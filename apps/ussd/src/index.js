import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { mainMenu, payMenu, trackMenu, finish } from './menus.js';

dotenv.config();
const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

// Health
app.get('/health', (_, res) => res.json({ ok: true }));

// USSD endpoint
app.post('/ussd', (req, res) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body || {};
  console.log({ sessionId, serviceCode, phoneNumber, text });

  const parts = (text || '').split('*').filter(Boolean);
  if (parts.length === 0) {
    return res.send(mainMenu());
  }
  if (parts.length === 1) {
    if (parts[0] === '1') return res.send(payMenu());
    if (parts[0] === '2') return res.send(trackMenu());
    return res.send(mainMenu());
  }
  if (parts[0] === '1') {
    // Payment flows by service
    if (parts.length === 2) {
      const svc = parts[1];
      if (['1','2','3'].includes(svc)) {
        return res.send(`CON Entrer NIU (12 chiffres)`);
      }
      return res.send(payMenu());
    }
    if (parts.length === 3) {
      return res.send(`CON Entrer montant (XAF)`);
    }
    if (parts.length === 4) {
      // Normally, call backend to create invoice & STK Push MoMo here
      return res.send(finish("Facture créée. Vous allez recevoir une demande de paiement Mobile Money."));
    }
  }
  if (parts[0] === '2') {
    if (parts.length === 2) {
      // Normally, call backend to lookup tracking number
      return res.send(finish("Statut: EN COURS (exemple)"));
    }
  }
  return res.send(finish("Merci."));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`USSD listening on :${port}`));