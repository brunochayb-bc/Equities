import { CompanyData } from './types';

export const PETROBRAS_DATA: CompanyData = {
  "meta": {
    "ticker": "PETR4",
    "name": "Petróleo Brasileiro S.A. — Petrobras (PN)",
    "exchange": "B3 / SAO · Petróleo, Gás e Biocombustíveis · ISIN BRPETRACNPR6",
    "asOf": "04-05-2026",
    "currency": "BRL"
  },
  "highlights": {
    "marketCap": "R$ 548,2B",
    "marketCapHistory": [520.1, 515.4, 532.8, 548.2],
    "equity": "R$ 412,5B",
    "netIncome": "R$ 114,6B",
    "revenue": "R$ 497,5B"
  },
  "stock": {
    "price": "41,24",
    "change": "+0,58",
    "changePct": "+1,42",
    "wk52": "32,15 – 48,90",
    "marketCap": "R$ 548,2B",
    "avgVol": "48,12M",
    "divYield": "12,4%"
  },
  "kpis": [
    {"label":"P/L (TTM)",      "value":"6,46",   "delta":"vs setor 11,2",    "tone":""},
    {"label":"EV/EBITDA",     "value":"4,06",   "delta":"descontado",       "tone":"pos"},
    {"label":"ROE (TTM)",     "value":"28,18%", "delta":"▲ líder de classe","tone":"pos"},
    {"label":"DÍVIDA LÍQUIDA","value":"$60,6B", "delta":"▲ +16% YoY",       "tone":"neg"},
    {"label":"FCF (FY25)",    "value":"$16,5B", "delta":"▼ –29% YoY",       "tone":"neg"},
    {"label":"BETA (5A)",     "value":"−0,07",  "delta":"descorrelacionado","tone":""}
  ],
  "chart": {
    "title": "DESEMPENHO EM 12 MESES",
    "subtitle": "BRL · FECHAMENTO DIÁRIO",
    "yAxis": ["52","44","36","28"],
    "xAxis": ["MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ","JAN","FEV","MAR","ABR"],
    "yMin": 26,
    "yMax": 54,
    "prices": [31, 32, 30.5, 29.5, 33, 34.5, 32, 35, 37, 35.5, 42, 49.08],
    "annotations": [
      {"index":4, "label":"A · BRENT –14% · MÍN 28,86", "above":false},
      {"index":7, "label":"B · BÚZIOS 1,0 MMBPD · OUT", "above":true,  "emphasis":true},
      {"index":10,"label":"C · Q4 BEAT · LPA +3,2% · 06/MAR","above":true, "emphasis":true},
      {"index":11,"label":"D · 49,08 ATUAL", "above":true, "current":true, "emphasis":true}
    ]
  },
  "risk": {
    "score": 58,
    "verdict": "MANTER COM EXPOSIÇÃO SELETIVA",
    "verdictTone": "amber",
    "context": [
      {"k":"Média do setor",      "v":"52"},
      {"k":"Mediana peers",       "v":"61"},
      {"k":"Δ 90 dias",           "v":"+4 ▲"},
      {"k":"Confiança",           "v":"ALTA"}
    ]
  },
  "valuation": {
    "summary": "4 ACIMA · 1 ABAIXO · 1 CAUTELA",
    "cards": [
      {"label":"P/L TTM",      "value":"6,46",  "ctx":"vs peer 9,8 · –34%",      "status":"beat"},
      {"label":"EV/EBITDA",    "value":"4,06",  "ctx":"vs peer 5,9 · –31%",      "status":"beat"},
      {"label":"P/VP",         "value":"1,68",  "ctx":"abaixo média 5a 2,1",     "status":"beat"},
      {"label":"DIV YIELD",    "value":"7,96%", "ctx":"top decil global",        "status":"beat"},
      {"label":"DÉFICIT ALVO", "value":"94,9%", "ctx":"alvo 51,70 · upside 5,3%","status":"caut"},
      {"label":"FCF YIELD",    "value":"2,5%",  "ctx":"pressão de capex ▼",      "status":"miss"}
    ]
  },
  "health": {
    "summary": "3 ACIMA · 1 ABAIXO · 2 CAUTELA",
    "cards": [
      {"label":"ROE",            "value":"28,18%", "ctx":"elite · média majors 14%", "status":"beat"},
      {"label":"ROA",            "value":"8,61%",  "ctx":"vs peer 5,2%",             "status":"beat"},
      {"label":"MARGEM LUCRO",   "value":"22,13%", "ctx":"EBITDA mgn 66%",           "status":"beat"},
      {"label":"DÍV.LÍQ/EBITDA", "value":"1,64×",  "ctx":"▲ vs 1,49× FY24",          "status":"caut"},
      {"label":"ÍNDICE D/E",     "value":"91,96%", "ctx":"leasings FPSO inflando",   "status":"caut"},
      {"label":"POSIÇÃO CAIXA",  "value":"$50,6B", "ctx":"vs $69,8B dívida bruta",   "status":"miss"}
    ]
  },
  "growth": {
    "summary": "3 ACIMA · 2 ABAIXO · 1 CAUTELA",
    "cards": [
      {"label":"PRODUÇÃO",     "value":"+11%",  "ctx":"2,99 mboe/d · recorde",   "status":"beat"},
      {"label":"LUCRO LÍQ YoY","value":"+160%","ctx":"$19,6B · ganhos extras",   "status":"beat"},
      {"label":"REPOS.RES",    "value":"175%",  "ctx":"adição · 1,7Bbbl",        "status":"beat"},
      {"label":"REC (TTM)",    "value":"497,5B","ctx":"flat · queda Brent",      "status":"caut"},
      {"label":"FCF YoY",      "value":"−29%",  "ctx":"$23,3B → $16,5B",         "status":"miss"},
      {"label":"CAGR REC 4A",  "value":"−4%",   "ctx":"previsto · preço-led",    "status":"miss"}
    ]
  },
  "breakdown": [
    {"name":"VALUATION",        "weight":35, "score":68, "note":"barato em múltiplos, teto em FCF"},
    {"name":"SAÚDE FINANCEIRA", "weight":35, "score":54, "note":"margens fortes, alavancagem sobe"},
    {"name":"CRESCIMENTO",      "weight":30, "score":51, "note":"volumes sobem, preços pesam"}
  ],
  "quarterly": {
    "subtitle": "USD · AJUSTADO SALVO INDICAÇÃO",
    "headers": ["4T24","1T25","2T25","3T25","4T25"],
    "rows": [
      {"label":"Receita ($B)",        "icon":"g", "values":["20,82","22,14","22,91","22,18","23,61"], "qoq":"+6,4%",   "yoy":"+13,4%",  "qoqTone":"up","yoyTone":"up"},
      {"label":"EBITDA Ajust. ($B)",  "icon":"g", "values":["7,17","9,69","10,02","11,73","11,11"],   "qoq":"−5,3%",   "yoy":"+55,0%",  "qoqTone":"down","yoyTone":"up"},
      {"label":"Lucro Líquido ($B)",  "icon":"g", "values":["−2,80","4,30","5,95","6,45","2,90"],     "qoq":"−55,0%",  "yoy":"+204%",   "qoqTone":"down","yoyTone":"up"},
      {"label":"Fluxo Caixa Op. ($B)","icon":"g", "values":["9,80","8,40","9,20","7,90","10,50"],     "qoq":"+32,9%",  "yoy":"+7,1%",   "qoqTone":"up","yoyTone":"up"},
      {"label":"Fluxo Caixa Livre ($B)","icon":"a", "values":["4,97","4,20","3,77","4,97","3,58"],    "qoq":"−27,9%",  "yoy":"−27,9%",  "qoqTone":"down","yoyTone":"down"},
      {"label":"Dívida Líquida ($B)", "icon":"r", "values":["52,20","54,10","56,80","59,06","60,60"], "qoq":"+2,6%",   "yoy":"+16,0%",  "qoqTone":"down","yoyTone":"down"},
      {"label":"Produção (mboe/d)",   "icon":"g", "values":["2,69","2,78","2,92","2,96","2,99"],      "qoq":"+1,0%",   "yoy":"+11,2%",  "qoqTone":"up","yoyTone":"up"},
      {"label":"Brent médio ($/bbl)", "icon":"a", "values":["74,0","75,5","72,8","69,2","63,8"],      "qoq":"−7,8%",   "yoy":"−13,8%",  "qoqTone":"down","yoyTone":"down"}
    ]
  },
  "earnings": {
    "title": "RESULTADOS 4T-2025",
    "date": "REPORTADO 06-03-2026",
    "rows": [
      {"k":"LPA (real)",      "v":"$0,5601",  "tone":""},
      {"k":"LPA (cons.)",     "v":"$0,5427",  "tone":""},
      {"k":"Surpresa LPA",    "v":"+3,21%",   "tone":"pos"},
      {"k":"Rec. (real)",     "v":"$23,61B",  "tone":""},
      {"k":"Rec. (cons.)",    "v":"$22,22B",  "tone":""},
      {"k":"Surpresa Rec.",   "v":"+6,26%",   "tone":"pos"},
      {"k":"Lucro Líq FY25",  "v":"$19,6B",   "tone":""},
      {"k":"EBITDA FY25",     "v":"$42,5B",   "tone":""}
    ],
    "narrative": "<strong>Beat em todas as linhas.</strong> A Petrobras absorveu uma queda de 14% no Brent (média FY25 de $69/bbl) elevando a produção total em 11% YoY para 2,99 mboe/d. As ações subiram <span class=\"mono text-green\">+5,95%</span> após a divulgação; o mgmt estima LPA de $0,35 no 1T26 e reitera meta de 95% de utilização nas refinarias."
  },
  "delivery": {
    "title": "DESTAQUES DE ENTREGA",
    "date": "OPS 31-12-2025",
    "items": [
      "Plataformas de Búzios superaram <span class=\"num text-green font-semibold mono\">1,0 mmbpd</span> de produção operada · antecipado · OUT 2025",
      "Tupi/Iracema atingiram <span class=\"num text-green font-semibold mono\">1,0 mmbpd</span> em 31/DEZ/2025 · marca histórica no pré-sal",
      "Primeiro óleo do FPSO P-78 em Búzios em DEZ · adiciona <span class=\"num text-green font-semibold mono\">180 kbpd</span> de capacidade",
      "Ancoragem da P-79 concluída em <span class=\"num text-green font-semibold mono\">12 dias</span> · 26 sistemas · recorde da indústria",
      "Reposição de reservas de <span class=\"num text-green font-semibold mono\">175%</span> · 1,7B bbl adicionados · maior em 10 anos"
    ]
  },
  "catalysts": [
    {"h":"Ramp-up do pré-sal",       "d":"Ancoragem da P-79 concluída; primeiro óleo iminente. Caminho para 3,2 mmboe/d até o fim do ano com custo de extração sub-$20/bbl."},
    {"h":"Piso de dividend yield",   "d":"Yield trailing de 7,96% com política ligada ao FCF; consenso espera dist. forward de R$3,91/aç."},
    {"h":"Utilização de refinarias", "d":"Mgmt foca em 95% no 1T26 vs 91-92% em FY25 · mix diesel/gasolina/QAV em 68-70%."},
    {"h":"Consenso de analistas",    "d":"10/14 COMPRA, 4 MANTER, 0 VENDA · Preço Alvo médio BRL 51,70 (+5,3% upside)."},
    {"h":"Beta próximo de zero",     "d":"Efetivamente descorrelacionada do Ibovespa · valor de diversificação em portfólios emergentes."}
  ],
  "risks": [
    {"h":"Sensibilidade ao Brent",   "d":"Brent no 4T caiu para ~$64; cada $5 de variação ≈ $2,5B no EBITDA. Queda de 14% em FY25 absorvida apenas via volume."},
    {"h":"Alavancagem crescente",    "d":"Dívida líquida de $60,6B (+16% YoY); leasings FPSO somaram $3,7B. D/EBITDA em 1,64× vs 1,49. Alvo de $65B em 5a."},
    {"h":"Pressão de Capex no FCF",  "d":"Capex FY25 de $20,3B (+22% YoY) reduziu FCF para $16,5B (−29%). FCF 4T em $3,58B."},
    {"h":"Risco Político / Estatal", "d":"Gov brasileiro acionista majoritário; risco recorrente de intervenção em preços e mudanças de diretriz ESG."},
    {"h":"Preço perto da máxima",    "d":"49,08 vs máxima 52S de 50,69 · apenas 5,3% para o preço alvo · teto para re-rating no curto prazo."}
  ],
  "verdict": {
    "rating": "MANTER",
    "ratingSub": "/ ACUMULAR EM QUEDAS",
    "ratingTone": "amber",
    "ratingPosition": 52,
    "horizon": "12 MESES",
    "review": "PÓS 1T26",
    "confidence": "ALTA",
    "text": "<strong>A Petrobras é uma geradora de caixa de alta qualidade negociando com um desconto justificado</strong>, não uma pechincha. O FY25 provou a tese operacional — produção +11%, reservas +175%, EBITDA flat com Brent -14% — mas a ação já precificou isso (+70% da mínima 52S). Com as ações em <span class=\"mono\">94,9%</span> do preço alvo e o FCF comprimido pelo capex, a assimetria diminuiu. O dividendo de <span class=\"mono text-green\">7,96%</span> permanece o ancorador estrutural; o salto de <span class=\"mono text-red\">+16%</span> na dívida líquida e o risco políico são o teto. Manter pelo yield, aumentar em fraquezas do Brent abaixo de BRL 44."
  },
  "sources": "YAHOO FINANCE · SEC 6-K · INVESTING.COM · MARKETSCREENER"
};

