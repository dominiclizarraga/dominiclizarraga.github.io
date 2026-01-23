# Framework Comparison for a CS-Focused Blog

## Inspiration Sites

1. **curiouslychase.com** - Clean layout, drafts section, AI chat
2. **planetscale.com/blog** - Interactive SVG animations, animated code flows, step-by-step visualizations

## Your Constraints

| Constraint | Implication |
|------------|-------------|
| Pleasant reading experience | Good typography, code highlighting, fast loads |
| Reduce writing friction | Simple markdown, no complex setup per post |
| Computer science topics | Code blocks, diagrams, maybe interactive demos |
| No excuses to stop writing | The simpler the better |

---

## The Core Tension

```
Easy Writing ←————————————————————→ Interactive Visualizations
(Plain Markdown)                    (React/JS Components)
     ↑                                      ↑
   Jekyll                               Next.js
   Hugo                                 Astro + MDX
```

**PlanetScale's animated database sessions** use:
- Custom SVG with JavaScript animations (GSAP or Web Animations API)
- React components embedded in content
- MDX (Markdown + JSX) to mix prose and components

**You can't do this with plain Jekyll.** But you also don't need it for every post.

---

## Target Features

Based on curiouslychase.com/posts:
- Clean, modern two-column responsive layout
- Email subscription integration
- Coming soon / drafts section
- AI chat feature ("Ask me anything")
- Category/tag filtering
- Search functionality
- Dark/light mode toggle
- RSS feed
- Fast page loads
- SEO optimized

---

## Framework Options

### 1. Jekyll (Current)

**What it is:** Ruby-based static site generator, native GitHub Pages support

| Pros | Cons |
|------|------|
| Already using it | Limited interactivity without JS |
| Free GitHub Pages hosting | Slower builds on large sites |
| Simple markdown workflow | Ruby ecosystem less active |
| Large plugin ecosystem | No built-in component system |
| No build step for deployment | Hard to add dynamic features |

**Best for:** Simple blogs, documentation, minimal maintenance

**Can achieve Chase's site?** Partially. Would need external services for AI chat, voting, real-time features.

---

### 2. Astro

**What it is:** Modern static site generator with optional islands of interactivity

| Pros | Cons |
|------|------|
| Extremely fast (zero JS by default) | Newer, smaller ecosystem |
| Use React/Vue/Svelte components | Learning curve if new to it |
| Built-in markdown/MDX support | Fewer themes available |
| Content collections for blogs | |
| Partial hydration (islands) | |
| Great image optimization | |

**Best for:** Content-heavy sites that need some interactivity

**Can achieve Chase's site?** Yes, excellent fit. Can add React components for chat, keep static for content.

---

### 3. Next.js

**What it is:** React framework with static + server rendering

| Pros | Cons |
|------|------|
| Full React ecosystem | Heavier than needed for blog |
| API routes for dynamic features | Requires Vercel or Node hosting |
| Great for AI chat integration | More complex deployment |
| Excellent developer experience | Overkill for simple content |
| Easy to add voting, auth, etc. | Higher hosting costs possible |
| Huge community | |

**Best for:** Sites that need dynamic features, API integrations, user interactions

**Can achieve Chase's site?** Yes, fully. Probably what Chase uses (or similar).

---

### 4. Hugo

**What it is:** Go-based static site generator, extremely fast

| Pros | Cons |
|------|------|
| Fastest build times | Go templating is quirky |
| Single binary, easy install | Steeper learning curve |
| Great for large sites | Less intuitive than Jekyll |
| Strong taxonomy support | Harder to add interactivity |
| Free GitHub Pages hosting | Smaller theme ecosystem |

**Best for:** Large content sites, documentation, speed-critical builds

**Can achieve Chase's site?** Partially. Same limitations as Jekyll for dynamic features.

---

### 5. Eleventy (11ty)

**What it is:** JavaScript static site generator, very flexible

| Pros | Cons |
|------|------|
| Extremely flexible | Less opinionated (more decisions) |
| Use any template language | Smaller community than Next.js |
| Fast builds | Fewer ready-made themes |
| JavaScript ecosystem | |
| Works with GitHub Pages | |
| Easy to add interactivity | |

**Best for:** Developers who want control, JS-based static sites

**Can achieve Chase's site?** Yes, with external services for dynamic features.

---

### 6. Gatsby

**What it is:** React-based static site generator with GraphQL

| Pros | Cons |
|------|------|
| React component model | Complex GraphQL layer |
| Rich plugin ecosystem | Slow builds on large sites |
| Great image handling | Heavy framework |
| Good for content sites | Falling out of favor |
| | Overkill for simple blogs |

**Best for:** Content sites that need React, image-heavy sites

**Can achieve Chase's site?** Yes, but declining popularity.

---

## Recommendation Matrix

| If you want... | Choose |
|----------------|--------|
| Keep it simple, stay with what works | **Jekyll** |
| Modern DX + some interactivity | **Astro** |
| Full dynamic features (AI chat, voting, auth) | **Next.js** |
| Fastest builds, large content | **Hugo** |
| Flexibility + JavaScript | **Eleventy** |

---

## For a Site Like curiouslychase.com

### Best Fit: **Next.js** or **Astro**

