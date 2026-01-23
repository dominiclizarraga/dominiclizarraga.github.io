import { useState } from 'react';

interface ByteInfo {
  value: number;
  binary: string;
  hex: string;
  role: 'lead' | 'continuation' | 'ascii';
  dataBits: string;
}

function encodeUtf8(codePoint: number): ByteInfo[] {
  if (codePoint < 0x80) {
    // 1-byte ASCII
    const binary = codePoint.toString(2).padStart(8, '0');
    return [{
      value: codePoint,
      binary,
      hex: codePoint.toString(16).toUpperCase().padStart(2, '0'),
      role: 'ascii',
      dataBits: binary.slice(1), // 7 data bits
    }];
  } else if (codePoint < 0x800) {
    // 2-byte sequence
    const byte1 = 0xC0 | (codePoint >> 6);
    const byte2 = 0x80 | (codePoint & 0x3F);
    return [
      {
        value: byte1,
        binary: byte1.toString(2).padStart(8, '0'),
        hex: byte1.toString(16).toUpperCase().padStart(2, '0'),
        role: 'lead',
        dataBits: byte1.toString(2).padStart(8, '0').slice(3), // 5 data bits
      },
      {
        value: byte2,
        binary: byte2.toString(2).padStart(8, '0'),
        hex: byte2.toString(16).toUpperCase().padStart(2, '0'),
        role: 'continuation',
        dataBits: byte2.toString(2).padStart(8, '0').slice(2), // 6 data bits
      },
    ];
  } else if (codePoint < 0x10000) {
    // 3-byte sequence
    const byte1 = 0xE0 | (codePoint >> 12);
    const byte2 = 0x80 | ((codePoint >> 6) & 0x3F);
    const byte3 = 0x80 | (codePoint & 0x3F);
    return [
      {
        value: byte1,
        binary: byte1.toString(2).padStart(8, '0'),
        hex: byte1.toString(16).toUpperCase().padStart(2, '0'),
        role: 'lead',
        dataBits: byte1.toString(2).padStart(8, '0').slice(4), // 4 data bits
      },
      {
        value: byte2,
        binary: byte2.toString(2).padStart(8, '0'),
        hex: byte2.toString(16).toUpperCase().padStart(2, '0'),
        role: 'continuation',
        dataBits: byte2.toString(2).padStart(8, '0').slice(2), // 6 data bits
      },
      {
        value: byte3,
        binary: byte3.toString(2).padStart(8, '0'),
        hex: byte3.toString(16).toUpperCase().padStart(2, '0'),
        role: 'continuation',
        dataBits: byte3.toString(2).padStart(8, '0').slice(2), // 6 data bits
      },
    ];
  } else {
    // 4-byte sequence
    const byte1 = 0xF0 | (codePoint >> 18);
    const byte2 = 0x80 | ((codePoint >> 12) & 0x3F);
    const byte3 = 0x80 | ((codePoint >> 6) & 0x3F);
    const byte4 = 0x80 | (codePoint & 0x3F);
    return [
      {
        value: byte1,
        binary: byte1.toString(2).padStart(8, '0'),
        hex: byte1.toString(16).toUpperCase().padStart(2, '0'),
        role: 'lead',
        dataBits: byte1.toString(2).padStart(8, '0').slice(5), // 3 data bits
      },
      {
        value: byte2,
        binary: byte2.toString(2).padStart(8, '0'),
        hex: byte2.toString(16).toUpperCase().padStart(2, '0'),
        role: 'continuation',
        dataBits: byte2.toString(2).padStart(8, '0').slice(2),
      },
      {
        value: byte3,
        binary: byte3.toString(2).padStart(8, '0'),
        hex: byte3.toString(16).toUpperCase().padStart(2, '0'),
        role: 'continuation',
        dataBits: byte3.toString(2).padStart(8, '0').slice(2),
      },
      {
        value: byte4,
        binary: byte4.toString(2).padStart(8, '0'),
        hex: byte4.toString(16).toUpperCase().padStart(2, '0'),
        role: 'continuation',
        dataBits: byte4.toString(2).padStart(8, '0').slice(2),
      },
    ];
  }
}

