import { GoogleGenAI, Type } from "@google/genai";
import { CompanyData } from "../types";
import { PETROBRAS_DATA, VALE3_DATA, ITUB4_DATA } from "../data";

let aiInstance: GoogleGenAI | null = null;

function getAI() {
  if (!aiInstance) {
    // Vite replaces process.env.GEMINI_API_KEY at build time via 'define' in vite.config.ts
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === "undefined" || apiKey === "") {
      console.error("GEMINI_API_KEY is missing. Check your environment variables.");
      throw new Error("API Key não encontrada. Se você estiver no VERCEL: 1. Adicione GEMINI_API_KEY nas Environment Variables do projeto. 2. Gere um NOVO DEPLOY (Redeploy) para que o sistema 'grave' a chave no código. No AI Studio: Adicione em 'Settings' > 'API Keys'.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    meta: {
      type: Type.OBJECT,
      properties: {
        ticker: { type: Type.STRING },
        name: { type: Type.STRING },
        exchange: { type: Type.STRING },
        asOf: { type: Type.STRING },
        currency: { type: Type.STRING }
      },
      required: ["ticker", "name", "exchange", "asOf", "currency"]
    },
    highlights: {
      type: Type.OBJECT,
      properties: {
        marketCap: { type: Type.STRING },
        marketCapHistory: { type: Type.ARRAY, items: { type: Type.NUMBER }, description: "Market Cap in billions over the last 4 quarters." },
        equity: { type: Type.STRING },
        netIncome: { type: Type.STRING },
        revenue: { type: Type.STRING }
      },
      required: ["marketCap", "marketCapHistory", "equity", "netIncome", "revenue"]
    },
    stock: {
      type: Type.OBJECT,
      properties: {
        price: { type: Type.STRING },
        change: { type: Type.STRING },
        changePct: { type: Type.STRING },
        wk52: { type: Type.STRING },
        marketCap: { type: Type.STRING },
        avgVol: { type: Type.STRING },
        divYield: { type: Type.STRING }
      },
      required: ["price", "change", "changePct", "wk52", "marketCap", "avgVol", "divYield"]
    },
    kpis: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          label: { type: Type.STRING },
          value: { type: Type.STRING },
          delta: { type: Type.STRING },
          tone: { type: Type.STRING }
        },
        required: ["label", "value", "delta"]
      },
      description: "Exactly 6 critical KPIs for the stock."
    },
    chart: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        subtitle: { type: Type.STRING },
        yAxis: { type: Type.ARRAY, items: { type: Type.STRING } },
        xAxis: { type: Type.ARRAY, items: { type: Type.STRING } },
        yMin: { type: Type.NUMBER },
        yMax: { type: Type.NUMBER },
        prices: { type: Type.ARRAY, items: { type: Type.NUMBER } },
        annotations: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              index: { type: Type.INTEGER },
              label: { type: Type.STRING },
              above: { type: Type.BOOLEAN },
              emphasis: { type: Type.BOOLEAN },
              current: { type: Type.BOOLEAN }
            },
            required: ["index", "label", "above"]
          }
        }
      },
      required: ["title", "prices", "xAxis", "yMin", "yMax"]
    },
    risk: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.NUMBER },
        verdict: { type: Type.STRING },
        verdictTone: { type: Type.STRING },
        context: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              k: { type: Type.STRING },
              v: { type: Type.STRING }
            }
          }
        }
      },
      required: ["score", "verdict", "verdictTone"]
    },
    valuation: {
      type: Type.OBJECT,
      properties: {
        summary: { type: Type.STRING },
        cards: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              label: { type: Type.STRING },
              value: { type: Type.STRING },
              ctx: { type: Type.STRING },
              status: { type: Type.STRING }
            },
            required: ["label", "value", "ctx", "status"]
          }
        }
      }
    },
    health: {
      type: Type.OBJECT,
      properties: {
        summary: { type: Type.STRING },
        cards: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              label: { type: Type.STRING },
              value: { type: Type.STRING },
              ctx: { type: Type.STRING },
              status: { type: Type.STRING }
            },
            required: ["label", "value", "ctx", "status"]
          }
        }
      }
    },
    growth: {
      type: Type.OBJECT,
      properties: {
        summary: { type: Type.STRING },
        cards: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              label: { type: Type.STRING },
              value: { type: Type.STRING },
              ctx: { type: Type.STRING },
              status: { type: Type.STRING }
            },
            required: ["label", "value", "ctx", "status"]
          }
        }
      }
    },
    breakdown: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          weight: { type: Type.NUMBER },
          score: { type: Type.NUMBER },
          note: { type: Type.STRING }
        },
        required: ["name", "weight", "score", "note"]
      }
    },
    quarterly: {
      type: Type.OBJECT,
      properties: {
        subtitle: { type: Type.STRING },
        headers: { type: Type.ARRAY, items: { type: Type.STRING } },
        rows: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              label: { type: Type.STRING },
              icon: { type: Type.STRING },
              values: { type: Type.ARRAY, items: { type: Type.STRING } },
              qoq: { type: Type.STRING },
              yoy: { type: Type.STRING },
              qoqTone: { type: Type.STRING },
              yoyTone: { type: Type.STRING }
            },
            required: ["label", "values", "qoq", "yoy"]
          }
        }
      }
    },
    earnings: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        date: { type: Type.STRING },
        rows: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              k: { type: Type.STRING },
              v: { type: Type.STRING },
              tone: { type: Type.STRING }
            }
          }
        },
        narrative: { type: Type.STRING }
      }
    },
    delivery: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        date: { type: Type.STRING },
        items: { type: Type.ARRAY, items: { type: Type.STRING } }
      }
    },
    catalysts: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          h: { type: Type.STRING },
          d: { type: Type.STRING }
        }
      }
    },
    risks: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          h: { type: Type.STRING },
          d: { type: Type.STRING }
        }
      }
    },
    verdict: {
      type: Type.OBJECT,
      properties: {
        rating: { type: Type.STRING },
        ratingSub: { type: Type.STRING },
        ratingTone: { type: Type.STRING },
        ratingPosition: { type: Type.NUMBER },
        horizon: { type: Type.STRING },
        review: { type: Type.STRING },
        confidence: { type: Type.STRING },
        text: { type: Type.STRING }
      },
      required: ["rating", "ratingTone", "ratingPosition", "text"]
    },
    sources: { type: Type.STRING }
  },
  required: [
    "meta", "highlights", "stock", "kpis", "chart", "risk", "valuation", "health", 
    "growth", "breakdown", "quarterly", "earnings", "delivery", 
    "catalysts", "risks", "verdict", "sources"
  ]
};

