import { useMemo, useState } from "react";

/**
 * Eco Clicker – Re-designed for a modern, box-less, nature-inspired look.
 */

// --- Levels (keep data separate for testability) ---
export const LEVELS = [
  { name: "Seed", clicks: 0 },
  { name: "Sprout", clicks: 5 },
  { name: "Sapling", clicks: 10 },
  { name: "Young Tree", clicks: 20 },
  { name: "Growing Tree", clicks: 30 },
  { name: "Mature Tree", clicks: 40 },
  { name: "Tall Tree", clicks: 55 },
  { name: "Old Tree", clicks: 70 },
  { name: "Ancient Tree", clicks: 90 },
  { name: "Legendary Tree", clicks: 120 },
];

export function getCurrentLevel(clicks) {
  let level = LEVELS[0];
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (clicks >= LEVELS[i].clicks) {
      level = LEVELS[i];
      break;
    }
  }
  return level;
}

// --- Component ---
export default function EcoClicker() {
  const [clicks, setClicks] = useState(0);

  const currentLevel = useMemo(() => getCurrentLevel(clicks), [clicks]);
  const maxClicks = LEVELS[LEVELS.length - 1].clicks;
  const progress = Math.min(Math.max(clicks / maxClicks, 0), 1);

  // SVG layout
  const VIEW_W = 120;
  const VIEW_H = 160;
  const groundY = 140;

  // Trunk growth
  const trunkMin = 18;
  const trunkMax = 100;
  const trunkH = trunkMin + (trunkMax - trunkMin) * progress;
  const trunkY = groundY - trunkH;
  const trunkX = VIEW_W / 2 - 4;

  // Canopy growth
  const canopyR = 10 + 30 * progress;
  const canopyCY = trunkY - (6 + 14 * progress);

  const handleGrow = () => setClicks((c) => c + 1);
  const handleReset = () => setClicks(0);

  return (
    <div className="amazing-eco-container">
      {/* Inline CSS for the amazing design */}
      <style>{AMAZING_CSS_TEXT}</style>

      <header className="amazing-header">
        <h1 className="amazing-title">Eco Growth</h1>
        <p className="amazing-subtitle">Grow your tree from a Seed to a Legendary Tree in {maxClicks} clicks.</p>
        <div className="amazing-stage-badge">
          {currentLevel.name}
        </div>
      </header>

      <main className="amazing-main-area">
        {/* The main Tree Clicker area */}
        <button onClick={handleGrow} className="amazing-tree-button" aria-label="Grow the tree">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="amazing-tree-svg"
            role="img"
            aria-label={`Tree graphic at ${Math.round(progress * 100)}% growth`}
          >
            <defs>
              <linearGradient id="sky-re" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopOpacity="1" stopColor="#87ceeb" /> {/* Brighter Blue Sky */}
                <stop offset="100%" stopOpacity="1" stopColor="#e0f7fa" /> {/* Pale, near-white base */}
              </linearGradient>
              <linearGradient id="leaf-re" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#38a169" /> {/* Darker top green */}
                <stop offset="100%" stopColor="#48bb78" /> {/* Lighter bottom green */}
              </linearGradient>
            </defs>

            {/* Background and Sun - Now inside the viewBox for a contained scene */}
            <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="url(#sky-re)" rx="8" />
            <circle cx={20 + 20 * (1 - progress)} cy={20} r={8} fill="#ffeb3b" opacity={1} /> {/* Sun */}

            {/* Ground (less intrusive) */}
            <rect x="0" y={groundY} width={VIEW_W} height={VIEW_H - groundY} fill="#689f38" />

            {/* Tree components */}
            <rect x={trunkX} y={trunkY} width={8} height={trunkH} fill="#795548" rx={2} />
            <circle cx={VIEW_W / 2} cy={canopyCY} r={canopyR} fill="url(#leaf-re)" />
            <circle cx={VIEW_W / 2 - 18} cy={canopyCY + 8} r={canopyR * 0.7} fill="url(#leaf-re)" />
            <circle cx={VIEW_W / 2 + 18} cy={canopyCY + 10} r={canopyR * 0.65} fill="url(#leaf-re)" />

            {/* Click to grow overlay */}
            {clicks === 0 && (
              <text x={VIEW_W / 2} y={VIEW_H / 2} textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">
                Click to Grow!
              </text>
            )}

          </svg>
        </button>

        {/* Progress Bar and Stats */}
        <div className="amazing-stats-area">
          <div className="amazing-progress">
            <div className="amazing-progress-bar">
              <div className="amazing-progress-fill" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>
          <div className="amazing-progress-info">
            <span className="amazing-clicks">{clicks} click{clicks === 1 ? "" : "s"}</span>
            <span className="amazing-percent">{Math.round(progress * 100)}% to Legendary</span>
          </div>
        </div>

      </main>

      {/* Controls and Levels */}
      <footer className="amazing-footer">
        <div className="amazing-actions">
          <button onClick={handleGrow} className="amazing-grow">
            <span role="img" aria-label="Sprout emoji">🌱</span> Grow +1
          </button>
          <button onClick={handleReset} className="amazing-reset">
            <span role="img" aria-label="Reset emoji">🔄</span> Reset
          </button>
        </div>

        <div className="amazing-levels-guide">
          <h2>Growth Levels</h2>
          <ul className="amazing-list">
            {LEVELS.map((lvl) => (
              <li key={lvl.name} className={lvl.clicks <= clicks ? 'current-level' : ''}>
                {lvl.name}: {lvl.clicks} clicks
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
}

// --- Re-designed CSS for an "Amazing" look (previously EcoClicker.css) ---
const AMAZING_CSS_TEXT = `
:root { color-scheme: light; }
body { margin: 0; }
.amazing-eco-container {
  max-width: 900px;
  width: 100%;
  padding: 30px 20px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Soft, nature-inspired background gradient across the whole page */
  background: linear-gradient(to bottom, #e8f5e9 0%, #c8e6c9 100%);
  color: #388e3c;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

/* Header/Title Area */
.amazing-header {
  text-align: center;
  margin-bottom: 25px;
  width: 100%;
}
.amazing-title {
  font-size: 3rem;
  font-weight: 900;
  color: #1b5e20; /* Deep green */
  margin: 0;
  letter-spacing: -1px;
}
.amazing-subtitle {
  font-size: 1.1rem;
  color: #388e3c;
  margin: 5px 0 15px;
}
.amazing-stage-badge {
  display: inline-block;
  background: #a5d6a7; /* Light green badge background */
  color: #1b5e20;
  font-size: 1rem;
  padding: 8px 15px;
  border-radius: 999px;
  font-weight: 700;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border: 2px solid #66bb6a;
}

/* Main Tree Area */
.amazing-main-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(100%, 400px);
  padding: 20px;
  background: rgba(255, 255, 255, 0.7); /* Subtle white transparency */
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.amazing-tree-button {
  width: 100%;
  border: none;
  background: none;
  padding: 0;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.15s ease-out, box-shadow 0.15s ease-out;
  aspect-ratio: 5/4;
  box-shadow: 0 5px 15px rgba(0, 50, 0, 0.2); /* Shadow that gives depth */
}
.amazing-tree-button:hover {
  box-shadow: 0 8px 20px rgba(0, 50, 0, 0.3);
}
.amazing-tree-button:active {
  transform: scale(0.98);
  box-shadow: 0 2px 10px rgba(0, 50, 0, 0.2);
}
.amazing-tree-svg {
  width: 100%;
  display: block;
}

/* Progress and Stats */
.amazing-stats-area {
  width: 100%;
  margin-top: 20px;
  padding: 0 10px;
}
.amazing-progress {
  height: 12px;
  background: #c8e6c9; /* Lighter track */
  border-radius: 999px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
}
.amazing-progress-bar {
  height: 100%;
  background: #a5d6a7;
  border-radius: 999px;
  overflow: hidden;
}
.amazing-progress-fill {
  height: 100%;
  background: linear-gradient(to right, #4caf50, #66bb6a); /* Gradient fill */
  transition: width 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}
.amazing-progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #388e3c;
  margin-top: 8px;
  font-weight: 500;
}
.amazing-clicks { font-weight: 700; color: #1b5e20; }

/* Footer/Controls Area */
.amazing-footer {
  width: min(100%, 900px);
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: flex-start;
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #c8e6c9; /* Subtle divider */
}
@media (max-width: 600px) {
  .amazing-footer { flex-direction: column; align-items: stretch; }
}

.amazing-actions {
  display: flex;
  gap: 15px;
  flex-grow: 1;
  max-width: 300px;
}
.amazing-grow, .amazing-reset {
  flex: 1;
  border: none;
  padding: 12px 20px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.1s, background 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.amazing-grow {
  background: #4caf50; /* Primary Green */
  color: #fff;
}
.amazing-grow:hover { background: #388e3c; }
.amazing-reset {
  background: #fff;
  border: 1px solid #a5d6a7;
  color: #388e3c;
}
.amazing-reset:hover { background: #f1f8e9; }
.amazing-grow:active, .amazing-reset:active { transform: scale(0.96); box-shadow: 0 2px 4px rgba(0,0,0,0.1); }

.amazing-levels-guide {
  flex-grow: 1;
}
.amazing-levels-guide h2 {
  font-size: 1.4rem;
  color: #1b5e20;
  margin: 0 0 10px;
}
.amazing-list {
  font-size: 1rem;
  color: #388e3c;
  margin: 0;
  padding-left: 20px;
  line-height: 1.6;
}
.amazing-list li {
  margin-bottom: 2px;
  list-style-type: '🌿 '; /* Custom bullet point */
  padding-left: 5px;
  transition: color 0.3s;
}
.amazing-list .current-level {
  font-weight: 700;
  color: #1b5e20;
  list-style-type: '🌳 '; /* Different bullet for current level */
}
`;