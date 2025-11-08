import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main(){const base=[{code:'SVC1',name:'Droit de timbre',tvaPct:18,feeFixed:0,feePct:0},{code:'SVC2',name:'Carte grise',tvaPct:18,feeFixed:500,feePct:1},{code:'SVC3',name:'Passeport',tvaPct:0,feeFixed:0,feePct:0}];for(const s of base){await prisma.service.upsert({where:{code:s.code},update:s,create:s});}console.log('Seed done');}
main().catch(e=>{console.error(e);process.exit(1)}).finally(async()=>prisma.$disconnect());