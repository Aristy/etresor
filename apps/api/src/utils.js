import { customAlphabet } from 'nanoid';
const gen4 = customAlphabet('0123456789',4);
export function genRef(){return `TR-${new Date().getFullYear()}-${gen4()}`;}
export function computeTotals({amount,tvaPct=0,feeFixed=0,feePct=0}){const amt=parseInt(amount,10)||0;const tva=Math.round(amt*(tvaPct/100));const fee=Math.round(amt*(feePct/100))+(parseInt(feeFixed,10)||0);return {amt,tva,fee,total:amt+tva+fee};}