const EXAMPLE_CHARS = [
  { char: 'A', label: 'ASCII (1 byte)' },
  { char: 'é', label: 'Latin (2 bytes)' },
  { char: '中', label: 'CJK (3 bytes)' },
  { char: '🎉', label: 'Emoji (4 bytes)' },
];

export default function Utf8Visualizer() {
  const [inputChar, setInputChar] = useState('A');

  const codePoint = inputChar.codePointAt(0) || 0;
  const bytes = encodeUtf8(codePoint);

  const getPatternInfo = (numBytes: number) => {
    switch (numBytes) {
      case 1: return { pattern: '0xxxxxxx', description: 'Single byte ASCII' };
      case 2: return { pattern: '110xxxxx 10xxxxxx', description: '2-byte sequence: 11 data bits' };
      case 3: return { pattern: '1110xxxx 10xxxxxx 10xxxxxx', description: '3-byte sequence: 16 data bits' };
      case 4: return { pattern: '11110xxx 10xxxxxx 10xxxxxx 10xxxxxx', description: '4-byte sequence: 21 data bits' };
      default: return { pattern: '', description: '' };
    }
  };

  const patternInfo = getPatternInfo(bytes.length);

  return (
    <div className="utf8-viz">
      <div className="input-section">
        <input
          type="text"
          value={inputChar}
          onChange={(e) => setInputChar(e.target.value.slice(-1) || 'A')}
          maxLength={2}
          className="char-input"
        />
        <div className="quick-examples">
          {EXAMPLE_CHARS.map(({ char, label }) => (
            <button
              key={char}
              onClick={() => setInputChar(char)}
              className={inputChar === char ? 'active' : ''}
              title={label}
            >
              {char}
            </button>
          ))}
        </div>
      </div>

      <div className="char-info">
        <div className="info-card">
          <span className="label">Character</span>
          <span className="value char">{inputChar}</span>
        </div>
        <div className="info-card">
          <span className="label">Code Point</span>
          <span className="value">U+{codePoint.toString(16).toUpperCase().padStart(4, '0')}</span>
        </div>
        <div className="info-card">
          <span className="label">Decimal</span>
          <span className="value">{codePoint}</span>
        </div>
        <div className="info-card">
          <span className="label">Bytes</span>
          <span className="value">{bytes.length}</span>
        </div>
      </div>

      <div className="pattern-info">
        <div className="pattern">{patternInfo.pattern}</div>
        <div className="description">{patternInfo.description}</div>
      </div>

      <div className="bytes-visualization">
        {bytes.map((byte, i) => (
          <div key={i} className={`byte-card ${byte.role}`}>
            <div className="byte-header">
              Byte {i + 1}
              <span className="role-badge">{byte.role}</span>
            </div>
            <div className="byte-binary">
              {byte.binary.split('').map((bit, j) => {
                const isPrefix = byte.role === 'ascii' ? j === 0
                  : byte.role === 'lead' ? j < (bytes.length + 1)
                  : j < 2;
                return (
                  <span
                    key={j}
                    className={`bit ${isPrefix ? 'prefix' : 'data'}`}
                  >
                    {bit}
                  </span>
                );
              })}
            </div>
            <div className="byte-values">
              <span className="hex">0x{byte.hex}</span>
              <span className="decimal">{byte.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="data-extraction">
        <div className="extraction-header">Data bits extracted:</div>
        <div className="data-bits">
          {bytes.map((byte, i) => (
            <span key={i} className="data-segment">
              {byte.dataBits}
            </span>
          ))}
        </div>
        <div className="extraction-result">
          = {codePoint.toString(2)} = {codePoint} = U+{codePoint.toString(16).toUpperCase().padStart(4, '0')}
        </div>
      </div>

      <style>{`
        .utf8-viz {
          font-family: system-ui, -apple-system, sans-serif;
          max-width: 650px;
          margin: 2rem auto;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .input-section {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .char-input {
          width: 80px;
          height: 80px;
          font-size: 3rem;
          text-align: center;
          border: 2px solid #3d3d5c;
          border-radius: 12px;
          background: rgba(0, 0, 0, 0.3);
          color: #f6e05e;
          font-family: 'SF Mono', Monaco, monospace;
        }

        .char-input:focus {
          outline: none;
          border-color: #667eea;
        }

        .quick-examples {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .quick-examples button {
          width: 50px;
          height: 50px;
          font-size: 1.5rem;
          border: 1px solid #3d3d5c;
          background: transparent;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .quick-examples button:hover {
          border-color: #667eea;
          transform: scale(1.05);
        }

        .quick-examples button.active {
          background: #667eea;
          border-color: #667eea;
        }

        .char-info {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .info-card {
          background: rgba(0, 0, 0, 0.2);
          padding: 0.75rem;
          border-radius: 8px;
          text-align: center;
        }

        .info-card .label {
          display: block;
          font-size: 0.7rem;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        .info-card .value {
          font-family: 'SF Mono', Monaco, monospace;
          font-size: 1rem;
          color: #e2e8f0;
        }

        .info-card .value.char {
          font-size: 1.5rem;
          color: #f6e05e;
        }

        .pattern-info {
          text-align: center;
          padding: 1rem;
          background: rgba(102, 126, 234, 0.1);
          border-radius: 8px;
          margin-bottom: 1.5rem;
        }

        .pattern {
          font-family: 'SF Mono', Monaco, monospace;
          font-size: 1rem;
          color: #48bb78;
          margin-bottom: 0.5rem;
        }

        .description {
          font-size: 0.85rem;
          color: #a0aec0;
        }

        .bytes-visualization {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }

        .byte-card {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          padding: 1rem;
          min-width: 140px;
          border: 1px solid transparent;
        }

        .byte-card.ascii { border-color: #48bb78; }
        .byte-card.lead { border-color: #f59e0b; }
        .byte-card.continuation { border-color: #3b82f6; }

        .byte-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          color: #6b7280;
          margin-bottom: 0.75rem;
        }

        .role-badge {
          font-size: 0.65rem;
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .byte-card.ascii .role-badge { background: rgba(72, 187, 120, 0.3); color: #48bb78; }
        .byte-card.lead .role-badge { background: rgba(245, 158, 11, 0.3); color: #f59e0b; }
        .byte-card.continuation .role-badge { background: rgba(59, 130, 246, 0.3); color: #3b82f6; }

        .byte-binary {
          display: flex;
          gap: 2px;
          justify-content: center;
          margin-bottom: 0.75rem;
        }

        .byte-binary .bit {
          width: 14px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'SF Mono', Monaco, monospace;
          font-size: 0.8rem;
          border-radius: 3px;
        }

        .byte-binary .bit.prefix {
          background: rgba(107, 114, 128, 0.3);
          color: #6b7280;
        }

        .byte-binary .bit.data {
          background: rgba(102, 126, 234, 0.3);
          color: #a5b4fc;
        }

        .byte-values {
          display: flex;
          justify-content: space-around;
          font-family: 'SF Mono', Monaco, monospace;
          font-size: 0.85rem;
        }

        .byte-values .hex { color: #48bb78; }
        .byte-values .decimal { color: #a0aec0; }

        .data-extraction {
          background: rgba(0, 0, 0, 0.2);
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
        }

        .extraction-header {
          font-size: 0.8rem;
          color: #6b7280;
          margin-bottom: 0.5rem;
        }

        .data-bits {
          display: flex;
          justify-content: center;
          gap: 4px;
          margin-bottom: 0.5rem;
        }

        .data-segment {
          font-family: 'SF Mono', Monaco, monospace;
          padding: 0.25rem 0.5rem;
          background: rgba(102, 126, 234, 0.2);
          border-radius: 4px;
          color: #a5b4fc;
        }

        .extraction-result {
          font-family: 'SF Mono', Monaco, monospace;
          color: #48bb78;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}
