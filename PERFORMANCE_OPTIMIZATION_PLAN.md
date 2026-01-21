# Performance Optimization Plan

## Diagnosis Summary

**Site:** https://dominiclizarraga.github.io/
**Date:** January 20, 2026
**Current Issues:**
- Page load time: 5-6 seconds (target: <2 seconds)
- Build time: 2-3 minutes (was: 36-45 seconds in Dec 2024)
- Built site size: 89 MB (should be: ~10-15 MB)

---

## Phase 1: Critical - Fix Search Index Embedding ✅ COMPLETED

**Impact:** Solved ~80% of performance issues
**Results:**
- Build time: 2-3 min → **1.4 seconds** (99% improvement)
- Page size: 773 KB → **22 KB** (97% reduction)
- Site size: 89 MB → **17 MB** (81% reduction)

### Tasks

- [x] **1.1** Analyze current search implementation
  - File: `_includes/search-lunr.html`
  - Found: 770 KB search index embedded on every page
  - Root cause: Full content of all posts/pages embedded as JavaScript

- [x] **1.2** Choose optimization strategy
  - ✅ Option A: Lazy-load search index (selected)

- [x] **1.3** Implement chosen solution
  - Created `search-index.json` (37 KB, generated once)
  - Modified `_includes/search-lunr.html` for lazy loading
  - lunr.js now loaded on-demand when user searches

- [x] **1.4** Verify Phase 1
  - [x] Local build completes in 1.4 seconds
  - [x] Homepage size 22 KB
  - [x] Search index JSON valid
  - [x] Search functionality preserved

---

## Phase 2: Image Optimization ✅ COMPLETED

**Impact:** Reduced image payload
**Results:**
- `validations_rails_2.png`: 369 KB → 304 KB (18% reduction)
- `appalachians_2024.jpeg`: 1.0 MB → 503 KB (50% reduction)
- Added `loading="lazy"` to layout images

### Tasks

- [x] **2.1** Compress large PNG files
  - `validations_rails_2.png` compressed (369 KB → 304 KB)
  - Other PNGs kept original (compression made them larger)

- [x] **2.2** Optimize large JPEG
  - `appalachians_2024.jpeg` (1.0 MB → 503 KB)

- [x] **2.3** Add lazy loading to images in posts
  - Added `loading="lazy"` to `_layouts/default.html`
  - Added `loading="lazy"` to `_layouts/photo.html`

- [x] **2.4** Verify Phase 2
  - Build still works
  - Images preserved

---

## Phase 3: Cleanup & Quick Wins ✅ COMPLETED

**Impact:** Cleaner repository
**Results:**
- Reduced 5 apple-touch-icons (87 KB) to 1 properly sized icon (2 KB)
- Removed .DS_Store files from git tracking
- Updated .gitignore

### Tasks

- [x] **3.1** Remove duplicate apple-touch-icon files
  - Replaced 5 oversized files (17 KB each, 1955x1955) with 1 proper 180x180 icon (2 KB)

- [x] **3.2** Update .gitignore
  - Added `.DS_Store` and `**/.DS_Store`

- [x] **3.3** Remove .DS_Store files from repo
  - Removed 3 tracked .DS_Store files

- [x] **3.4** Verify Phase 3
  - .DS_Store files untracked
  - Single apple-touch-icon.png (180x180, 2 KB)

---

## Phase 4: Loading Optimization ✅ COMPLETED

**Impact:** Already optimized
**Results:**
- Giscus already had `data-loading="lazy"` and `async` attributes
- CSS inlining kept (trade-off: no extra HTTP request vs caching)

### Tasks

- [x] **4.1** Lazy-load Giscus comments
  - Already implemented: `data-loading="lazy"` and `async` in `_layouts/post.html`

- [x] **4.2** Consider CSS externalization
  - Kept inline CSS (saves HTTP request, acceptable for site size)

- [x] **4.3** Verify Phase 4
  - Build completes in 0.6 seconds
  - All functionality preserved

---

## Verification Checklist (Final)

### Build Performance
- [ ] GitHub Actions build time <1 minute
- [ ] Local `bundle exec jekyll build` <30 seconds

### Page Performance
- [ ] Homepage loads in <2 seconds
- [ ] Lighthouse performance score >80
- [ ] No console errors

### Functionality
- [ ] All pages render correctly
- [ ] Search works (if kept)
- [ ] Comments work on posts
- [ ] Images display properly
- [ ] Mobile responsive still works

---

## Metrics to Track

| Metric | Before | After Phase 1 | After All |
|--------|--------|---------------|-----------|
| Build time | 2-3 min | **1.4 sec** | **0.6 sec** |
| Homepage size | 773 KB | **22 KB** | **22 KB** |
| Page load time | 5-6 sec | TBD (deploy) | TBD (deploy) |
| _site folder | 89 MB | **17 MB** | **16 MB** |
| Lighthouse score | TBD | TBD | TBD |

---

## Files to Modify

### Phase 1
- `_includes/search-lunr.html` - Main fix
- `_layouts/default.html` - May need updates
- New: `search-index.json` or `assets/search.json`

### Phase 2
- `graphics/projects/*.png` - Compress
- `images/*.jpeg` - Compress

### Phase 3
- `.gitignore` - Add .DS_Store
- `apple-touch-icon*.png` - Remove duplicates

### Phase 4
- `_layouts/post.html` - Lazy-load Giscus
- `_includes/screen.css` - Possibly externalize
