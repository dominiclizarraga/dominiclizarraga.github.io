# Astro Test: Bytes Animation + Runnable Ruby Code

## Goal

Build a single-page proof of concept before migrating the full site.

**Test page:** Interactive visualization of how bytes work + runnable Ruby playground
**Inspiration:** PlanetScale blog - visual explanations with interactive elements
**New requirement:** Embed runnable Ruby code that users can edit and execute
**Outcome:** Decide if Astro is worth the migration

---

## What We'll Build

### The Animation: "How Bytes Work"

A visual explainer showing:

1. **Bit visualization** - 8 boxes that toggle 0/1 on click
2. **Binary to decimal** - Live conversion as bits change
3. **Character encoding** - Show the ASCII/UTF-8 character for the byte
4. **Animation flow:**
   ```
   ┌───┬───┬───┬───┬───┬───┬───┬───┐
   │ 0 │ 1 │ 0 │ 0 │ 0 │ 0 │ 0 │ 1 │  ← Click to toggle
   └───┴───┴───┴───┴───┴───┴───┴───┘
            ↓
       Decimal: 65
            ↓
       Character: A
   ```

### Interactive Features

- [ ] Click any bit to toggle 0 ↔ 1
- [ ] See decimal value update in real-time
- [ ] See ASCII character change
- [ ] Maybe: animate the "calculation" flowing down

### Runnable Ruby Code Feature

**Goal:** Let readers run and edit Ruby code directly in the blog post

**Options to test:**

1. **ruby.wasm (Preferred)**
   - Official Ruby compiled to WebAssembly
   - Runs Ruby 3.2+ in the browser
   - No server needed
   - Package: `@ruby/wasm-wasi`

