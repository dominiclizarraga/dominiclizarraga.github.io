# Astro Test: Bytes Animation

## Goal

Build a single-page proof of concept before migrating the full site.

**Test page:** Interactive visualization of how bytes work
**Time estimate:** 2-3 hours
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

---

## Project Structure

```
astro-test/
├── src/
│   ├── pages/
│   │   └── index.astro        # The test page
│   ├── components/
│   │   └── ByteVisualizer.jsx # React component with animation
│   └── styles/
│       └── global.css         # Basic styling
├── astro.config.mjs
└── package.json
```

---

## Steps for Tomorrow

### 1. Setup (15 min)

```bash
# Create new Astro project
npm create astro@latest astro-test

# Add React support
cd astro-test
npx astro add react

# Start dev server
npm run dev
```

### 2. Build the Component (1-2 hours)

Create `ByteVisualizer.jsx`:
- 8 bit boxes (clickable)
- State for current byte value
- Decimal conversion display
- ASCII character display
- CSS animations for transitions

### 3. Create the Page (30 min)

Create `index.astro`:
- Import the React component
- Add explanatory text around it
- Style it nicely

### 4. Evaluate (15 min)

Answer these questions:
- [ ] Was the setup easy enough?
- [ ] Does writing feel natural?
- [ ] Is the component integration smooth?
- [ ] Would I want to do this for more posts?

---

## Success Criteria

| Criteria | Pass/Fail |
|----------|-----------|
| Page loads fast | |
| Animation works smoothly | |
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

## Component Sketch

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

---

## Notes

- This connects to your existing post: `2024-05-05-utf-8-bits-bytes-binary.html`
- Could become an enhanced version of that content
- If it works well, we can add more visualizations:
  - UTF-8 multi-byte sequences
  - Endianness
  - Bit shifting operations

---

## Tomorrow's Command

When ready, just say:

> "Let's build the Astro test"

And we'll start from step 1.
