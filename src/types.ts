export interface CompanyData {
  meta: {
    ticker: string;
    name: string;
    exchange: string;
    asOf: string;
    currency: string;
  };
  highlights: {
    marketCap: string;
    equity: string; // Patrimônio Líquido
    netIncome: string; // Lucro Líquido
    revenue: string; // Receita
  };
  stock: {
    price: string;
    change: string;
    changePct: string;
    wk52: string;
    marketCap: string;
    avgVol: string;
    divYield: string;
  };
  kpis: Kpi[];
  chart: {
    title: string;
    subtitle: string;
    yAxis: string[];
    xAxis: string[];
    yMin: number;
    yMax: number;
    prices: number[];
    annotations: Annotation[];
  };
  risk: {
    score: number;
    verdict: string;
    verdictTone: 'green' | 'amber' | 'red' | 'blue';
    context: Array<{ k: string; v: string }>;
  };
  valuation: MetricCategory;
  health: MetricCategory;
  growth: MetricCategory;
  breakdown: Array<{
    name: string;
    weight: number;
    score: number;
    note: string;
  }>;
  quarterly: {
    subtitle: string;
    headers: string[];
    rows: Array<{
      label: string;
      icon?: 'g' | 'r' | 'a';
      values: string[];
      qoq: string;
      yoy: string;
      qoqTone: 'up' | 'down' | 'flat';
      yoyTone: 'up' | 'down' | 'flat';
    }>;
  };
  earnings: {
    title: string;
    date: string;
    rows: Array<{ k: string; v: string; tone?: string }>;
    narrative: string;
  };
  delivery: {
    title: string;
    date: string;
    items: string[];
  };
  catalysts: Point[];
  risks: Point[];
  verdict: {
    rating: string;
    ratingSub?: string;
    ratingTone: 'green' | 'amber' | 'red' | 'blue';
    ratingPosition: number;
    horizon: string;
    review: string;
    confidence: string;
    text: string;
  };
  sources: string;
}

export interface Kpi {
  label: string;
  value: string;
  delta: string;
  tone?: 'pos' | 'neg' | '';
}

export interface Annotation {
  index: number;
  label: string;
  above: boolean;
  emphasis?: boolean;
  current?: boolean;
}

export interface MetricCategory {
  summary: string;
  cards: MetricCard[];
}

export interface MetricCard {
  label: string;
  value: string;
  ctx: string;
  status: 'beat' | 'miss' | 'caut';
}

export interface Point {
  h: string;
  d: string;
}
