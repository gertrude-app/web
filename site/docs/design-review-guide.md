# Design Review Guide

## Overview

This guide provides a systematic approach to reviewing design implementations using Playwright MCP to verify visual design, responsiveness, and adherence to the design system.

## Prerequisites

- Marketing site running locally (`pnpm start` from `site/` directory)
- Playwright MCP available
- Familiarity with `/site/docs/design.md`

## Design Review Checklist

### 1. Visual Design Verification

#### Color Palette Compliance
- [ ] Primary colors (violet-500, fuchsia-500) used correctly
- [ ] Gradient directions match design system (bg-gradient-to-b for backgrounds, bg-gradient-to-r for text)
- [ ] Text colors appropriate for backgrounds (white on colored, slate on light)
- [ ] Opacity values correct (80% for body text, 30% for secondary elements)

#### Typography
- [ ] Correct font families (Lexend for marketing, Lato for logo)
- [ ] Font weights match design patterns (semibold for headings, medium for UI)
- [ ] Responsive text sizing follows patterns (5xl → 6xl → 7xl for heroes)
- [ ] Line heights appropriate (1.1em for headlines, 1.5em for body)
- [ ] Letter spacing correct (tracking-[0.02em] for headlines)

#### Spacing & Layout
- [ ] Section padding follows patterns (px-4 → px-8 → px-12 → px-20)
- [ ] Vertical rhythm consistent (py-20, py-28, py-40)
- [ ] Gaps between elements appropriate (gap-6, gap-8, gap-12)
- [ ] Custom spacing values used where applicable (112, 128, 152, 176)

### 2. Responsive Design Testing

#### Breakpoint Testing Process

1. **Navigate to page**
   ```
   Use: mcp__playwright__browser_navigate
   URL: http://localhost:3000/[page-path]
   ```

2. **Test each breakpoint systematically**

   **Mobile (375px × 667px)**
   ```
   Use: mcp__playwright__browser_resize
   Width: 375
   Height: 667
   ```
   - [ ] Text readable, no overflow
   - [ ] Images scale appropriately
   - [ ] Buttons touch-friendly (min 44×44px)
   - [ ] Horizontal scrolling absent
   - [ ] Navigation accessible

   **Small Mobile (500px × 667px) - `xs` breakpoint**
   ```
   Use: mcp__playwright__browser_resize
   Width: 500
   Height: 667
   ```
   - [ ] Text size increases appropriately
   - [ ] Layout adjustments visible

   **Tablet (768px × 1024px) - `md` breakpoint**
   ```
   Use: mcp__playwright__browser_resize
   Width: 768
   Height: 1024
   ```
   - [ ] Two-column layouts where appropriate
   - [ ] Increased padding visible
   - [ ] Typography scales up

   **Desktop (1280px × 800px) - `xl` breakpoint**
   ```
   Use: mcp__playwright__browser_resize
   Width: 1280
   Height: 800
   ```
   - [ ] Full desktop layout active
   - [ ] Maximum widths respected
   - [ ] Horizontal space well-utilized

   **Large Desktop (1600px × 900px) - `2xl` breakpoint**
   ```
   Use: mcp__playwright__browser_resize
   Width: 1600
   Height: 900
   ```
   - [ ] Content doesn't over-stretch
   - [ ] Maximum widths appropriate

3. **Take screenshots at each breakpoint**
   ```
   Use: mcp__playwright__browser_take_screenshot
   Filename: [page]-[breakpoint].png
   ```

### 3. Component-Specific Reviews

#### Buttons (FancyLink)
- [ ] Correct size (lg: px-8 py-4, sm: px-6 py-3)
- [ ] Appropriate border radius (rounded-3xl for lg, rounded-2xl for sm)
- [ ] Primary buttons have gradient backgrounds
- [ ] Secondary buttons have correct background colors
- [ ] Inverted variants work on colored backgrounds
- [ ] Icons present where specified
- [ ] Text gradient applied to secondary buttons

**Testing hover states:**
```
Use: mcp__playwright__browser_hover
Element: [button description]
Ref: [button ref from snapshot]
```
- [ ] Hover transform visible (-translate-y-0.5 for primary)
- [ ] Background color changes for secondary
- [ ] Transition smooth (200ms)

#### Hero Sections
- [ ] Full viewport height (h-screen)
- [ ] Gradient background correct
- [ ] Text centered and readable
- [ ] Scroll indicator visible
- [ ] Chevron animated

#### Cards & Testimonials
- [ ] Border radius rounded-3xl
- [ ] Proper padding (p-8 xs:p-12)
- [ ] Background colors correct (slate-800 for testimonials)
- [ ] Text colors appropriate
- [ ] Shadows applied where specified

### 4. Interactive Element Testing

#### Test Click Interactions
```
Use: mcp__playwright__browser_click
Element: [interactive element]
Ref: [element ref]
```
- [ ] Links navigate correctly
- [ ] Buttons trigger expected actions
- [ ] Active states visible (scale-down, translate-up)

