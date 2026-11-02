// src/scripts/aparelho.ts
// Decide quem fica sem as animações pesadas: aparelho fraco ou economia de dados
// ligada. "Reduzir movimento" é tratado à parte em quem usa, ver semEfeitos().

export function aparelhoFraco() {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  return (nav.deviceMemory ?? 8) <= 4 || (nav.hardwareConcurrency || 8) <= 4 || !!nav.connection?.saveData;
}

export function semEfeitos() {
  return matchMedia('(prefers-reduced-motion: reduce)').matches || aparelhoFraco();
}
