import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  Copy, 
  Check, 
  AlertTriangle, 
  Search,
  Loader2,
  RefreshCw,
  X,
  Info,
  Calendar,
  Clock,
  Activity,
  PieChart,
  Menu,
  Home,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { PETROBRAS_DATA } from './data';
import { CompanyData } from './types';
import { getCompanyReport } from './services/geminiService';
import { GLOSSARY } from './constants';
import { 
  getChartPath, 
  getGaugeNeedle, 
  getScoreColor, 
  getScoreBarClass,
  isNeg,
} from './utils';

// --- Sub-Components ---

const Sparkline = ({ data, color = "#c9ff3d" }: { data: number[], color?: string }) => {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * 60,
    y: 20 - ((v - min) / range) * 16
  }));
  
  const path = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
  
  return (
    <svg width="60" height="20" className="opacity-60 group-hover:opacity-100 transition-opacity">
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const InfoTooltip = ({ label, align = 'center' }: { label: string, align?: 'left' | 'right' | 'center' }) => {
  const info = GLOSSARY[label.toUpperCase()] || GLOSSARY[label] || null;
  if (!info) return null;

  const alignClasses = {
    left: 'left-0 translate-x-0',
    right: 'right-0 translate-x-0',
    center: 'left-1/2 -translate-x-1/2'
  };

  const arrowClasses = {
    left: 'left-4 translate-x-0',
    right: 'right-4 translate-x-0',
    center: 'left-1/2 -translate-x-1/2'
  };

  return (
    <div className="group/tooltip relative inline-block ml-1.5 align-middle">
      <div className="p-1 -m-1 cursor-help">
        <Info className="w-3.5 h-3.5 text-text-3 group-hover/tooltip:text-accent transition-colors" />
      </div>
      <div className={`absolute invisible group-hover/tooltip:visible opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 z-[110] bottom-full ${alignClasses[align]} mb-3 w-80 p-5 bg-[#0a0c10] border border-accent/40 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,1)] ring-1 ring-white/10 pointer-events-none`}>
        <div className="text-[10px] text-accent font-black tracking-[0.25em] mb-3 uppercase border-b border-accent/20 pb-2.5 flex justify-between items-center">
          {info.label}
          <span className="text-[8px] bg-accent text-bg px-2 py-0.5 rounded-sm font-black">INTEL DEF</span>
        </div>
        <div className="text-[13.5px] text-white leading-relaxed font-semibold mb-4">{info.desc}</div>
        {info.calc && (
          <div className="pt-3.5 border-t border-white/10">
            <div className="text-[9px] text-text-3 font-black uppercase mb-2 tracking-wider">Metodologia de Cálculo:</div>
            <div className="font-mono text-[11px] text-accent/90 bg-black/60 p-3 rounded-xl border border-white/5 leading-relaxed">
              {info.calc}
            </div>
          </div>
        )}
        <div className={`absolute top-full ${arrowClasses[align]} -mt-[0.5px] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-accent/40`} />
        <div className={`absolute top-full ${arrowClasses[align]} -mt-[1.5px] w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[9px] border-t-[#0a0c10]`} />
      </div>
    </div>
  );
};
const Header = ({ 
  onSearch, 
  onToggleSidebar,
  isLoading,
  currentTicker,
}: { 
  onSearch: (ticker: string) => void,
  onToggleSidebar: () => void,
  isLoading: boolean,
  currentTicker?: string,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[Search] Attempting to search for:", searchInput);
    if (searchInput.trim() && !isLoading) {
      const ticker = searchInput.toUpperCase().trim();
      console.log(`[Search] Triggering search for ticker: ${ticker}`);
      onSearch(ticker);
      setSearchInput('');
    }
  };

  return (
    <div className="flex items-center px-7 py-5 gap-6 border-b border-border bg-[#0a0c12]">
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleSidebar}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors text-text-3 hover:text-accent"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden lg:flex flex-col border-l border-border pl-6">
          <div className="text-[10px] font-black tracking-[0.3em] text-accent uppercase leading-none mb-1">Alpha Intel System</div>
          <div className="text-[14px] font-black tracking-tight text-white uppercase leading-none">
            {currentTicker ? `Relatório: ${currentTicker}` : "Inteligência B3"}
          </div>
        </div>
      </div>
      <div className="flex-1 max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="relative group">
          <input 
            type="text" 
            placeholder="PESQUISAR TICKER B3 (Ex: VALE3, PETR4)..." 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            disabled={isLoading}
            className="w-full pl-11 pr-24 py-3 bg-panel-2 border border-border rounded-xl text-[13px] font-mono tracking-widest text-text placeholder:text-text-3 outline-none focus:border-accent focus:bg-panel transition-all disabled:opacity-50 shadow-xl"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-3 group-focus-within:text-accent transition-colors" />
          
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {isLoading ? (
              <Loader2 className="w-5 h-5 text-accent animate-spin mr-2" />
            ) : (
              <button 
                type="submit"
                disabled={!searchInput.trim()}
                className="bg-accent text-black px-3 py-1.5 rounded-lg text-[10px] font-black tracking-tighter hover:bg-white transition-colors disabled:opacity-30 disabled:hover:bg-accent"
              >
                PESQUISAR
              </button>
            )}
          </div>
        </form>
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-[9px] text-text-3 font-black uppercase tracking-[0.2em] py-1 shrink-0 flex items-center">
            ACESSO RÁPIDO:
          </span>
          {['PETR4', 'VALE3', 'ITUB4'].map(t => (
            <button 
              key={t} 
              onClick={() => onSearch(t)}
              className="px-2.5 py-1 bg-white/[0.03] border border-white/5 hover:border-accent/40 rounded-md text-[10px] font-mono text-text-3 hover:text-accent transition-all cursor-pointer whitespace-nowrap"
            >
              {t}
            </button>
          ))}
          <div className="px-2 py-1 bg-accent/5 rounded-md text-[8px] font-mono text-accent/60 border border-accent/10 whitespace-nowrap flex items-center gap-1">
             <Info className="w-3 h-3" />
             Demos sem custo de API
          </div>
        </div>
      </div>
    </div>
  );
};
;

