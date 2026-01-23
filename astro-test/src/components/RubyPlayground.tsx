import { useState, useEffect, useRef, lazy, Suspense } from 'react';

// Dynamically import Monaco Editor to avoid SSR issues
const Editor = lazy(() => import('@monaco-editor/react').then(mod => ({ default: mod.default })));

interface RubyPlaygroundProps {
  initialCode: string;
  title?: string;
}

export default function RubyPlayground({
  initialCode,
  title = "Ruby Playground"
}: RubyPlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const rubyVMRef = useRef<any>(null);

  // Only run on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const initRuby = async () => {
      try {
        setOutput('Loading Ruby VM (~3MB)...');

        // Import the ruby-head-wasm-wasi package
        const { DefaultRubyVM } = await import('ruby-head-wasm-wasi/dist/browser');

        // Fetch the Ruby WASM binary (bundled with package)
        const response = await fetch(
          'https://cdn.jsdelivr.net/npm/ruby-head-wasm-wasi@2.3.0/dist/ruby+stdlib.wasm'
        );

        const module = await WebAssembly.compileStreaming(response);
        const { vm } = await DefaultRubyVM(module);

        rubyVMRef.current = vm;
        setLoading(false);
        setOutput('Ruby VM ready! Click "Run" to execute code.');
      } catch (err) {
        console.error('Ruby init error:', err);
        setError(`Failed to load Ruby: ${err instanceof Error ? err.message : 'Unknown error'}`);
        setLoading(false);
      }
    };

    initRuby();
  }, [isMounted]);

  const runCode = async () => {
    if (!rubyVMRef.current || running) return;

    setRunning(true);
    setOutput('Running...');
    setError(null);

    try {
      // Capture stdout using StringIO
      const wrappedCode = `
require 'stringio'
$captured_output = StringIO.new
$original_stdout = $stdout
$stdout = $captured_output

begin
${code}
rescue => e
  puts "Error: #{e.class}: #{e.message}"
end

$stdout = $original_stdout
$captured_output.string
`;

      const result = rubyVMRef.current.eval(wrappedCode);
      const outputStr = result?.toString() || '(no output)';
      setOutput(outputStr);
    } catch (err: any) {
      console.error('Ruby eval error:', err);
      const errorMessage = err?.message || err?.toString() || 'Unknown error';
      setError(errorMessage);
      setOutput('');
    } finally {
      setRunning(false);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('Code reset. Click "Run" to execute.');
    setError(null);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setOutput('Code copied to clipboard!');
    } catch {
      setOutput('Failed to copy code');
    }
  };

  // Loading placeholder for SSR
  const EditorPlaceholder = () => (
    <div style={{
      height: '200px',
      background: '#1e1e1e',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#6b7280',
      fontFamily: 'monospace',
    }}>
      Loading editor...
    </div>
  );

  return (
    <div className="ruby-playground">
      <div className="playground-header">
        <span className="title">{title}</span>
        <span className="ruby-badge">Ruby 3.3</span>
      </div>

      <div className="editor-container">
        {isMounted ? (
          <Suspense fallback={<EditorPlaceholder />}>
            <Editor
              height="200px"
              defaultLanguage="ruby"
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 10 },
              }}
            />
          </Suspense>
        ) : (
          <EditorPlaceholder />
        )}
      </div>

      <div className="controls">
        <button
          onClick={runCode}
          disabled={loading || running}
          className="run-btn"
        >
          {loading ? '⏳ Loading...' : running ? '⏳ Running...' : '▶ Run'}
        </button>
        <button onClick={resetCode} className="reset-btn">↺ Reset</button>
        <button onClick={copyCode} className="copy-btn">📋 Copy</button>
      </div>

      <div className="output-container">
        <div className="output-header">Output</div>
        {error ? (
          <pre className="output error">{error}</pre>
        ) : (
          <pre className="output">{output}</pre>
        )}
      </div>

      <style>{`
        .ruby-playground {
          font-family: system-ui, -apple-system, sans-serif;
          max-width: 600px;
          margin: 2rem auto;
          background: #1e1e1e;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .playground-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          background: #2d2d2d;
          border-bottom: 1px solid #3d3d3d;
        }

        .title {
          color: #e2e8f0;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .ruby-badge {
          background: linear-gradient(135deg, #cc342d 0%, #a91401 100%);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .editor-container {
          border-bottom: 1px solid #3d3d3d;
        }

        .controls {
          display: flex;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: #252526;
        }

        .controls button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.15s ease;
        }

        .run-btn {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
          color: white;
        }

        .run-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(72, 187, 120, 0.4);
        }

        .run-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .reset-btn, .copy-btn {
          background: #3d3d3d;
          color: #a0aec0;
        }

        .reset-btn:hover, .copy-btn:hover {
          background: #4d4d4d;
          color: #e2e8f0;
        }

        .output-container {
          background: #0d1117;
        }

        .output-header {
          padding: 0.5rem 1rem;
          font-size: 0.75rem;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid #1f2937;
        }

        .output {
          margin: 0;
          padding: 1rem;
          font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
          font-size: 0.9rem;
          line-height: 1.5;
          color: #e2e8f0;
          white-space: pre-wrap;
          word-break: break-word;
          min-height: 60px;
          max-height: 200px;
          overflow-y: auto;
        }

        .output.error {
          color: #fc8181;
        }
      `}</style>
    </div>
  );
}
