"use client";

import { useState, useEffect, useCallback } from "react";
import { TabNav, type TabType } from "@/components/TabNav";
import { PortfolioView } from "@/components/portfolio/PortfolioView";
import { HedgeView } from "@/components/hedge/HedgeView";
import { RiskView } from "@/components/risk/RiskView";
import { NewsView } from "@/components/news/NewsView";
import { GreeksView } from "@/components/greeks/GreeksView";
import type { NewsArticle } from "@/app/api/news/route";

// Shared types - exported for use in other components
export interface PortfolioItem {
  ticker: string;
  shares: number;
}

export interface StockInfo {
  ticker: string;
  name: string;
  sector: string;
  industry: string;
  price: number;
}

export interface HedgeRecommendation {
  market: string;
  marketUrl: string;
  outcome: string;
  probability: number;
  position: "YES" | "NO";
  reasoning: string;
  hedgesAgainst: string;
  suggestedAllocation: number;
  affectedStocks: string[];
  confidence: "high" | "medium";
}

export interface AnalysisResult {
  summary: string;
  recommendations: HedgeRecommendation[];
  stocksWithoutHedges: string[];
  compression: {
    originalTokens: number;
    compressedTokens: number;
    savings: number;
  };
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("portfolio");
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [stockInfo, setStockInfo] = useState<Record<string, StockInfo>>({});
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  );
  const [selectedBet, setSelectedBet] = useState<HedgeRecommendation | null>(
    null,
  );
  const [cachedArticles, setCachedArticles] = useState<NewsArticle[]>([]);

  const handleBetSelect = (bet: HedgeRecommendation | null) => {
    setSelectedBet(bet);
  };

  const handleArticlesUpdate = (articles: NewsArticle[]) => {
    setCachedArticles(articles);
  };

  // Fetch stock data when portfolio changes
  const fetchStockData = useCallback(
    async (tickers: string[]) => {
      if (tickers.length === 0) return;

      const newTickers = tickers.filter((t) => !stockInfo[t]);
      if (newTickers.length === 0) return;

      try {
        const response = await fetch(
          `/api/stocks?tickers=${newTickers.join(",")}`,
        );
        if (response.ok) {
          const data = await response.json();
          const newInfo: Record<string, StockInfo> = {};
          for (const stock of data.stocks) {
            newInfo[stock.ticker] = stock;
          }
          setStockInfo((prev) => ({ ...prev, ...newInfo }));
        }
      } catch (err) {
        console.error("Failed to fetch stock data:", err);
      }
    },
    [stockInfo],
  );

  useEffect(() => {
    const tickers = portfolio.map((p) => p.ticker);
    fetchStockData(tickers);
  }, [portfolio, fetchStockData]);

  // Clear analysis when portfolio changes significantly
  useEffect(() => {
    // Only clear if we have results and portfolio changed
    if (analysisResult) {
      const currentTickers = new Set(portfolio.map((p) => p.ticker));
      const analyzedTickers = new Set(
        analysisResult.recommendations.flatMap((r) => r.affectedStocks),
      );

      // Check if all analyzed stocks are still in portfolio
      const stillValid = [...analyzedTickers].every((t) =>
        currentTickers.has(t),
      );
      if (!stillValid && portfolio.length > 0) {
        // Don't auto-clear, just let user re-analyze
      }
    }
  }, [portfolio, analysisResult]);

  return (
    <div className="min-h-screen bg-[#12161c] flex flex-col">
      {/* Header */}
      <header className="bg-[#12161c] border-b border-[#2d3139]">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center justify-center gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-[#3fb950]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
              <h1 className="text-xl font-bold">
                <span className="text-white">Trade</span>
                <span className="text-[#3fb950]">Off</span>
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-[#12161c] border-b border-[#2d3139] sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex justify-center">
          <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 py-6">
        {activeTab === "portfolio" && (
          <PortfolioView
            portfolio={portfolio}
            setPortfolio={setPortfolio}
            stockInfo={stockInfo}
            setStockInfo={setStockInfo}
          />
        )}
        {activeTab === "hedges" && (
          <HedgeView
            portfolio={portfolio}
            setPortfolio={setPortfolio}
            stockInfo={stockInfo}
            analysisResult={analysisResult}
            setAnalysisResult={setAnalysisResult}
            onGoToNews={() => setActiveTab("news")}
            onBetSelect={handleBetSelect}
          />
        )}
        {activeTab === "risks" && (
          <RiskView
            portfolio={portfolio}
            stockInfo={stockInfo}
            hedges={analysisResult?.recommendations || []}
            onGoToHedges={() => setActiveTab("hedges")}
          />
        )}
        {activeTab === "news" && (
          <NewsView
            portfolio={portfolio}
            stockInfo={stockInfo}
            selectedBet={selectedBet}
            onBetSelect={handleBetSelect}
            cachedArticles={cachedArticles}
            onArticlesUpdate={handleArticlesUpdate}
          />
        )}
        {activeTab === "greeks" && (
          <GreeksView
            recommendations={analysisResult?.recommendations || []}
            stockInfo={stockInfo}
            portfolioValue={
              portfolio.reduce((sum, p) => {
                const info = stockInfo[p.ticker];
                return sum + (info?.price || 0) * p.shares;
              }, 0) || 50000
            }
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2d3139] py-4 px-4 mt-auto">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between text-xs text-[#858687]">
          <span>TradeOff © 2026</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