export const VALE3_DATA: CompanyData = {
  "meta": {
    "ticker": "VALE3",
    "name": "Vale S.A.",
    "exchange": "B3 / SAO · Mineração · ISIN BRVALEACNOR0",
    "asOf": "04-05-2026",
    "currency": "BRL"
  },
  "highlights": {
    "marketCap": "R$ 282,1B",
    "marketCapHistory": [295.4, 280.2, 285.6, 282.1],
    "equity": "R$ 188,4B",
    "netIncome": "R$ 44,2B",
    "revenue": "R$ 208,5B"
  },
  "stock": {
    "price": "62,45",
    "change": "-1,12",
    "changePct": "-1,76",
    "wk52": "58,12 – 78,90",
    "marketCap": "R$ 282,1B",
    "avgVol": "22,50M",
    "divYield": "14,2%"
  },
  "kpis": [
    {"label":"P/L (TTM)",      "value":"6,12",   "delta":"vs setor 10,5",    "tone":""},
    {"label":"EV/EBITDA",     "value":"3,85",   "delta":"descontado",       "tone":"pos"},
    {"label":"ROE (TTM)",     "value":"23,45%", "delta":"▲ estável",         "tone":"pos"},
    {"label":"DÍVIDA LÍQUIDA","value":"$14,2B", "delta":"▼ controle forte",  "tone":"pos"},
    {"label":"FCF (FY25)",    "value":"$8,2B",  "delta":"▲ +5% YoY",        "tone":"pos"},
    {"label":"BETA (5A)",     "value":"0,85",   "delta":"cíclico",          "tone":""}
  ],
  "chart": {
    "title": "DESEMPENHO EM 12 MESES",
    "subtitle": "BRL · FECHAMENTO DIÁRIO",
    "yAxis": ["80","70","60","50"],
    "xAxis": ["MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ","JAN","FEV","MAR","ABR"],
    "yMin": 55,
    "yMax": 85,
    "prices": [72, 70, 68, 65, 66, 64, 67, 69, 65, 63, 64, 62.45],
    "annotations": [
      {"index":3, "label":"A · PREÇO MINÉRIO –10%", "above":false},
      {"index":7, "label":"B · DIVIDENDOS EXTRA", "above":true,  "emphasis":true},
      {"index":11,"label":"C · ATUAL 62,45", "above":true, "current":true, "emphasis":true}
    ]
  },
  "risk": {
    "score": 65,
    "verdict": "COMPRA PARA DIVIDENDOS",
    "verdictTone": "green",
    "context": [
      {"k":"Média do setor",      "v":"58"},
      {"k":"Δ 90 dias",           "v":"-5 ▼"},
      {"k":"Confiança",           "v":"MÉDIA"}
    ]
  },
  "valuation": {
    "summary": "5 ACIMA · 1 ABAIXO",
    "cards": [
      {"label":"P/L TTM",      "value":"6,12",  "ctx":"vs global 12,5", "status":"beat"},
      {"label":"DIV YIELD",    "value":"14,2%", "ctx":"payout robusto", "status":"beat"}
    ]
  },
  "health": {
    "summary": "4 ACIMA · 2 CAUTELA",
    "cards": [
      {"label":"ROE",            "value":"23,45%", "ctx":"excelente", "status":"beat"},
      {"label":"CAIXA",          "value":"R$ 22B", "ctx":"liquidez alta", "status":"beat"}
    ]
  },
  "growth": {
    "summary": "2 ACIMA · 4 CAUTELA",
    "cards": [
      {"label":"PRODUÇÃO",     "value":"+3%",   "ctx":"dentro do guidance", "status":"caut"},
      {"label":"FCF",          "value":"$8,2B",  "ctx":"geração resiliente", "status":"beat"}
    ]
  },
  "breakdown": [
    {"name":"VALUATION",        "weight":35, "score":78, "note":"múltiplos historicamente baixos"},
    {"name":"SAÚDE FINANCEIRA", "weight":35, "score":65, "note":"alavancagem sob controle"},
    {"name":"CRESCIMENTO",      "weight":30, "score":45, "note":"dependência da China e minério"}
  ],
  "quarterly": {
    "subtitle": "USD · MILHÕES",
    "headers": ["4T24","1T25","2T25","3T25","4T25"],
    "rows": [
      {"label":"Receita",        "icon":"a", "values":["10,2","9,8","10,5","10,1","9,9"], "qoq":"-2%",   "yoy":"-3%",  "qoqTone":"down","yoyTone":"down"},
      {"label":"EBITDA",         "icon":"g", "values":["3,5","3,2","3,8","3,6","3,4"],   "qoq":"-5%",   "yoy":"-2%",   "qoqTone":"down","yoyTone":"down"}
    ]
  },
  "earnings": {
    "title": "RESULTADOS 4T-2025",
    "date": "REPORTADO 22-02-2026",
    "rows": [
      {"k":"Surpresa LPA",    "v":"+1,5%",   "tone":"pos"}
    ],
    "narrative": "A Vale reportou lucros resilientes apesar da volatilidade do minério de ferro. O foco continua no retorno de capital aos acionistas."
  },
  "delivery": {
    "title": "OPERACIONAL",
    "date": "MAR 2026",
    "items": [
      "Produção de finos de minério de ferro totalizou <span class=\"num text-green font-semibold mono\">310 Mt</span> em FY25.",
      "Acordo de Brumadinho <span class=\"num text-green font-semibold mono\">90%</span> executado."
    ]
  },
  "catalysts": [
    {"h":"Recuperação da China", "d":"Estímulos fiscais podem impulsionar demanda por aço."},
    {"h":"Yield extraordinário", "d":"Venda de ativos não-core pode gerar dividendos extras."}
  ],
  "risks": [
    {"h":"Preço do Minério", "d":"Abaixo de $90/t impacta severamente as margens."},
    {"h":"Risco Regulatório", "d":"Novas regras de mineração e taxas ambientais."}
  ],
  "verdict": {
    "rating": "COMPRA",
    "ratingTone": "green",
    "ratingPosition": 72,
    "horizon": "12 MESES",
    "review": "TRIMESTRAL",
    "confidence": "ALTA",
    "text": "Vale continua sendo uma das mineradoras mais eficientes do mundo. O valuation atual oferece uma margem de segurança significativa para investidores focados em renda passiva."
  },
  "sources": "YAHOO FINANCE · RI VALE"
};

