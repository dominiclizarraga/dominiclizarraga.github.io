import { useState } from 'react';

const ASCII_CATEGORIES = {
  control: { range: [0, 31], label: 'Control', color: '#6b7280' },
  printable: { range: [32, 126], label: 'Printable', color: '#10b981' },
  extended: { range: [127, 127], label: 'DEL', color: '#ef4444' },
};

function getCharDisplay(code: number): string {
  if (code < 32) {
    const names = ['NUL', 'SOH', 'STX', 'ETX', 'EOT', 'ENQ', 'ACK', 'BEL',
      'BS', 'TAB', 'LF', 'VT', 'FF', 'CR', 'SO', 'SI',
      'DLE', 'DC1', 'DC2', 'DC3', 'DC4', 'NAK', 'SYN', 'ETB',
      'CAN', 'EM', 'SUB', 'ESC', 'FS', 'GS', 'RS', 'US'];
    return names[code];
  }
  if (code === 32) return 'SPC';
  if (code === 127) return 'DEL';
  return String.fromCharCode(code);
}

function getCategory(code: number): string {
  if (code < 32) return 'control';
  if (code === 127) return 'extended';
  return 'printable';
}

interface AsciiTableProps {
  onSelect?: (code: number) => void;
}

export default function AsciiTable({ onSelect }: AsciiTableProps) {
  const [selectedCode, setSelectedCode] = useState<number | null>(65);
  const [filter, setFilter] = useState<string>('all');

  const handleSelect = (code: number) => {
    setSelectedCode(code);
    onSelect?.(code);
  };

  const codes = Array.from({ length: 128 }, (_, i) => i);
  const filteredCodes = filter === 'all'
    ? codes
    : codes.filter(c => getCategory(c) === filter);

  return (
    <div className="ascii-table">
      <div className="controls">
        <div className="filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All (0-127)
          </button>
          <button
            className={filter === 'control' ? 'active' : ''}
            onClick={() => setFilter('control')}
          >
            Control (0-31)
          </button>
          <button
            className={filter === 'printable' ? 'active' : ''}
            onClick={() => setFilter('printable')}
          >
            Printable (32-126)
          </button>
        </div>
      </div>

      {selectedCode !== null && (
        <div className="selected-detail">
          <div className="char-display">
            {getCharDisplay(selectedCode)}
          </div>
          <div className="char-info">
            <div className="info-row">
              <span className="label">Decimal</span>
              <span className="value">{selectedCode}</span>
            </div>
            <div className="info-row">
              <span className="label">Hex</span>
              <span className="value mono">0x{selectedCode.toString(16).toUpperCase().padStart(2, '0')}</span>
            </div>
            <div className="info-row">
              <span className="label">Binary</span>
              <span className="value mono">0b{selectedCode.toString(2).padStart(8, '0')}</span>
            </div>
            <div className="info-row">
              <span className="label">Octal</span>
              <span className="value mono">0o{selectedCode.toString(8).padStart(3, '0')}</span>
            </div>
          </div>
        </div>
      )}

      <div className="table-grid">
        {filteredCodes.map(code => (
          <button
            key={code}
            className={`cell ${getCategory(code)} ${selectedCode === code ? 'selected' : ''}`}
            onClick={() => handleSelect(code)}
            title={`${code}: ${getCharDisplay(code)}`}
          >
            <span className="cell-char">{getCharDisplay(code)}</span>
            <span className="cell-code">{code}</span>
          </button>
        ))}
      </div>

      <div className="legend">
        <span className="legend-item control">
          <span className="dot"></span> Control
        </span>
        <span className="legend-item printable">
          <span className="dot"></span> Printable
        </span>
        <span className="legend-item extended">
          <span className="dot"></span> DEL
        </span>
      </div>

      <style>{`
        .ascii-table {
          font-family: system-ui, -apple-system, sans-serif;
          max-width: 700px;
          margin: 2rem auto;
          background: #1a1a2e;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .controls {
          margin-bottom: 1rem;
        }

        .filters {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .filters button {
          padding: 0.5rem 1rem;
          border: 1px solid #3d3d5c;
          background: transparent;
          color: #a0aec0;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.15s ease;
        }

        .filters button:hover {
          border-color: #667eea;
          color: #e2e8f0;
        }

        .filters button.active {
          background: #667eea;
          border-color: #667eea;
          color: white;
        }

        .selected-detail {
          display: flex;
          gap: 1.5rem;
          padding: 1rem;
          background: rgba(102, 126, 234, 0.1);
          border-radius: 8px;
          margin-bottom: 1rem;
          align-items: center;
        }

        .char-display {
          font-size: 3rem;
          font-weight: bold;
          color: #f6e05e;
          font-family: 'SF Mono', Monaco, monospace;
          min-width: 80px;
          text-align: center;
        }

        .char-info {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 0.25rem 0.5rem;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }

        .info-row .label {
          color: #6b7280;
          font-size: 0.8rem;
        }

        .info-row .value {
          color: #e2e8f0;
          font-weight: 500;
        }

        .info-row .value.mono {
          font-family: 'SF Mono', Monaco, monospace;
          color: #48bb78;
        }

        .table-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
          gap: 4px;
          max-height: 400px;
          overflow-y: auto;
          padding: 4px;
        }

        .cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 0.25rem;
          border: 1px solid transparent;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s ease;
          background: rgba(255, 255, 255, 0.05);
        }

        .cell:hover {
          transform: scale(1.1);
          z-index: 1;
        }

        .cell.selected {
          border-color: #f6e05e;
          box-shadow: 0 0 10px rgba(246, 224, 94, 0.3);
        }

        .cell.control {
          background: rgba(107, 114, 128, 0.2);
        }

        .cell.control:hover {
          background: rgba(107, 114, 128, 0.4);
        }

        .cell.printable {
          background: rgba(16, 185, 129, 0.2);
        }

        .cell.printable:hover {
          background: rgba(16, 185, 129, 0.4);
        }

        .cell.extended {
          background: rgba(239, 68, 68, 0.2);
        }

        .cell.extended:hover {
          background: rgba(239, 68, 68, 0.4);
        }

        .cell-char {
          font-family: 'SF Mono', Monaco, monospace;
          font-size: 0.9rem;
          color: #e2e8f0;
        }

        .cell-code {
          font-size: 0.65rem;
          color: #6b7280;
          margin-top: 2px;
        }

        .legend {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: #a0aec0;
        }

        .legend-item .dot {
          width: 12px;
          height: 12px;
          border-radius: 3px;
        }

        .legend-item.control .dot { background: rgba(107, 114, 128, 0.5); }
        .legend-item.printable .dot { background: rgba(16, 185, 129, 0.5); }
        .legend-item.extended .dot { background: rgba(239, 68, 68, 0.5); }
      `}</style>
    </div>
  );
}
