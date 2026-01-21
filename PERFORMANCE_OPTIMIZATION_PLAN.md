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

## Phase 2: Image Optimization

**Impact:** Additional 20-30% load time improvement
**Expected Results:**
- Graphics folder: 7.8 MB → ~2-3 MB
- Images folder: 1.5 MB → ~500 KB

### Tasks

- [ ] **2.1** Compress large PNG files
  - `graphics/projects/openness_diagram_sandi_metz.png` (804 KB)
  - `graphics/projects/justin_weiss.png` (456 KB)
  - `graphics/projects/validations_rails_2.png` (369 KB)

- [ ] **2.2** Optimize large JPEG
  - `images/appalachians_2024.jpeg` (1.0 MB)

- [ ] **2.3** Add lazy loading to images in posts
  - Add `loading="lazy"` attribute to img tags

- [ ] **2.4** Verify Phase 2
  - [ ] Images still display correctly
  - [ ] Image quality acceptable
  - [ ] Total graphics folder <3 MB

---

## Phase 3: Cleanup & Quick Wins

**Impact:** Minor but improves maintainability
**Expected Results:**
- Cleaner repository
- Slightly faster builds

### Tasks

- [ ] **3.1** Remove duplicate apple-touch-icon files
  - Keep only required sizes
  - Current: 5 files × 17.4 KB = 87 KB

- [ ] **3.2** Update .gitignore
  - Add `.DS_Store`
  - Verify `.jekyll-cache/` is ignored

- [ ] **3.3** Remove .DS_Store files from repo
  ```bash
  git rm --cached .DS_Store
  git rm --cached **/.DS_Store
  ```

- [ ] **3.4** Verify Phase 3
  - [ ] No .DS_Store in git status
  - [ ] Apple touch icons still work

---

## Phase 4: Loading Optimization

**Impact:** Faster perceived load time
**Expected Results:**
- Faster first contentful paint
- Better lighthouse scores

### Tasks

- [ ] **4.1** Lazy-load Giscus comments
  - File: `_layouts/post.html`
  - Load script only when comments section is in viewport
  - Or: Add "Load comments" button

- [ ] **4.2** Consider CSS externalization
  - File: `_includes/screen.css`
  - Move to external file for browser caching
  - Trade-off: Extra HTTP request vs caching benefit

- [ ] **4.3** Verify Phase 4
  - [ ] Comments still load and work
  - [ ] No layout shift when comments load
  - [ ] Run Lighthouse audit

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
| Build time | 2-3 min | **1.4 sec** | |
| Homepage size | 773 KB | **22 KB** | |
| Page load time | 5-6 sec | TBD (deploy) | |
| _site folder | 89 MB | **17 MB** | |
| Lighthouse score | TBD | TBD | |

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