export const ITUB4_DATA: CompanyData = {
  "meta": {
    "ticker": "ITUB4",
    "name": "Itaú Unibanco Holding S.A.",
    "exchange": "B3 / SAO · Bancos · ISIN BRITUBACNPR1",
    "asOf": "04-05-2026",
    "currency": "BRL"
  },
  "highlights": {
    "marketCap": "R$ 312,5B",
    "marketCapHistory": [290.1, 305.4, 310.8, 312.5],
    "equity": "R$ 178,2B",
    "netIncome": "R$ 36,4B",
    "revenue": "R$ 152,8B"
  },
  "stock": {
    "price": "34,80",
    "change": "+0,25",
    "changePct": "+0,72",
    "wk52": "26,15 – 36,90",
    "marketCap": "R$ 312,5B",
    "avgVol": "18,40M",
    "divYield": "6,8%"
  },
  "kpis": [
    {"label":"P/L (TTM)",      "value":"8,58",   "delta":"vs setor 9,2",     "tone":""},
    {"label":"ROE (TTM)",     "value":"21,1%",  "delta":"▲ superior",        "tone":"pos"},
    {"label":"ÍNDICE DE BASIL","value":"16,4%",  "delta":"sólido",            "tone":"pos"}
  ],
  "chart": {
    "title": "DESEMPENHO EM 12 MESES",
    "subtitle": "BRL · FECHAMENTO DIÁRIO",
    "yAxis": ["36","32","28","24"],
    "xAxis": ["MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ","JAN","FEV","MAR","ABR"],
    "yMin": 24,
    "yMax": 40,
    "prices": [28, 29, 31, 30, 32, 33, 34, 35, 34, 33.5, 35, 34.8],
    "annotations": [
      {"index":11,"label":"ATUAL 34,80", "above":true, "current":true}
    ]
  },
  "risk": {
    "score": 82,
    "verdict": "PORTO SEGURO / COMPRA",
    "verdictTone": "green",
    "context": [
      {"k":"Confiança",           "v":"MUITO ALTA"}
    ]
  },
  "valuation": {
    "summary": "4 ACIMA · 2 ABAIXO",
    "cards": [
      {"label":"ROE", "value":"21,1%", "ctx":"Líder vs Bradesco/Santander", "status":"beat"}
    ]
  },
  "health": {
    "summary": "SÓLIDA",
    "cards": [
      {"label":"BASILEIA", "value":"16,4%", "ctx":"Confortável", "status":"beat"}
    ]
  },
  "growth": {
    "summary": "MODERADA",
    "cards": [
      {"label":"LUCRO", "value":"+12%", "ctx":"Crescimento sólido", "status":"beat"}
    ]
  },
  "breakdown": [
    {"name":"VALUATION", "weight":35, "score":70, "note":"Prêmio justo pela qualidade"},
    {"name":"SAÚDE", "weight":35, "score":90, "note":"Balanço muito forte"},
    {"name":"CRESCIMENTO", "weight":30, "score":85, "note":"Digitalização acelerada"}
  ],
  "quarterly": {
    "subtitle": "BRL · BILHÕES",
    "headers": ["4T24","1T25","2T25","3T25","4T25"],
    "rows": [
      {"label":"Lucro Líquido", "icon":"g", "values":["8,8","9,1","9,3","9,5","9,7"], "qoq":"+2%", "yoy":"+10%", "qoqTone":"up", "yoyTone":"up"}
    ]
  },
  "earnings": {
    "title": "RESULTADOS FY 2025",
    "date": "FEV 2026",
    "rows": [],
    "narrative": "O Itaú Unibanco continua a entregar rentabilidade líder no setor, com ROE acima de 20% mesmo em cenário macro desafiador."
  },
  "delivery": {
    "title": "DIGITAL E CRÉDITO",
    "date": "2026",
    "items": [
      "Expansão da carteira de crédito em <span class=\"num text-green font-semibold mono\">8%</span> com foco em pessoa física de baixo risco."
    ]
  },
  "catalysts": [
    {"h":"Alta dos Juros", "d":"SELIC elevada favorece margem financeira (NII)."}
  ],
  "risks": [
    {"h":"Inadimplência", "d":"Piora macroeconômica pode elevar provisões."}
  ],
  "verdict": {
    "rating": "FORTE COMPRA",
    "ratingTone": "green",
    "ratingPosition": 82,
    "horizon": "LONG PRAZO",
    "review": "CONTÍNUO",
    "confidence": "MÁXIMA",
    "text": "Melhor banco do Brasil. Estructuralmente rentável."
  },
  "sources": "RI ITAÚ"
};