2. **Code editor component**
   - Monaco Editor (VS Code's editor)
   - CodeMirror 6 (lighter weight)
   - Simple textarea (minimal approach)

**Example use case:**
```ruby
# Readers can edit and run this
byte = 0b01000001  # Binary literal
puts "Decimal: #{byte}"
puts "Character: #{byte.chr}"
puts "Hex: 0x#{byte.to_s(16)}"
```

**Features to implement:**
- [ ] Syntax highlighting for Ruby
- [ ] "Run" button to execute code
- [ ] Output display area
- [ ] Reset to original code button
- [ ] Copy code button
- [ ] Handle errors gracefully

---

## Project Structure

```
astro-test/
├── src/
│   ├── pages/
│   │   └── index.astro          # The test page
│   ├── components/
│   │   ├── ByteVisualizer.jsx   # React component with animation
│   │   └── RubyPlayground.jsx   # Runnable Ruby code editor
│   ├── lib/
│   │   └── ruby-runner.js       # ruby.wasm initialization
│   └── styles/
│       └── global.css           # Basic styling
├── astro.config.mjs
└── package.json
```

---

## Steps for Tomorrow

### 1. Setup (20 min)

```bash
# Create new Astro project
npm create astro@latest astro-test

# Add React support
cd astro-test
npx astro add react

# Install ruby.wasm
npm install @ruby/wasm-wasi

# Install code editor (choose one)
npm install @monaco-editor/react  # OR
npm install @uiw/react-codemirror @codemirror/lang-javascript

# Start dev server
npm run dev
```

### 2. Build the Components (2-3 hours)

**A. Create `ByteVisualizer.jsx`:**
- 8 bit boxes (clickable)
- State for current byte value
- Decimal conversion display
- ASCII character display
- CSS animations for transitions

**B. Create `RubyPlayground.jsx`:**
- Initialize ruby.wasm
- Code editor (Monaco or CodeMirror)
- Run button
- Output display
- Error handling
- Loading state while Ruby initializes

### 3. Create the Page (30 min)

Create `index.astro`:
- Import both React components
- Add explanatory text around ByteVisualizer
- Add Ruby code examples in RubyPlayground
- Style everything nicely (PlanetScale-inspired)

### 4. Evaluate (20 min)

Answer these questions:
- [ ] Was the setup easy enough?
- [ ] Does writing feel natural?
- [ ] Is the component integration smooth?
- [ ] Does ruby.wasm work reliably?
- [ ] Is the Ruby playground fast enough?
- [ ] Would I want to do this for more posts?
- [ ] Does it feel like PlanetScale-level quality?

---

## Success Criteria

| Criteria | Pass/Fail |
|----------|-----------|
| Page loads fast | |
| ByteVisualizer animation works smoothly | |
| Ruby code runs successfully | |
| Code editor feels responsive | |
| ruby.wasm loads in <3 seconds | |
| Code is understandable | |
| I could write more content like this | |
| Friction feels lower than Jekyll | |

---

## If Test Passes

1. Plan full migration (half day)
2. Move all markdown content
3. Recreate layout/design
4. Deploy to GitHub Pages
5. Point domain

## If Test Fails

1. Stay with Jekyll
2. I'll build better writing tools instead
3. Revisit Astro later when needs change

---

## Component Sketches

### ByteVisualizer.jsx

```jsx
// ByteVisualizer.jsx - rough idea

import { useState } from 'react';

export default function ByteVisualizer() {
  const [bits, setBits] = useState([0, 1, 0, 0, 0, 0, 0, 1]); // 65 = 'A'

  const toggleBit = (index) => {
    const newBits = [...bits];
    newBits[index] = newBits[index] === 0 ? 1 : 0;
    setBits(newBits);
  };

  const decimal = bits.reduce((acc, bit, i) => acc + bit * Math.pow(2, 7 - i), 0);
  const char = decimal >= 32 && decimal <= 126 ? String.fromCharCode(decimal) : '·';

  return (
    <div className="byte-visualizer">
      <div className="bits">
        {bits.map((bit, i) => (
          <button key={i} onClick={() => toggleBit(i)} className={bit ? 'on' : 'off'}>
            {bit}
          </button>
        ))}
      </div>
      <div className="arrow">↓</div>
      <div className="decimal">Decimal: {decimal}</div>
      <div className="arrow">↓</div>
      <div className="character">Character: {char}</div>
    </div>
  );
}
```

### RubyPlayground.jsx

```jsx
// RubyPlayground.jsx - rough idea

import { useState, useEffect } from 'react';
import { DefaultRubyVM } from '@ruby/wasm-wasi/dist/browser';
import Editor from '@monaco-editor/react'; // or CodeMirror

export default function RubyPlayground({ initialCode }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(true);
  const [rubyVM, setRubyVM] = useState(null);

  useEffect(() => {
    // Initialize Ruby VM
    const initRuby = async () => {
      const { vm } = await DefaultRubyVM();
      setRubyVM(vm);
      setLoading(false);
    };
    initRuby();
  }, []);

  const runCode = async () => {
    if (!rubyVM) return;

    setOutput('Running...');
    try {
      const result = rubyVM.eval(code);
      setOutput(result.toString());
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="ruby-playground">
      <Editor
        height="200px"
        defaultLanguage="ruby"
        value={code}
        onChange={(value) => setCode(value)}
        theme="vs-dark"
      />
      <div className="controls">
        <button onClick={runCode} disabled={loading}>
          {loading ? 'Loading Ruby...' : 'Run ▶'}
        </button>
        <button onClick={() => setCode(initialCode)}>Reset</button>
      </div>
      <div className="output">
        <pre>{output}</pre>
      </div>
    </div>
  );
}
```

---

## Ruby WASM: Pros & Cons

### Pros
- ✅ Official Ruby support
- ✅ No backend needed
- ✅ Full Ruby 3.2+ language features
- ✅ Works offline once loaded
- ✅ Users can't break anything (sandboxed)

### Cons
- ⚠️ Initial load: ~2-3 MB (ruby.wasm file)
- ⚠️ First run initialization: ~1-2 seconds
- ⚠️ No file I/O or network access
- ⚠️ Limited stdlib (no gems)

### Alternative Approaches

**If ruby.wasm is too slow:**

1. **Server-side execution** (Ruby API)
   - Pros: Full Ruby, fast, can use gems
   - Cons: Need backend, security concerns, costs

2. **Replit embeds**
   - Pros: Zero setup, full environment
   - Cons: Loads slow, requires internet, branding

3. **Static examples only**
   - Pros: Fast, simple
   - Cons: Not interactive, less engaging

**Decision point:** Test ruby.wasm first. If load time >5 seconds, reconsider.

---

## Notes

- This connects to your existing post: `2024-05-05-utf-8-bits-bytes-binary.html`
- Could become an enhanced version of that content
- If it works well, we can add more visualizations:
  - UTF-8 multi-byte sequences
  - Endianness
  - Bit shifting operations
- **PlanetScale inspiration:** Clean design, subtle animations, educational focus
- Consider lazy-loading ruby.wasm (only when user clicks "Run")

---

## Ready to Start?

When ready, just say:

> "Let's build the Astro test with Ruby playground"

And we'll start from step 1.

---

## Quick Links

- [ruby.wasm docs](https://github.com/ruby/ruby.wasm)
- [Monaco Editor React](https://github.com/suren-atoyan/monaco-react)
- [CodeMirror 6](https://codemirror.net/)
- [Astro docs](https://docs.astro.build/)
- [Your UTF-8 post](./computer-science/computer-systems/_posts/2024-05-05-utf-8-bits-bytes-binary.md)
