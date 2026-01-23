import { useState } from 'react';

type Operation = 'AND' | 'OR' | 'XOR' | 'NOT' | 'LEFT' | 'RIGHT';

const OPERATIONS: { key: Operation; symbol: string; label: string }[] = [
  { key: 'AND', symbol: '&', label: 'AND' },
  { key: 'OR', symbol: '|', label: 'OR' },
  { key: 'XOR', symbol: '^', label: 'XOR' },
  { key: 'NOT', symbol: '~', label: 'NOT' },
  { key: 'LEFT', symbol: '<<', label: 'Left Shift' },
  { key: 'RIGHT', symbol: '>>', label: 'Right Shift' },
];

function toBits(num: number): number[] {
  return Array.from({ length: 8 }, (_, i) => (num >> (7 - i)) & 1);
}

function fromBits(bits: number[]): number {
  return bits.reduce((acc, bit, i) => acc + bit * Math.pow(2, 7 - i), 0);
}

export default function BitwiseOperations() {
  const [valueA, setValueA] = useState(0b11001010); // 202
  const [valueB, setValueB] = useState(0b10110101); // 181
  const [operation, setOperation] = useState<Operation>('AND');
  const [shiftAmount, setShiftAmount] = useState(1);

  const bitsA = toBits(valueA);
  const bitsB = toBits(valueB);

  const calculateResult = (): number => {
    switch (operation) {
      case 'AND': return valueA & valueB;
      case 'OR': return valueA | valueB;
      case 'XOR': return valueA ^ valueB;
      case 'NOT': return (~valueA) & 0xFF; // Keep 8 bits
      case 'LEFT': return (valueA << shiftAmount) & 0xFF;
      case 'RIGHT': return valueA >> shiftAmount;
      default: return 0;
    }
  };

  const result = calculateResult();
  const resultBits = toBits(result);

  const toggleBit = (value: number, setter: (v: number) => void, index: number) => {
    const bits = toBits(value);
    bits[index] = bits[index] === 0 ? 1 : 0;
    setter(fromBits(bits));
  };

  const getExplanation = (): string => {
    switch (operation) {
      case 'AND': return 'Result is 1 only when BOTH bits are 1';
      case 'OR': return 'Result is 1 when EITHER bit is 1';
      case 'XOR': return 'Result is 1 when bits are DIFFERENT';
      case 'NOT': return 'Flips every bit (0→1, 1→0)';
      case 'LEFT': return `Shifts bits left, multiplying by 2^${shiftAmount}`;
      case 'RIGHT': return `Shifts bits right, dividing by 2^${shiftAmount}`;
      default: return '';
    }
  };

  const isUnary = operation === 'NOT' || operation === 'LEFT' || operation === 'RIGHT';

  return (
    <div className="bitwise-ops">
      <div className="operation-selector">
        {OPERATIONS.map(op => (
          <button
            key={op.key}
            className={operation === op.key ? 'active' : ''}
            onClick={() => setOperation(op.key)}
          >
            <span className="op-symbol">{op.symbol}</span>
            <span className="op-label">{op.label}</span>
          </button>
        ))}
      </div>

      {(operation === 'LEFT' || operation === 'RIGHT') && (
        <div className="shift-control">
          <label>Shift by:</label>
          <input
            type="range"
            min="1"
            max="7"
            value={shiftAmount}
            onChange={(e) => setShiftAmount(parseInt(e.target.value))}
          />
          <span className="shift-value">{shiftAmount}</span>
        </div>
      )}

      <div className="explanation">{getExplanation()}</div>

      <div className="calculation">
        {/* Value A */}
        <div className="operand">
          <div className="operand-label">A = {valueA}</div>
          <div className="bits-row">
            {bitsA.map((bit, i) => (
              <button
                key={i}
                className={`bit ${bit ? 'on' : 'off'}`}
                onClick={() => toggleBit(valueA, setValueA, i)}
              >
                {bit}
              </button>
            ))}
          </div>
        </div>

        {/* Operation symbol */}
        <div className="operator">
          {OPERATIONS.find(o => o.key === operation)?.symbol}
          {(operation === 'LEFT' || operation === 'RIGHT') && ` ${shiftAmount}`}
        </div>

        {/* Value B (only for binary operations) */}
        {!isUnary && (
          <div className="operand">
            <div className="operand-label">B = {valueB}</div>
            <div className="bits-row">
              {bitsB.map((bit, i) => (
                <button
                  key={i}
                  className={`bit ${bit ? 'on' : 'off'}`}
                  onClick={() => toggleBit(valueB, setValueB, i)}
                >
                  {bit}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Equals */}
        <div className="equals">=</div>

        {/* Result */}
        <div className="operand result">
          <div className="operand-label">Result = {result}</div>
          <div className="bits-row">
            {resultBits.map((bit, i) => {
              // Highlight bits that changed or are significant
              let highlight = '';
              if (operation === 'AND' && bit === 1) highlight = 'highlight-and';
              if (operation === 'OR' && bit === 1) highlight = 'highlight-or';
              if (operation === 'XOR' && bit === 1) highlight = 'highlight-xor';
              if (operation === 'NOT') highlight = bit !== bitsA[i] ? 'highlight-not' : '';

              return (
                <span key={i} className={`bit result-bit ${bit ? 'on' : 'off'} ${highlight}`}>
                  {bit}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="code-example">
        <div className="code-header">Ruby</div>
        <pre className="code">
{operation === 'NOT'
  ? `a = 0b${valueA.toString(2).padStart(8, '0')}  # ${valueA}
~a & 0xFF  # => ${result} (0b${result.toString(2).padStart(8, '0')})`
  : operation === 'LEFT' || operation === 'RIGHT'
  ? `a = 0b${valueA.toString(2).padStart(8, '0')}  # ${valueA}
a ${operation === 'LEFT' ? '<<' : '>>'} ${shiftAmount}  # => ${result} (0b${result.toString(2).padStart(8, '0')})`
  : `a = 0b${valueA.toString(2).padStart(8, '0')}  # ${valueA}
b = 0b${valueB.toString(2).padStart(8, '0')}  # ${valueB}
a ${OPERATIONS.find(o => o.key === operation)?.symbol} b  # => ${result} (0b${result.toString(2).padStart(8, '0')})`}
        </pre>
      </div>

      <style>{`
        .bitwise-ops {
          font-family: system-ui, -apple-system, sans-serif;
          max-width: 600px;
          margin: 2rem auto;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .operation-selector {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .operation-selector button {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.75rem;
          border: 1px solid #3d3d5c;
          background: transparent;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .operation-selector button:hover {
          border-color: #667eea;
        }

        .operation-selector button.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: transparent;
        }

        .op-symbol {
          font-family: 'SF Mono', Monaco, monospace;
          font-size: 1.25rem;
          color: #f6e05e;
        }

        .op-label {
          font-size: 0.75rem;
          color: #a0aec0;
          margin-top: 0.25rem;
        }

        .operation-selector button.active .op-label {
          color: white;
        }

        .shift-control {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          padding: 0.75rem;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 8px;
        }

        .shift-control label {
          color: #a0aec0;
          font-size: 0.9rem;
        }

        .shift-control input[type="range"] {
          flex: 1;
        }

        .shift-value {
          font-family: 'SF Mono', Monaco, monospace;
          color: #f6e05e;
          font-size: 1.25rem;
          min-width: 20px;
        }

        .explanation {
          text-align: center;
          color: #a0aec0;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
          padding: 0.5rem;
          background: rgba(102, 126, 234, 0.1);
          border-radius: 6px;
        }

        .calculation {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .operand {
          width: 100%;
        }

        .operand-label {
          text-align: center;
          color: #6b7280;
          font-size: 0.85rem;
          margin-bottom: 0.5rem;
        }

        .bits-row {
          display: flex;
          justify-content: center;
          gap: 4px;
        }

        .bit {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 6px;
          font-family: 'SF Mono', Monaco, monospace;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .bit.off {
          background: #2d3748;
          color: #718096;
        }

        .bit.on {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .bit:hover:not(.result-bit) {
          transform: scale(1.1);
        }

        .result-bit {
          cursor: default;
        }

        .result-bit.highlight-and { box-shadow: 0 0 10px rgba(16, 185, 129, 0.6); }
        .result-bit.highlight-or { box-shadow: 0 0 10px rgba(59, 130, 246, 0.6); }
        .result-bit.highlight-xor { box-shadow: 0 0 10px rgba(245, 158, 11, 0.6); }
        .result-bit.highlight-not { box-shadow: 0 0 10px rgba(239, 68, 68, 0.6); }

        .operator, .equals {
          font-family: 'SF Mono', Monaco, monospace;
          font-size: 1.5rem;
          color: #f6e05e;
          padding: 0.5rem 0;
        }

        .operand.result .operand-label {
          color: #48bb78;
          font-weight: 600;
        }

        .code-example {
          margin-top: 1.5rem;
          background: #0d1117;
          border-radius: 8px;
          overflow: hidden;
        }

        .code-header {
          padding: 0.5rem 1rem;
          background: #161b22;
          color: #6b7280;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .code {
          margin: 0;
          padding: 1rem;
          font-family: 'SF Mono', Monaco, monospace;
          font-size: 0.85rem;
          color: #e2e8f0;
          line-height: 1.6;
          overflow-x: auto;
        }
      `}</style>
    </div>
  );
}
