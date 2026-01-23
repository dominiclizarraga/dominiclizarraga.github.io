# Content Guide: Adding Blog Posts in Astro

## Quick Start

### Option 1: Simple Markdown Posts

Create a `.md` file in `src/pages/posts/`:

```
src/pages/posts/my-new-post.md
```

```markdown
---
layout: ../../layouts/Post.astro
title: "My New Post"
date: 2026-01-23
description: "A brief description"
---

# My Post Title

Your content here. Supports standard markdown:

- **Bold** and *italic*
- [Links](https://example.com)
- `inline code`

```ruby
# Code blocks with syntax highlighting
puts "Hello, World!"
```
```

**URL:** `yoursite.com/posts/my-new-post`

---

### Option 2: MDX (Markdown + Components)

For interactive posts, use `.mdx` files:

```
src/pages/posts/interactive-guide.mdx
```

```mdx
---
layout: ../../layouts/Post.astro
title: "Interactive Guide"
date: 2026-01-23
---

import ByteVisualizer from '../../components/ByteVisualizer';
import RubyPlayground from '../../components/RubyPlayground';

# Interactive Guide

Regular markdown content here.

## Try it yourself

<ByteVisualizer client:load initialByte={65} />

## Ruby Example

<RubyPlayground
  client:load
  initialCode={`puts "Hello from Ruby!"`}
  title="My Ruby Code"
/>
```

**Note:** The `client:load` directive is required for interactive components.

---

## Project Structure

```
astro-test/
├── src/
│   ├── pages/
│   │   ├── index.astro          # Homepage
│   │   └── posts/               # Blog posts go here
│   │       ├── my-post.md       # Simple markdown
│   │       └── fancy-post.mdx   # With components
│   ├── components/
│   │   ├── ByteVisualizer.tsx   # Interactive byte display
│   │   ├── RubyPlayground.tsx   # Runnable Ruby code
│   │   ├── AsciiTable.tsx       # ASCII reference table
│   │   ├── BitwiseOperations.tsx # Bitwise calculator
│   │   └── Utf8Visualizer.tsx   # UTF-8 encoder
│   └── layouts/
│       └── Post.astro           # Blog post template (create this)
├── public/                      # Static assets (images, etc.)
└── astro.config.mjs
```

---

## Creating a Post Layout

Create `src/layouts/Post.astro`:

```astro
---
const { frontmatter } = Astro.props;
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{frontmatter.title}</title>
    <style>
      body {
        font-family: system-ui, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
        background: #0f0f1a;
        color: #e2e8f0;
      }
      h1 { color: #667eea; }
      a { color: #48bb78; }
    </style>
  </head>
  <body>
    <nav><a href="/">← Home</a></nav>
    <article>
      <h1>{frontmatter.title}</h1>
      <p style="color: #6b7280;">{frontmatter.date}</p>
      <slot />
    </article>
  </body>
</html>
```

---

## Adding MDX Support

To use `.mdx` files, add the MDX integration:

```bash
npx astro add mdx
```

This allows you to import and use React components in your markdown.

---

## Using Content Collections (Recommended for Many Posts)

For larger blogs, use Astro's Content Collections:

### 1. Create collection config

`src/content/config.ts`:
```typescript
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
```

### 2. Add posts to collection

`src/content/blog/my-post.md`:
```markdown
---
title: "My Post"
date: 2026-01-23
description: "Post description"
tags: ["ruby", "bytes"]
---

Content here...
```

### 3. Query posts

```astro
---
import { getCollection } from 'astro:content';

const posts = await getCollection('blog');
const sortedPosts = posts.sort((a, b) =>
  b.data.date.valueOf() - a.data.date.valueOf()
);
---

{sortedPosts.map(post => (
  <a href={`/blog/${post.slug}`}>{post.data.title}</a>
))}
```

---

## Workflow Summary

### For a Quick Post:
1. Create `src/pages/posts/my-post.md`
2. Add frontmatter (title, date)
3. Write markdown
4. Run `npm run dev` to preview
5. Commit and deploy

### For an Interactive Post:
1. Create `src/pages/posts/my-post.mdx`
2. Import components you need
3. Mix markdown with `<Component client:load />`
4. Run `npm run dev` to preview
5. Commit and deploy

---

## Available Interactive Components

| Component | Import | Props |
|-----------|--------|-------|
| ByteVisualizer | `../../components/ByteVisualizer` | `initialByte={65}` |
| RubyPlayground | `../../components/RubyPlayground` | `initialCode="..."`, `title="..."` |
| AsciiTable | `../../components/AsciiTable` | (none) |
| BitwiseOperations | `../../components/BitwiseOperations` | (none) |
| Utf8Visualizer | `../../components/Utf8Visualizer` | (none) |

---

## Commands

```bash
npm run dev      # Start dev server (http://localhost:4321)
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## Deploying

### GitHub Pages
```bash
# In astro.config.mjs, add:
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/repo-name', // if not root
});
```

### Netlify / Vercel
Just connect your repo - they auto-detect Astro!

---

## Tips

1. **Images**: Put in `public/images/` and reference as `/images/photo.jpg`
2. **Drafts**: Use `draft: true` in frontmatter and filter in queries
3. **RSS**: Use `@astrojs/rss` package
4. **Sitemap**: Use `@astrojs/sitemap` package
5. **Performance**: Components only hydrate with `client:*` directive

---

## Migration from Jekyll

Your existing markdown posts should work with minimal changes:

1. Move `.md` files to `src/pages/posts/` or `src/content/blog/`
2. Update frontmatter if needed (remove `layout: post`)
3. Create an Astro layout to match your design
4. Update any Liquid tags to Astro/MDX syntax

Most Jekyll frontmatter is compatible:
```yaml
# Jekyll
---
layout: post
title: "My Post"
date: 2024-01-23
categories: [ruby, rails]
---

# Astro (similar!)
---
title: "My Post"
date: 2024-01-23
tags: ["ruby", "rails"]
---
```
