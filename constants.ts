import { Calculator } from './types';

export const BUILT_IN_CALCULATORS: Calculator[] = [
  // Anestesia e Analgesia
  {
    id: 'builtin-doggie-kitty-magic',
    name: 'Sedação: Doggie & Kitty Magic',
    description: 'Calcula volumes para protocolos de sedação com Dexmedetomidina, Cetamina e um Opioide.',
    group: 'Anestesia e Analgesia',
    type: 'builtin',
    variables: [
        { name: 'Peso do Paciente', key: 'weight', unit: 'kg' },
        { name: 'Conc. Dexmedetomidina', key: 'dex_conc', unit: 'mg/ml' },
        { name: 'Conc. Cetamina', key: 'ket_conc', unit: 'mg/ml' },
        { name: 'Conc. Opioide (Butorfanol/Bup)', key: 'opioid_conc', unit: 'mg/ml' },
    ],
    formula: `const dex_dose = 0.01; const ket_dose = 5; const opioid_dose = 0.2;
              const dex_vol = (weight * dex_dose) / dex_conc;
              const ket_vol = (weight * ket_dose) / ket_conc;
              const opioid_vol = (weight * opioid_dose) / opioid_conc;
              return 'Dex: ' + dex_vol.toFixed(3) + 'ml, Ket: ' + ket_vol.toFixed(3) + 'ml, Opioide: ' + opioid_vol.toFixed(3) + 'ml';`,
    resultUnit: '',
    helpText: 'Calcula os volumes para um protocolo "Magic" comum, misturados na mesma seringa. Administrar IM.<br/><br/><b>Doses usadas na fórmula:</b><br/>- <b>Dexmedetomidina:</b> 0.01 mg/kg (10 mcg/kg)<br/>- <b>Cetamina:</b> 5 mg/kg<br/>- <b>Opioide (Butorfanol/Buprenorfina):</b> 0.2 mg/kg<br/><br/><b>Atenção:</b> As doses podem ser ajustadas conforme o paciente. Esta é uma combinação para sedação profunda.'
  },
  {
    id: 'builtin-gma-protocol',
    name: 'Protocolo Calmante Pré-Consulta (GMA)',
    description: 'Calcula doses do protocolo "calmante" com Gabapentina, Melatonina e Acepromazina para cães.',
    group: 'Anestesia e Analgesia',
    type: 'builtin',
    variables: [
      { name: 'Peso do Cão', key: 'weight', unit: 'kg' }
    ],
    formula: `const gaba_dose = 20; const mel_dose = 5; const ace_dose = 0.02;
               const gaba_total = weight * gaba_dose;
               const mel_total = mel_dose;
               const ace_total = weight * ace_dose;
               return 'Gaba: ' + gaba_total.toFixed(1) + 'mg, Melatonina: ' + mel_total + 'mg, Ace: ' + ace_total.toFixed(2) + 'mg';`,
    resultUnit: '',
    helpText: 'Calcula as doses totais para o protocolo GMA (Gabapentin, Melatonin, Acepromazine) para ser administrado oralmente pelo tutor antes da consulta.<br/><br/><b>Doses usadas:</b><br/>- <b>Gabapentina:</b> 20 mg/kg<br/>- <b>Melatonina:</b> 5 mg (dose fixa para a maioria dos cães)<br/>- <b>Acepromazina:</b> 0.02 mg/kg<br/><br/><b>Instruções:</b> Administrar 2-3 horas antes da visita. O resultado está em <b>mg</b> para facilitar a manipulação ou o uso de comprimidos.'
  },
  {
    id: 'builtin-flk-cri',
    name: 'Infusão Contínua de FLK',
    description: 'Calcula o volume de Fentanil, Lidocaína e Cetamina (FLK) a ser adicionado em 100ml de fluido.',
    group: 'Anestesia e Analgesia',
    type: 'builtin',
    variables: [
      { name: 'Peso do Paciente', key: 'weight', unit: 'kg' },
      { name: 'Taxa de Fluido', key: 'fluidRate', unit: 'ml/h' },
    ],
    formula: `const f_dose = 5; const l_dose = 50; const k_dose_dog = 10; const k_dose_cat = 5;
               const f_conc = 0.05; const l_conc = 20; const k_conc = 100;
               const calcVol = (dose, conc) => ((dose * weight * 60) / (conc * 1000) / fluidRate) * 100;
               const f_vol = calcVol(f_dose, f_conc);
               const l_vol = calcVol(l_dose, l_conc);
               const k_vol_dog = calcVol(k_dose_dog, k_conc);
               const k_vol_cat = calcVol(k_dose_cat, k_conc);
               return 'Cães: F(' + f_vol.toFixed(2) + 'ml), L(' + l_vol.toFixed(2) + 'ml), K(' + k_vol_dog.toFixed(2) + 'ml). Gatos: ... K(' + k_vol_cat.toFixed(2) + 'ml)';`,
    resultUnit: 'ml/100ml de fluido',
    helpText: 'Calcula os volumes para um protocolo FLK padrão.<br/><br/><b>Doses usadas na fórmula:</b><br/>- <b>Fentanil:</b> 5 mcg/kg/min<br/>- <b>Lidocaína:</b> 50 mcg/kg/min<br/>- <b>Cetamina:</b> 10 mcg/kg/min (cães), 5 mcg/kg/min (gatos)<br/><br/><b>Atenção:</b> A lidocaína é para uso em cães. Em gatos, o uso de CRI de lidocaína é controverso e requer doses muito menores e monitoramento rigoroso.'
  },

  // Conversores
  {
    id: 'builtin-kg-to-lbs',
    name: 'Conversor: Quilogramas para Libras',
    description: 'Converte peso de quilogramas (kg) para libras (lbs).',
    group: 'Conversores',
    type: 'builtin',
    variables: [
      { name: 'Peso em Quilogramas', key: 'kg', unit: 'kg' },
    ],
    formula: 'return kg * 2.20462',
    resultUnit: 'lbs',
    helpText: 'Use esta calculadora para converter rapidamente o peso do paciente de quilogramas para libras. Fator de conversão: 1 kg ≈ 2.20462 lbs.'
  },
  {
    id: 'builtin-lbs-to-kg',
    name: 'Conversor: Libras para Quilogramas',
    description: 'Converte peso de libras (lbs) para quilogramas (kg).',
    group: 'Conversores',
    type: 'builtin',
    variables: [
      { name: 'Peso em Libras', key: 'lbs', unit: 'lbs' },
    ],
    formula: 'return lbs / 2.20462',
    resultUnit: 'kg',
    helpText: 'Use esta calculadora para converter rapidamente o peso do paciente de libras para quilogramas. Fator de conversão: 1 lb ≈ 0.453592 kg.'
  },
  {
    id: 'builtin-c-to-f',
    name: 'Conversor: Celsius para Fahrenheit',
    description: 'Converte temperatura de graus Celsius (°C) para Fahrenheit (°F).',
    group: 'Conversores',
    type: 'builtin',
    variables: [
      { name: 'Temperatura em Celsius', key: 'celsius', unit: '°C' },
    ],
    formula: 'return (celsius * 1.8) + 32',
    resultUnit: '°F',
    helpText: 'Fórmula padrão para converter a temperatura de Celsius para Fahrenheit.'
  },
  {
    id: 'builtin-f-to-c',
    name: 'Conversor: Fahrenheit para Celsius',
    description: 'Converte temperatura de graus Fahrenheit (°F) para Celsius (°C).',
    group: 'Conversores',
    type: 'builtin',
    variables: [
      { name: 'Temperatura em Fahrenheit', key: 'fahrenheit', unit: '°F' },
    ],
    formula: 'return (fahrenheit - 32) / 1.8',
    resultUnit: '°C',
    helpText: 'Fórmula padrão para converter a temperatura de Fahrenheit para Celsius.'
  },
  {
    id: 'builtin-percent-to-mgml',
    name: 'Conversor: % para mg/ml',
    description: 'Converte a concentração de uma solução de porcentagem (%) para mg/ml.',
    group: 'Conversores',
    type: 'builtin',
    variables: [
      { name: 'Concentração', key: 'percent', unit: '%' },
    ],
    formula: 'return percent * 10',
    resultUnit: 'mg/ml',
    helpText: 'Uma solução a X% significa X gramas em 100 ml. Esta calculadora converte isso para mg/ml.<br/><b>Exemplo:</b> Dextrose 50% = 500 mg/ml. Lidocaína 2% = 20 mg/ml.'
  },
  {
    id: 'builtin-mgml-to-percent',
    name: 'Conversor: mg/ml para %',
    description: 'Converte a concentração de uma solução de mg/ml para porcentagem (%).',
    group: 'Conversores',
    type: 'builtin',
    variables: [
      { name: 'Concentração', key: 'mgml', unit: 'mg/ml' },
    ],
    formula: 'return mgml / 10',
    resultUnit: '%',
    helpText: 'Converte a concentração em mg/ml para a sua representação em porcentagem (g/100ml).<br/><b>Exemplo:</b> Uma solução com 50 mg/ml é uma solução a 5%.'
  },
  {
    id: 'builtin-g-to-kg',
    name: 'Conversor: Grama para Quilograma',
    description: 'Converte peso de gramas (g) para quilogramas (kg).',
    group: 'Conversores',
    type: 'builtin',
    variables: [
      { name: 'Peso em Gramas', key: 'g', unit: 'g' },
    ],
    formula: 'return g / 1000',
    resultUnit: 'kg',
    helpText: 'Essencial para pacientes muito pequenos (exóticos, neonatos) onde o peso é medido em gramas. 1000g = 1kg.'
  },
  {
    id: 'builtin-kg-to-g',
    name: 'Conversor: Quilograma para Grama',
    description: 'Converte peso de quilogramas (kg) para gramas (g).',
    group: 'Conversores',
    type: 'builtin',
    variables: [
      { name: 'Peso em Quilogramas', key: 'kg', unit: 'kg' },
    ],
    formula: 'return kg * 1000',
    resultUnit: 'g',
    helpText: 'Converte kg para g. Útil para cálculos de diluição ou quando doses são expressas por grama. 1kg = 1000g.'
  },
  {
    id: 'builtin-l-to-ml',
    name: 'Conversor: Litro para Mililitro',
    description: 'Converte volume de litros (L) para mililitros (ml).',
    group: 'Conversores',
    type: 'builtin',
    variables: [
      { name: 'Volume em Litros', key: 'l', unit: 'L' },
    ],
    formula: 'return l * 1000',
    resultUnit: 'ml',
    helpText: 'Conversão básica de volume. 1 Litro equivale a 1000 mililitros.'
  },
  {
    id: 'builtin-ml-to-l',
    name: 'Conversor: Mililitro para Litro',
    description: 'Converte volume de mililitros (ml) para litros (L).',
    group: 'Conversores',
    type: 'builtin',
    variables: [
      { name: 'Volume em Mililitros', key: 'ml', unit: 'ml' },
    ],
    formula: 'return ml / 1000',
    resultUnit: 'L',
    helpText: 'Conversão básica de volume. 1000 mililitros equivalem a 1 Litro.'
  },

  // Diagnóstico e Monitoramento
  {
    id: 'builtin-acth-stim-test',
    name: 'Teste de Estimulação por ACTH',
    description: 'Calcula a dose de cortrosina (cosintropina) para o teste de estimulação por ACTH.',
    group: 'Diagnóstico e Monitoramento',
    type: 'builtin',
    variables: [
      { name: 'Peso do Paciente', key: 'weight', unit: 'kg' },
      { name: 'Dose de Cortrosina', key: 'dose', unit: 'mcg/kg' },
      { name: 'Concentração (Após Reconstituição)', key: 'concentration', unit: 'mcg/ml' },
    ],
    formula: 'return (weight * dose) / concentration',
    resultUnit: 'ml',
    helpText: 'O padrão-ouro para o diagnóstico de hipoadrenocorticismo (Addison) e monitoramento de hiperadrenocorticismo (Cushing).<br/><br/><b>Protocolo Padrão (Cães):</b><br/>- <b>Dose:</b> 5 mcg/kg (dose máxima de 250 mcg).<br/>- <b>Reconstituição:</b> Reconstitua um frasco de 250 mcg com 1 ml de diluente para uma concentração de <b>250 mcg/ml</b>.<br/>- <b>Procedimento:</b> Colete amostra de sangue basal, administre a dose IV, e colete a segunda amostra 1 hora depois.'
  },
  {
    id: 'builtin-hac-prediction',
    name: 'Calculadora Preditiva para Hiperadrenocorticismo',
    description: 'Estima a probabilidade de Hiperadrenocorticismo (Cushing) com base em exames de sangue.',
    group: 'Diagnóstico e Monitoramento',
    type: 'builtin',
    variables: [
        { name: 'Fosfatase Alcalina (FA)', key: 'alp', unit: 'U/L' },
        { name: 'Colesterol', key: 'chol', unit: 'mg/dL' },
        { name: 'Densidade Urinária', key: 'usg', unit: '' },
        { name: 'Contagem de Plaquetas', key: 'plt', unit: 'x10³/μL' },
    ],
    formula: 'const p = 1 / (1 + Math.exp(-(-12.2 + (0.007 * alp) + (0.019 * chol) - (2.99 * usg) + (0.004 * plt)))); return (p * 100).toFixed(2)',
    resultUnit: '% de probabilidade',
    helpText: 'Esta calculadora usa um modelo de regressão logística para ajudar a decidir se testes específicos para Hiperadrenocorticismo (HAC) são justificados. Não é um teste diagnóstico.<br/><br/><b>Interpretação:</b> Uma probabilidade alta aumenta a suspeita de HAC e apoia a realização de testes como o de supressão por dexametasona em baixa dose. Uma probabilidade baixa torna o HAC menos provável.'
  },
  {
    id: 'builtin-glasgow-coma-scale',
    name: 'Escala de Coma de Glasgow Modificada',
    description: 'Soma os escores para avaliar o nível de consciência.',
    group: 'Diagnóstico e Monitoramento',
    type: 'builtin',
    variables: [
        { name: 'Escore Motor', key: 'motor_score', unit: '1-6' },
        { name: 'Escore de Tronco Cerebral', key: 'brainstem_score', unit: '1-6' },
        { name: 'Escore de Consciência', key: 'consciousness_score', unit: '1-6' },
    ],
    formula: 'return motor_score + brainstem_score + consciousness_score',
    resultUnit: 'pontos (3-18)',
    helpText: 'Some os escores das três categorias para obter a pontuação total (3-18).<br/><br/><b>Escores e Prognóstico:</b><br/>- <b>15-18:</b> Bom<br/>- <b>9-14:</b> Guardado<br/>- <b>3-8:</b> Ruim/Grave<br/><br/>Use as tabelas padrão da Escala de Coma de Glasgow Modificada para determinar o escore de cada categoria para a espécie (cão ou gato).'
  },
  {
    id: 'builtin-corrected-calcium',
    name: 'Cálcio Corrigido por Albumina',
    description: 'Ajusta o cálcio total medido com base nos níveis de albumina sérica.',
    group: 'Diagnóstico e Monitoramento',
    type: 'builtin',
    variables: [
      { name: 'Cálcio Total Medido', key: 'totalCa', unit: 'mg/dL' },
      { name: 'Albumina Sérica', key: 'albumin', unit: 'g/dL' },
    ],
    formula: 'return totalCa - albumin + 3.5',
    resultUnit: 'mg/dL',
    helpText: 'A hipoalbuminemia pode causar uma pseudohipocalcemia. Esta fórmula corrige o cálcio total para estimar o cálcio fisiologicamente ativo.<br/><br/><b>Fórmula (para cães):</b> Cálcio Corrigido = Cálcio Total (mg/dL) - Albumina (g/dL) + 3.5.<br/><b>Valores Normais (Cães):</b> O cálcio total normal é ~9-11.5 mg/dL. Se o cálcio medido estiver baixo, mas o corrigido estiver normal, o paciente provavelmente não tem hipocalcemia verdadeira.<br/><b>Nota:</b> Esta é a fórmula mais comum, mas outras existem. A medição de cálcio ionizado é o padrão-ouro.'
  },
  
  // Emergência e Terapia Intensiva
  {
    id: 'builtin-anion-gap',
    name: 'Ânion Gap',
    description: 'Calcula o ânion gap para ajudar no diagnóstico diferencial de acidose metabólica.',
    group: 'Emergência e Terapia Intensiva',
    type: 'builtin',
    variables: [
      { name: 'Sódio (Na+)', key: 'Na', unit: 'mEq/L' },
      { name: 'Cloro (Cl-)', key: 'Cl', unit: 'mEq/L' },
      { name: 'Bicarbonato (HCO3-)', key: 'HCO3', unit: 'mEq/L' },
    ],
    formula: 'return Na - (Cl + HCO3)',
    resultUnit: 'mEq/L',
    helpText: 'O Ânion Gap (AG) é uma ferramenta essencial para avaliar distúrbios acidobásicos.<br/><br/><b>Fórmula:</b> AG = Na+ - (Cl- + HCO3-).<br/><b>Valores Normais (Cães):</b> 12-24 mEq/L.<br/><b>Interpretação:</b> Um AG elevado sugere uma acidose metabólica por ganho de ácidos (ex: cetoacidose, uremia, intoxicação por etilenoglicol - mnemônico MUDPILES). Um AG normal em um paciente com acidose sugere perda de bicarbonato (ex: diarreia).'
  },
  {
    id: 'builtin-bicarb-deficit',
    name: 'Déficit de Bicarbonato',
    description: 'Calcula a quantidade de bicarbonato necessária para corrigir acidose metabólica.',
    group: 'Emergência e Terapia Intensiva',
    type: 'builtin',
    variables: [
      { name: 'Peso do Paciente', key: 'weight', unit: 'kg' },
      { name: 'Déficit de Base (BE)', key: 'base_deficit', unit: 'mEq/L' },
    ],
    formula: 'return weight * 0.3 * base_deficit',
    resultUnit: 'mEq de HCO3-',
    helpText: 'Calcula a quantidade total de bicarbonato (em mEq) para corrigir a acidose. O valor do Déficit de Base (BE) é obtido na hemogasometria (use o valor absoluto, ex: se BE for -10, insira 10).<br/><br/><b>Administração:</b> Geralmente, administra-se 1/4 a 1/3 da dose calculada lentamente (IV, ao longo de 30-60 min) e reavalia-se o paciente e a hemogasometria antes de administrar mais. A correção rápida pode ser perigosa.'
  },
  {
    id: 'builtin-methylxanthine-toxicity',
    name: 'Intoxicação por Metilxantinas (Chocolate/Café)',
    description: 'Avalia a dose tóxica de teobromina e cafeína ingerida.',
    group: 'Emergência e Terapia Intensiva',
    type: 'builtin',
    variables: [
      { name: 'Peso do Paciente', key: 'weight', unit: 'kg' },
      { name: 'Quantidade Ingerida', key: 'amount', unit: 'g' },
      { name: 'Teor de Metilxantinas', key: 'content', unit: 'mg/g' },
    ],
    formula: 'return (amount * content) / weight',
    resultUnit: 'mg/kg',
    helpText: 'Calcula a dose de metilxantinas (teobromina, cafeína) ingerida.<br/><br/><b>Teor Médio (mg/g):</b><br/>- Chocolate ao Leite: <b>~2.5</b><br/>- Chocolate Meio Amargo: <b>~5.5</b><br/>- Chocolate Amargo (>70%): <b>~16</b><br/>- Grãos de Café: <b>~15</b><br/><br/><b>Níveis de Toxicidade (mg/kg):</b><br/>- <b>>20:</b> Sinais gastrointestinais.<br/>- <b>>40:</b> Sinais cardiovasculares.<br/>- <b>>60:</b> Sinais neurológicos (convulsões).<br/>- <b>>100:</b> Risco de morte.'
  },
  {
    id: 'builtin-emergency-drugs',
    name: 'Fármacos de Emergência (Dose Única)',
    description: 'Calcula o volume de fármacos comuns em emergência (PCR, convulsões).',
    group: 'Emergência e Terapia Intensiva',
    type: 'builtin',
    variables: [
        { name: 'Peso do Paciente', key: 'weight', unit: 'kg' },
        { name: 'Dose do Fármaco', key: 'dose', unit: 'mg/kg' },
        { name: 'Concentração do Fármaco', key: 'concentration', unit: 'mg/ml' },
    ],
    formula: 'return (weight * dose) / concentration',
    resultUnit: 'ml',
    helpText: 'Calculadora de dose única para acesso rápido. Insira a dose e a concentração do fármaco desejado.<br/><br/><b>Exemplos de Doses (mg/kg):</b><br/>- <b>Epinefrina (PCR):</b> 0.01<br/>- <b>Atropina (PCR):</b> 0.04<br/>- <b>Lidocaína (Cães, PCR):</b> 2<br/>- <b>Diazepam (Convulsão):</b> 0.5'
  },
  {
    id: 'builtin-insulin-cri',
    name: 'Infusão Contínua de Insulina Regular',
    description: 'Calcula a taxa de infusão de insulina para tratamento de cetoacidose diabética (CAD).',
    group: 'Emergência e Terapia Intensiva',
    type: 'builtin',
    variables: [
      { name: 'Peso do Paciente', key: 'weight', unit: 'kg' },
      { name: 'Glicemia Atual', key: 'glucose', unit: 'mg/dL' },
    ],
    formula: 'const rate = glucose < 250 ? weight * 0.05 : weight * 0.1; return rate;',
    resultUnit: 'U/h',
    helpText: 'Calcula a taxa de infusão de insulina em Unidades por Hora (U/h) com base na glicemia.<br/><br/><b>Protocolo Padrão:</b><br/>- Se Glicemia > 250 mg/dL: <b>0.1 U/kg/h</b><br/>- Se Glicemia < 250 mg/dL: <b>0.05 U/kg/h</b><br/><br/><b>Preparação:</b> Adicione 2.2 U/kg (cães) ou 1.1 U/kg (gatos) de insulina regular a 250ml de NaCl 0.9%. A taxa de infusão da bomba será de 10 ml/h, o que entregará a dose calculada. Monitore a glicemia a cada 1-2 horas.'
  },
  {
    id: 'builtin-ibuprofen-toxicity',
    name: 'Toxicidade por AINEs (Ibuprofeno)',
    description: 'Calcula a dose de ibuprofeno ingerida e informa o risco associado.',
    group: 'Emergência e Terapia Intensiva',
    type: 'builtin',
    variables: [
        { name: 'Peso do Cão', key: 'weight', unit: 'kg' },
        { name: 'Dose Total Ingerida', key: 'dose_mg', unit: 'mg' },
    ],
    formula: `const dosePerKg = dose_mg / weight;
              let risk = "";
              if (dosePerKg >= 400) {
                risk = "GRAVE: Risco de falha renal aguda, convulsões e coma.";
              } else if (dosePerKg >= 175) {
                risk = "ALTO: Risco de falha renal aguda, além de sinais GI.";
              } else if (dosePerKg >= 25) {
                risk = "MODERADO: Risco de úlceras gástricas, vômito e diarreia.";
              } else {
                risk = "BAIXO: Geralmente, sinais leves ou ausentes, mas o tratamento ainda pode ser recomendado.";
              }
              return dosePerKg.toFixed(2) + ' mg/kg. Risco: ' + risk;`,
    resultUnit: '',
    helpText: 'Calcula a dose ingerida de ibuprofeno e estratifica o risco. Gatos são muito mais sensíveis e qualquer dose deve ser considerada perigosa.<br/><br/><b>Faixas de Toxicidade (Cães):</b><br/>- <b>>25 mg/kg:</b> Sinais gastrointestinais (vômito, diarreia, úlceras).<br/>- <b>>175 mg/kg:</b> Risco de insuficiência renal aguda.<br/>- <b>>400 mg/kg:</b> Risco de efeitos no sistema nervoso central (convulsões, coma).<br/><br/>O tratamento imediato com indução de vômito (se apropriado), carvão ativado e protetores gástricos é crucial.'
  },
  {
    id: 'builtin-xylitol-toxicity',
    name: 'Toxicidade por Xilitol',
    description: 'Calcula a dose de xilitol ingerida e informa os riscos associados.',
    group: 'Emergência e Terapia Intensiva',
    type: 'builtin',
    variables: [
        { name: 'Peso do Cão', key: 'weight', unit: 'kg' },
        { name: 'Quantidade de Xilitol Ingerida', key: 'xylitol_g', unit: 'g' },
    ],
    formula: `const dosePerKg = (xylitol_g * 1000) / weight;
              let risk = "";
              if (dosePerKg >= 500) {
                risk = "GRAVE: Risco de necrose hepática aguda, além de hipoglicemia severa.";
              } else if (dosePerKg >= 75) {
                risk = "ALTO: Risco de hipoglicemia severa e potencialmente fatal.";
              } else {
                risk = "BAIXO: Risco de hipoglicemia leve a moderada.";
              }
              return dosePerKg.toFixed(2) + ' mg/kg. Risco: ' + risk;`,
    resultUnit: '',
    helpText: 'O Xilitol é extremamente perigoso para cães.<br/><br/><b>Faixas de Toxicidade:</b><br/>- <b>>75-100 mg/kg:</b> Causa uma liberação massiva de insulina, resultando em hipoglicemia severa em 30-60 minutos.<br/>- <b>>500 mg/kg:</b> Risco de insuficiência hepática aguda fulminante.<br/><br/><b>Atenção:</b> A quantidade de xilitol em produtos (ex: gomas de mascar) pode variar muito. O tratamento emergencial com monitoramento de glicose e suporte hepático é vital.'
  },

  // Farmacologia e Dosagem
  {
    id: 'builtin-bsa',
    name: 'Superfície Corpórea (ASC/BSA)',
    description: 'Calcula a área de superfície corporal, usada para dosagens de quimioterápicos.',
    group: 'Farmacologia e Dosagem',
    type: 'builtin',
    variables: [
      { name: 'Peso do Paciente', key: 'weight', unit: 'kg' },
    ],
    formula: 'return 0.101 * (weight ** (2/3))',
    resultUnit: 'm²',
    helpText: 'A ASC (BSA em inglês) é usada em oncologia porque se correlaciona melhor com o metabolismo basal e clearance de drogas do que o peso, permitindo uma dosagem mais segura de fármacos com baixo índice terapêutico.'
  },
  {
    id: 'builtin-generic-cri',
    name: 'Infusão Contínua de Fármacos (Genérica)',
    description: 'Calcula o volume de um fármaco a ser adicionado a cada 100ml de fluido.',
    group: 'Farmacologia e Dosagem',
    type: 'builtin',
    variables: [
      { name: 'Peso do Paciente', key: 'weight', unit: 'kg' },
      { name: 'Dose do Fármaco', key: 'dose', unit: 'mcg/kg/min' },
      { name: 'Concentração do Fármaco', key: 'concentration', unit: 'mg/ml' },
      { name: 'Taxa de Fluido', key: 'fluidRate', unit: 'ml/h' },
    ],
    formula: 'return ((dose * weight * 60) / (concentration * 1000) / fluidRate) * 100',
    resultUnit: 'ml/100ml de fluido',
    helpText: 'Uma calculadora universal para preparar qualquer infusão contínua. Converte a dose (mcg/kg/min) em um volume prático a ser adicionado à sua bolsa de fluidos.'
  },

  // Fluidoterapia e Eletrólitos
  {
    id: 'builtin-fluid-no-urine',
    name: 'Fluidoterapia (Sem Mensuração Urinária)',
    description: 'Calcula a taxa de fluidoterapia com base na desidratação, manutenção e perdas estimadas.',
    group: 'Fluidoterapia e Eletrólitos',
    type: 'builtin',
    variables: [
      { name: 'Peso do Paciente', key: 'weight', unit: 'kg' },
      { name: 'Desidratação', key: 'dehydration', unit: '%' },
      { name: 'Perdas Estimadas (Vômito/Diarreia)', key: 'losses', unit: 'ml/kg/dia' },
    ],
    formula: 'return (((weight * (dehydration / 100) * 1000) + (weight * 50)) + (weight * losses)) / 24',
    resultUnit: 'ml/h',
    helpText: 'Esta fórmula calcula a fluidoterapia quando as perdas não podem ser medidas com precisão.<br/><br/><b>Manutenção:</b> Usa uma taxa média de <b>50 ml/kg/dia</b>.<br/><b>Perdas Estimadas:</b> Estime as perdas por vômito/diarreia. Ex: 20-40 ml/kg/dia para perdas leves a moderadas. Insira 0 se não houver.'
  },
  {
    id: 'builtin-fluid-with-urine',
    name: 'Fluidoterapia (Com Mensuração Urinária)',
    description: 'Calcula a taxa de fluidoterapia somando a manutenção, perdas contínuas (urinária + outras) e a reposição do déficit.',
    group: 'Fluidoterapia e Eletrólitos',
    type: 'builtin',
    variables: [
      { name: 'Peso do Paciente', key: 'weight', unit: 'kg' },
      { name: 'Desidratação', key: 'dehydration', unit: '%' },
      { name: 'Produção Urinária', key: 'urine_output', unit: 'ml/h' },
      { name: 'Outras Perdas (Vômito, etc.)', key: 'other_losses', unit: 'ml/h' },
    ],
    formula: 'return ((weight * (dehydration / 100) * 1000) / 24) + ((weight * 20) / 24) + urine_output + other_losses',
    resultUnit: 'ml/h',
    helpText: 'Método "ins and outs" para pacientes críticos com sonda urinária.<br/><br/><b>Déficit:</b> A reposição da desidratação é calculada para 24h.<br/><b>Manutenção:</b> Usa as perdas insensíveis (respiração, fezes), estimadas em <b>20 ml/kg/dia</b>.<br/><b>Perdas Contínuas:</b> A produção urinária e outras perdas mensuradas (drenos, vômito) são repostas "ml a ml".'
  },
  {
    id: 'builtin-free-water-deficit',
    name: 'Déficit de Água Livre',
    description: 'Calcula o volume de água livre necessário para corrigir hipernatremia.',
    group: 'Fluidoterapia e Eletrólitos',
    type: 'builtin',
    variables: [
      { name: 'Peso do Paciente', key: 'weight', unit: 'kg' },
      { name: 'Sódio Sérico Atual (Na+)', key: 'current_na', unit: 'mEq/L' },
      { name: 'Sódio Sérico Normal (ex: 145)', key: 'normal_na', unit: 'mEq/L' },
    ],
    formula: 'return ((current_na / normal_na) - 1) * (weight * 0.6) * 1000',
    resultUnit: 'ml de água livre',
    helpText: 'Essencial para o tratamento de hipernatremia. O resultado é o volume de água livre (ex: Dextrose 5% em água) a ser administrado.<br/><br/><b>Atenção:</b> A correção deve ser lenta, ao longo de 24-48 horas, para evitar edema cerebral. A taxa de redução do sódio não deve exceder 0.5-1.0 mEq/L por hora.'
  },
  {
    id: 'builtin-serum-osmolality',
    name: 'Osmolalidade Sérica',
    description: 'Estima a osmolalidade sérica. Use Ureia (BUN) e Glicose em mg/dL.',
    group: 'Fluidoterapia e Eletrólitos',
    type: 'builtin',
    variables: [
      { name: 'Sódio (Na+)', key: 'na', unit: 'mEq/L' },
      { name: 'Potássio (K+)', key: 'k', unit: 'mEq/L' },
      { name: 'Ureia (BUN)', key: 'bun', unit: 'mg/dL' },
      { name: 'Glicose', key: 'glucose', unit: 'mg/dL' },
    ],
    formula: 'return 2 * (na + k) + (bun / 2.8) + (glucose / 18)',
    resultUnit: 'mOsm/kg',
    helpText: 'Estima a concentração total de solutos no plasma.<br/><br/><b>Gap Osmolar:</b> Se a osmolalidade <i>medida</i> for >10-15 mOsm/kg acima da <i>calculada</i>, suspeite de toxinas como etilenoglicol.'
  },
  {
    id: 'builtin-potassium-repo',
    name: 'Reposição de Potássio (KCl)',
    description: 'Calcula a quantidade de KCl a ser adicionada a uma bolsa de fluidos com base no déficit.',
    group: 'Fluidoterapia e Eletrólitos',
    type: 'builtin',
    variables: [
        { name: 'Potássio Sérico do Paciente', key: 'serum_k', unit: 'mEq/L' },
        { name: 'Volume da Bolsa de Fluido', key: 'fluid_vol', unit: 'ml' }
    ],
    formula: `const getKcl = (k) => {
                if (k >= 3.1) return 20;
                if (k >= 2.6) return 30;
                if (k >= 2.1) return 40;
                return 60;
              };
              const kclPerLiter = getKcl(serum_k);
              const totalKcl = (kclPerLiter / 1000) * fluid_vol;
              return 'Adicionar ' + totalKcl.toFixed(1) + ' mEq de KCl (' + kclPerLiter + ' mEq/L)';`,
    resultUnit: '',
    helpText: 'Esta calculadora usa uma tabela padrão para determinar a quantidade de KCl a ser adicionada.<br/><br/><b>Tabela de Suplementação (mEq/L):</b><br/>- K+ 3.1-3.5: <b>20</b><br/>- K+ 2.6-3.0: <b>30</b><br/>- K+ 2.1-2.5: <b>40</b><br/>- K+ < 2.1: <b>60</b><br/><br/><b>Atenção:</b> A taxa de infusão de potássio não deve exceder 0.5 mEq/kg/h.'
  },
  {
    id: 'builtin-drip-rate-calculator',
    name: 'Taxa de Gotejamento de Equipo',
    description: 'Converte a taxa de fluidoterapia (ml/h) para gotas/minuto ou segundos/gota para gotejamento manual.',
    group: 'Fluidoterapia e Eletrólitos',
    type: 'builtin',
    variables: [
      { name: 'Taxa de Fluido', key: 'fluidRate', unit: 'ml/h' },
      { name: 'Fator do Equipo', key: 'dripFactor', unit: 'gotas/ml' },
    ],
    formula: `const dropsPerMin = (fluidRate * dripFactor) / 60;
              const secPerDrop = 3600 / (fluidRate * dripFactor);
              if (isNaN(dropsPerMin) || !isFinite(dropsPerMin)) return "Verifique as entradas.";
              return dropsPerMin.toFixed(1) + ' gotas/minuto OU 1 gota a cada ' + secPerDrop.toFixed(1) + ' segundos.';`,
    resultUnit: '',
    helpText: 'Calcula a velocidade de gotejamento para administrar fluidos sem uma bomba de infusão. <br/><br/><b>Fatores de Equipo Comuns:</b><br/>- <b>Microgotas:</b> 60 gotas/ml<br/>- <b>Macrogotas:</b> 20 gotas/ml (padrão) ou 15 gotas/ml (varia)<br/><br/>O resultado é exibido em duas formas para conveniência: gotas por minuto (bom para taxas mais altas) e segundos por gota (bom para taxas mais lentas).'
  },

  // Nutrição
  {
    id: 'builtin-rer',
    name: 'Requerimento Energético de Repouso (NER/RER)',
    description: 'Calcula a necessidade energética para um paciente em repouso.',
    group: 'Nutrição',
    type: 'builtin',
    variables: [
      { name: 'Peso do Paciente', key: 'weight', unit: 'kg' },
    ],
    formula: 'return 70 * (weight ** 0.75)',
    resultUnit: 'kcal/dia',
    helpText: 'A NER (RER em inglês) representa as calorias que um paciente precisa para manter suas funções vitais em repouso. É o ponto de partida para qualquer plano nutricional.'
  },
  {
    id: 'builtin-der',
    name: 'Requerimento Energético Diário (RED/DER)',
    description: 'Estima as necessidades calóricas diárias multiplicando a NER por um fator de estilo de vida.',
    group: 'Nutrição',
    type: 'builtin',
    variables: [
      { name: 'Peso do Paciente', key: 'weight', unit: 'kg' },
      { name: 'Fator de Estilo de Vida', key: 'factor', unit: 'fator' },
    ],
    formula: 'return (70 * (weight ** 0.75)) * factor',
    resultUnit: 'kcal/dia',
    helpText: 'O RED (DER em inglês) ajusta a NER para a realidade do paciente.<br/><br/><b>Fatores comuns:</b><br/>- Cão Castrado: <b>1.6</b>, Gato Castrado: <b>1.2</b><br/>- Filhotes: <b>3.0</b>, Paciente Crítico: <b>1.0</b>'
  },
   {
    id: 'builtin-dog-food-calc',
    name: 'Cálculo de Ração Diária (Cães)',
    description: 'Calcula a quantidade diária de ração com base no requerimento energético e na densidade da ração.',
    group: 'Nutrição',
    type: 'builtin',
    variables: [
        { name: 'Requerimento Energético Diário (RED)', key: 'der', unit: 'kcal/dia' },
        { name: 'Densidade Calórica da Ração', key: 'kcal_per_gram', unit: 'kcal/g' },
    ],
    formula: 'return der / kcal_per_gram',
    resultUnit: 'gramas/dia',
    helpText: 'Calculadora universal para determinar a quantidade de ração seca ou úmida.<br/><br/><b>Requerimento Energético Diário (RED):</b> Use a calculadora de RED para obter este valor.<br/><b>Densidade Calórica:</b> Esta informação (kcal/g ou kcal/kg) está na embalagem da ração. Se estiver em kcal/kg, divida por 1000 para obter kcal/g.<br/><br/>Pode ser usada para qualquer marca de ração, incluindo as linhas da Hill\'s.'
  },
  {
    id: 'builtin-cat-food-calc',
    name: 'Cálculo de Ração Diária (Gatos)',
    description: 'Calcula a quantidade diária de ração com base no requerimento energético e na densidade da ração.',
    group: 'Nutrição',
    type: 'builtin',
    variables: [
        { name: 'Requerimento Energético Diário (RED)', key: 'der', unit: 'kcal/dia' },
        { name: 'Densidade Calórica da Ração', key: 'kcal_per_gram', unit: 'kcal/g' },
    ],
    formula: 'return der / kcal_per_gram',
    resultUnit: 'gramas/dia',
    helpText: 'Calculadora universal para determinar a quantidade de ração seca ou úmida para gatos.<br/><br/><b>Requerimento Energético Diário (RED):</b> Use a calculadora de RED para obter este valor (use fatores para gatos).<br/><b>Densidade Calórica:</b> Encontre esta informação (kcal/g ou kcal/kg) na embalagem da ração.<br/><br/>Pode ser usada para qualquer marca de ração, incluindo as linhas da Hill\'s.'
  },
  {
    id: 'builtin-feeding-tube',
    name: 'Cálculo para Sonda Alimentar',
    description: 'Calcula o volume de dieta enteral por refeição para pacientes com sonda.',
    group: 'Nutrição',
    type: 'builtin',
    variables: [
        { name: 'Requerimento Energético Diário (RED)', key: 'der', unit: 'kcal/dia' },
        { name: 'Densidade Calórica da Dieta', key: 'diet_density', unit: 'kcal/ml' },
        { name: 'Número de Refeições por Dia', key: 'num_feedings', unit: '' },
    ],
    formula: `const total_volume = der / diet_density;
              const volume_per_feeding = total_volume / num_feedings;
              return 'Volume Total: ' + total_volume.toFixed(1) + ' ml/dia. Por Refeição: ' + volume_per_feeding.toFixed(1) + ' ml';`,
    resultUnit: '',
    helpText: 'Calcula o volume de dieta líquida para pacientes com sonda nutricional.<br/><br/><b>RED:</b> Calcule o Requerimento Energético Diário do paciente primeiro.<br/><b>Densidade da Dieta:</b> Verifique a informação nutricional do produto (geralmente entre 1.0 e 1.5 kcal/ml).<br/><b>Número de Refeições:</b> Geralmente começa-se com 4-6 refeições por dia.<br/><br/><b>Protocolo de Introdução:</b> Inicie com 1/3 do volume calculado no primeiro dia, 2/3 no segundo e o volume total no terceiro, monitorando a tolerância do paciente.'
  },

  // Transfusões
  {
    id: 'builtin-transfusion-volume-speed',
    name: 'Volume e Velocidade de Transfusão (Sangue Total)',
    description: 'Calcula o volume total e a taxa de infusão inicial para transfusão de sangue total.',
    group: 'Transfusões',
    type: 'builtin',
    variables: [
      { name: 'Peso do Paciente', key: 'weight', unit: 'kg' },
      { name: 'Hematócrito Atual', key: 'currentPcv', unit: '%' },
      { name: 'Hematócrito Desejado', key: 'desiredPcv', unit: '%' },
      { name: 'Hematócrito da Bolsa', key: 'bagPcv', unit: '%' },
      { name: 'Volume Sanguíneo (cão=90, gato=60)', key: 'bloodVolConstant', unit: 'ml/kg' },
    ],
    formula: `const totalVolume = weight * bloodVolConstant * ((desiredPcv - currentPcv) / bagPcv);
              const initialRate = weight * 0.25;
              return 'Volume Total: ' + totalVolume.toFixed(2) + ' ml. Taxa inicial (15min): ' + initialRate.toFixed(2) + ' ml/h';`,
    resultUnit: '',
    helpText: 'Calcula o volume total de sangue necessário e a taxa de infusão inicial segura.<br/><br/><b>Hematócrito da Bolsa:</b> Geralmente 40-45% para cães e 35-40% para gatos.<br/><b>Volume Sanguíneo:</b> Use a constante <b>90</b> para cães e <b>60</b> para gatos.<br/><b>Velocidade:</b> A infusão começa lentamente (0.25 ml/kg/h) nos primeiros 15-30 minutos para monitorar reações. Se não houver reação, a taxa pode ser aumentada para administrar o volume total em 4 horas.'
  },
  {
    id: 'builtin-transfusion-drip-rate',
    name: 'Velocidade de Transfusão (Gotas/segundo)',
    description: 'Converte a taxa de infusão de sangue (ml/h) para gotas por segundo.',
    group: 'Transfusões',
    type: 'builtin',
    variables: [
      { name: 'Taxa de Infusão', key: 'infusionRate', unit: 'ml/h' },
      { name: 'Fator do Equipo de Sangue', key: 'dripFactor', unit: 'gotas/ml' },
    ],
    formula: 'return 3600 / (infusionRate * dripFactor)',
    resultUnit: 'segundos por gota',
    helpText: 'Calcula o intervalo em segundos entre cada gota para equipos de transfusão.<br/><br/><b>Fator do Equipo de Sangue:</b> Equipos de transfusão são macrogotas e geralmente têm um fator de <b>10-15 gotas/ml</b>. Verifique a embalagem do seu equipo.<br/><b>Resultado:</b> O valor indica quantos segundos você deve esperar entre uma gota e outra.'
  },
  {
    id: 'builtin-plasma-transfusion',
    name: 'Transfusão de Plasma e Hemocomponentes',
    description: 'Calcula o volume de plasma ou outros hemocomponentes a ser transfundido.',
    group: 'Transfusões',
    type: 'builtin',
    variables: [
        { name: 'Peso do Paciente', key: 'weight', unit: 'kg' },
        { name: 'Dose Desejada', key: 'dose', unit: 'ml/kg' },
    ],
    formula: 'return weight * dose',
    resultUnit: 'ml',
    helpText: 'Calcula o volume total de hemocomponentes a ser administrado.<br/><br/><b>Doses Padrão (ml/kg):</b><br/>- <b>Plasma Fresco Congelado (PFC):</b> 10-20 ml/kg (para coagulopatias, hipoalbuminemia)<br/>- <b>Crioprecipitado:</b> 1 unidade / 10 kg (para hemofilia A, von Willebrand)<br/>- <b>Concentrado de Plaquetas:</b> 1 unidade / 10 kg<br/><br/><b>Velocidade:</b> Administrar o volume total ao longo de 4 horas, começando com uma taxa lenta para monitorar reações.'
  },
];