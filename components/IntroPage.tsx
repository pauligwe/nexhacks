"use client";

import { Card, CardContent } from "@/components/ui/card";

interface IntroPageProps {
  onGetStarted: () => void;
}

export function IntroPage({ onGetStarted }: IntroPageProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Welcome to TradeOff</h2>
        <p className="text-[#858687]">
          Bridge your stock portfolio with prediction markets to hedge risk and
          amplify your edge.
        </p>
      </div>

      {/* Value Props */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-[#1c2026] border-[#2d3139]">
          <CardContent className="p-5">
            <div className="w-10 h-10 rounded-lg bg-[rgba(63,185,80,0.15)] flex items-center justify-center mb-3">
              <svg
                className="w-5 h-5 text-[#3fb950]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-medium text-white mb-2">Hedge Your Risk</h3>
            <p className="text-sm text-[#858687]">
              Own NVDA? Bet on &quot;AI regulation passes&quot; to protect
              against downside. If regulation hurts your stock, your bet pays
              out.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#1c2026] border-[#2d3139]">
          <CardContent className="p-5">
            <div className="w-10 h-10 rounded-lg bg-[rgba(63,185,80,0.15)] flex items-center justify-center mb-3">
              <svg
                className="w-5 h-5 text-[#3fb950]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <h3 className="font-medium text-white mb-2">Real-Time Markets</h3>
            <p className="text-sm text-[#858687]">
              Prediction markets price events 24/7. No waiting for earnings
              calls—trade on news as it happens.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#1c2026] border-[#2d3139]">
          <CardContent className="p-5">
            <div className="w-10 h-10 rounded-lg bg-[rgba(63,185,80,0.15)] flex items-center justify-center mb-3">
              <svg
                className="w-5 h-5 text-[#3fb950]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-medium text-white mb-2">Asymmetric Returns</h3>
            <p className="text-sm text-[#858687]">
              Binary outcomes mean you know your max loss upfront. Risk $50 to
              make $200 if you&apos;re right.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Stocks vs Prediction Markets */}
      <Card className="bg-[#1c2026] border-[#2d3139]">
        <CardContent className="p-5">
          <h3 className="font-medium text-white mb-4">
            Stocks vs Prediction Markets
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-[#858687] mb-3">
                <span className="text-white font-medium">Stocks</span> are
                ownership. You&apos;re betting the company grows. But what if an
                event tanks the whole sector?
              </p>
              <p className="text-sm text-[#858687]">
                <span className="text-white font-medium">
                  Prediction markets
                </span>{" "}
                let you bet on the events themselves. Decouple your portfolio
                from any single outcome.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#3fb950] flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-3 h-3 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-sm text-[#858687]">
                  <span className="text-white">No leverage risk</span>—you
                  can&apos;t lose more than your bet
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#3fb950] flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-3 h-3 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-sm text-[#858687]">
                  <span className="text-white">Clear resolution</span>—markets
                  settle at $1 or $0
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#3fb950] flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-3 h-3 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-sm text-[#858687]">
                  <span className="text-white">Trade your thesis</span>—bet on
                  what you actually believe
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card className="bg-[#1c2026] border-[#2d3139]">
        <CardContent className="p-5">
          <h3 className="font-medium text-white mb-4">How It Works</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-8 h-8 rounded-full bg-[#252932] flex items-center justify-center mx-auto mb-2 text-sm font-medium text-white">
                1
              </div>
              <p className="text-sm text-[#858687]">
                Upload your portfolio or connect your brokerage
              </p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 rounded-full bg-[#252932] flex items-center justify-center mx-auto mb-2 text-sm font-medium text-white">
                2
              </div>
              <p className="text-sm text-[#858687]">
                We analyze your holdings and find relevant prediction markets
              </p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 rounded-full bg-[#252932] flex items-center justify-center mx-auto mb-2 text-sm font-medium text-white">
                3
              </div>
              <p className="text-sm text-[#858687]">
                Get personalized hedge recommendations with risk analysis
              </p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 rounded-full bg-[#252932] flex items-center justify-center mx-auto mb-2 text-sm font-medium text-white">
                4
              </div>
              <p className="text-sm text-[#858687]">
                Execute bets on Polymarket to protect your portfolio
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="flex justify-center pt-4">
        <button
          onClick={onGetStarted}
          className="px-6 py-3 bg-[#3fb950] hover:bg-[#4ac95f] text-white font-medium rounded-lg transition-colors"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