export async function getCompanyReport(ticker: string): Promise<CompanyData> {
  const prompt = `
    Gere um relatório de inteligência de risco de ações de alto nível para a empresa com o ticker ${ticker} na B3 (Bolsa de Valores Brasileira).
    
    A resposta deve seguir o esquema JSON estrito fornecido, incluindo o campo 'highlights' com Market Cap, Patrimônio Líquido, Lucro Líquido e Receita (referentes ao último ano fiscal ou TTM).
    
    Diretrizes para os dados:
    1. Dados Financeiros: Use os dados mais recentes disponíveis (TTM, FY25, Q1 2026, etc.). Priorize dados publicados em 2026 se disponíveis. Se os dados históricos não estiverem perfeitamente disponíveis, forneça suas melhores estimativas profissionais baseadas no consenso de mercado.
    2. Setor B3: O campo 'meta.exchange' deve seguir o formato: "B3 / SAO · [SETOR OFICIAL B3] · ISIN [CÓDIGO]". Use a classificação setorial oficial da B3 (ex: Petróleo, Gás e Biocombustíveis, Bancos, etc.).
    3. Narrativa: A 'earnings.narrative' e 'verdict.text' devem ser profissionais, perspicazes e escritas inteiramente em PORTUGUÊS (Brasil).
    4. Sentimento: Use 'pos', 'neg', 'beat', 'miss', 'caut', 'up', 'down', 'flat' conforme apropriado para Tons e Statuses.
    5. Gráfico: O título deve ser obrigatoriamente "DESEMPENHO EM 12 MESES". Forneça 12 pontos de dados para a ação do preço nos últimos 12 meses, incluindo os meses de 2026.
    6. Escala de Recomendação (ratingPosition): 
       - 0-20: Forte Venda (SS)
       - 21-40: Venda (S)
       - 41-60: Manter (H)
       - 61-80: Compra (B)
       - 81-100: Forte Compra (SB)
       Certifique-se de que o 'ratingPosition' seja totalmente coerente com o 'rating' e o 'ratingTone'.
    7. Formato de Data: Todas as datas (meta.asOf, earnings.date, delivery.date) devem seguir o formato DD-MM-AAAA.
    8. Valuation/Health/Growth: Forneça exatamente 6 cartões de sinal para cada categoria, com descrições em PORTUGUÊS.
    9. Riscos e Catalisadores: Forneça exatamente 5 pontos para cada, em PORTUGUÊS.
    10. Todos os valores monetários DEVEM estar em BRL (R$), formatados conforme o padrão brasileiro (ex: R$ 1.234,56). Use ponto como separador de milhar e vírgula como separador decimal nos campos de string.
    11. O campo 'meta.currency' deve ser sempre 'BRL'.
    
    12. Highlights: Inclua o histórico do Valor de Mercado (marketCapHistory) como um array de 4 números representando os últimos 4 trimestres em bilhões (BRL).
    
    FONTES DE DADOS OBRIGATÓRIAS:
    - Use a Pesquisa do Google para extrair dados em tempo real da B3 (Bolsa Brasileira).
    - Obtenha múltiplos de valuation (P/L, EV/EBITDA, etc.) e indicadores de performance do Google Finance e Investing.com.
    - Triangule os dados financeiros (Receita, Lucro, Patrimônio) entre os relatórios oficiais de RI da empresa e o consenso disponível nessas plataformas para o ano de 2026.
    
    Atenção redobrada:
    - Se for uma UNIT (ticker terminado em 11), certifique-se de retornar o preço da Unit e não das ações individuais.
    - O campo 'stock.price' deve ser o valor exato da cotação no fechamento mais recente ou em tempo real (priorizando dados do Google Finance).
    - No campo 'sources', liste explicitamente: "B3, Google Finance, Investing.com e Relações com Investidores [NOME DA EMPRESA]".
    - Se o ticker for inválido ou não encontrado, tente encontrar o ticker correto antes de gerar o relatório.
  `;

  try {
    const tickerUpper = ticker.toUpperCase();
    console.log(`[GeminiService] Ticker requested: ${tickerUpper}`);

    // 0. Static Examples (allows use without API key)
    if (tickerUpper === 'PETR4' || tickerUpper === 'PETR3') {
        console.log("[GeminiService] Returning PETROBRAS_DATA");
        if (!PETROBRAS_DATA) throw new Error("Erro interno: PETROBRAS_DATA não encontrado.");
        return { ...PETROBRAS_DATA, meta: { ...PETROBRAS_DATA.meta, ticker: tickerUpper } };
    }
    if (tickerUpper === 'VALE3') {
        console.log("[GeminiService] Returning VALE3_DATA");
        if (!VALE3_DATA) throw new Error("Erro interno: VALE3_DATA não encontrado.");
        return { ...VALE3_DATA };
    }
    if (tickerUpper === 'ITUB4') {
        console.log("[GeminiService] Returning ITUB4_DATA");
        if (!ITUB4_DATA) throw new Error("Erro interno: ITUB4_DATA não encontrado.");
        return { ...ITUB4_DATA };
    }

    const cacheKey = `ticker_report_${tickerUpper}`;
    const cachedData = localStorage.getItem(cacheKey);
    
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        // Basic check to ensure it's valid data
        if (parsed && parsed.meta && parsed.meta.ticker === ticker.toUpperCase()) {
          console.log(`[Gemini] Returning cached report for ${ticker}`);
          return parsed as CompanyData;
        }
      } catch (e) {
        console.warn("Error parsing cached data", e);
        localStorage.removeItem(cacheKey);
      }
    }

    const ai = getAI();
    console.log(`[Gemini] Generating report for ticker: ${ticker}...`);
    
    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA as any,
        tools: [{ googleSearch: {} }] as any
      }
    });

    if (!result.text) {
      throw new Error("O modelo não retornou dados. Tente novamente.");
    }

    const responseText = result.text;

    // Clean potential markdown blocks
    const cleanText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    try {
      const parsed = JSON.parse(cleanText) as CompanyData;
      console.log(`[Gemini] Report generated successfully for ${ticker}`);
      
      // Save to cache
      localStorage.setItem(`ticker_report_${ticker.toUpperCase()}`, JSON.stringify(parsed));
      
      return parsed;
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", cleanText);
      throw new Error("Erro ao processar os dados retornados pela IA. Tente outro ticker.");
    }
  } catch (error: any) {
    console.error("Error generating company report:", error);
    
    // Provide user-friendly messages for common Gemini errors
    const errorMsg = error.message || "";
    
    if (errorMsg.includes("429") || errorMsg.includes("RESOURCE_EXHAUSTED")) {
      throw new Error("LIMITE DE USO ATINGIDO: Você excedeu a quota gratuita da API Gemini. Aguarde um minuto ou use os 'Exemplos' de acesso rápido. Consultas anteriores ficam salvas em cache local.");
    }
    if (errorMsg.includes("API_KEY_INVALID")) {
      throw new Error("Chave de API inválida. Verifique suas configurações.");
    }
    if (errorMsg.includes("SAFETY")) {
      throw new Error("A pesquisa foi bloqueada pelos filtros de segurança da IA.");
    }
    throw error;
  }
}