const StockBar = ({ data }: { data: CompanyData }) => {
  const isDown = isNeg(data.stock.change);
  return (
    <div className="flex flex-col border-b border-border bg-[#0a0c10]">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 px-8 py-10">
        <div className="stock-id flex flex-col md:flex-row md:items-center gap-x-8 gap-y-4">
          <div>
            <div className="font-mono text-7xl font-black tracking-tighter text-text leading-none">{data.meta.ticker}</div>
            <div className="text-xl text-text-2 font-medium mt-1 uppercase tracking-tight">{data.meta.name}</div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-accent/10 border border-accent/20 rounded font-mono text-[11px] text-accent font-bold tracking-widest uppercase">
                  {data.meta.exchange.split('·')[0].trim()}
                </span>
                <span className="font-mono text-[12px] text-text-3 font-semibold uppercase tracking-tight">
                  {data.meta.exchange.split('·')[1]?.trim() || 'MERCADO DE CAPITAIS'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-text-3 font-bold tracking-widest uppercase mt-1">
                <Calendar className="w-3 h-3 text-accent/60" />
                DADOS ATUALIZADOS EM: <span className="text-text-2">{data.meta.asOf}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:items-end justify-center">
          <div className="flex items-baseline gap-3">
            <div className="font-mono text-6xl font-black text-white tracking-tighter leading-none">{data.stock.price}</div>
            <div className="font-mono text-xl text-text-3 font-medium">{data.meta.currency}</div>
          </div>
          <div className="flex flex-col md:items-end gap-1 mt-3">
            <div className={`font-mono text-2xl font-black flex items-center gap-2 ${isDown ? 'text-red' : 'text-green'}`}>
              {isDown ? <TrendingDown className="w-6 h-6" /> : <TrendingUp className="w-6 h-6" />}
              {data.stock.change} ({data.stock.changePct.includes('%') ? data.stock.changePct : `${data.stock.changePct}%`})
            </div>
            <div className="font-mono text-[10px] text-text-3 tracking-[0.2em] font-black uppercase mt-1">
              VARIAÇÃO DIA / ÚLTIMO FECHAMENTO
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SecondaryMetrics = ({ data }: { data: CompanyData }) => {
  const parseNum = (s: string) => {
    if (!s) return 0;
    // Handle both formats: 1.234,56 and 1,234.56 or 41,24
    const cleaned = s.replace(/[^\d,.-]/g, '');
    if (cleaned.includes(',') && cleaned.includes('.')) {
      // Likely 1.234,56
      return parseFloat(cleaned.replace(/\./g, '').replace(',', '.'));
    } else if (cleaned.includes(',')) {
      // Likely 41,24
      return parseFloat(cleaned.replace(',', '.'));
    }
    return parseFloat(cleaned);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-border border-t border-border bg-[#0d1117]">
      {[
        { l: 'PERÍODO 52S', v: data.stock.wk52, icon: <TrendingUp className="w-3.5 h-3.5" /> },
        { l: 'VOL MÉD (3M)', v: data.stock.avgVol, icon: <Activity className="w-3.5 h-3.5" /> },
        { l: 'DIV YIELD', v: data.stock.divYield, icon: <PieChart className="w-3.5 h-3.5" /> },
      ].map((st, i) => {
        const isRange = st.l === 'PERÍODO 52S';
        let rangeUI = null;

        if (isRange) {
          const parts = st.v.split(/[–-]/);
          if (parts.length === 2) {
            const min = parseNum(parts[0]);
            const max = parseNum(parts[1]);
            const current = parseNum(data.stock.price);
            const percent = ((current - min) / (max - min)) * 100;
            const clampedPercent = Math.min(Math.max(percent, 0), 100);
            
            rangeUI = (
              <div className="w-full mt-3">
                <div className="h-1.5 w-full bg-white/5 rounded-full relative">
                  {/* Background Gradient Bar */}
                  <div className="absolute inset-0 bg-linear-to-r from-red-500/20 via-yellow-500/20 to-green-500/20 rounded-full border border-white/5" />
                  
                  {/* Current Position Marker */}
                  <motion.div 
                    initial={{ left: 0 }}
                    animate={{ left: `${clampedPercent}%` }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -top-1 bottom-1 w-0.5 bg-accent z-10 overflow-visible"
                    style={{ transform: 'translateX(-50%)' }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-1">
                       <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_12px_#c9ff3d] animate-pulse" />
                    </div>
                  </motion.div>
                </div>
                
                <div className="flex justify-between items-center text-[7.5px] font-mono text-text-3 mt-2 uppercase font-black tracking-[0.15em]">
                  <div className="flex flex-col">
                    <span className="opacity-50">MÍNIMA 52S</span>
                    <span className="text-white/80">{parts[0].trim()}</span>
                  </div>
                  
                  <div className="flex flex-col items-center bg-accent/10 px-3 py-1 rounded-lg border border-accent/30 shadow-[0_0_15px_rgba(201,255,61,0.05)]">
                    <span className="text-accent text-[8px] font-black tracking-widest">PREÇO ATUAL</span>
                    <span className="text-accent text-[14px] font-black">{data.stock.price}</span>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className="opacity-50">MÁXIMA 52S</span>
                    <span className="text-white/80">{parts[1].trim()}</span>
                  </div>
                </div>
              </div>
            );
          }
        }

        return (
          <div key={i} className="p-6 flex flex-col gap-1 items-center md:items-start group transition-colors hover:bg-white/[0.02]">
            <div className="font-mono text-[16px] text-white font-black tracking-tight flex items-center gap-1.5 grayscale group-hover:grayscale-0 transition-all">
              {st.v}
            </div>
            <div className="text-[10px] text-text-3 font-bold tracking-widest uppercase flex items-center gap-1.5 group-hover:text-accent transition-colors">
              {st.l}
              <InfoTooltip label={st.l} align={i === 0 ? 'left' : i === 2 ? 'right' : 'center'} />
            </div>
            {rangeUI}
          </div>
        );
      })}
    </div>
  );
};

const HighlightsStrip = ({ data }: { data: CompanyData }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 border-b border-border divide-x divide-border bg-[#0d1117]">
    <div className="p-6 flex flex-col gap-2 group hover:bg-white/[0.02] transition-all relative overflow-hidden">
      <div className="flex justify-between items-start">
        <div className="text-[10px] text-accent font-black tracking-[0.25em] uppercase opacity-80 flex items-center">
          VALOR DE MERCADO
          <InfoTooltip label="MARKET CAP" align="left" />
        </div>
        {data.highlights.marketCapHistory && (
          <Sparkline data={data.highlights.marketCapHistory} />
        )}
      </div>
      <div className="font-mono text-2xl text-text font-black group-hover:text-white transition-colors">{data.highlights.marketCap}</div>
      {data.highlights.marketCapHistory && data.highlights.marketCapHistory.length >= 2 && (
        <div className="text-[9px] font-mono text-text-3 font-bold uppercase tracking-wider">
          TREND 4Q: {((data.highlights.marketCapHistory[data.highlights.marketCapHistory.length - 1] / data.highlights.marketCapHistory[0] - 1) * 100).toFixed(1)}%
        </div>
      )}
    </div>
    <div className="p-6 flex flex-col gap-2 group hover:bg-white/[0.02] transition-all">
      <div className="text-[10px] text-accent font-black tracking-[0.25em] uppercase opacity-80 flex items-center">
        PATRIMÔNIO LÍQUIDO
        <InfoTooltip label="PATRIMÔNIO LÍQUIDO" />
      </div>
      <div className="font-mono text-2xl text-text font-black group-hover:text-white transition-colors">{data.highlights.equity}</div>
    </div>
    <div className="p-6 flex flex-col gap-2 group hover:bg-white/[0.02] transition-all">
      <div className="text-[10px] text-accent font-black tracking-[0.25em] uppercase opacity-80 flex items-center">
        LUCRO LÍQUIDO (TTM)
        <InfoTooltip label="LUCRO LÍQUIDO (TTM)" />
      </div>
      <div className="font-mono text-2xl text-green font-black group-hover:scale-105 transition-transform origin-left">{data.highlights.netIncome}</div>
    </div>
    <div className="p-6 flex flex-col gap-2 group hover:bg-white/[0.02] transition-all">
      <div className="text-[10px] text-accent font-black tracking-[0.25em] uppercase opacity-80 flex items-center">
        RECEITA LÍQUIDA (TTM)
        <InfoTooltip label="RECEITA LÍQUIDA (TTM)" align="right" />
      </div>
      <div className="font-mono text-2xl text-text font-black group-hover:text-white transition-colors">{data.highlights.revenue}</div>
    </div>
  </div>
);

const KpiStrip = ({ data }: { data: CompanyData }) => (
  <div className="grid grid-cols-2 lg:grid-cols-6 border-b border-border divide-x divide-border bg-[#0a0c12]">
    {data.kpis.map((k, i) => (
      <div key={i} className="p-6 flex flex-col gap-2.5 transition-colors group hover:bg-white/[0.01]">
        <div className="text-[10px] text-text-3 tracking-[0.2em] font-bold uppercase flex items-center group-hover:text-accent transition-colors">
          {k.label}
          <InfoTooltip label={k.label} align={i === 0 ? 'left' : i === 5 ? 'right' : 'center'} />
        </div>
        <div className="font-mono text-2xl text-text font-bold tracking-tight">{k.value}</div>
        <div className={`font-mono text-[11px] font-semibold ${k.tone === 'pos' ? 'text-green' : k.tone === 'neg' ? 'text-red' : 'text-text-2'}`}>
          {k.delta}
        </div>
      </div>
    ))}
  </div>
);

const PriceChart = ({ data }: { data: CompanyData }) => {
  const c = data.chart;
  const { pts, line, area } = getChartPath(c.prices, c.yMin, c.yMax);
  const xLabelStep = (718 - 60) / (c.xAxis.length - 1);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <div className="p-8 border-r border-border flex-1 relative bg-[#0d1117]">
      <div className="flex items-center justify-between mb-8">
        <div className="section-header-text uppercase flex items-center">
          <TrendingUp className="w-6 h-6 text-accent" />
          {c.title}
          <InfoTooltip label="HISTÓRICO TRIMESTRAL" align="left" />
        </div>
        <div className="flex gap-2 items-center">
            {hoverIndex !== null && (
                <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="font-mono text-[11px] text-accent font-bold bg-accent/10 px-2 py-1 rounded border border-accent/20"
                >
                    {c.xAxis[hoverIndex]}: {c.prices[hoverIndex].toFixed(2)}
                </motion.div>
            )}
            <div className="font-mono text-[11px] text-text-3 tracking-widest uppercase bg-panel-2 px-3 py-1 rounded border border-border-2">{c.subtitle}</div>
        </div>
      </div>
      
      <div className="relative group">
        <svg 
            viewBox="0 0 760 300" 
            className="w-full h-auto cursor-crosshair overflow-visible" 
            preserveAspectRatio="xMidYMid meet"
            onMouseLeave={() => setHoverIndex(null)}
        >
            <defs>
            <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--color-blue)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--color-blue)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineGrad" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="var(--color-blue)" />
                <stop offset="100%" stopColor="var(--color-accent)" />
            </linearGradient>
            </defs>
            
            {/* Grid */}
            <g stroke="rgba(255,255,255,0.06)">
            {[0, 1, 2, 3].map(i => <line key={i} x1="50" y1={40 + i * 60} x2="740" y2={40 + i * 60} />)}
            </g>
            
            {/* Labels */}
            <g className="font-mono text-[10px] fill-text-3 font-semibold pointer-events-none">
            {c.yAxis?.map((v, i) => <text key={i} x="40" y={44 + i * 60} textAnchor="end">{v}</text>)}
            {c.xAxis?.map((m, i) => (
                <text key={i} x={60 + i * xLabelStep} y="275" textAnchor="middle">{m}</text>
            ))}
            </g>
            
            {/* Hover Guide */}
            {hoverIndex !== null && (
                <line 
                    x1={pts[hoverIndex].x} y1="30" 
                    x2={pts[hoverIndex].x} y2="255" 
                    className="stroke-accent/30" 
                    strokeWidth="1" 
                    strokeDasharray="4 4"
                />
            )}

            <path d={area} fill="url(#areaGrad)" className="pointer-events-none" />
            
            <motion.path 
            key={data.meta.ticker}
            d={line} 
            fill="none" 
            stroke="url(#lineGrad)" 
            strokeWidth="3" 
            strokeLinejoin="round" 
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="pointer-events-none"
            />
            
            {/* Interactive Areas for Hover */}
            {pts.map((p, i) => (
                <rect 
                    key={i}
                    x={p.x - 20} y="30" width="40" height="225"
                    fill="transparent"
                    onMouseEnter={() => setHoverIndex(i)}
                />
            ))}

            {/* Annotations */}
            {c.annotations?.map((a, i) => {
            const p = pts[a.index];
            if (!p) return null;
            const isNearBottom = p.y > 150;
            const lineY = a.above ? p.y - 40 : p.y + 40;
            const textY = a.above ? p.y - 45 : p.y + 55;
            const nearRight = p.x > 620;
            
            return (
                <g key={i} className="pointer-events-none">
                <line className="stroke-accent opacity-40 shadow-accent" x1={p.x} y1={p.y} x2={p.x} y2={lineY} strokeDasharray="2 3" strokeWidth="1" />
                <circle cx={p.x} cy={p.y} r="5" className="fill-accent stroke-bg stroke-2 shadow-[0_0_8px_rgba(201,255,61,0.5)]" />
                <text 
                    className={`font-mono text-[10px] font-bold uppercase ${a.emphasis ? 'fill-accent' : 'fill-text'}`}
                    x={nearRight ? p.x - 10 : p.x + 10} 
                    y={textY} 
                    textAnchor={nearRight ? 'end' : 'start'}
                    style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.8))' }}
                >
                    {a.label}
                </text>
                </g>
            );
            })}
        </svg>
      </div>
    </div>
  );
};

const RiskGauge = ({ data }: { data: CompanyData }) => {
  const r = data.risk;
  const { x, y } = getGaugeNeedle(r.score);
  const color = getScoreColor(r.score);
  
  return (
    <div className="p-8 md:w-[400px] flex flex-col items-center border-l-0 md:border-l border-border bg-panel/30">
      <div className="text-[12px] text-text-3 tracking-[0.25em] font-bold uppercase mb-4 flex items-center">
        MÉTRICA DE RISCO
        <InfoTooltip label="ALPHA SCORE" align="right" />
      </div>
      <svg className="w-full max-w-[320px] mb-4" viewBox="0 0 300 200">
        <defs>
          <linearGradient id="gaugeG" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="var(--color-red)" />
            <stop offset="40%" stopColor="#ff8a3d" />
            <stop offset="60%" stopColor="var(--color-amber)" />
            <stop offset="100%" stopColor="var(--color-green)" />
          </linearGradient>
        </defs>
        <path d="M 30 160 A 120 120 0 0 1 270 160" fill="none" stroke="var(--color-panel-2)" strokeWidth="22" strokeLinecap="round"/>
        <path d="M 30 160 A 120 120 0 0 1 270 160" fill="none" stroke="url(#gaugeG)" strokeWidth="22" strokeLinecap="round" opacity="0.95" />
        
        <g className="font-mono text-[11px] fill-text-3 font-bold">
          <text x="30" y="190" textAnchor="middle">CRÍTICO</text>
          <text x="150" y="25" textAnchor="middle">MÉDIO</text>
          <text x="270" y="190" textAnchor="middle">SEGURO</text>
        </g>
        
        <motion.line 
          key={data.meta.ticker}
          x1="150" y1="160" x2={x} y2={parseFloat(y) + 10} 
          stroke={color} strokeWidth="4" strokeLinecap="round"
          initial={{ rotate: -180, originX: "150px", originY: "160px" }}
          animate={{ rotate: 0 }}
          transition={{ duration: 1.2, ease: "backOut" }}
        />
        <circle cx="150" cy="160" r="8" fill={color} />
        <circle cx="150" cy="160" r="4" fill="var(--color-bg)" />
      </svg>
      
      <div className="text-center -mt-6 mb-4">
        <div className="font-mono text-[64px] font-black tracking-tighter leading-none mb-1" style={{ color }}>{r.score}</div>
        <div className="font-mono text-[14px] text-text font-bold tracking-widest uppercase opacity-60">SCORE GLOBAL</div>
      </div>
      
      <div className={`w-full p-4 rounded-xl font-mono text-[12px] font-bold tracking-widest uppercase border-2 flex items-center justify-center gap-3 shadow-xl`} style={{ color, backgroundColor: `${color}10`, borderColor: `${color}30` }}>
        <AlertTriangle className="w-5 h-5" />
        {r.verdict}
      </div>
      
      <div className="mt-8 w-full flex flex-col gap-3">
        {r.context?.map((c, i) => (
          <div key={i} className="flex justify-between items-center py-2 border-b border-white/[0.03] font-mono text-[12px] gap-2">
            <span className="text-text-3 font-semibold uppercase">{c.k}</span>
            <span className="text-text font-bold text-right" style={{ color: c.v.includes('▲') ? 'var(--color-green)' : c.v.includes('▼') ? 'var(--color-red)' : '' }}>{c.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const MetricSection = ({ title, data }: { title: string, data: any }) => (
  <div className="p-8 border-b border-border bg-[#080a0f]">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <h2 className="section-header-text uppercase text-accent flex items-center">
          {title}
          <InfoTooltip label={title} align="left" />
        </h2>
        <div className="font-mono text-[12px] text-text-3 font-bold mt-1 tracking-widest uppercase">{data.summary}</div>
      </div>
      <div className="bg-panel-2 px-4 py-2 rounded-lg border border-border-2 font-mono text-[11px] text-accent font-bold tracking-widest hidden lg:block uppercase">
        MÉTRICAS: {data.cards?.length || 0}
      </div>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {data.cards?.map((c: any, i: number) => (
        <motion.div 
          key={`${title}-${i}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          whileHover={{ y: -5, borderColor: "var(--color-accent)", backgroundColor: "var(--color-panel-2)" }}
          className={`p-5 border-2 border-border-2 rounded-2xl bg-panel group relative flex flex-col justify-between transition-all duration-300 shadow-xl border-l-[6px] ${
            c.status === 'beat' ? 'border-l-green' : c.status === 'miss' ? 'border-l-red' : 'border-l-amber'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="metric-card-title text-accent/80 flex items-center">
                {c.label}
                <InfoTooltip label={c.label} align={i % 6 === 0 ? 'left' : (i + 1) % 6 === 0 ? 'right' : 'center'} />
              </span>
              <span className={`font-mono text-[9px] tracking-widest px-1.5 py-0.5 rounded-md uppercase font-black border-2 ${
                c.status === 'beat' ? 'bg-green/10 text-green border-green/20' : 
                c.status === 'miss' ? 'bg-red/10 text-red border-red/20' : 
                'bg-amber/10 text-amber border-amber/20'
              }`}>
                {c.status.toUpperCase()}
              </span>
            </div>
            <div className="font-mono text-3xl font-black text-white tracking-tighter leading-none mb-3 group-hover:text-accent transition-colors">
              {c.value}
            </div>
          </div>
          <div className="font-mono text-[11px] text-text-3 font-bold mt-2 leading-snug bg-white/5 p-2 rounded-lg uppercase">{c.ctx}</div>
        </motion.div>
      ))}
    </div>
  </div>
);

const BreakdownSection = ({ data }: { data: CompanyData }) => (
  <div className="p-8 bg-[#0a0c10] border-b border-border">
    <div className="section-header-text mb-8 uppercase text-accent flex items-center">
      COMPOSIÇÃO DO ALPHA SCORE
      <InfoTooltip label="COMPOSIÇÃO DO ALPHA SCORE" align="left" />
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      {data.breakdown?.map((b, i) => {
        const cls = getScoreBarClass(b.score);
        return (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-panel/80 rounded-2xl border-2 border-border border-b-4 border-b-border-2"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="text-[14px] text-white tracking-widest font-black uppercase flex items-center">
                {b.name}
                {i === 0 && <InfoTooltip label="VALUATION" align="left" />}
                {i === 1 && <InfoTooltip label="SAÚDE FINANCEIRA" align="center" />}
                {i === 2 && <InfoTooltip label="CRESCIMENTO" align="right" />}
              </div>
              <div className="font-mono text-[11px] text-accent font-bold bg-accent/5 px-2 py-0.5 rounded border border-accent/10">PESO {b.weight}%</div>
            </div>
            <div className="font-mono text-4xl font-black text-text mb-4 tracking-tighter">
              {b.score}<span className="text-text-3 text-[16px] font-normal">/100</span>
            </div>
            <div className="h-2.5 bg-bg border border-border rounded-full overflow-hidden shadow-inner flex items-center p-0.5">
              <motion.div 
                className={`h-full rounded-full shadow-[0_0_15px_rgba(201,255,61,0.2)] ${
                  cls === 'green' ? 'bg-linear-to-r from-green to-[#7eef9b]' : 
                  cls === 'amber' ? 'bg-linear-to-r from-[#ff8a3d] to-amber' : 
                  'bg-linear-to-r from-[#ff3a5e] to-red'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${b.score}%` }}
                transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
              />
            </div>
            <div className="flex items-start gap-2 mt-4 font-mono text-[11px] text-text-2 font-semibold italic bg-white/5 p-3 rounded-xl uppercase">
               <Info className="w-4 h-4 shrink-0 text-accent" />
               {b.note}
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
);

// --- Page 2 Components ---

const QuarterlyTable = ({ data }: { data: CompanyData }) => {
  // CLONE AND REVERSE DATA TO SHOW MOST RECENT FIRST
  const reversedHeaders = useMemo(() => [...data.quarterly.headers].reverse(), [data.quarterly.headers]);
  const reversedRows = useMemo(() => data.quarterly.rows.map(r => ({
     ...r,
     values: [...r.values].reverse()
  })), [data.quarterly.rows]);

  return (
    <div className="p-8 border-b border-border">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="section-header-text uppercase text-accent flex items-center">
          HISTÓRICO TRIMESTRAL
          <InfoTooltip label="HISTÓRICO TRIMESTRAL" align="left" />
        </div>
        <div className="font-mono text-[11px] font-bold text-text-3 tracking-widest uppercase bg-panel p-2.5 rounded border border-border flex items-center gap-3">
            <Clock className="w-4 h-4 text-accent" />
            ÚLTIMOS {data.quarterly.headers.length} PERÍODOS · {data.quarterly.subtitle}
        </div>
      </div>
      <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-accent/20">
        <table className="w-full border-collapse font-mono text-sm min-w-[900px]">
          <thead>
            <tr className="bg-panel-2">
              <th className="text-left py-4 px-6 border-b-2 border-border-2 text-[11px] text-accent uppercase tracking-[0.2em] font-black">Indicadores Financeiros</th>
              {reversedHeaders.map((h, i) => (
                <th key={i} className={`text-right py-4 px-6 border-b-2 border-border-2 text-[12px] tracking-widest font-black ${i === 0 ? 'text-white border-b-accent' : 'text-text-3'}`}>
                  {h} {i === 0 && <span className="block text-[8px] text-accent animate-pulse font-bold">RELEVANTE</span>}
                </th>
              ))}
              <th className="text-right py-4 px-6 border-b-2 border-border-2 text-[11px] text-text-3 uppercase tracking-widest font-black">QoQ %</th>
              <th className="text-right py-4 px-6 border-b-2 border-border-2 text-[11px] text-text-3 uppercase tracking-widest font-black">YoY %</th>
            </tr>
          </thead>
          <tbody>
            {reversedRows.map((r, i) => (
              <tr key={i} className="group hover:bg-accent/[0.04] transition-all">
                <td className="py-4 px-6 border-b border-border text-text font-bold text-sm bg-panel/30 group-hover:bg-transparent">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full shadow-lg ${r.icon === 'g' ? 'bg-green shadow-green/20' : r.icon === 'r' ? 'bg-red shadow-red/20' : 'bg-amber shadow-amber/20'}`} />
                    <span className="flex items-center">
                      {r.label}
                      <InfoTooltip label={r.label} align="left" />
                    </span>
                  </div>
                </td>
                {r.values.map((v, j) => (
                  <td key={j} className={`text-right py-4 px-6 border-b border-border font-bold ${j === 0 ? 'text-white bg-white/5 border-x border-white/5' : 'text-text-2'}`}>{v}</td>
                ))}
                <td className={`text-right py-4 px-6 border-b border-border font-black text-sm italic ${r.qoqTone === 'up' ? 'text-green' : r.qoqTone === 'down' ? 'text-red' : 'text-text-3'}`}>
                  {isNeg(r.qoq) ? r.qoq : '+' + r.qoq}
                </td>
                <td className={`text-right py-4 px-6 border-b border-border font-black text-sm italic ${r.yoyTone === 'up' ? 'text-green' : r.yoyTone === 'down' ? 'text-red' : 'text-text-3'}`}>
                  {isNeg(r.yoy) ? r.yoy : '+' + r.yoy}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const EarningsAndDelivery = ({ data }: { data: CompanyData }) => (
  <div className="p-8 border-b border-border">
    <div className="section-header-text mb-8 uppercase text-accent flex items-center">
      LATEST EARNINGS & OPERACIONAL
      <InfoTooltip label="LATEST EARNINGS" align="left" />
    </div>
    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8">
      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="p-8 bg-panel-2 border-2 border-border-2 rounded-3xl relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 left-0 w-2 h-full bg-blue" />
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-2xl font-black text-white tracking-tighter uppercase">{data.earnings.title}</h3>
            <div className="font-mono text-[12px] text-blue font-black mt-1 tracking-[.2em] uppercase">{data.earnings.date}</div>
          </div>
          <div className="font-mono text-[10px] text-text-3 bg-white/5 px-2 py-1 rounded border border-white/10 uppercase tracking-widest">OFFICIAL FILING</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-8">
          {data.earnings.rows?.map((r, i) => (
            <div key={i} className="flex justify-between items-center py-3 border-b border-white/10 group">
              <span className="text-[12px] text-text-2 font-bold tracking-wide group-hover:text-white transition-colors uppercase">{r.k}</span>
              <span className={`font-mono text-sm font-black ${r.tone === 'pos' ? 'text-green' : r.tone === 'neg' ? 'text-red' : 'text-white'}`}>{r.v}</span>
            </div>
          ))}
        </div>
        <div className="pt-6 border-t border-white/10 text-[15px] text-text-2 leading-relaxed italic" 
             dangerouslySetInnerHTML={{ __html: data.earnings.narrative }} />
      </motion.div>
      
      <div className="p-8 bg-panel border-2 border-border rounded-3xl relative shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-green/5 to-transparent pointer-events-none" />
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-2xl font-black text-white tracking-tighter uppercase">{data.delivery.title}</h3>
            <div className="font-mono text-[12px] text-green font-black mt-1 tracking-[.2em] uppercase">{data.delivery.date}</div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {data.delivery.items?.map((it, i) => (
            <div key={i} className="flex gap-4 text-[14px] items-start group">
              <div className="w-8 h-8 rounded-xl bg-green/20 border border-green/30 grid place-items-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                <Check className="w-4 h-4 text-green" />
              </div>
              <div className="text-text-2 leading-snug font-medium group-hover:text-white transition-colors uppercase tracking-tight" dangerouslySetInnerHTML={{ __html: it }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const CatalystsVsRisks = ({ data }: { data: CompanyData }) => (
  <div className="p-8 border-b border-border">
    <div className="section-header-text mb-8 uppercase text-accent flex items-center">
      CATALISADORES vs RISCOS ESTRATÉGICOS
      <InfoTooltip label="CATALISADORES" align="left" />
    </div>
    <div className="grid md:grid-cols-2 gap-8">
      {[
        { cls: 'cat', lab: '▲ CATALIZADORES DE ALTA', items: data.catalysts, color: 'text-green', bg: 'bg-[#0d1512]', border: 'border-green/30', numBg: 'bg-green/10', icon: <TrendingUp className="w-6 h-6"/> },
        { cls: 'risk', lab: '▼ RISCOS DE BAIXA', items: data.risks, color: 'text-red', bg: 'bg-[#150d0d]', border: 'border-red/30', numBg: 'bg-red/10', icon: <TrendingDown className="w-6 h-6"/> }
      ].map((col, idx) => (
        <motion.div 
           key={idx} 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5, delay: idx * 0.2 }}
           className={`p-8 rounded-3xl border-2 shadow-2xl relative overflow-hidden ${col.bg} ${col.border}`}
        >
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
            <div className={`text-xl tracking-tighter uppercase font-black flex items-center gap-3 ${col.color}`}>
              {col.icon}
              {col.lab}
            </div>
            <div className="text-[11px] text-text-3 tracking-[0.2em] font-mono font-black">{col.items?.length || 0} PONTOS</div>
          </div>
          <div className="flex flex-col gap-6">
            {col.items?.map((it, i) => (
              <motion.div 
                key={i} 
                whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.02)" }}
                className="flex gap-4 items-start p-4 rounded-2xl border-b border-white/[0.03] last:border-0 transition-colors"
              >
                <div className={`font-mono text-[13px] font-black w-9 h-9 rounded-xl grid place-items-center shrink-0 border-2 ${col.numBg} ${col.color} ${col.border}`}>
                  {(i+1).toString().padStart(2, '0')}
                </div>
                <div>
                  <div className="text-base text-white font-black mb-1 uppercase tracking-tight">{it.h}</div>
                  <div className="text-sm text-text-2 leading-relaxed font-bold uppercase opacity-80">{it.d}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const BottomLine = ({ data }: { data: CompanyData }) => {
  const v = data.verdict;
  const seg = Math.min(4, Math.floor(v.ratingPosition / 20.01)); // Precision fix for 100
  const ratingColor = v.ratingTone === 'green' ? 'text-green' : v.ratingTone === 'red' ? 'text-red' : v.ratingTone === 'amber' ? 'text-amber' : 'text-blue';
  
  return (
    <div className="p-8 bg-linear-to-b from-[#0c0f15] to-[#08090d]">
      <div className="section-header-text mb-8 uppercase text-accent">VEREDITO & TESE DE INVESTIMENTO</div>
      <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-stretch">
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="p-10 border-2 border-border-2 rounded-3xl bg-panel-2 relative overflow-hidden group shadow-2xl flex flex-col"
        >
          <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" />
          <div className="text-[10px] text-accent tracking-[0.4em] font-bold uppercase mb-6 opacity-40">ANÁLISE ESTRATÉGICA FINAL</div>
          <div className={`font-mono text-7xl font-black tracking-tighter leading-none mb-6 ${ratingColor} drop-shadow-[0_0_35px_rgba(201,255,61,0.15)]`}>
            {v.rating} <span className="text-text-3 text-2xl font-bold ml-6 tracking-widest uppercase">{v.ratingSub}</span>
          </div>
          
          <div className="flex-1 mt-6 relative">
            <div className="absolute -left-6 top-0 bottom-0 w-1 bg-accent/10 rounded-full" />
            <div 
              className="text-lg md:text-xl text-text-2 font-normal leading-relaxed px-2" 
              dangerouslySetInnerHTML={{ __html: v.text.replace(/<span/g, '<span className="text-accent border-b border-accent/20"') }} 
            />
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/5 flex gap-10">
             <div>
                <div className="text-[10px] text-text-3 font-black uppercase tracking-widest mb-1">Horizonte</div>
                <div className="font-mono text-sm text-white font-bold">{v.horizon}</div>
             </div>
             <div>
                <div className="text-[10px] text-text-3 font-black uppercase tracking-widest mb-1">Confiança</div>
                <div className="font-mono text-sm text-white font-bold">{v.confidence}</div>
             </div>
             <div>
                <div className="text-[10px] text-text-3 font-black uppercase tracking-widest mb-1">Próxima Revisão</div>
                <div className="font-mono text-sm text-white font-bold">{v.review}</div>
             </div>
          </div>
        </motion.div>
        
        <div className="p-8 border-2 border-border rounded-3xl bg-panel flex flex-col justify-between shadow-2xl">
          <div>
            <div className="text-[12px] text-text-3 tracking-[0.2em] font-black uppercase mb-6">Escala de Recomendação Global</div>
            <div className="relative h-16 rounded-2xl overflow-hidden bg-bg border-4 border-panel-2">
              <div className="grid grid-cols-5 h-full">
                {['FORTE VENDA', 'VENDA', 'MANTER', 'COMPRA', 'FORTE COMPRA'].map((label, i) => (
                  <div key={i} className={`grid place-items-center font-mono text-[8px] leading-tight text-center px-1 tracking-tighter relative border-r-2 last:border-r-0 border-panel-2 ${
                    seg === i ? 'text-white font-black opacity-100 shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'text-text-3 opacity-40'
                  } ${
                    i === 0 ? 'bg-red/20' : 
                    i === 1 ? 'bg-[#ff8a3d1a]' : 
                    i === 2 ? 'bg-amber/20' : 
                    i === 3 ? 'bg-[#7bdb871a]' : 
                    'bg-green/30'
                  }`}>
                    {label}
                  </div>
                ))}
              </div>
              <motion.div 
                key={data.meta.ticker}
                className="absolute top-0 bottom-0 w-2 bg-accent shadow-[0_0_25px_rgba(201,255,61,1)] z-10"
                initial={{ left: "50%" }}
                animate={{ left: `${Math.min(98, Math.max(2, v.ratingPosition))}%` }}
                transition={{ duration: 1.5, ease: "backOut" }}
              />
            </div>
            <div className="flex justify-between mt-4 font-mono text-[10px] text-text-3 font-black uppercase tracking-widest">
              <span className="text-red">Risco Máximo</span><span>Equilíbrio</span><span className="text-green">Alpha Máximo</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 mt-8 bg-white/[0.03] p-5 rounded-3xl">
            <div className="flex justify-between font-mono text-[14px] border-b border-white/5 pb-3"><span className="text-text-3 font-black uppercase">ALPHA SCORE</span><span className="text-accent font-black">{data.risk.score}/100</span></div>
            <div className="p-4 bg-accent/5 border border-accent/10 rounded-2xl mt-4">
                <div className="text-[12px] text-text-2 font-bold leading-relaxed uppercase">
                  <span className="text-accent font-black mr-2">Status do Modelo:</span>
                  Modelo proprietário de Bruno Chayb, ainda em beta, calibrado por dados históricos e métricas pré-definidas
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = ({ text }: { text: string }) => (
  <div className="flex justify-center px-8 py-8 font-mono text-[12px] text-accent tracking-[0.4em] uppercase bg-[#0a0c12] border-t border-border/50 font-black">
    {text}
  </div>
);

// --- Main Component ---

const SidebarItem = ({ icon: Icon, label, active, collapsed, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group ${active ? 'bg-accent text-bg-2 shadow-[0_0_20px_rgba(201,255,61,0.2)]' : 'text-text-3 hover:bg-white/5 hover:text-text'}`}
  >
    <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-bg-2' : 'group-hover:text-accent transition-colors'}`} />
    {!collapsed && (
      <span className="font-mono text-[11px] tracking-[0.2em] font-black uppercase whitespace-nowrap overflow-hidden">
        {label}
      </span>
    )}
  </button>
);

const Sidebar = ({ activeView, setActiveView, collapsed, setCollapsed }: any) => {
  return (
    <motion.div 
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      className="h-screen bg-[#05070a] border-r border-border flex flex-col sticky top-0 z-50 transition-all"
    >
      <div className="p-6 flex items-center justify-between">
        {!collapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-accent font-mono text-[14px] font-black tracking-[0.3em] uppercase"
          >
            Investment Management
          </motion.div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-white/5 rounded-lg text-text-3 transition-colors ml-auto"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <div className="px-4 py-8 flex flex-col gap-2">
        <SidebarItem 
          icon={Home} 
          label="Equities Research" 
          active={activeView === 'research'} 
          collapsed={collapsed}
          onClick={() => setActiveView('research')}
        />
        <SidebarItem 
          icon={Briefcase} 
          label="Carteira Recomendada" 
          active={activeView === 'portfolio'} 
          collapsed={collapsed}
          onClick={() => setActiveView('portfolio')}
        />
      </div>

      <div className="mt-auto p-4 border-t border-border/30">
        {!collapsed && (
          <div className="p-4 bg-accent/5 rounded-2xl border border-accent/10">
            <div className="text-[10px] text-accent font-black tracking-widest uppercase mb-1">PRO PLAN</div>
            <div className="text-[9px] text-text-3 font-bold uppercase">Acesso Ilimitado</div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function App() {
  const [data, setData] = useState<CompanyData>(PETROBRAS_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [activeView, setActiveView] = useState<'research' | 'portfolio'>('research');
  const [collapsed, setCollapsed] = useState(false);

  const handleCopy = () => {
    const text = buildTextReport(data);
    navigator.clipboard.writeText(text).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    });
  };

  const handleSearch = async (ticker: string) => {
    if (!ticker) return;
    
    setActiveView('research');
    setIsLoading(true);
    setError(null);
    
    // Add artificial delay for immediate static data to show loading state
    const delay = new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const [report] = await Promise.all([
        getCompanyReport(ticker),
        delay
      ]);
      
      setData(report);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "FALHA AO GERAR RELATÓRIO PROFISSIONAL. VERIFIQUE O TICKER E TENTE NOVAMENTE.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen selection:bg-accent selection:text-bg-2 bg-[#050608] flex overflow-x-hidden">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        collapsed={collapsed} 
        setCollapsed={setCollapsed} 
      />

      <main className="flex-1 min-w-0 transition-all duration-300">
        <AnimatePresence mode="wait">
          {activeView === 'research' ? (
            <motion.div 
              key="research"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="px-4 md:px-10 py-10"
            >
              <div className="max-w-[1440px] mx-auto flex flex-col gap-10">
                <AnimatePresence mode="wait">
                  {error && (
                    <motion.div 
                      key="error"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-red/10 border-2 border-red/30 rounded-2xl p-6 flex items-center justify-between shadow-2xl"
                    >
                      <div className="flex items-center gap-4 text-red font-mono text-[13px] font-bold tracking-widest">
                        <AlertTriangle className="w-6 h-6" />
                        {error}
                      </div>
                      <button className="cursor-pointer hover:rotate-90 transition-transform" onClick={() => setError(null)}><X className="w-6 h-6 text-text-3" /></button>
                    </motion.div>
                  )}

                  {isLoading ? (
                    <motion.div 
                      key="loading"
                      className="page min-h-[750px] flex flex-col items-center justify-center p-12 text-center"
                    >
                      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
                        <div className="grid grid-cols-12 h-full gap-1">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="border-r-2 border-accent/15" />
                          ))}
                        </div>
                      </div>
                      <div className="w-36 h-36 rounded-3xl bg-panel-2 border-4 border-accent/20 grid place-items-center mb-10 relative">
                        <RefreshCw className="w-16 h-16 text-accent animate-spin" />
                        <div className="absolute inset-0 rounded-3xl animate-pulse bg-accent/10 border-accent/40" />
                      </div>
                      <div className="font-mono text-4xl text-white font-black tracking-tighter uppercase mb-4">Processando Inteligência B3</div>
                      <div className="text-accent/60 font-mono text-[14px] tracking-[0.3em] font-bold max-w-xl leading-loose uppercase whitespace-pre-wrap">
                        ANALISANDO DADOS DE 2026 · CALCULANDO VOLATILIDADE{'\n'}AVALIANDO FUNDAMENTOS · CALIBRANDO SCORE ALPHA
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="content"
                      className="flex flex-col"
                    >
                      <div className="page" id="main-report">
                        <Header 
                          onSearch={handleSearch} 
                          onToggleSidebar={() => setCollapsed(!collapsed)}
                          isLoading={isLoading} 
                          currentTicker={data.meta.ticker}
                        />
                        <StockBar data={data} />
                        <HighlightsStrip data={data} />

                        <div className="flex flex-col border-b border-border bg-[#0d1117]">
                          <div className="grid md:grid-cols-[1fr_auto]">
                            <PriceChart data={data} />
                            <RiskGauge data={data} />
                          </div>
                          <SecondaryMetrics data={data} />
                        </div>

                        <KpiStrip data={data} />

                        <div className="grid grid-cols-1 divide-y divide-border bg-[#080a0f]">
                          <MetricSection title="ANÁLISE DE VALUATION" data={data.valuation} />
                          <MetricSection title="SAÚDE FINANCEIRA" data={data.health} />
                          <MetricSection title="POTENCIAL DE CRESCIMENTO" data={data.growth} />
                        </div>

                        <BreakdownSection data={data} />
                        
                        <div className="bg-[#050608]">
                          <QuarterlyTable data={data} />
                          <EarningsAndDelivery data={data} />
                          <CatalystsVsRisks data={data} />
                          <BottomLine data={data} />
                        </div>

                        <Footer text="Fonte: Dados públicos B3, CVM, Anbima." />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="portfolio"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-20 flex flex-col items-center justify-center h-full min-h-screen text-center flex-1"
            >
              <Briefcase className="w-24 h-24 text-accent/20 mb-8" />
              <h1 className="text-6xl font-black tracking-tighter text-text-2 mb-4 uppercase">Carteira Recomendada</h1>
              <p className="text-xl text-text-3 font-mono tracking-widest uppercase">Estruturando dados estratégicos...</p>
              <div className="mt-12 p-10 border-2 border-dashed border-border rounded-3xl max-w-2xl bg-panel/10">
                <p className="leading-relaxed text-text-3 font-mono text-sm tracking-wide uppercase">
                  Estamos processando modelos de alocação dinâmica e balanceamento de risco com base em inteligência artificial proprietária. Disponível em breve para assinantes Pro.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ y: 100, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            exit={{ y: 100, opacity: 0, x: "-50%" }}
            className="fixed bottom-12 left-1/2 p-5 px-10 rounded-2xl bg-accent text-bg-2 font-mono text-base font-black tracking-[.2em] uppercase shadow-[0_0_60px_rgba(201,255,61,0.5)] z-50 flex items-center gap-5"
          >
            <Check className="w-7 h-7" />
            REPORT COPIADO COM SUCESSO
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function buildTextReport(data: CompanyData) {
  const lines = [];
  lines.push(`${data.meta.ticker} — RELATÓRIO DE RISCO ALPHA (${data.meta.asOf})`);
  lines.push('='.repeat(50));
  lines.push('');
  lines.push(`${data.meta.name}`);
  lines.push(`${data.meta.exchange}`);
  lines.push(`Preço: ${data.meta.currency} ${data.stock.price} (${data.stock.changePct.includes('%') ? data.stock.changePct : `${data.stock.changePct}%`})`);
  lines.push(`52S: ${data.stock.wk52} · Mkt Cap: ${data.highlights.marketCap} · Yield: ${data.stock.divYield}`);
  lines.push(`PL: ${data.highlights.equity} · Lucro: ${data.highlights.netIncome} · Receita: ${data.highlights.revenue}`);
  lines.push('');
  lines.push(`SCORE DE RISCO: ${data.risk.score} / 100 — ${data.risk.verdict}`);
  data.breakdown?.forEach(b => {
    const c = (b.score * b.weight / 100).toFixed(1);
    lines.push(`  ${b.name.padEnd(20)} ${b.score}/100 (peso ${b.weight}%) → ${c} pts`);
  });
  lines.push('');
  lines.push('KPIs:');
  data.kpis?.forEach(k => lines.push(`  ${k.label.padEnd(15)} ${k.value.padEnd(10)} ${k.delta}`));
  lines.push('');
  lines.push('VEREDITO:');
  lines.push(`  Rating: ${data.verdict.rating} ${data.verdict.ratingSub || ''}`);
  lines.push(`  Análise: ${data.verdict.text.replace(/<[^>]+>/g, '')}`);
  lines.push('');
  lines.push('Fonte: Dados públicos B3, CVM, Anbima.');
  return lines.join('\n');
}
