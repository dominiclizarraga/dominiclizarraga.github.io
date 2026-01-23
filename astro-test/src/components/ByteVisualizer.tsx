import { useState } from 'react';

interface ByteVisualizerProps {
  initialByte?: number;
}

export default function ByteVisualizer({ initialByte = 65 }: ByteVisualizerProps) {
  // Convert initial byte to bits array
  const toBits = (num: number): number[] => {
    return Array.from({ length: 8 }, (_, i) => (num >> (7 - i)) & 1);
  };

  const [bits, setBits] = useState<number[]>(toBits(initialByte));

  const toggleBit = (index: number) => {
    const newBits = [...bits];
    newBits[index] = newBits[index] === 0 ? 1 : 0;
    setBits(newBits);
  };

  const decimal = bits.reduce((acc, bit, i) => acc + bit * Math.pow(2, 7 - i), 0);
  const char = decimal >= 32 && decimal <= 126 ? String.fromCharCode(decimal) : '·';
  const hex = decimal.toString(16).toUpperCase().padStart(2, '0');
  const binary = bits.join('');

  return (
    <div className="byte-visualizer">
      <div className="bits-container">
        <div className="bit-labels">
          {[128, 64, 32, 16, 8, 4, 2, 1].map((val, i) => (
            <span key={i} className="bit-label">{val}</span>
          ))}
        </div>
        <div className="bits">
          {bits.map((bit, i) => (
            <button
              key={i}
              onClick={() => toggleBit(i)}
              className={`bit ${bit ? 'on' : 'off'}`}
              aria-label={`Bit ${7 - i}: ${bit}`}
            >
              {bit}
            </button>
          ))}
        </div>
      </div>

      <div className="arrow">↓</div>

      <div className="results">
        <div className="result-row">
          <span className="label">Binary:</span>
          <span className="value mono">0b{binary}</span>
        </div>
        <div className="result-row">
          <span className="label">Decimal:</span>
          <span className="value">{decimal}</span>
        </div>
        <div className="result-row">
          <span className="label">Hex:</span>
          <span className="value mono">0x{hex}</span>
        </div>
        <div className="result-row">
          <span className="label">Character:</span>
          <span className="value character">{char}</span>
        </div>
      </div>

      <style>{`
        .byte-visualizer {
          font-family: system-ui, -apple-system, sans-serif;
          max-width: 400px;
          margin: 2rem auto;
          padding: 1.5rem;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .bits-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }

        .bit-labels {
          display: flex;
          gap: 0.5rem;
        }

        .bit-label {
          width: 40px;
          text-align: center;
          font-size: 0.7rem;
          color: #888;
          font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
        }

        .bits {
          display: flex;
          gap: 0.5rem;
        }

        .bit {
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 8px;
          font-size: 1.25rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.15s ease;
          font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
        }

        .bit.off {
          background: #2d3748;
          color: #718096;
        }

        .bit.on {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .bit:hover {
          transform: scale(1.1);
        }

        .bit:active {
          transform: scale(0.95);
        }

        .arrow {
          text-align: center;
          font-size: 1.5rem;
          color: #667eea;
          margin: 1rem 0;
          animation: bounce 1s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }

        .results {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 1rem;
        }

        .result-row {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .result-row:last-child {
          border-bottom: none;
        }

        .label {
          color: #a0aec0;
          font-size: 0.9rem;
        }

        .value {
          color: #e2e8f0;
          font-weight: 600;
        }

        .value.mono {
          font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
          color: #48bb78;
        }

        .value.character {
          font-size: 1.5rem;
          color: #f6e05e;
        }
      `}</style>
    </div>
  );
}