**Why Next.js:**
- Chase's site likely uses something similar
- AI chat feature needs server/API routes
- Easy to integrate with AI services (OpenAI, etc.)
- Can do SSR for dynamic content
- Vercel hosting makes deployment easy

**Why Astro:**
- Lighter weight than Next.js
- Can embed React/Vue components only where needed
- Better performance for mostly-static content
- Growing rapidly, modern DX
- Can deploy to Netlify, Vercel, or Cloudflare

---

## Migration Effort from Jekyll

| Framework | Effort | Notes |
|-----------|--------|-------|
| Hugo | Low | Similar mental model, just different syntax |
| Eleventy | Low | Can reuse Liquid templates |
| Astro | Medium | New syntax, but markdown works |
| Next.js | Medium-High | Need to learn React if unfamiliar |
| Gatsby | High | GraphQL learning curve |

---

## Hosting Options

| Framework | Free Hosting Options |
|-----------|---------------------|
| Jekyll | GitHub Pages (native) |
| Hugo | GitHub Pages, Netlify, Cloudflare |
| Eleventy | GitHub Pages, Netlify, Cloudflare |
| Astro | Netlify, Vercel, Cloudflare Pages |
| Next.js | Vercel (free tier), Netlify |
| Gatsby | Netlify, Vercel, Gatsby Cloud |

---

## Summary

**Stay with Jekyll if:**
- Current site meets your needs
- You want zero maintenance
- You're okay adding external services for dynamic features

**Move to Astro if:**
- You want modern DX without full framework weight
- You want to add interactive components gradually
- Performance is a priority

**Move to Next.js if:**
- You want AI chat, voting, user features
- You're comfortable with React
- You want full control over dynamic features
- You're okay with slightly more complex hosting

---

## Final Deliberation: What's Best For You?

### Your Profile

| Factor | Your Situation |
|--------|----------------|
| Current skill | Ruby/Rails developer, writes in VS Code |
| Main goal | Write more, reduce friction |
| Content type | CS deep dives, code-heavy |
| Desired features | Good reading UX, maybe interactive demos |
| Risk tolerance | Want stability, not constant framework churn |
| Life tracking | GitHub-style contribution graphs for: workouts, reading, sunlight exposure, avoiding expensive clothing purchases, course completions |

### The Honest Truth

**Most of your posts won't need PlanetScale-level animations.**

Looking at your current posts (Ruby, Rails, testing, OOP), 90% are:
- Prose + code blocks
- Maybe some images/diagrams
- Links and references

For these, **Jekyll is fine**. The friction isn't the framework—it's the workflow.

**But** if you want to create interactive CS visualizations (like explaining database transactions, algorithm flows, or system design), you'll hit Jekyll's ceiling fast.

### Decision Framework

```
Question 1: Will >20% of your posts need interactive visualizations?
│
├─ NO → Stay with Jekyll, improve workflow
│       (Add: better snippets, image tools, templates)
│
└─ YES → Move to Astro
         │
         Question 2: Do you need server-side features (AI chat, auth)?
         │
         ├─ NO → Astro (static, deploy anywhere)
         │
         └─ YES → Next.js (more complex, more powerful)
```

### My Recommendation: **Astro**

**Why Astro wins for your use case:**

| Your Need | How Astro Solves It |
|-----------|---------------------|
| Low writing friction | Plain `.md` files work perfectly |
| Interactive when needed | Drop in React/Svelte components via MDX |
| CS content | Excellent code highlighting (Shiki), diagram support |
| Pleasant reading | Fast by default, great image optimization |
| Future-proof | Growing ecosystem, not going anywhere |
| Migration | Your markdown content transfers directly |

**The Astro workflow:**
```
90% of posts:  Write in plain markdown → done
10% of posts:  Write in MDX → import <AnimatedDiagram /> → done
```

### What About Jekyll?

**Stay with Jekyll if:**
- You're happy with static content only
- You don't want to learn a new system right now
- You just need better tooling (which I can build for you)

**The risk:** You'll eventually want interactive content and hit a wall.

### What About Next.js?

**Choose Next.js if:**
- You're comfortable with React
- You want to build the AI chat feature yourself
- You want full control over everything

**The risk:** More complexity = more friction = more excuses not to write.

---

## Recommended Path

### Option A: Improve Jekyll Now, Migrate Later
1. I build you better writing tools (templates, image workflow)
2. You write more, build content library
3. Migrate to Astro when you want interactivity
4. Content transfers easily (it's all markdown)

### Option B: Migrate to Astro Now
1. Set up Astro with your existing content
2. Start with plain markdown (same as now)
3. Add interactive components as you learn
4. Build the site you want from day one

### My Vote: **Option A** (pragmatic) or **Option B** (ambitious)

If writing more is the priority, **Option A** removes friction today.
If building toward PlanetScale-quality content is the vision, **Option B** sets you up for it.

---

## What PlanetScale Uses (For Reference)

Their interactive diagrams are likely:
- **Framework:** Next.js or custom React app
- **Animations:** GSAP (GreenSock) or Framer Motion
- **SVG:** Hand-crafted or generated with D3.js
- **Content:** MDX for mixing prose and components

To build something similar, you'd need:
1. React component skills
2. SVG animation knowledge (or a library)
3. MDX setup in your framework

This is achievable but not trivial. Start writing first, add interactivity later.
