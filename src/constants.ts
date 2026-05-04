
export const GLOSSARY: Record<string, { label: string; desc: string; calc?: string }> = {
  "MARKET CAP": {
    label: "Valor de Mercado",
    desc: "O valor total das ações da empresa em circulação.",
    calc: "Preço da Ação × Total de Ações"
  },
  "PATRIMÔNIO LÍQUIDO": {
    label: "Patrimônio Líquido",
    desc: "A riqueza líquida dos acionistas após pagar todas as obrigações.",
    calc: "Ativos Totais − Passivos Totais"
  },
  "LUCRO LÍQUIDO (TTM)": {
    label: "Lucro Líquido (TTM)",
    desc: "O rendimento final da empresa nos últimos 12 meses após todas as despesas e impostos.",
    calc: "Receita − Custos − Despesas − Impostos"
  },
  "RECEITA LÍQUIDA (TTM)": {
    label: "Receita Líquida (TTM)",
    desc: "O volume total de vendas de produtos ou serviços da empresa nos últimos 12 meses.",
    calc: "Venda Bruta − Devoluções − Impostos sobre Vendas"
  },
  "P/L (TTM)": {
    label: "P/L (Preço/Lucro)",
    desc: "Indica quanto o mercado está disposto a pagar por cada real de lucro gerado pela empresa.",
    calc: "Preço da Ação / Lucro por Ação (LPA)"
  },
  "P/L TTM": {
    label: "P/L (Preço/Lucro)",
    desc: "Indica quanto o mercado está disposto a pagar por cada real de lucro gerado pela empresa.",
    calc: "Preço da Ação / Lucro por Ação (LPA)"
  },
  "EV/EBITDA": {
    label: "EV/EBITDA",
    desc: "Mede o valor da empresa (Enterprise Value) em relação à sua capacidade de geração de caixa operacional.",
    calc: "Enterprise Value / EBITDA"
  },
  "ROE (TTM)": {
    label: "ROE (Retorno sobre Patrimônio)",
    desc: "A eficiência da empresa em gerar lucro a partir do capital investido pelos acionistas.",
    calc: "Lucro Líquido / Patrimônio Líquido"
  },
  "ROE": {
    label: "ROE (Retorno sobre Patrimônio)",
    desc: "A eficiência da empresa em gerar lucro a partir do capital investido pelos acionistas.",
    calc: "Lucro Líquido / Patrimônio Líquido"
  },
  "DÍVIDA LÍQUIDA": {
    label: "Dívida Líquida",
    desc: "O endividamento real da empresa descontando o caixa disponível para pagamentos imediatos.",
    calc: "Dívida Bruta − Caixa e Equivalentes"
  },
  "FCF (FY25)": {
    label: "Fluxo de Caixa Livre (FCF)",
    desc: "O dinheiro que sobra após a empresa cobrir suas operações e investimentos necessários (Capex).",
    calc: "Geração de Caixa Operacional − Investimentos"
  },
  "FCF YIELD": {
    label: "FCF Yield",
    desc: "O percentual de fluxo de caixa livre gerado em relação ao valor de mercado da empresa.",
    calc: "Fluxo de Caixa Livre / Valor de Mercado"
  },
  "BETA (5A)": {
    label: "Beta (5 Anos)",
    desc: "Mede a volatilidade da ação em relação ao mercado. Beta < 1 é menos volátil que o índice.",
    calc: "Covariância (Ação, Mercado) / Variância (Mercado)"
  },
  "P/VP": {
    label: "P/VP (Preço/Valor Patrimonial)",
    desc: "Compara o valor de mercado com o valor contábil (patrimônio). Indica se a ação está com prêmio ou desconto.",
    calc: "Preço da Ação / Valor Patrimonial por Ação"
  },
  "DIV YIELD": {
    label: "Dividend Yield (DY)",
    desc: "O retorno em dividendos pagos nos últimos 12 meses em relação ao preço atual da ação.",
    calc: "(Dividendos por Ação / Preço) × 100"
  },
  "ROIC": {
    label: "ROIC (Retorno sobre Capital Investido)",
    desc: "Mede quanta rentabilidade a empresa gera para todo o capital investido (próprio e terceiros).",
    calc: "NOPAT / Capital Investido Médio"
  },
  "ROA": {
    label: "ROA (Retorno sobre Ativos)",
    desc: "Mede a rentabilidade da empresa em relação aos seus ativos totais (eficiência dos ativos).",
    calc: "Lucro Líquido / Ativos Totais"
  },
  "MARGEM LUCRO": {
    label: "Margem Líquida",
    desc: "A porcentagem de cada real de venda que sobra como lucro líquido após todas as deduções.",
    calc: "(Lucro Líquido / Receita) × 100"
  },
  "PRODUÇÃO": {
    label: "Produção Total",
    desc: "O volume total de extração ou fabricação de produtos no período (ex: barris de óleo).",
    calc: "Barris Equivalentes (boe) ou Unidades Produzidas"
  },
  "LUCRO LÍQ YoY": {
    label: "Crescimento do Lucro",
    desc: "Comparação percentual do lucro líquido do período atual contra o mesmo período do ano anterior.",
    calc: "((Lucro Atual / Lucro Ano Anterior) − 1) × 100"
  },
  "REPOS.RES": {
    label: "Reposição de Reservas",
    desc: "Capacidade da empresa em descobrir novos depósitos para substituir o volume que já foi extraído.",
    calc: "Novas Reservas / Produção Anual"
  },
  "DÍV.LÍQ/EBITDA": {
    label: "Alavancagem (Dív. Líq/EBITDA)",
    desc: "Indica quanto tempo de lucro operacional levaria para quitar a dívida líquida total.",
    calc: "Dívida Líquida / EBITDA"
  },
  "ÍNDICE D/E": {
    label: "Índice Debt-to-Equity",
    desc: "Proporção de dívida utilizada para financiar os ativos em relação ao capital próprio dos sócios.",
    calc: "Passivo Total / Patrimônio Líquido"
  },
  "VALUATION": {
    label: "Valuation (Avaliação de Valor)",
    desc: "Análise que determina se o preço atual da ação está atraente em relação aos seus fundamentos financeiros.",
    calc: "Ponderação de múltiplos como P/L, EV/EBITDA e P/VP."
  },
  "ANÁLISE DE VALUATION": {
    label: "Análise de Valuation",
    desc: "Análise que determina se o preço atual da ação está atraente em relação aos seus fundamentos financeiros.",
    calc: "Ponderação de múltiplos como P/L, EV/EBITDA e P/VP."
  },
  "SAÚDE FINANCEIRA": {
    label: "Saúde Financeira",
    desc: "Avalia a solidez do balanço contábil, nível de endividamento e solvência da empresa.",
    calc: "Análise de Dívida Líquida/EBITDA, Liquidez e Estrutura de Capital."
  },
  "CRESCIMENTO": {
    label: "Crescimento & Momentum",
    desc: "Avalia a expansão de receitas/lucros e a tendência de preço da ação no mercado.",
    calc: "CAGR de Receita e Lucro + Indicadores de Tendência de Preço."
  },
  "POTENCIAL DE CRESCIMENTO": {
    label: "Potencial de Crescimento",
    desc: "Avalia a expansão de receitas/lucros e a tendência de preço da ação no mercado.",
    calc: "CAGR de Receita e Lucro + Indicadores de Tendência de Preço."
  },
  "ALPHA SCORE": {
    label: "Investment Management Score",
    desc: "Nota proprietária de 0 a 100 que pondera Valuation, Saúde e Crescimento para definir o risco.",
    calc: "Média Ponderada (Valuation 35% + Saúde 35% + Crescimento 30%)"
  },
  "COMPOSIÇÃO DO ALPHA SCORE": {
    label: "Composição Alpha Score",
    desc: "Detalhamento de como a nota final é calculada com base nos pilares fundamentais da empresa.",
    calc: "Média Ponderada dos pilares do modelo Investment Management."
  },
  "HISTÓRICO TRIMESTRAL": {
    label: "Histórico Financeiro",
    desc: "Evolução temporal dos principais indicadores financeiros divulgados nos balanços trimestrais.",
    calc: "Dados extraídos dos demonstrativos financeiros oficiais."
  },
  "LATEST EARNINGS": {
    label: "Earnings & Operacional",
    desc: "Resumo dos resultados financeiros e operacionais mais recentes divulgados pela empresa ao mercado.",
    calc: "Compilação de DRE e Relatórios de Produção Recentes."
  },
  "CATALISADORES": {
    label: "Catalisadores de Alta",
    desc: "Eventos ou fatores estratégicos que podem impulsionar o preço da ação no curto e médio prazo.",
    calc: "Análise qualitativa de mercado, regulação e notícias."
  },
  "RISCOS": {
    label: "Riscos Estratégicos",
    desc: "Fatores de incerteza ou ameaças que podem impactar negativamente o valor da empresa e sua cotação.",
    calc: "Mapeamento de risks operacionais, financeiros e macro."
  },
  "EBITDA": {
    label: "EBITDA (LAJIDA)",
    desc: "Lucro antes de juros, impostos, depreciação e amortização. Mostra a geração de caixa operacional.",
    calc: "Lucro Operacional + Depreciação + Amortização"
  },
  "LPA": {
    label: "LPA (Lucro por Ação)",
    desc: "A parcela do lucro líquido da empresa que pertence a cada investidor por cada ação possuída.",
    calc: "Lucro Líquido / Quantidade Total de Ações"
  },
  "RECEITA": {
    label: "Receita Líquida",
    desc: "O faturamento real da empresa após a dedução de impostos sobre vendas e devoluções.",
    calc: "Receita Bruta − Deduções e Impostos"
  },
  "POSIÇÃO CAIXA": {
    label: "Posição de Caixa",
    desc: "O montante total de dinheiro e aplicações líquidas que a empresa possui para operações e dívidas.",
    calc: "Caixa + Equivalentes de Caixa + Aplicações Financeiras"
  },
  "DÉFICIT ALVO": {
     label: "Preço Alvo do Consenso",
     desc: "Média do preço justo estimado pelos principais analistas de mercado (sell-side).",
     calc: "Média aritmética das recomendações vigentes."
  },
  "PERÍODO 52S": {
    label: "Mínima/Máxima 52 Semanas",
    desc: "A faixa de preço (mínima e máxima) que a ação atingiu no último ano de negociação.",
    calc: "Preços de mercado reais dos últimos 12 meses."
  },
  "VOL MÉD (3M)": {
    label: "Volume Médio Diário",
    desc: "A quantidade média de recursos financeiros movimentados por dia com a ação nos últimos 3 meses.",
    calc: "Média do volume financeiro diário (90 dias)."
  }
};