#### Test Form Elements (if applicable)
```
Use: mcp__playwright__browser_type
Element: [input field]
Ref: [input ref]
Text: [test content]
```
- [ ] Input fields styled correctly
- [ ] Focus states clear
- [ ] Validation messages visible

### 5. Animation & Transition Verification

#### Scroll-based Animations
- [ ] Hero text scales and blurs on scroll
- [ ] Scroll indicator fades out
- [ ] Sticky positioning works correctly
- [ ] Transforms smooth and performant

#### Hover Animations
- [ ] Button hover lifts subtle (200ms transition)
- [ ] Shine effect visible on primary buttons
- [ ] Background changes smooth

**Check animation performance:**
```
Use: mcp__playwright__browser_evaluate
Function: () => { return window.performance.getEntriesByType('measure'); }
```

### 6. Accessibility Checks

#### Contrast Verification
- [ ] White text on violet/fuchsia backgrounds (high contrast)
- [ ] Gradient text readable
- [ ] Secondary text (80% opacity) still readable

#### Semantic HTML
```
Use: mcp__playwright__browser_snapshot
```
Review accessibility tree:
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Links and buttons labeled correctly
- [ ] Images have alt text (if applicable)
- [ ] Landmark regions present (header, main, footer)

#### Keyboard Navigation
```
Use: mcp__playwright__browser_press_key
Key: Tab
```
- [ ] Focus visible on interactive elements
- [ ] Tab order logical
- [ ] All interactive elements reachable

### 7. Cross-page Consistency

#### Global Elements
- [ ] Header consistent across pages
- [ ] Footer matches on all pages
- [ ] Logo styling identical
- [ ] Navigation behavior consistent

#### Theme Variations
Test both theme variants (if applicable):
- [ ] `theme="violet"` - violet background, white text
- [ ] `theme="white"` - white background, default text

### 8. Performance Considerations

#### Check Console for Errors
```
Use: mcp__playwright__browser_console_messages
```
- [ ] No errors present
- [ ] No missing resources
- [ ] No layout shift warnings

#### Image Optimization
- [ ] Images load quickly
- [ ] No layout shift during loading
- [ ] Proper formats used (webp, etc.)

### 9. Final Visual Comparison

#### Take Full-Page Screenshots
```
Use: mcp__playwright__browser_take_screenshot
FullPage: true
Filename: [page]-full.png
```
- [ ] Overall composition balanced
- [ ] Hierarchy clear
- [ ] No awkward spacing
- [ ] Consistent visual rhythm

## Common Issues & Solutions

### Issue: Text too small on mobile
**Check:** Responsive text classes applied (text-base → text-lg → text-xl)
**Fix:** Add responsive utility classes

### Issue: Colors don't match design system
**Check:** Using custom colors vs design system colors
**Fix:** Use colors from design.md palette

### Issue: Gradients not visible
**Check:** Gradient direction and color stops
**Fix:** Verify from-[color] to-[color] syntax correct

### Issue: Layout breaks at specific width
**Check:** Breakpoint-specific classes
**Fix:** Test intermediate sizes, add md+ or lg+ breakpoints

### Issue: Buttons not interactive
**Check:** Hover/active states defined
**Fix:** Add group-hover and group-active classes

## Reporting Issues

When reporting design issues, include:
1. Page URL
2. Breakpoint/screen size
3. Screenshot showing issue
4. Expected vs actual behavior
5. Reference to design.md section

## Example Review Session

```
1. Navigate to homepage
   mcp__playwright__browser_navigate → http://localhost:3000

2. Take baseline screenshot
   mcp__playwright__browser_take_screenshot → homepage-desktop.png

3. Resize to mobile
   mcp__playwright__browser_resize → 375 × 667

4. Take mobile screenshot
   mcp__playwright__browser_take_screenshot → homepage-mobile.png

5. Test button hover
   mcp__playwright__browser_hover → [primary button]
   mcp__playwright__browser_take_screenshot → homepage-button-hover.png

6. Check console
   mcp__playwright__browser_console_messages → Review errors

7. Navigate to next page
   mcp__playwright__browser_navigate → http://localhost:3000/mac

8. Repeat steps 2-6
```

## Best Practices

1. **Always start with desktop view** - Easier to see overall layout
2. **Test mobile early** - Reveals layout issues quickly
3. **Check hover states** - Often forgotten but important
4. **Verify gradients carefully** - Easy to get directions wrong
5. **Test edge cases** - Very long text, missing images, etc.
6. **Compare against /mac page** - Consistency reference
7. **Document with screenshots** - Visual evidence invaluable
8. **Test in sequence** - Mobile → Tablet → Desktop workflow

## Automation Potential

For repeated reviews, consider creating a script that:
1. Loops through all breakpoints
2. Takes screenshots at each
3. Checks console for errors
4. Verifies key elements present
5. Generates comparison report
