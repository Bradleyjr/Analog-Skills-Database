import { Terminal, Cpu, Network, Database, Shield, Zap, Layout, PaintBucket, Type, Eye, Search, Lock, CheckCircle, FileText, Code, Settings, Box, Layers, Sliders, Hash, CreditCard, Scissors, Palette, Accessibility, Activity, MonitorSmartphone, Maximize, Smile, Inbox, Moon, Compass, Table } from 'lucide-react';
import React from 'react';

export type Skill = {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  code: string;
};

export const SKILLS: Skill[] = [
  {
    id: 'animate',
    name: 'Animate',
    icon: <Zap size={16} strokeWidth={1.5} />,
    description: 'Review a feature and enhance it with purposeful animations, micro-interactions, and motion effects that improve usability and delight.',
    code: `---
name: animate
description: Review a feature and enhance it with purposeful animations, micro-interactions, and motion effects that improve usability and delight.
user-invokable: true
args:
  - name: target
    description: The feature or component to animate (optional)
    required: false
---

Analyze a feature and strategically add animations and micro-interactions that enhance understanding, provide feedback, and create delight.

## MANDATORY PREPARATION

### Context Gathering (Do This First)

You cannot do a great job without having necessary context, such as target audience (critical), desired use-cases (critical), brand personality/tone (playful vs serious, energetic vs calm), and performance constraints.

Attempt to gather these from the current thread or codebase.

1. If you don't find *exact* information and have to infer from existing design and functionality, you MUST STOP and STOP and call the AskUserQuestionTool to clarify. whether you got it right.
2. Otherwise, if you can't fully infer or your level of confidence is medium or lower, you MUST STOP and call the AskUserQuestionTool to clarify. clarifying questions first to complete your context.

Do NOT proceed until you have answers. Guessing leads to inappropriate or excessive animation.

### Use frontend-design skill

Use the frontend-design skill for design principles and anti-patterns. Do NOT proceed until it has executed and you know all DO's and DON'Ts.

---

## Assess Animation Opportunities

Analyze where motion would improve the experience:

1. **Identify static areas**:
   - **Missing feedback**: Actions without visual acknowledgment (button clicks, form submission, etc.)
   - **Jarring transitions**: Instant state changes that feel abrupt (show/hide, page loads, route changes)
   - **Unclear relationships**: Spatial or hierarchical relationships that aren't obvious
   - **Lack of delight**: Functional but joyless interactions
   - **Missed guidance**: Opportunities to direct attention or explain behavior

2. **Understand the context**:
   - What's the personality? (Playful vs serious, energetic vs calm)
   - What's the performance budget? (Mobile-first? Complex page?)
   - Who's the audience? (Motion-sensitive users? Power users who want speed?)
   - What matters most? (One hero animation vs many micro-interactions?)

If any of these are unclear from the codebase, STOP and call the AskUserQuestionTool to clarify.

**CRITICAL**: Respect \`prefers-reduced-motion\`. Always provide non-animated alternatives for users who need them.

## Plan Animation Strategy

Create a purposeful animation plan:

- **Hero moment**: What's the ONE signature animation? (Page load? Hero section? Key interaction?)
- **Feedback layer**: Which interactions need acknowledgment?
- **Transition layer**: Which state changes need smoothing?
- **Delight layer**: Where can we surprise and delight?

**IMPORTANT**: One well-orchestrated experience beats scattered animations everywhere. Focus on high-impact moments.

## Implement Animations

Add motion systematically across these categories:

### Entrance Animations
- **Page load choreography**: Stagger element reveals (100-150ms delays), fade + slide combinations
- **Hero section**: Dramatic entrance for primary content (scale, parallax, or creative effects)
- **Content reveals**: Scroll-triggered animations using intersection observer
- **Modal/drawer entry**: Smooth slide + fade, backdrop fade, focus management

### Micro-interactions
- **Button feedback**:
  - Hover: Subtle scale (1.02-1.05), color shift, shadow increase
  - Click: Quick scale down then up (0.95 → 1), ripple effect
  - Loading: Spinner or pulse state
- **Form interactions**:
  - Input focus: Border color transition, slight scale or glow
  - Validation: Shake on error, check mark on success, smooth color transitions
- **Toggle switches**: Smooth slide + color transition (200-300ms)
- **Checkboxes/radio**: Check mark animation, ripple effect
- **Like/favorite**: Scale + rotation, particle effects, color transition

### State Transitions
- **Show/hide**: Fade + slide (not instant), appropriate timing (200-300ms)
- **Expand/collapse**: Height transition with overflow handling, icon rotation
- **Loading states**: Skeleton screen fades, spinner animations, progress bars
- **Success/error**: Color transitions, icon animations, gentle scale pulse
- **Enable/disable**: Opacity transitions, cursor changes

### Navigation & Flow
- **Page transitions**: Crossfade between routes, shared element transitions
- **Tab switching**: Slide indicator, content fade/slide
- **Carousel/slider**: Smooth transforms, snap points, momentum
- **Scroll effects**: Parallax layers, sticky headers with state changes, scroll progress indicators

### Feedback & Guidance
- **Hover hints**: Tooltip fade-ins, cursor changes, element highlights
- **Drag & drop**: Lift effect (shadow + scale), drop zone highlights, smooth repositioning
- **Copy/paste**: Brief highlight flash on paste, "copied" confirmation
- **Focus flow**: Highlight path through form or workflow

### Delight Moments
- **Empty states**: Subtle floating animations on illustrations
- **Completed actions**: Confetti, check mark flourish, success celebrations
- **Easter eggs**: Hidden interactions for discovery
- **Contextual animation**: Weather effects, time-of-day themes, seasonal touches

## Technical Implementation

Use appropriate techniques for each animation:

### Timing & Easing

**Durations by purpose:**
- **100-150ms**: Instant feedback (button press, toggle)
- **200-300ms**: State changes (hover, menu open)
- **300-500ms**: Layout changes (accordion, modal)
- **500-800ms**: Entrance animations (page load)

**Easing curves (use these, not CSS defaults):**
\`\`\`css
/* Recommended - natural deceleration */
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);    /* Smooth, refined */
--ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);   /* Slightly snappier */
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);     /* Confident, decisive */

/* AVOID - feel dated and tacky */
/* bounce: cubic-bezier(0.34, 1.56, 0.64, 1); */
/* elastic: cubic-bezier(0.68, -0.6, 0.32, 1.6); */
\`\`\`

**Exit animations are faster than entrances.** Use ~75% of enter duration.

### CSS Animations
\`\`\`css
/* Prefer for simple, declarative animations */
- transitions for state changes
- @keyframes for complex sequences
- transform + opacity only (GPU-accelerated)
\`\`\`

### JavaScript Animation
\`\`\`javascript
/* Use for complex, interactive animations */
- Web Animations API for programmatic control
- Framer Motion for React
- GSAP for complex sequences
\`\`\`

### Performance
- **GPU acceleration**: Use \`transform\` and \`opacity\`, avoid layout properties
- **will-change**: Add sparingly for known expensive animations
- **Reduce paint**: Minimize repaints, use \`contain\` where appropriate
- **Monitor FPS**: Ensure 60fps on target devices

### Accessibility
\`\`\`css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
\`\`\`

**NEVER**:
- Use bounce or elastic easing curves—they feel dated and draw attention to the animation itself
- Animate layout properties (width, height, top, left)—use transform instead
- Use durations over 500ms for feedback—it feels laggy
- Animate without purpose—every animation needs a reason
- Ignore \`prefers-reduced-motion\`—this is an accessibility violation
- Animate everything—animation fatigue makes interfaces feel exhausting
- Block interaction during animations unless intentional

## Verify Quality

Test animations thoroughly:

- **Smooth at 60fps**: No jank on target devices
- **Feels natural**: Easing curves feel organic, not robotic
- **Appropriate timing**: Not too fast (jarring) or too slow (laggy)
- **Reduced motion works**: Animations disabled or simplified appropriately
- **Doesn't block**: Users can interact during/after animations
- **Adds value**: Makes interface clearer or more delightful

Remember: Motion should enhance understanding and provide feedback, not just add decoration. Animate with purpose, respect performance constraints, and always consider accessibility. Great animation is invisible - it just makes everything feel right.`
  },
  {
    id: 'quieter',
    name: 'Quieter',
    icon: <Eye size={16} strokeWidth={1.5} />,
    description: 'Tone down overly bold or visually aggressive designs. Reduces intensity while maintaining design quality and impact.',
    code: `---
name: quieter
description: Tone down overly bold or visually aggressive designs. Reduces intensity while maintaining design quality and impact.
user-invokable: true
args:
  - name: target
    description: The feature or component to make quieter (optional)
    required: false
---

Reduce visual intensity in designs that are too bold, aggressive, or overstimulating, creating a more refined and approachable aesthetic without losing effectiveness.

## MANDATORY PREPARATION

### Context Gathering (Do This First)

You cannot do a great job without having necessary context, such as target audience (critical), desired use-cases (critical), brand personality/tone, and everything else that a great human designer would need as well.

Attempt to gather these from the current thread or codebase.

1. If you don't find *exact* information and have to infer from existing design and functionality, you MUST STOP and STOP and call the AskUserQuestionTool to clarify. whether you got it right.
2. Otherwise, if you can't fully infer or your level of confidence is medium or lower, you MUST STOP and call the AskUserQuestionTool to clarify. clarifying questions first to complete your context.

Do NOT proceed until you have answers. Guessing leads to generic design.

### Use frontend-design skill

Use the frontend-design skill for design principles and anti-patterns. Do NOT proceed until it has executed and you know all DO's and DON'Ts.

---

## Assess Current State

Analyze what makes the design feel too intense:

1. **Identify intensity sources**:
   - **Color saturation**: Overly bright or saturated colors
   - **Contrast extremes**: Too much high-contrast juxtaposition
   - **Visual weight**: Too many bold, heavy elements competing
   - **Animation excess**: Too much motion or overly dramatic effects
   - **Complexity**: Too many visual elements, patterns, or decorations
   - **Scale**: Everything is large and loud with no hierarchy

2. **Understand the context**:
   - What's the purpose? (Marketing vs tool vs reading experience)
   - Who's the audience? (Some contexts need energy)
   - What's working? (Don't throw away good ideas)
   - What's the core message? (Preserve what matters)

If any of these are unclear from the codebase, STOP and call the AskUserQuestionTool to clarify.

**CRITICAL**: "Quieter" doesn't mean boring or generic. It means refined, sophisticated, and easier on the eyes. Think luxury, not laziness.

## Plan Refinement

Create a strategy to reduce intensity while maintaining impact:

- **Color approach**: Desaturate or shift to more sophisticated tones?
- **Hierarchy approach**: Which elements should stay bold (very few), which should recede?
- **Simplification approach**: What can be removed entirely?
- **Sophistication approach**: How can we signal quality through restraint?

**IMPORTANT**: Great quiet design is harder than great bold design. Subtlety requires precision.

## Refine the Design

Systematically reduce intensity across these dimensions:

### Color Refinement
- **Reduce saturation**: Shift from fully saturated to 70-85% saturation
- **Soften palette**: Replace bright colors with muted, sophisticated tones
- **Reduce color variety**: Use fewer colors more thoughtfully
- **Neutral dominance**: Let neutrals do more work, use color as accent (10% rule)
- **Gentler contrasts**: High contrast only where it matters most
- **Tinted grays**: Use warm or cool tinted grays instead of pure gray—adds sophistication without loudness
- **Never gray on color**: If you have gray text on a colored background, use a darker shade of that color or transparency instead

### Visual Weight Reduction
- **Typography**: Reduce font weights (900 → 600, 700 → 500), decrease sizes where appropriate
- **Hierarchy through subtlety**: Use weight, size, and space instead of color and boldness
- **White space**: Increase breathing room, reduce density
- **Borders & lines**: Reduce thickness, decrease opacity, or remove entirely

### Simplification
- **Remove decorative elements**: Gradients, shadows, patterns, textures that don't serve purpose
- **Simplify shapes**: Reduce border radius extremes, simplify custom shapes
- **Reduce layering**: Flatten visual hierarchy where possible
- **Clean up effects**: Reduce or remove blur effects, glows, multiple shadows

### Motion Reduction
- **Reduce animation intensity**: Shorter distances (10-20px instead of 40px), gentler easing
- **Remove decorative animations**: Keep functional motion, remove flourishes
- **Subtle micro-interactions**: Replace dramatic effects with gentle feedback
- **Refined easing**: Use ease-out-quart for smooth, understated motion—never bounce or elastic
- **Remove animations entirely** if they're not serving a clear purpose

### Composition Refinement
- **Reduce scale jumps**: Smaller contrast between sizes creates calmer feeling
- **Align to grid**: Bring rogue elements back into systematic alignment
- **Even out spacing**: Replace extreme spacing variations with consistent rhythm

**NEVER**:
- Make everything the same size/weight (hierarchy still matters)
- Remove all color (quiet ≠ grayscale)
- Eliminate all personality (maintain character through refinement)
- Sacrifice usability for aesthetics (functional elements still need clear affordances)
- Make everything small and light (some anchors needed)

## Verify Quality

Ensure refinement maintains quality:

- **Still functional**: Can users still accomplish tasks easily?
- **Still distinctive**: Does it have character, or is it generic now?
- **Better reading**: Is text easier to read for extended periods?
- **Sophistication**: Does it feel more refined and premium?

Remember: Quiet design is confident design. It doesn't need to shout. Less is more, but less is also harder. Refine with precision and maintain intentionality.`
  },
  {
    id: 'optimize',
    name: 'Optimize',
    icon: <Sliders size={16} strokeWidth={1.5} />,
    description: 'Improve interface performance across loading speed, rendering, animations, images, and bundle size.',
    code: `---
name: optimize
description: Improve interface performance across loading speed, rendering, animations, images, and bundle size. Makes experiences faster and smoother.
user-invokable: true
args:
  - name: target
    description: The feature or area to optimize (optional)
    required: false
---

Identify and fix performance issues to create faster, smoother user experiences.

## Assess Performance Issues

Understand current performance and identify problems:

1. **Measure current state**:
   - **Core Web Vitals**: LCP, FID/INP, CLS scores
   - **Load time**: Time to interactive, first contentful paint
   - **Bundle size**: JavaScript, CSS, image sizes
   - **Runtime performance**: Frame rate, memory usage, CPU usage
   - **Network**: Request count, payload sizes, waterfall

2. **Identify bottlenecks**:
   - What's slow? (Initial load? Interactions? Animations?)
   - What's causing it? (Large images? Expensive JavaScript? Layout thrashing?)
   - How bad is it? (Perceivable? Annoying? Blocking?)
   - Who's affected? (All users? Mobile only? Slow connections?)

**CRITICAL**: Measure before and after. Premature optimization wastes time. Optimize what actually matters.

## Optimization Strategy

Create systematic improvement plan:

### Loading Performance

**Optimize Images**:
- Use modern formats (WebP, AVIF)
- Proper sizing (don't load 3000px image for 300px display)
- Lazy loading for below-fold images
- Responsive images (\`srcset\`, \`picture\` element)
- Compress images (80-85% quality is usually imperceptible)
- Use CDN for faster delivery

\`\`\`html
<img 
  src="hero.webp"
  srcset="hero-400.webp 400w, hero-800.webp 800w, hero-1200.webp 1200w"
  sizes="(max-width: 400px) 400px, (max-width: 800px) 800px, 1200px"
  loading="lazy"
  alt="Hero image"
/>
\`\`\`

**Reduce JavaScript Bundle**:
- Code splitting (route-based, component-based)
- Tree shaking (remove unused code)
- Remove unused dependencies
- Lazy load non-critical code
- Use dynamic imports for large components

\`\`\`javascript
// Lazy load heavy component
const HeavyChart = lazy(() => import('./HeavyChart'));
\`\`\`

**Optimize CSS**:
- Remove unused CSS
- Critical CSS inline, rest async
- Minimize CSS files
- Use CSS containment for independent regions

**Optimize Fonts**:
- Use \`font-display: swap\` or \`optional\`
- Subset fonts (only characters you need)
- Preload critical fonts
- Use system fonts when appropriate
- Limit font weights loaded

\`\`\`css
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: swap; /* Show fallback immediately */
  unicode-range: U+0020-007F; /* Basic Latin only */
}
\`\`\`

**Optimize Loading Strategy**:
- Critical resources first (async/defer non-critical)
- Preload critical assets
- Prefetch likely next pages
- Service worker for offline/caching
- HTTP/2 or HTTP/3 for multiplexing

### Rendering Performance

**Avoid Layout Thrashing**:
\`\`\`javascript
// ❌ Bad: Alternating reads and writes (causes reflows)
elements.forEach(el => {
  const height = el.offsetHeight; // Read (forces layout)
  el.style.height = height * 2; // Write
});

// ✅ Good: Batch reads, then batch writes
const heights = elements.map(el => el.offsetHeight); // All reads
elements.forEach((el, i) => {
  el.style.height = heights[i] * 2; // All writes
});
\`\`\`

**Optimize Rendering**:
- Use CSS \`contain\` property for independent regions
- Minimize DOM depth (flatter is faster)
- Reduce DOM size (fewer elements)
- Use \`content-visibility: auto\` for long lists
- Virtual scrolling for very long lists (react-window, react-virtualized)

**Reduce Paint & Composite**:
- Use \`transform\` and \`opacity\` for animations (GPU-accelerated)
- Avoid animating layout properties (width, height, top, left)
- Use \`will-change\` sparingly for known expensive operations
- Minimize paint areas (smaller is faster)

### Animation Performance

**GPU Acceleration**:
\`\`\`css
/* ✅ GPU-accelerated (fast) */
.animated {
  transform: translateX(100px);
  opacity: 0.5;
}

/* ❌ CPU-bound (slow) */
.animated {
  left: 100px;
  width: 300px;
}
\`\`\`

**Smooth 60fps**:
- Target 16ms per frame (60fps)
- Use \`requestAnimationFrame\` for JS animations
- Debounce/throttle scroll handlers
- Use CSS animations when possible
- Avoid long-running JavaScript during animations

**Intersection Observer**:
\`\`\`javascript
// Efficiently detect when elements enter viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Element is visible, lazy load or animate
    }
  });
});
\`\`\`

### React/Framework Optimization

**React-specific**:
- Use \`memo()\` for expensive components
- \`useMemo()\` and \`useCallback()\` for expensive computations
- Virtualize long lists
- Code split routes
- Avoid inline function creation in render
- Use React DevTools Profiler

**Framework-agnostic**:
- Minimize re-renders
- Debounce expensive operations
- Memoize computed values
- Lazy load routes and components

### Network Optimization

**Reduce Requests**:
- Combine small files
- Use SVG sprites for icons
- Inline small critical assets
- Remove unused third-party scripts

**Optimize APIs**:
- Use pagination (don't load everything)
- GraphQL to request only needed fields
- Response compression (gzip, brotli)
- HTTP caching headers
- CDN for static assets

**Optimize for Slow Connections**:
- Adaptive loading based on connection (navigator.connection)
- Optimistic UI updates
- Request prioritization
- Progressive enhancement

## Core Web Vitals Optimization

### Largest Contentful Paint (LCP < 2.5s)
- Optimize hero images
- Inline critical CSS
- Preload key resources
- Use CDN
- Server-side rendering

### First Input Delay (FID < 100ms) / INP (< 200ms)
- Break up long tasks
- Defer non-critical JavaScript
- Use web workers for heavy computation
- Reduce JavaScript execution time

### Cumulative Layout Shift (CLS < 0.1)
- Set dimensions on images and videos
- Don't inject content above existing content
- Use \`aspect-ratio\` CSS property
- Reserve space for ads/embeds
- Avoid animations that cause layout shifts

\`\`\`css
/* Reserve space for image */
.image-container {
  aspect-ratio: 16 / 9;
}
\`\`\`

## Performance Monitoring

**Tools to use**:
- Chrome DevTools (Lighthouse, Performance panel)
- WebPageTest
- Core Web Vitals (Chrome UX Report)
- Bundle analyzers (webpack-bundle-analyzer)
- Performance monitoring (Sentry, DataDog, New Relic)

**Key metrics**:
- LCP, FID/INP, CLS (Core Web Vitals)
- Time to Interactive (TTI)
- First Contentful Paint (FCP)
- Total Blocking Time (TBT)
- Bundle size
- Request count

**IMPORTANT**: Measure on real devices with real network conditions. Desktop Chrome with fast connection isn't representative.

**NEVER**:
- Optimize without measuring (premature optimization)
- Sacrifice accessibility for performance
- Break functionality while optimizing
- Use \`will-change\` everywhere (creates new layers, uses memory)
- Lazy load above-fold content
- Optimize micro-optimizations while ignoring major issues (optimize the biggest bottleneck first)
- Forget about mobile performance (often slower devices, slower connections)

## Verify Improvements

Test that optimizations worked:

- **Before/after metrics**: Compare Lighthouse scores
- **Real user monitoring**: Track improvements for real users
- **Different devices**: Test on low-end Android, not just flagship iPhone
- **Slow connections**: Throttle to 3G, test experience
- **No regressions**: Ensure functionality still works
- **User perception**: Does it *feel* faster?

Remember: Performance is a feature. Fast experiences feel more responsive, more polished, more professional. Optimize systematically, measure ruthlessly, and prioritize user-perceived performance.`
  },
  {
    id: 'adapt',
    name: 'Adapt',
    icon: <Layout size={16} strokeWidth={1.5} />,
    description: 'Adapt designs to work across different screen sizes, devices, contexts, or platforms.',
    code: `---
name: adapt
description: Adapt designs to work across different screen sizes, devices, contexts, or platforms. Ensures consistent experience across varied environments.
user-invokable: true
args:
  - name: target
    description: The feature or component to adapt (optional)
    required: false
  - name: context
    description: What to adapt for (mobile, tablet, desktop, print, email, etc.)
    required: false
---

Adapt existing designs to work effectively across different contexts - different screen sizes, devices, platforms, or use cases.

## Assess Adaptation Challenge

Understand what needs adaptation and why:

1. **Identify the source context**:
   - What was it designed for originally? (Desktop web? Mobile app?)
   - What assumptions were made? (Large screen? Mouse input? Fast connection?)
   - What works well in current context?

2. **Understand target context**:
   - **Device**: Mobile, tablet, desktop, TV, watch, print?
   - **Input method**: Touch, mouse, keyboard, voice, gamepad?
   - **Screen constraints**: Size, resolution, orientation?
   - **Connection**: Fast wifi, slow 3G, offline?
   - **Usage context**: On-the-go vs desk, quick glance vs focused reading?
   - **User expectations**: What do users expect on this platform?

3. **Identify adaptation challenges**:
   - What won't fit? (Content, navigation, features)
   - What won't work? (Hover states on touch, tiny touch targets)
   - What's inappropriate? (Desktop patterns on mobile, mobile patterns on desktop)

**CRITICAL**: Adaptation is not just scaling - it's rethinking the experience for the new context.

## Plan Adaptation Strategy

Create context-appropriate strategy:

### Mobile Adaptation (Desktop → Mobile)

**Layout Strategy**:
- Single column instead of multi-column
- Vertical stacking instead of side-by-side
- Full-width components instead of fixed widths
- Bottom navigation instead of top/side navigation

**Interaction Strategy**:
- Touch targets 44x44px minimum (not hover-dependent)
- Swipe gestures where appropriate (lists, carousels)
- Bottom sheets instead of dropdowns
- Thumbs-first design (controls within thumb reach)
- Larger tap areas with more spacing

**Content Strategy**:
- Progressive disclosure (don't show everything at once)
- Prioritize primary content (secondary content in tabs/accordions)
- Shorter text (more concise)
- Larger text (16px minimum)

**Navigation Strategy**:
- Hamburger menu or bottom navigation
- Reduce navigation complexity
- Sticky headers for context
- Back button in navigation flow

### Tablet Adaptation (Hybrid Approach)

**Layout Strategy**:
- Two-column layouts (not single or three-column)
- Side panels for secondary content
- Master-detail views (list + detail)
- Adaptive based on orientation (portrait vs landscape)

**Interaction Strategy**:
- Support both touch and pointer
- Touch targets 44x44px but allow denser layouts than phone
- Side navigation drawers
- Multi-column forms where appropriate

### Desktop Adaptation (Mobile → Desktop)

**Layout Strategy**:
- Multi-column layouts (use horizontal space)
- Side navigation always visible
- Multiple information panels simultaneously
- Fixed widths with max-width constraints (don't stretch to 4K)

**Interaction Strategy**:
- Hover states for additional information
- Keyboard shortcuts
- Right-click context menus
- Drag and drop where helpful
- Multi-select with Shift/Cmd

**Content Strategy**:
- Show more information upfront (less progressive disclosure)
- Data tables with many columns
- Richer visualizations
- More detailed descriptions

### Print Adaptation (Screen → Print)

**Layout Strategy**:
- Page breaks at logical points
- Remove navigation, footer, interactive elements
- Black and white (or limited color)
- Proper margins for binding

**Content Strategy**:
- Expand shortened content (show full URLs, hidden sections)
- Add page numbers, headers, footers
- Include metadata (print date, page title)
- Convert charts to print-friendly versions

### Email Adaptation (Web → Email)

**Layout Strategy**:
- Narrow width (600px max)
- Single column only
- Inline CSS (no external stylesheets)
- Table-based layouts (for email client compatibility)

**Interaction Strategy**:
- Large, obvious CTAs (buttons not text links)
- No hover states (not reliable)
- Deep links to web app for complex interactions

## Implement Adaptations

Apply changes systematically:

### Responsive Breakpoints

Choose appropriate breakpoints:
- Mobile: 320px-767px
- Tablet: 768px-1023px
- Desktop: 1024px+
- Or content-driven breakpoints (where design breaks)

### Layout Adaptation Techniques

- **CSS Grid/Flexbox**: Reflow layouts automatically
- **Container Queries**: Adapt based on container, not viewport
- **\`clamp()\`**: Fluid sizing between min and max
- **Media queries**: Different styles for different contexts
- **Display properties**: Show/hide elements per context

### Touch Adaptation

- Increase touch target sizes (44x44px minimum)
- Add more spacing between interactive elements
- Remove hover-dependent interactions
- Add touch feedback (ripples, highlights)
- Consider thumb zones (easier to reach bottom than top)

### Content Adaptation

- Use \`display: none\` sparingly (still downloads)
- Progressive enhancement (core content first, enhancements on larger screens)
- Lazy loading for off-screen content
- Responsive images (\`srcset\`, \`picture\` element)

### Navigation Adaptation

- Transform complex nav to hamburger/drawer on mobile
- Bottom nav bar for mobile apps
- Persistent side navigation on desktop
- Breadcrumbs on smaller screens for context

**IMPORTANT**: Test on real devices, not just browser DevTools. Device emulation is helpful but not perfect.

**NEVER**:
- Hide core functionality on mobile (if it matters, make it work)
- Assume desktop = powerful device (consider accessibility, older machines)
- Use different information architecture across contexts (confusing)
- Break user expectations for platform (mobile users expect mobile patterns)
- Forget landscape orientation on mobile/tablet
- Use generic breakpoints blindly (use content-driven breakpoints)
- Ignore touch on desktop (many desktop devices have touch)

## Verify Adaptations

Test thoroughly across contexts:

- **Real devices**: Test on actual phones, tablets, desktops
- **Different orientations**: Portrait and landscape
- **Different browsers**: Safari, Chrome, Firefox, Edge
- **Different OS**: iOS, Android, Windows, macOS
- **Different input methods**: Touch, mouse, keyboard
- **Edge cases**: Very small screens (320px), very large screens (4K)
- **Slow connections**: Test on throttled network

Remember: You're a cross-platform design expert. Make experiences that feel native to each context while maintaining brand and functionality consistency. Adapt intentionally, test thoroughly.`
  },
  {
    id: 'clarify',
    name: 'Clarify',
    icon: <Type size={16} strokeWidth={1.5} />,
    description: 'Improve unclear UX copy, error messages, microcopy, labels, and instructions.',
    code: `---
name: clarify
description: Improve unclear UX copy, error messages, microcopy, labels, and instructions. Makes interfaces easier to understand and use.
user-invokable: true
args:
  - name: target
    description: The feature or component with unclear copy (optional)
    required: false
---

Identify and improve unclear, confusing, or poorly written interface text to make the product easier to understand and use.

## Assess Current Copy

Identify what makes the text unclear or ineffective:

1. **Find clarity problems**:
   - **Jargon**: Technical terms users won't understand
   - **Ambiguity**: Multiple interpretations possible
   - **Passive voice**: "Your file has been uploaded" vs "We uploaded your file"
   - **Length**: Too wordy or too terse
   - **Assumptions**: Assuming user knowledge they don't have
   - **Missing context**: Users don't know what to do or why
   - **Tone mismatch**: Too formal, too casual, or inappropriate for situation

2. **Understand the context**:
   - Who's the audience? (Technical? General? First-time users?)
   - What's the user's mental state? (Stressed during error? Confident during success?)
   - What's the action? (What do we want users to do?)
   - What's the constraint? (Character limits? Space limitations?)

**CRITICAL**: Clear copy helps users succeed. Unclear copy creates frustration, errors, and support tickets.

## Plan Copy Improvements

Create a strategy for clearer communication:

- **Primary message**: What's the ONE thing users need to know?
- **Action needed**: What should users do next (if anything)?
- **Tone**: How should this feel? (Helpful? Apologetic? Encouraging?)
- **Constraints**: Length limits, brand voice, localization considerations

**IMPORTANT**: Good UX writing is invisible. Users should understand immediately without noticing the words.

## Improve Copy Systematically

Refine text across these common areas:

### Error Messages
**Bad**: "Error 403: Forbidden"
**Good**: "You don't have permission to view this page. Contact your admin for access."

**Bad**: "Invalid input"
**Good**: "Email addresses need an @ symbol. Try: name@example.com"

**Principles**:
- Explain what went wrong in plain language
- Suggest how to fix it
- Don't blame the user
- Include examples when helpful
- Link to help/support if applicable

### Form Labels & Instructions
**Bad**: "DOB (MM/DD/YYYY)"
**Good**: "Date of birth" (with placeholder showing format)

**Bad**: "Enter value here"
**Good**: "Your email address" or "Company name"

**Principles**:
- Use clear, specific labels (not generic placeholders)
- Show format expectations with examples
- Explain why you're asking (when not obvious)
- Put instructions before the field, not after
- Keep required field indicators clear

### Button & CTA Text
**Bad**: "Click here" | "Submit" | "OK"
**Good**: "Create account" | "Save changes" | "Got it, thanks"

**Principles**:
- Describe the action specifically
- Use active voice (verb + noun)
- Match user's mental model
- Be specific ("Save" is better than "OK")

### Help Text & Tooltips
**Bad**: "This is the username field"
**Good**: "Choose a username. You can change this later in Settings."

**Principles**:
- Add value (don't just repeat the label)
- Answer the implicit question ("What is this?" or "Why do you need this?")
- Keep it brief but complete
- Link to detailed docs if needed

### Empty States
**Bad**: "No items"
**Good**: "No projects yet. Create your first project to get started."

**Principles**:
- Explain why it's empty (if not obvious)
- Show next action clearly
- Make it welcoming, not dead-end

### Success Messages
**Bad**: "Success"
**Good**: "Settings saved! Your changes will take effect immediately."

**Principles**:
- Confirm what happened
- Explain what happens next (if relevant)
- Be brief but complete
- Match the user's emotional moment (celebrate big wins)

### Loading States
**Bad**: "Loading..." (for 30+ seconds)
**Good**: "Analyzing your data... this usually takes 30-60 seconds"

**Principles**:
- Set expectations (how long?)
- Explain what's happening (when it's not obvious)
- Show progress when possible
- Offer escape hatch if appropriate ("Cancel")

### Confirmation Dialogs
**Bad**: "Are you sure?"
**Good**: "Delete 'Project Alpha'? This can't be undone."

**Principles**:
- State the specific action
- Explain consequences (especially for destructive actions)
- Use clear button labels ("Delete project" not "Yes")
- Don't overuse confirmations (only for risky actions)

### Navigation & Wayfinding
**Bad**: Generic labels like "Items" | "Things" | "Stuff"
**Good**: Specific labels like "Your projects" | "Team members" | "Settings"

**Principles**:
- Be specific and descriptive
- Use language users understand (not internal jargon)
- Make hierarchy clear
- Consider information scent (breadcrumbs, current location)

## Apply Clarity Principles

Every piece of copy should follow these rules:

1. **Be specific**: "Enter email" not "Enter value"
2. **Be concise**: Cut unnecessary words (but don't sacrifice clarity)
3. **Be active**: "Save changes" not "Changes will be saved"
4. **Be human**: "Oops, something went wrong" not "System error encountered"
5. **Be helpful**: Tell users what to do, not just what happened
6. **Be consistent**: Use same terms throughout (don't vary for variety)

**NEVER**:
- Use jargon without explanation
- Blame users ("You made an error" → "This field is required")
- Be vague ("Something went wrong" without explanation)
- Use passive voice unnecessarily
- Write overly long explanations (be concise)
- Use humor for errors (be empathetic instead)
- Assume technical knowledge
- Vary terminology (pick one term and stick with it)
- Repeat information (headers restating intros, redundant explanations)
- Use placeholders as the only labels (they disappear when users type)

## Verify Improvements

Test that copy improvements work:

- **Comprehension**: Can users understand without context?
- **Actionability**: Do users know what to do next?
- **Brevity**: Is it as short as possible while remaining clear?
- **Consistency**: Does it match terminology elsewhere?
- **Tone**: Is it appropriate for the situation?

Remember: You're a clarity expert with excellent communication skills. Write like you're explaining to a smart friend who's unfamiliar with the product. Be clear, be helpful, be human.`
  },
  {
    id: 'distill',
    name: 'Distill',
    icon: <Box size={16} strokeWidth={1.5} />,
    description: 'Strip designs to their essence by removing unnecessary complexity. Great design is simple, powerful, and clean.',
    code: `---
name: distill
description: Strip designs to their essence by removing unnecessary complexity. Great design is simple, powerful, and clean.
user-invokable: true
args:
  - name: target
    description: The feature or component to distill (optional)
    required: false
---

Remove unnecessary complexity from designs, revealing the essential elements and creating clarity through ruthless simplification.

## MANDATORY PREPARATION

### Context Gathering (Do This First)

You cannot do a great job without having necessary context, such as target audience (critical), desired use-cases (critical), and understanding what's truly essential vs nice-to-have for this product.

Attempt to gather these from the current thread or codebase.

1. If you don't find *exact* information and have to infer from existing design and functionality, you MUST STOP and STOP and call the AskUserQuestionTool to clarify. whether you got it right.
2. Otherwise, if you can't fully infer or your level of confidence is medium or lower, you MUST STOP and call the AskUserQuestionTool to clarify. clarifying questions first to complete your context.

Do NOT proceed until you have answers. Simplifying the wrong things destroys usability.

### Use frontend-design skill

Use the frontend-design skill for design principles and anti-patterns. Do NOT proceed until it has executed and you know all DO's and DON'Ts.

---

## Assess Current State

Analyze what makes the design feel complex or cluttered:

1. **Identify complexity sources**:
   - **Too many elements**: Competing buttons, redundant information, visual clutter
   - **Excessive variation**: Too many colors, fonts, sizes, styles without purpose
   - **Information overload**: Everything visible at once, no progressive disclosure
   - **Visual noise**: Unnecessary borders, shadows, backgrounds, decorations
   - **Confusing hierarchy**: Unclear what matters most
   - **Feature creep**: Too many options, actions, or paths forward

2. **Find the essence**:
   - What's the primary user goal? (There should be ONE)
   - What's actually necessary vs nice-to-have?
   - What can be removed, hidden, or combined?
   - What's the 20% that delivers 80% of value?

If any of these are unclear from the codebase, STOP and call the AskUserQuestionTool to clarify.

**CRITICAL**: Simplicity is not about removing features - it's about removing obstacles between users and their goals. Every element should justify its existence.

## Plan Simplification

Create a ruthless editing strategy:

- **Core purpose**: What's the ONE thing this should accomplish?
- **Essential elements**: What's truly necessary to achieve that purpose?
- **Progressive disclosure**: What can be hidden until needed?
- **Consolidation opportunities**: What can be combined or integrated?

**IMPORTANT**: Simplification is hard. It requires saying no to good ideas to make room for great execution. Be ruthless.

## Simplify the Design

Systematically remove complexity across these dimensions:

### Information Architecture
- **Reduce scope**: Remove secondary actions, optional features, redundant information
- **Progressive disclosure**: Hide complexity behind clear entry points (accordions, modals, step-through flows)
- **Combine related actions**: Merge similar buttons, consolidate forms, group related content
- **Clear hierarchy**: ONE primary action, few secondary actions, everything else tertiary or hidden
- **Remove redundancy**: If it's said elsewhere, don't repeat it here

### Visual Simplification
- **Reduce color palette**: Use 1-2 colors plus neutrals, not 5-7 colors
- **Limit typography**: One font family, 3-4 sizes maximum, 2-3 weights
- **Remove decorations**: Eliminate borders, shadows, backgrounds that don't serve hierarchy or function
- **Flatten structure**: Reduce nesting, remove unnecessary containers—never nest cards inside cards
- **Remove unnecessary cards**: Cards aren't needed for basic layout; use spacing and alignment instead
- **Consistent spacing**: Use one spacing scale, remove arbitrary gaps

### Layout Simplification
- **Linear flow**: Replace complex grids with simple vertical flow where possible
- **Remove sidebars**: Move secondary content inline or hide it
- **Full-width**: Use available space generously instead of complex multi-column layouts
- **Consistent alignment**: Pick left or center, stick with it
- **Generous white space**: Let content breathe, don't pack everything tight

### Interaction Simplification
- **Reduce choices**: Fewer buttons, fewer options, clearer path forward (paradox of choice is real)
- **Smart defaults**: Make common choices automatic, only ask when necessary
- **Inline actions**: Replace modal flows with inline editing where possible
- **Remove steps**: Can signup be one step instead of three? Can checkout be simplified?
- **Clear CTAs**: ONE obvious next step, not five competing actions

### Content Simplification
- **Shorter copy**: Cut every sentence in half, then do it again
- **Active voice**: "Save changes" not "Changes will be saved"
- **Remove jargon**: Plain language always wins
- **Scannable structure**: Short paragraphs, bullet points, clear headings
- **Essential information only**: Remove marketing fluff, legalese, hedging
- **Remove redundant copy**: No headers restating intros, no repeated explanations, say it once

### Code Simplification
- **Remove unused code**: Dead CSS, unused components, orphaned files
- **Flatten component trees**: Reduce nesting depth
- **Consolidate styles**: Merge similar styles, use utilities consistently
- **Reduce variants**: Does that component need 12 variations, or can 3 cover 90% of cases?

**NEVER**:
- Remove necessary functionality (simplicity ≠ feature-less)
- Sacrifice accessibility for simplicity (clear labels and ARIA still required)
- Make things so simple they're unclear (mystery ≠ minimalism)
- Remove information users need to make decisions
- Eliminate hierarchy completely (some things should stand out)
- Oversimplify complex domains (match complexity to actual task complexity)

## Verify Simplification

Ensure simplification improves usability:

- **Faster task completion**: Can users accomplish goals more quickly?
- **Reduced cognitive load**: Is it easier to understand what to do?
- **Still complete**: Are all necessary features still accessible?
- **Clearer hierarchy**: Is it obvious what matters most?
- **Better performance**: Does simpler design load faster?

## Document Removed Complexity

If you removed features or options:
- Document why they were removed
- Consider if they need alternative access points
- Note any user feedback to monitor

Remember: You have great taste and judgment. Simplification is an act of confidence - knowing what to keep and courage to remove the rest. As Antoine de Saint-Exupéry said: "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away."`
  },
  {
    id: 'delight',
    name: 'Delight',
    icon: <CheckCircle size={16} strokeWidth={1.5} />,
    description: 'Add moments of joy, personality, and unexpected touches that make interfaces memorable and enjoyable to use.',
    code: `---
name: delight
description: Add moments of joy, personality, and unexpected touches that make interfaces memorable and enjoyable to use. Elevates functional to delightful.
user-invokable: true
args:
  - name: target
    description: The feature or area to add delight to (optional)
    required: false
---

Identify opportunities to add moments of joy, personality, and unexpected polish that transform functional interfaces into delightful experiences.

## MANDATORY PREPARATION

### Context Gathering (Do This First)

You cannot do a great job without having necessary context, such as target audience (critical), desired use-cases (critical), brand personality (playful vs professional vs quirky vs elegant), and what's appropriate for the domain.

Attempt to gather these from the current thread or codebase.

1. If you don't find *exact* information and have to infer from existing design and functionality, you MUST STOP and STOP and call the AskUserQuestionTool to clarify. whether you got it right.
2. Otherwise, if you can't fully infer or your level of confidence is medium or lower, you MUST STOP and call the AskUserQuestionTool to clarify. clarifying questions first to complete your context.

Do NOT proceed until you have answers. Delight that's wrong for the context is worse than no delight at all.

### Use frontend-design skill

Use the frontend-design skill for design principles and anti-patterns. Do NOT proceed until it has executed and you know all DO's and DON'Ts.

---

## Assess Delight Opportunities

Identify where delight would enhance (not distract from) the experience:

1. **Find natural delight moments**:
   - **Success states**: Completed actions (save, send, publish)
   - **Empty states**: First-time experiences, onboarding
   - **Loading states**: Waiting periods that could be entertaining
   - **Achievements**: Milestones, streaks, completions
   - **Interactions**: Hover states, clicks, drags
   - **Errors**: Softening frustrating moments
   - **Easter eggs**: Hidden discoveries for curious users

2. **Understand the context**:
   - What's the brand personality? (Playful? Professional? Quirky? Elegant?)
   - Who's the audience? (Tech-savvy? Creative? Corporate?)
   - What's the emotional context? (Accomplishment? Exploration? Frustration?)
   - What's appropriate? (Banking app ≠ gaming app)

3. **Define delight strategy**:
   - **Subtle sophistication**: Refined micro-interactions (luxury brands)
   - **Playful personality**: Whimsical illustrations and copy (consumer apps)
   - **Helpful surprises**: Anticipating needs before users ask (productivity tools)
   - **Sensory richness**: Satisfying sounds, smooth animations (creative tools)

If any of these are unclear from the codebase, STOP and call the AskUserQuestionTool to clarify.

**CRITICAL**: Delight should enhance usability, never obscure it. If users notice the delight more than accomplishing their goal, you've gone too far.

## Delight Principles

Follow these guidelines:

### Delight Amplifies, Never Blocks
- Delight moments should be quick (< 1 second)
- Never delay core functionality for delight
- Make delight skippable or subtle
- Respect user's time and task focus

### Surprise and Discovery
- Hide delightful details for users to discover
- Reward exploration and curiosity
- Don't announce every delight moment
- Let users share discoveries with others

### Appropriate to Context
- Match delight to emotional moment (celebrate success, empathize with errors)
- Respect the user's state (don't be playful during critical errors)
- Match brand personality and audience expectations
- Cultural sensitivity (what's delightful varies by culture)

### Compound Over Time
- Delight should remain fresh with repeated use
- Vary responses (not same animation every time)
- Reveal deeper layers with continued use
- Build anticipation through patterns

## Delight Techniques

Add personality and joy through these methods:

### Micro-interactions & Animation

**Button delight**:
\`\`\`css
/* Satisfying button press */
.button {
  transition: transform 0.1s, box-shadow 0.1s;
}
.button:active {
  transform: translateY(2px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

/* Ripple effect on click */
/* Smooth lift on hover */
.button:hover {
  transform: translateY(-2px);
  transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1); /* ease-out-quart */
}
\`\`\`

**Loading delight**:
- Playful loading animations (not just spinners)
- Personality in loading messages ("Herding pixels..." "Teaching robots to dance...")
- Progress indication with encouraging messages
- Skeleton screens with subtle animations

**Success animations**:
- Checkmark draw animation
- Confetti burst for major achievements
- Gentle scale + fade for confirmation
- Satisfying sound effects (subtle)

**Hover surprises**:
- Icons that animate on hover
- Color shifts or glow effects
- Tooltip reveals with personality
- Cursor changes (custom cursors for branded experiences)

### Personality in Copy

**Playful error messages**:
\`\`\`
"Error 404"
"This page is playing hide and seek. (And winning)"

"Connection failed"
"Looks like the internet took a coffee break. Want to retry?"
\`\`\`

**Encouraging empty states**:
\`\`\`
"No projects"
"Your canvas awaits. Create something amazing."

"No messages"
"Inbox zero! You're crushing it today."
\`\`\`

**Playful labels & tooltips**:
\`\`\`
"Delete"
"Send to void" (for playful brand)

"Help"
"Rescue me" (tooltip)
\`\`\`

**IMPORTANT**: Match copy personality to brand. Banks shouldn't be wacky, but they can be warm.

### Illustrations & Visual Personality

**Custom illustrations**:
- Empty state illustrations (not stock icons)
- Error state illustrations (friendly monsters, quirky characters)
- Loading state illustrations (animated characters)
- Success state illustrations (celebrations)

**Icon personality**:
- Custom icon set matching brand personality
- Animated icons (subtle motion on hover/click)
- Illustrative icons (more detailed than generic)
- Consistent style across all icons

**Background effects**:
- Subtle particle effects
- Gradient mesh backgrounds
- Geometric patterns
- Parallax depth
- Time-of-day themes (morning vs night)

### Satisfying Interactions

**Drag and drop delight**:
- Lift effect on drag (shadow, scale)
- Snap animation when dropped
- Satisfying placement sound
- Undo toast ("Dropped in wrong place? [Undo]")

**Toggle switches**:
- Smooth slide with spring physics
- Color transition
- Haptic feedback on mobile
- Optional sound effect

**Progress & achievements**:
- Streak counters with celebratory milestones
- Progress bars that "celebrate" at 100%
- Badge unlocks with animation
- Playful stats ("You're on fire! 5 days in a row")

**Form interactions**:
- Input fields that animate on focus
- Checkboxes that bounce when checked
- Success state that celebrates valid input
- Auto-grow textareas

### Sound Design

**Subtle audio cues** (when appropriate):
- Notification sounds (distinctive but not annoying)
- Success sounds (satisfying "ding")
- Error sounds (empathetic, not harsh)
- Typing sounds for chat/messaging
- Ambient background audio (very subtle)

**IMPORTANT**:
- Respect system sound settings
- Provide mute option
- Keep volumes quiet (subtle cues, not alarms)
- Don't play on every interaction (sound fatigue is real)

### Easter Eggs & Hidden Delights

**Discovery rewards**:
- Konami code unlocks special theme
- Hidden keyboard shortcuts (Cmd+K for special features)
- Hover reveals on logos or illustrations
- Alt text jokes on images (for screen reader users too!)
- Console messages for developers ("Like what you see? We're hiring!")

**Seasonal touches**:
- Holiday themes (subtle, tasteful)
- Seasonal color shifts
- Weather-based variations
- Time-based changes (dark at night, light during day)

**Contextual personality**:
- Different messages based on time of day
- Responses to specific user actions
- Randomized variations (not same every time)
- Progressive reveals with continued use

### Loading & Waiting States

**Make waiting engaging**:
- Interesting loading messages that rotate
- Progress bars with personality
- Mini-games during long loads
- Fun facts or tips while waiting
- Countdown with encouraging messages

\`\`\`
Loading messages rotation:
- "Waking up the servers..."
- "Teaching robots to dance..."
- "Consulting the magic 8-ball..."
- "Counting backwards from infinity..."
\`\`\`

### Celebration Moments

**Success celebrations**:
- Confetti for major milestones
- Animated checkmarks for completions
- Progress bar celebrations at 100%
- "Achievement unlocked" style notifications
- Personalized messages ("You published your 10th article!")

**Milestone recognition**:
- First-time actions get special treatment
- Streak tracking and celebration
- Progress toward goals
- Anniversary celebrations

## Implementation Patterns

**Animation libraries**:
- Framer Motion (React)
- GSAP (universal)
- Lottie (After Effects animations)
- Canvas confetti (party effects)

**Sound libraries**:
- Howler.js (audio management)
- Use-sound (React hook)

**Physics libraries**:
- React Spring (spring physics)
- Popmotion (animation primitives)

**IMPORTANT**: File size matters. Compress images, optimize animations, lazy load delight features.

**NEVER**:
- Delay core functionality for delight
- Force users through delightful moments (make skippable)
- Use delight to hide poor UX
- Overdo it (less is more)
- Ignore accessibility (animate responsibly, provide alternatives)
- Make every interaction delightful (special moments should be special)
- Sacrifice performance for delight
- Be inappropriate for context (read the room)

## Verify Delight Quality

Test that delight actually delights:

- **User reactions**: Do users smile? Share screenshots?
- **Doesn't annoy**: Still pleasant after 100th time?
- **Doesn't block**: Can users opt out or skip?
- **Performant**: No jank, no slowdown
- **Appropriate**: Matches brand and context
- **Accessible**: Works with reduced motion, screen readers

Remember: Delight is the difference between a tool and an experience. Add personality, surprise users positively, and create moments worth sharing. But always respect usability - delight should enhance, never obstruct.`
  },
  {
    id: 'teach-impeccable',
    name: 'Teach',
    icon: <Settings size={16} strokeWidth={1.5} />,
    description: 'One-time setup that gathers design context for your project and saves it to your AI config file.',
    code: `---
name: teach-impeccable
description: One-time setup that gathers design context for your project and saves it to your AI config file. Run once to establish persistent design guidelines.
user-invokable: true
---

Gather design context for this project, then persist it for all future sessions.

## Step 1: Explore the Codebase

Before asking questions, thoroughly scan the project to discover what you can:

- **README and docs**: Project purpose, target audience, any stated goals
- **Package.json / config files**: Tech stack, dependencies, existing design libraries
- **Existing components**: Current design patterns, spacing, typography in use
- **Brand assets**: Logos, favicons, color values already defined
- **Design tokens / CSS variables**: Existing color palettes, font stacks, spacing scales
- **Any style guides or brand documentation**

Note what you've learned and what remains unclear.

## Step 2: Ask UX-Focused Questions

STOP and call the AskUserQuestionTool to clarify. Focus only on what you couldn't infer from the codebase:

### Users & Purpose
- Who uses this? What's their context when using it?
- What job are they trying to get done?
- What emotions should the interface evoke? (confidence, delight, calm, urgency, etc.)

### Brand & Personality
- How would you describe the brand personality in 3 words?
- Any reference sites or apps that capture the right feel? What specifically about them?
- What should this explicitly NOT look like? Any anti-references?

### Aesthetic Preferences
- Any strong preferences for visual direction? (minimal, bold, elegant, playful, technical, organic, etc.)
- Light mode, dark mode, or both?
- Any colors that must be used or avoided?

### Accessibility & Inclusion
- Specific accessibility requirements? (WCAG level, known user needs)
- Considerations for reduced motion, color blindness, or other accommodations?

Skip questions where the answer is already clear from the codebase exploration.

## Step 3: Write Design Context

Synthesize your findings and the user's answers into a \`## Design Context\` section:

\`\`\`markdown
## Design Context

### Users
[Who they are, their context, the job to be done]

### Brand Personality
[Voice, tone, 3-word personality, emotional goals]

### Aesthetic Direction
[Visual tone, references, anti-references, theme]

### Design Principles
[3-5 principles derived from the conversation that should guide all design decisions]
\`\`\`

Write this section to CLAUDE.md in the project root. If the file exists, append or update the Design Context section.

Confirm completion and summarize the key design principles that will now guide all future work.`
  },
  {
    id: 'onboard',
    name: 'Onboard',
    icon: <CheckCircle size={16} strokeWidth={1.5} />,
    description: 'Design or improve onboarding flows, empty states, and first-time user experiences.',
    code: `---
name: onboard
description: Design or improve onboarding flows, empty states, and first-time user experiences. Helps users get started successfully and understand value quickly.
user-invokable: true
args:
  - name: target
    description: The feature or area needing onboarding (optional)
    required: false
---

Create or improve onboarding experiences that help users understand, adopt, and succeed with the product quickly.

## Assess Onboarding Needs

Understand what users need to learn and why:

1. **Identify the challenge**:
   - What are users trying to accomplish?
   - What's confusing or unclear about current experience?
   - Where do users get stuck or drop off?
   - What's the "aha moment" we want users to reach?

2. **Understand the users**:
   - What's their experience level? (Beginners, power users, mixed?)
   - What's their motivation? (Excited and exploring? Required by work?)
   - What's their time commitment? (5 minutes? 30 minutes?)
   - What alternatives do they know? (Coming from competitor? New to category?)

3. **Define success**:
   - What's the minimum users need to learn to be successful?
   - What's the key action we want them to take? (First project? First invite?)
   - How do we know onboarding worked? (Completion rate? Time to value?)

**CRITICAL**: Onboarding should get users to value as quickly as possible, not teach everything possible.

## Onboarding Principles

Follow these core principles:

### Show, Don't Tell
- Demonstrate with working examples, not just descriptions
- Provide real functionality in onboarding, not separate tutorial mode
- Use progressive disclosure - teach one thing at a time

### Make It Optional (When Possible)
- Let experienced users skip onboarding
- Don't block access to product
- Provide "Skip" or "I'll explore on my own" options

### Time to Value
- Get users to their "aha moment" ASAP
- Front-load most important concepts
- Teach 20% that delivers 80% of value
- Save advanced features for contextual discovery

### Context Over Ceremony
- Teach features when users encounter them, not upfront
- Empty states are onboarding opportunities
- Tooltips and hints at point of use

### Respect User Intelligence
- Don't patronize or over-explain
- Be concise and clear
- Assume users can figure out standard patterns

## Design Onboarding Experiences

Create appropriate onboarding for the context:

### Initial Product Onboarding

**Welcome Screen**:
- Clear value proposition (what is this product?)
- What users will learn/accomplish
- Time estimate (honest about commitment)
- Option to skip (for experienced users)

**Account Setup**:
- Minimal required information (collect more later)
- Explain why you're asking for each piece of information
- Smart defaults where possible
- Social login when appropriate

**Core Concept Introduction**:
- Introduce 1-3 core concepts (not everything)
- Use simple language and examples
- Interactive when possible (do, don't just read)
- Progress indication (step 1 of 3)

**First Success**:
- Guide users to accomplish something real
- Pre-populated examples or templates
- Celebrate completion (but don't overdo it)
- Clear next steps

### Feature Discovery & Adoption

**Empty States**:
Instead of blank space, show:
- What will appear here (description + screenshot/illustration)
- Why it's valuable
- Clear CTA to create first item
- Example or template option

Example:
\`\`\`
No projects yet
Projects help you organize your work and collaborate with your team.
[Create your first project] or [Start from template]
\`\`\`

**Contextual Tooltips**:
- Appear at relevant moment (first time user sees feature)
- Point directly at relevant UI element
- Brief explanation + benefit
- Dismissable (with "Don't show again" option)
- Optional "Learn more" link

**Feature Announcements**:
- Highlight new features when they're released
- Show what's new and why it matters
- Let users try immediately
- Dismissable

**Progressive Onboarding**:
- Teach features when users encounter them
- Badges or indicators on new/unused features
- Unlock complexity gradually (don't show all options immediately)

### Guided Tours & Walkthroughs

**When to use**:
- Complex interfaces with many features
- Significant changes to existing product
- Industry-specific tools needing domain knowledge

**How to design**:
- Spotlight specific UI elements (dim rest of page)
- Keep steps short (3-7 steps max per tour)
- Allow users to click through tour freely
- Include "Skip tour" option
- Make replayable (help menu)

**Best practices**:
- Interactive > passive (let users click real buttons)
- Focus on workflow, not features ("Create a project" not "This is the project button")
- Provide sample data so actions work

### Interactive Tutorials

**When to use**:
- Users need hands-on practice
- Concepts are complex or unfamiliar
- High stakes (better to practice in safe environment)

**How to design**:
- Sandbox environment with sample data
- Clear objectives ("Create a chart showing sales by region")
- Step-by-step guidance
- Validation (confirm they did it right)
- Graduation moment (you're ready!)

### Documentation & Help

**In-product help**:
- Contextual help links throughout interface
- Keyboard shortcut reference
- Search-able help center
- Video tutorials for complex workflows

**Help patterns**:
- \`?\` icon near complex features
- "Learn more" links in tooltips
- Keyboard shortcut hints (\`⌘K\` shown on search box)

## Empty State Design

Every empty state needs:

### What Will Be Here
"Your recent projects will appear here"

### Why It Matters  
"Projects help you organize your work and collaborate with your team"

### How to Get Started
[Create project] or [Import from template]

### Visual Interest
Illustration or icon (not just text on blank page)

### Contextual Help
"Need help getting started? [Watch 2-min tutorial]"

**Empty state types**:
- **First use**: Never used this feature (emphasize value, provide template)
- **User cleared**: Intentionally deleted everything (light touch, easy to recreate)
- **No results**: Search or filter returned nothing (suggest different query, clear filters)
- **No permissions**: Can't access (explain why, how to get access)
- **Error state**: Failed to load (explain what happened, retry option)

## Implementation Patterns

### Technical approaches:

**Tooltip libraries**: Tippy.js, Popper.js
**Tour libraries**: Intro.js, Shepherd.js, React Joyride
**Modal patterns**: Focus trap, backdrop, ESC to close
**Progress tracking**: LocalStorage for "seen" states
**Analytics**: Track completion, drop-off points

**Storage patterns**:
\`\`\`javascript
// Track which onboarding steps user has seen
localStorage.setItem('onboarding-completed', 'true');
localStorage.setItem('feature-tooltip-seen-reports', 'true');
\`\`\`

**IMPORTANT**: Don't show same onboarding twice (annoying). Track completion and respect dismissals.

**NEVER**:
- Force users through long onboarding before they can use product
- Patronize users with obvious explanations
- Show same tooltip repeatedly (respect dismissals)
- Block all UI during tour (let users explore)
- Create separate tutorial mode disconnected from real product
- Overwhelm with information upfront (progressive disclosure!)
- Hide "Skip" or make it hard to find
- Forget about returning users (don't show initial onboarding again)

## Verify Onboarding Quality

Test with real users:

- **Time to completion**: Can users complete onboarding quickly?
- **Comprehension**: Do users understand after completing?
- **Action**: Do users take desired next step?
- **Skip rate**: Are too many users skipping? (Maybe it's too long/not valuable)
- **Completion rate**: Are users completing? (If low, simplify)
- **Time to value**: How long until users get first value?

Remember: You're a product educator with excellent teaching instincts. Get users to their "aha moment" as quickly as possible. Teach the essential, make it contextual, respect user time and intelligence.`
  },
  {
    id: 'normalize',
    name: 'Normalize',
    icon: <Layers size={16} strokeWidth={1.5} />,
    description: 'Normalize design to match your design system and ensure consistency.',
    code: `---
name: normalize
description: Normalize design to match your design system and ensure consistency
user-invokable: true
args:
  - name: feature
    description: The page, route, or feature to normalize (optional)
    required: false
---

Analyze and redesign the feature to perfectly match our design system standards, aesthetics, and established patterns.

## Plan

Before making changes, deeply understand the context:

1. **Discover the design system**: Search for design system documentation, UI guidelines, component libraries, or style guides (grep for "design system", "ui guide", "style guide", etc.). Study it thoroughly until you understand:
   - Core design principles and aesthetic direction
   - Target audience and personas
   - Component patterns and conventions
   - Design tokens (colors, typography, spacing)
   
   **CRITICAL**: If something isn't clear, ask. Don't guess at design system principles.

2. **Analyze the current feature**: Assess what works and what doesn't:
   - Where does it deviate from design system patterns?
   - Which inconsistencies are cosmetic vs. functional?
   - What's the root cause—missing tokens, one-off implementations, or conceptual misalignment?

3. **Create a normalization plan**: Define specific changes that will align the feature with the design system:
   - Which components can be replaced with design system equivalents?
   - Which styles need to use design tokens instead of hard-coded values?
   - How can UX patterns match established user flows?
   
   **IMPORTANT**: Great design is effective design. Prioritize UX consistency and usability over visual polish alone. Think through the best possible experience for your use case and personas first.

## Execute

Systematically address all inconsistencies across these dimensions:

- **Typography**: Use design system fonts, sizes, weights, and line heights. Replace hard-coded values with typographic tokens or classes.
- **Color & Theme**: Apply design system color tokens. Remove one-off color choices that break the palette.
- **Spacing & Layout**: Use spacing tokens (margins, padding, gaps). Align with grid systems and layout patterns used elsewhere.
- **Components**: Replace custom implementations with design system components. Ensure props and variants match established patterns.
- **Motion & Interaction**: Match animation timing, easing, and interaction patterns to other features.
- **Responsive Behavior**: Ensure breakpoints and responsive patterns align with design system standards.
- **Accessibility**: Verify contrast ratios, focus states, ARIA labels match design system requirements.
- **Progressive Disclosure**: Match information hierarchy and complexity management to established patterns.

**NEVER**:
- Create new one-off components when design system equivalents exist
- Hard-code values that should use design tokens
- Introduce new patterns that diverge from the design system
- Compromise accessibility for visual consistency

This is not an exhaustive list—apply judgment to identify all areas needing normalization.

## Clean Up

After normalization, ensure code quality:

- **Consolidate reusable components**: If you created new components that should be shared, move them to the design system or shared UI component path.
- **Remove orphaned code**: Delete unused implementations, styles, or files made obsolete by normalization.
- **Verify quality**: Lint, type-check, and test according to repository guidelines. Ensure normalization didn't introduce regressions.
- **Ensure DRYness**: Look for duplication introduced during refactoring and consolidate.

Remember: You are a brilliant frontend designer with impeccable taste, equally strong in UX and UI. Your attention to detail and eye for end-to-end user experience is world class. Execute with precision and thoroughness.`
  },
  {
    id: 'audit',
    name: 'Audit',
    icon: <Search size={16} strokeWidth={1.5} />,
    description: 'Perform comprehensive audit of interface quality across accessibility, performance, theming, and responsive design.',
    code: `---
name: audit
description: Perform comprehensive audit of interface quality across accessibility, performance, theming, and responsive design. Generates detailed report of issues with severity ratings and recommendations.
user-invokable: true
args:
  - name: area
    description: The feature or area to audit (optional)
    required: false
---

Run systematic quality checks and generate a comprehensive audit report with prioritized issues and actionable recommendations. Don't fix issues - document them for other commands to address.

**First**: Use the frontend-design skill for design principles and anti-patterns.

## Diagnostic Scan

Run comprehensive checks across multiple dimensions:

1. **Accessibility (A11y)** - Check for:
   - **Contrast issues**: Text contrast ratios < 4.5:1 (or 7:1 for AAA)
   - **Missing ARIA**: Interactive elements without proper roles, labels, or states
   - **Keyboard navigation**: Missing focus indicators, illogical tab order, keyboard traps
   - **Semantic HTML**: Improper heading hierarchy, missing landmarks, divs instead of buttons
   - **Alt text**: Missing or poor image descriptions
   - **Form issues**: Inputs without labels, poor error messaging, missing required indicators

2. **Performance** - Check for:
   - **Layout thrashing**: Reading/writing layout properties in loops
   - **Expensive animations**: Animating layout properties (width, height, top, left) instead of transform/opacity
   - **Missing optimization**: Images without lazy loading, unoptimized assets, missing will-change
   - **Bundle size**: Unnecessary imports, unused dependencies
   - **Render performance**: Unnecessary re-renders, missing memoization

3. **Theming** - Check for:
   - **Hard-coded colors**: Colors not using design tokens
   - **Broken dark mode**: Missing dark mode variants, poor contrast in dark theme
   - **Inconsistent tokens**: Using wrong tokens, mixing token types
   - **Theme switching issues**: Values that don't update on theme change

4. **Responsive Design** - Check for:
   - **Fixed widths**: Hard-coded widths that break on mobile
   - **Touch targets**: Interactive elements < 44x44px
   - **Horizontal scroll**: Content overflow on narrow viewports
   - **Text scaling**: Layouts that break when text size increases
   - **Missing breakpoints**: No mobile/tablet variants

5. **Anti-Patterns (CRITICAL)** - Check against ALL the **DON'T** guidelines in the frontend-design skill. Look for AI slop tells (AI color palette, gradient text, glassmorphism, hero metrics, card grids, generic fonts) and general design anti-patterns (gray on color, nested cards, bounce easing, redundant copy).

**CRITICAL**: This is an audit, not a fix. Document issues thoroughly with clear explanations of impact. Use other commands (normalize, optimize, harden, etc.) to fix issues after audit.

## Generate Comprehensive Report

Create a detailed audit report with the following structure:

### Anti-Patterns Verdict
**Start here.** Pass/fail: Does this look AI-generated? List specific tells from the skill's Anti-Patterns section. Be brutally honest.

### Executive Summary
- Total issues found (count by severity)
- Most critical issues (top 3-5)
- Overall quality score (if applicable)
- Recommended next steps

### Detailed Findings by Severity

For each issue, document:
- **Location**: Where the issue occurs (component, file, line)
- **Severity**: Critical / High / Medium / Low
- **Category**: Accessibility / Performance / Theming / Responsive
- **Description**: What the issue is
- **Impact**: How it affects users
- **WCAG/Standard**: Which standard it violates (if applicable)
- **Recommendation**: How to fix it
- **Suggested command**: Which command to use (prefer: /animate, /quieter, /optimize, /adapt, /clarify, /distill, /delight, /onboard, /normalize, /audit, /harden, /polish, /extract, /bolder, /critique, /colorize — or other installed skills you're sure exist)

#### Critical Issues
[Issues that block core functionality or violate WCAG A]

#### High-Severity Issues  
[Significant usability/accessibility impact, WCAG AA violations]

#### Medium-Severity Issues
[Quality issues, WCAG AAA violations, performance concerns]

#### Low-Severity Issues
[Minor inconsistencies, optimization opportunities]

### Patterns & Systemic Issues

Identify recurring problems:
- "Hard-coded colors appear in 15+ components, should use design tokens"
- "Touch targets consistently too small (<44px) throughout mobile experience"
- "Missing focus indicators on all custom interactive components"

### Positive Findings

Note what's working well:
- Good practices to maintain
- Exemplary implementations to replicate elsewhere

### Recommendations by Priority

Create actionable plan:
1. **Immediate**: Critical blockers to fix first
2. **Short-term**: High-severity issues (this sprint)
3. **Medium-term**: Quality improvements (next sprint)
4. **Long-term**: Nice-to-haves and optimizations

### Suggested Commands for Fixes

Map issues to available commands. Prefer these: /animate, /quieter, /optimize, /adapt, /clarify, /distill, /delight, /onboard, /normalize, /audit, /harden, /polish, /extract, /bolder, /critique, /colorize. You may also suggest other installed skills you're sure exist, but never invent commands.

Examples:
- "Use \`/normalize\` to align with design system (addresses N theming issues)"
- "Use \`/optimize\` to improve performance (addresses N performance issues)"
- "Use \`/harden\` to improve resilience (addresses N edge cases)"

**IMPORTANT**: Be thorough but actionable. Too many low-priority issues creates noise. Focus on what actually matters.

**NEVER**:
- Report issues without explaining impact (why does this matter?)
- Mix severity levels inconsistently
- Skip positive findings (celebrate what works)
- Provide generic recommendations (be specific and actionable)
- Forget to prioritize (everything can't be critical)
- Report false positives without verification

Remember: You're a quality auditor with exceptional attention to detail. Document systematically, prioritize ruthlessly, and provide clear paths to improvement. A good audit makes fixing easy.`
  },
  {
    id: 'harden',
    name: 'Harden',
    icon: <Shield size={16} strokeWidth={1.5} />,
    description: 'Improve interface resilience through better error handling, i18n support, text overflow handling, and edge case management.',
    code: `---
name: harden
description: Improve interface resilience through better error handling, i18n support, text overflow handling, and edge case management. Makes interfaces robust and production-ready.
user-invokable: true
args:
  - name: target
    description: The feature or area to harden (optional)
    required: false
---

Strengthen interfaces against edge cases, errors, internationalization issues, and real-world usage scenarios that break idealized designs.

## Assess Hardening Needs

Identify weaknesses and edge cases:

1. **Test with extreme inputs**:
   - Very long text (names, descriptions, titles)
   - Very short text (empty, single character)
   - Special characters (emoji, RTL text, accents)
   - Large numbers (millions, billions)
   - Many items (1000+ list items, 50+ options)
   - No data (empty states)

2. **Test error scenarios**:
   - Network failures (offline, slow, timeout)
   - API errors (400, 401, 403, 404, 500)
   - Validation errors
   - Permission errors
   - Rate limiting
   - Concurrent operations

3. **Test internationalization**:
   - Long translations (German is often 30% longer than English)
   - RTL languages (Arabic, Hebrew)
   - Character sets (Chinese, Japanese, Korean, emoji)
   - Date/time formats
   - Number formats (1,000 vs 1.000)
   - Currency symbols

**CRITICAL**: Designs that only work with perfect data aren't production-ready. Harden against reality.

## Hardening Dimensions

Systematically improve resilience:

### Text Overflow & Wrapping

**Long text handling**:
\`\`\`css
/* Single line with ellipsis */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Multi-line with clamp */
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Allow wrapping */
.wrap {
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
}
\`\`\`

**Flex/Grid overflow**:
\`\`\`css
/* Prevent flex items from overflowing */
.flex-item {
  min-width: 0; /* Allow shrinking below content size */
  overflow: hidden;
}

/* Prevent grid items from overflowing */
.grid-item {
  min-width: 0;
  min-height: 0;
}
\`\`\`

**Responsive text sizing**:
- Use \`clamp()\` for fluid typography
- Set minimum readable sizes (14px on mobile)
- Test text scaling (zoom to 200%)
- Ensure containers expand with text

### Internationalization (i18n)

**Text expansion**:
- Add 30-40% space budget for translations
- Use flexbox/grid that adapts to content
- Test with longest language (usually German)
- Avoid fixed widths on text containers

\`\`\`jsx
// ❌ Bad: Assumes short English text
<button className="w-24">Submit</button>

// ✅ Good: Adapts to content
<button className="px-4 py-2">Submit</button>
\`\`\`

**RTL (Right-to-Left) support**:
\`\`\`css
/* Use logical properties */
margin-inline-start: 1rem; /* Not margin-left */
padding-inline: 1rem; /* Not padding-left/right */
border-inline-end: 1px solid; /* Not border-right */

/* Or use dir attribute */
[dir="rtl"] .arrow { transform: scaleX(-1); }
\`\`\`

**Character set support**:
- Use UTF-8 encoding everywhere
- Test with Chinese/Japanese/Korean (CJK) characters
- Test with emoji (they can be 2-4 bytes)
- Handle different scripts (Latin, Cyrillic, Arabic, etc.)

**Date/Time formatting**:
\`\`\`javascript
// ✅ Use Intl API for proper formatting
new Intl.DateTimeFormat('en-US').format(date); // 1/15/2024
new Intl.DateTimeFormat('de-DE').format(date); // 15.1.2024

new Intl.NumberFormat('en-US', { 
  style: 'currency', 
  currency: 'USD' 
}).format(1234.56); // $1,234.56
\`\`\`

**Pluralization**:
\`\`\`javascript
// ❌ Bad: Assumes English pluralization
\`\${count} item\${count !== 1 ? 's' : ''}\`

// ✅ Good: Use proper i18n library
t('items', { count }) // Handles complex plural rules
\`\`\`

### Error Handling

**Network errors**:
- Show clear error messages
- Provide retry button
- Explain what happened
- Offer offline mode (if applicable)
- Handle timeout scenarios

\`\`\`jsx
// Error states with recovery
{error && (
  <ErrorMessage>
    <p>Failed to load data. {error.message}</p>
    <button onClick={retry}>Try again</button>
  </ErrorMessage>
)}
\`\`\`

**Form validation errors**:
- Inline errors near fields
- Clear, specific messages
- Suggest corrections
- Don't block submission unnecessarily
- Preserve user input on error

**API errors**:
- Handle each status code appropriately
  - 400: Show validation errors
  - 401: Redirect to login
  - 403: Show permission error
  - 404: Show not found state
  - 429: Show rate limit message
  - 500: Show generic error, offer support

**Graceful degradation**:
- Core functionality works without JavaScript
- Images have alt text
- Progressive enhancement
- Fallbacks for unsupported features

### Edge Cases & Boundary Conditions

**Empty states**:
- No items in list
- No search results
- No notifications
- No data to display
- Provide clear next action

**Loading states**:
- Initial load
- Pagination load
- Refresh
- Show what's loading ("Loading your projects...")
- Time estimates for long operations

**Large datasets**:
- Pagination or virtual scrolling
- Search/filter capabilities
- Performance optimization
- Don't load all 10,000 items at once

**Concurrent operations**:
- Prevent double-submission (disable button while loading)
- Handle race conditions
- Optimistic updates with rollback
- Conflict resolution

**Permission states**:
- No permission to view
- No permission to edit
- Read-only mode
- Clear explanation of why

**Browser compatibility**:
- Polyfills for modern features
- Fallbacks for unsupported CSS
- Feature detection (not browser detection)
- Test in target browsers

### Input Validation & Sanitization

**Client-side validation**:
- Required fields
- Format validation (email, phone, URL)
- Length limits
- Pattern matching
- Custom validation rules

**Server-side validation** (always):
- Never trust client-side only
- Validate and sanitize all inputs
- Protect against injection attacks
- Rate limiting

**Constraint handling**:
\`\`\`html
<!-- Set clear constraints -->
<input 
  type="text"
  maxlength="100"
  pattern="[A-Za-z0-9]+"
  required
  aria-describedby="username-hint"
/>
<small id="username-hint">
  Letters and numbers only, up to 100 characters
</small>
\`\`\`

### Accessibility Resilience

**Keyboard navigation**:
- All functionality accessible via keyboard
- Logical tab order
- Focus management in modals
- Skip links for long content

**Screen reader support**:
- Proper ARIA labels
- Announce dynamic changes (live regions)
- Descriptive alt text
- Semantic HTML

**Motion sensitivity**:
\`\`\`css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
\`\`\`

**High contrast mode**:
- Test in Windows high contrast mode
- Don't rely only on color
- Provide alternative visual cues

### Performance Resilience

**Slow connections**:
- Progressive image loading
- Skeleton screens
- Optimistic UI updates
- Offline support (service workers)

**Memory leaks**:
- Clean up event listeners
- Cancel subscriptions
- Clear timers/intervals
- Abort pending requests on unmount

**Throttling & Debouncing**:
\`\`\`javascript
// Debounce search input
const debouncedSearch = debounce(handleSearch, 300);

// Throttle scroll handler
const throttledScroll = throttle(handleScroll, 100);
\`\`\`

## Testing Strategies

**Manual testing**:
- Test with extreme data (very long, very short, empty)
- Test in different languages
- Test offline
- Test slow connection (throttle to 3G)
- Test with screen reader
- Test keyboard-only navigation
- Test on old browsers

**Automated testing**:
- Unit tests for edge cases
- Integration tests for error scenarios
- E2E tests for critical paths
- Visual regression tests
- Accessibility tests (axe, WAVE)

**IMPORTANT**: Hardening is about expecting the unexpected. Real users will do things you never imagined.

**NEVER**:
- Assume perfect input (validate everything)
- Ignore internationalization (design for global)
- Leave error messages generic ("Error occurred")
- Forget offline scenarios
- Trust client-side validation alone
- Use fixed widths for text
- Assume English-length text
- Block entire interface when one component errors

## Verify Hardening

Test thoroughly with edge cases:

- **Long text**: Try names with 100+ characters
- **Emoji**: Use emoji in all text fields
- **RTL**: Test with Arabic or Hebrew
- **CJK**: Test with Chinese/Japanese/Korean
- **Network issues**: Disable internet, throttle connection
- **Large datasets**: Test with 1000+ items
- **Concurrent actions**: Click submit 10 times rapidly
- **Errors**: Force API errors, test all error states
- **Empty**: Remove all data, test empty states

Remember: You're hardening for production reality, not demo perfection. Expect users to input weird data, lose connection mid-flow, and use your product in unexpected ways. Build resilience into every component.`
  },
  {
    id: 'polish',
    name: 'Polish',
    icon: <PaintBucket size={16} strokeWidth={1.5} />,
    description: 'Final quality pass before shipping. Fixes alignment, spacing, consistency, and detail issues that separate good from great.',
    code: `---
name: polish
description: Final quality pass before shipping. Fixes alignment, spacing, consistency, and detail issues that separate good from great.
user-invokable: true
args:
  - name: target
    description: The feature or area to polish (optional)
    required: false
---

**First**: Use the frontend-design skill for design principles and anti-patterns.

Perform a meticulous final pass to catch all the small details that separate good work from great work. The difference between shipped and polished.

## Pre-Polish Assessment

Understand the current state and goals:

1. **Review completeness**:
   - Is it functionally complete?
   - Are there known issues to preserve (mark with TODOs)?
   - What's the quality bar? (MVP vs flagship feature?)
   - When does it ship? (How much time for polish?)

2. **Identify polish areas**:
   - Visual inconsistencies
   - Spacing and alignment issues
   - Interaction state gaps
   - Copy inconsistencies
   - Edge cases and error states
   - Loading and transition smoothness

**CRITICAL**: Polish is the last step, not the first. Don't polish work that's not functionally complete.

## Polish Systematically

Work through these dimensions methodically:

### Visual Alignment & Spacing

- **Pixel-perfect alignment**: Everything lines up to grid
- **Consistent spacing**: All gaps use spacing scale (no random 13px gaps)
- **Optical alignment**: Adjust for visual weight (icons may need offset for optical centering)
- **Responsive consistency**: Spacing and alignment work at all breakpoints
- **Grid adherence**: Elements snap to baseline grid

**Check**:
- Enable grid overlay and verify alignment
- Check spacing with browser inspector
- Test at multiple viewport sizes
- Look for elements that "feel" off

### Typography Refinement

- **Hierarchy consistency**: Same elements use same sizes/weights throughout
- **Line length**: 45-75 characters for body text
- **Line height**: Appropriate for font size and context
- **Widows & orphans**: No single words on last line
- **Hyphenation**: Appropriate for language and column width
- **Kerning**: Adjust letter spacing where needed (especially headlines)
- **Font loading**: No FOUT/FOIT flashes

### Color & Contrast

- **Contrast ratios**: All text meets WCAG standards
- **Consistent token usage**: No hard-coded colors, all use design tokens
- **Theme consistency**: Works in all theme variants
- **Color meaning**: Same colors mean same things throughout
- **Accessible focus**: Focus indicators visible with sufficient contrast
- **Tinted neutrals**: No pure gray or pure black—add subtle color tint (0.01 chroma)
- **Gray on color**: Never put gray text on colored backgrounds—use a shade of that color or transparency

### Interaction States

Every interactive element needs all states:

- **Default**: Resting state
- **Hover**: Subtle feedback (color, scale, shadow)
- **Focus**: Keyboard focus indicator (never remove without replacement)
- **Active**: Click/tap feedback
- **Disabled**: Clearly non-interactive
- **Loading**: Async action feedback
- **Error**: Validation or error state
- **Success**: Successful completion

**Missing states create confusion and broken experiences**.

### Micro-interactions & Transitions

- **Smooth transitions**: All state changes animated appropriately (150-300ms)
- **Consistent easing**: Use ease-out-quart/quint/expo for natural deceleration. Never bounce or elastic—they feel dated.
- **No jank**: 60fps animations, only animate transform and opacity
- **Appropriate motion**: Motion serves purpose, not decoration
- **Reduced motion**: Respects \`prefers-reduced-motion\`

### Content & Copy

- **Consistent terminology**: Same things called same names throughout
- **Consistent capitalization**: Title Case vs Sentence case applied consistently
- **Grammar & spelling**: No typos
- **Appropriate length**: Not too wordy, not too terse
- **Punctuation consistency**: Periods on sentences, not on labels (unless all labels have them)

### Icons & Images

- **Consistent style**: All icons from same family or matching style
- **Appropriate sizing**: Icons sized consistently for context
- **Proper alignment**: Icons align with adjacent text optically
- **Alt text**: All images have descriptive alt text
- **Loading states**: Images don't cause layout shift, proper aspect ratios
- **Retina support**: 2x assets for high-DPI screens

### Forms & Inputs

- **Label consistency**: All inputs properly labeled
- **Required indicators**: Clear and consistent
- **Error messages**: Helpful and consistent
- **Tab order**: Logical keyboard navigation
- **Auto-focus**: Appropriate (don't overuse)
- **Validation timing**: Consistent (on blur vs on submit)

### Edge Cases & Error States

- **Loading states**: All async actions have loading feedback
- **Empty states**: Helpful empty states, not just blank space
- **Error states**: Clear error messages with recovery paths
- **Success states**: Confirmation of successful actions
- **Long content**: Handles very long names, descriptions, etc.
- **No content**: Handles missing data gracefully
- **Offline**: Appropriate offline handling (if applicable)

### Responsiveness

- **All breakpoints**: Test mobile, tablet, desktop
- **Touch targets**: 44x44px minimum on touch devices
- **Readable text**: No text smaller than 14px on mobile
- **No horizontal scroll**: Content fits viewport
- **Appropriate reflow**: Content adapts logically

### Performance

- **Fast initial load**: Optimize critical path
- **No layout shift**: Elements don't jump after load (CLS)
- **Smooth interactions**: No lag or jank
- **Optimized images**: Appropriate formats and sizes
- **Lazy loading**: Off-screen content loads lazily

### Code Quality

- **Remove console logs**: No debug logging in production
- **Remove commented code**: Clean up dead code
- **Remove unused imports**: Clean up unused dependencies
- **Consistent naming**: Variables and functions follow conventions
- **Type safety**: No TypeScript \`any\` or ignored errors
- **Accessibility**: Proper ARIA labels and semantic HTML

## Polish Checklist

Go through systematically:

- [ ] Visual alignment perfect at all breakpoints
- [ ] Spacing uses design tokens consistently
- [ ] Typography hierarchy consistent
- [ ] All interactive states implemented
- [ ] All transitions smooth (60fps)
- [ ] Copy is consistent and polished
- [ ] Icons are consistent and properly sized
- [ ] All forms properly labeled and validated
- [ ] Error states are helpful
- [ ] Loading states are clear
- [ ] Empty states are welcoming
- [ ] Touch targets are 44x44px minimum
- [ ] Contrast ratios meet WCAG AA
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] No console errors or warnings
- [ ] No layout shift on load
- [ ] Works in all supported browsers
- [ ] Respects reduced motion preference
- [ ] Code is clean (no TODOs, console.logs, commented code)

**IMPORTANT**: Polish is about details. Zoom in. Squint at it. Use it yourself. The little things add up.

**NEVER**:
- Polish before it's functionally complete
- Spend hours on polish if it ships in 30 minutes (triage)
- Introduce bugs while polishing (test thoroughly)
- Ignore systematic issues (if spacing is off everywhere, fix the system)
- Perfect one thing while leaving others rough (consistent quality level)

## Final Verification

Before marking as done:

- **Use it yourself**: Actually interact with the feature
- **Test on real devices**: Not just browser DevTools
- **Ask someone else to review**: Fresh eyes catch things
- **Compare to design**: Match intended design
- **Check all states**: Don't just test happy path

Remember: You have impeccable attention to detail and exquisite taste. Polish until it feels effortless, looks intentional, and works flawlessly. Sweat the details - they matter.`
  },
  {
    id: 'extract',
    name: 'Extract',
    icon: <Scissors size={16} strokeWidth={1.5} />,
    description: 'Extract inline styles or repeated patterns into reusable components or design tokens.',
    code: `---
name: extract
description: Extract inline styles or repeated patterns into reusable components or design tokens.
user-invokable: true
args:
  - name: target
    description: The component or file to extract from (optional)
    required: false
---

Refactor code to extract repeated patterns, inline styles, or complex logic into reusable components, design tokens, or custom hooks.

## Assess Extraction Needs

Identify areas for extraction:

1. **Repeated UI patterns**: Are the same UI elements (buttons, cards, list items) duplicated across multiple files?
2. **Inline styles**: Are there inline styles that should be moved to CSS classes or design tokens?
3. **Complex logic**: Is there complex logic (e.g., data fetching, state management) that could be extracted into a custom hook?
4. **Large components**: Are there components that have grown too large and should be broken down into smaller, more manageable pieces?

## Extraction Principles

Follow these core principles:

### DRY (Don't Repeat Yourself)
- Extract repeated code into reusable components or functions.
- Use design tokens for consistent styling.

### Single Responsibility Principle
- Each component or function should have a single responsibility.
- Break down large components into smaller, focused pieces.

### Separation of Concerns
- Separate UI logic from business logic.
- Use custom hooks for complex state management or data fetching.

## Execute Extraction

Systematically extract code:

### Extract Reusable Components
- Identify repeated UI patterns.
- Create a new component file.
- Move the repeated code into the new component.
- Update the original files to use the new component.

### Extract Design Tokens
- Identify repeated styling values (colors, typography, spacing).
- Create a design token file (e.g., \`tokens.css\` or \`theme.js\`).
- Move the styling values into the design token file.
- Update the original files to use the design tokens.

### Extract Custom Hooks
- Identify complex logic (e.g., data fetching, state management).
- Create a new custom hook file.
- Move the complex logic into the new custom hook.
- Update the original files to use the custom hook.

## Verify Extraction

Test thoroughly:

- **Functionality**: Does the extracted code work as expected?
- **Consistency**: Are the extracted components and tokens used consistently?
- **Performance**: Did the extraction improve performance?
- **Maintainability**: Is the code easier to read and maintain?

Remember: Extraction is about improving code quality and maintainability. Extract code that is repeated, complex, or hard to maintain.`
  },
  {
    id: 'bolder',
    name: 'Bolder',
    icon: <Zap size={16} strokeWidth={1.5} />,
    description: 'Make the design more bold, striking, and confident.',
    code: `---
name: bolder
description: Make the design more bold, striking, and confident.
user-invokable: true
args:
  - name: target
    description: The component or area to make bolder (optional)
    required: false
---

Transform the design to be more bold, striking, and confident. Increase contrast, scale, and visual impact.

## Assess Boldness Needs

Identify areas for increased boldness:

1. **Typography**: Are headings too small or timid? Is the font weight too light?
2. **Color**: Is the color palette too muted or safe? Is there a lack of contrast?
3. **Layout**: Is the layout too crowded or safe? Is there a lack of whitespace or dramatic scale?
4. **Imagery**: Are images too small or generic? Do they lack impact?

## Boldness Principles

Follow these core principles:

### High Contrast
- Use strong, contrasting colors (e.g., black and white, vibrant accents).
- Ensure high contrast between text and background.

### Dramatic Scale
- Use oversized typography for headings.
- Make key elements significantly larger than secondary elements.
- Use generous whitespace to frame important content.

### Confident Typography
- Use bold, heavy font weights for headings.
- Choose typefaces with strong personality.
- Keep body text legible but distinct from headings.

### Striking Imagery
- Use large, high-quality images.
- Choose images with strong composition and impact.
- Use full-bleed images or dramatic cropping.

## Execute Boldness

Systematically increase boldness:

### Typography
- Increase the size and weight of headings.
- Use a more distinctive typeface for headings.
- Ensure clear hierarchy between headings and body text.

### Color
- Introduce a bold accent color.
- Increase the contrast between background and text.
- Use dark mode or high-contrast themes.

### Layout
- Increase whitespace around key elements.
- Use asymmetrical or dramatic layouts.
- Make key elements span the full width of the container.

### Imagery
- Use larger, more impactful images.
- Apply dramatic filters or treatments to images.
- Use images that evoke strong emotions or reactions.

## Verify Boldness

Test thoroughly:

- **Impact**: Does the design feel more bold and confident?
- **Legibility**: Is the text still readable despite the increased boldness?
- **Accessibility**: Does the increased contrast meet accessibility standards?
- **Brand Alignment**: Does the bold design align with the brand personality?

Remember: Boldness is about making a statement. Don't be afraid to take risks and create a design that stands out.`
  },
  {
    id: 'critique',
    name: 'Critique',
    icon: <Eye size={16} strokeWidth={1.5} />,
    description: 'Provide a constructive design critique with actionable feedback.',
    code: `---
name: critique
description: Provide a constructive design critique with actionable feedback.
user-invokable: true
args:
  - name: target
    description: The design or component to critique (optional)
    required: false
---

Provide a constructive, objective, and actionable design critique. Focus on usability, aesthetics, and alignment with design principles.

## Assess the Design

Analyze the design across multiple dimensions:

1. **Usability**: Is the design easy to use and understand? Are interactions intuitive?
2. **Aesthetics**: Is the design visually appealing? Does it align with the brand personality?
3. **Consistency**: Is the design consistent with established patterns and design systems?
4. **Accessibility**: Does the design meet accessibility standards (contrast, keyboard navigation, etc.)?
5. **Context**: Does the design solve the user's problem in their specific context?

## Critique Principles

Follow these core principles:

### Be Objective
- Base feedback on design principles, not personal preference.
- Use specific examples to illustrate your points.

### Be Constructive
- Focus on how to improve the design, not just what's wrong with it.
- Provide actionable recommendations.

### Be Empathetic
- Consider the designer's constraints and goals.
- Frame feedback positively and collaboratively.

### Focus on the User
- Evaluate the design from the user's perspective.
- Prioritize usability and accessibility.

## Provide Feedback

Structure your critique:

### Overall Impression
- Start with a high-level summary of the design.
- Highlight what works well (positive reinforcement).

### Specific Observations
- Detail specific areas for improvement.
- Categorize observations (e.g., Typography, Layout, Interaction).
- Explain *why* something isn't working (e.g., "The contrast is too low, making it hard to read").

### Actionable Recommendations
- Provide clear, specific steps to improve the design.
- Suggest alternative approaches or solutions.
- Reference design principles or best practices.

## Verify Critique

Review your critique:

- **Clarity**: Is the feedback easy to understand?
- **Actionability**: Can the designer take specific steps based on the feedback?
- **Tone**: Is the tone constructive and collaborative?
- **Relevance**: Is the feedback relevant to the design goals and context?

Remember: A good critique helps the designer improve their work and grow their skills. Be honest, but kind.`
  },
  {
    id: 'colorize',
    name: 'Colorize',
    icon: <Palette size={16} strokeWidth={1.5} />,
    description: 'Apply a cohesive and accessible color palette to the design.',
    code: `---
name: colorize
description: Apply a cohesive and accessible color palette to the design.
user-invokable: true
args:
  - name: theme
    description: The desired theme or mood (e.g., "dark", "vibrant", "calm") (optional)
    required: false
---

Apply a cohesive, accessible, and aesthetically pleasing color palette to the design. Ensure colors communicate meaning and hierarchy.

## Assess Color Needs

Identify the requirements for the color palette:

1. **Brand**: What are the brand colors? How should they be applied?
2. **Mood**: What emotion or vibe should the design evoke? (e.g., professional, playful, urgent)
3. **Hierarchy**: How can color be used to establish visual hierarchy? (e.g., primary actions, secondary information)
4. **Accessibility**: Do the colors meet contrast requirements for readability?

## Color Principles

Follow these core principles:

### Cohesion
- Use a limited palette (e.g., primary, secondary, accent, neutrals).
- Ensure colors work well together harmoniously.

### Meaning
- Use color to convey meaning (e.g., red for errors, green for success).
- Be consistent in how colors are applied.

### Hierarchy
- Use bold, saturated colors for primary actions or important information.
- Use muted, desaturated colors for secondary or background elements.

### Accessibility
- Ensure sufficient contrast between text and background colors (WCAG AA or AAA).
- Don't rely solely on color to convey information (use icons or text as well).

## Execute Colorization

Systematically apply the color palette:

### Define the Palette
- Establish primary, secondary, and accent colors.
- Define a scale of neutral colors (grays) for text, borders, and backgrounds.
- Define semantic colors (success, warning, error, info).

### Apply Colors
- Apply primary colors to key actions (buttons, links).
- Apply neutral colors to text and backgrounds to create structure.
- Apply semantic colors to feedback messages and indicators.

### Check Contrast
- Verify contrast ratios for all text and interactive elements.
- Adjust colors as needed to meet accessibility standards.

## Verify Colorization

Test thoroughly:

- **Aesthetics**: Does the color palette look cohesive and pleasing?
- **Hierarchy**: Does color help establish clear visual hierarchy?
- **Accessibility**: Do all colors meet contrast requirements?
- **Brand Alignment**: Does the color palette align with the brand identity?

Remember: Color is a powerful tool for communication and emotion. Use it intentionally and consistently.`
  },
  {
    id: 'accessibility',
    name: 'Accessibility',
    icon: <Accessibility size={16} strokeWidth={1.5} />,
    description: 'Audit and improve the accessibility of the interface.',
    code: `---
name: accessibility
description: Audit and improve the accessibility of the interface.
user-invokable: true
args:
  - name: target
    description: The component or area to audit (optional)
    required: false
---

Audit and improve the accessibility of the interface to ensure it is usable by everyone, including people with disabilities.

## Assess Accessibility Needs

Identify areas for improvement:

1. **Contrast**: Is there sufficient contrast between text and background colors?
2. **Keyboard Navigation**: Can all interactive elements be accessed and used with a keyboard?
3. **Screen Readers**: Are elements properly labeled for screen readers? Is the semantic structure correct?
4. **Focus Management**: Is focus managed logically, especially in modals or dynamic content?
5. **Reduced Motion**: Does the interface respect the user's preference for reduced motion?

## Accessibility Principles

Follow these core principles:

### Perceivable
- Provide text alternatives for non-text content (e.g., alt text for images).
- Ensure sufficient color contrast.
- Use semantic HTML to convey structure and meaning.

### Operable
- Make all functionality available from a keyboard.
- Provide clear focus indicators.
- Give users enough time to read and use content.
- Avoid content that causes seizures or physical reactions (e.g., flashing lights).

### Understandable
- Make text readable and understandable.
- Make web pages appear and operate in predictable ways.
- Help users avoid and correct mistakes (e.g., clear error messages).

### Robust
- Maximize compatibility with current and future user agents, including assistive technologies.
- Ensure HTML is well-formed and valid.

## Execute Accessibility Improvements

Systematically address accessibility issues:

### Contrast
- Adjust colors to meet WCAG AA or AAA contrast requirements.
- Use tools to verify contrast ratios.

### Keyboard Navigation
- Ensure all interactive elements (buttons, links, form fields) are focusable.
- Provide visible focus indicators for all focusable elements.
- Ensure logical tab order.

### Screen Readers
- Add descriptive alt text to all meaningful images.
- Use ARIA attributes (e.g., aria-label, aria-describedby) to provide context where semantic HTML is insufficient.
- Ensure proper heading hierarchy (H1, H2, H3, etc.).

### Focus Management
- Manage focus when opening and closing modals or dialogs.
- Return focus to the triggering element when a modal is closed.

### Reduced Motion
- Use the \`prefers-reduced-motion\` media query to disable or simplify animations for users who prefer reduced motion.

## Verify Accessibility

Test thoroughly:

- **Keyboard Testing**: Navigate the interface using only the keyboard (Tab, Shift+Tab, Enter, Space).
- **Screen Reader Testing**: Use a screen reader (e.g., VoiceOver, NVDA) to navigate the interface.
- **Contrast Checking**: Use automated tools to verify contrast ratios.
- **Automated Audits**: Run accessibility audits (e.g., Lighthouse, axe) to identify common issues.

Remember: Accessibility is not a feature; it's a fundamental requirement. Design and build with accessibility in mind from the start.`
  },
  {
    id: 'motion',
    name: 'Motion',
    icon: <Activity size={16} strokeWidth={1.5} />,
    description: 'Add purposeful motion and animation to improve UX and delight.',
    code: `---
name: motion
description: Add purposeful motion and animation to improve UX and delight.
user-invokable: true
args:
  - name: target
    description: The component or interaction to animate (optional)
    required: false
---

Add purposeful motion and animation to the interface to improve usability, provide feedback, and create delight.

## Assess Motion Needs

Identify opportunities for motion:

1. **State Changes**: How can motion clarify changes in state (e.g., opening a menu, expanding an accordion)?
2. **Feedback**: How can motion provide feedback for user actions (e.g., button clicks, form submissions)?
3. **Attention**: How can motion guide the user's attention to important information or actions?
4. **Transitions**: How can motion smooth transitions between different views or pages?

## Motion Principles

Follow these core principles:

### Purposeful
- Motion should serve a clear purpose (e.g., clarifying context, providing feedback).
- Avoid gratuitous or decorative animation that doesn't add value.

### Natural
- Use easing curves that mimic real-world physics (e.g., ease-out for deceleration, ease-in for acceleration).
- Avoid linear animations, which feel mechanical and unnatural.

### Responsive
- Animations should be fast and responsive (typically 150-300ms).
- Don't make users wait for animations to finish before they can interact.

### Accessible
- Respect the user's preference for reduced motion (\`prefers-reduced-motion\`).
- Ensure animations don't trigger nausea or seizures.

## Execute Motion

Systematically add motion:

### State Changes
- Animate elements entering or leaving the DOM (e.g., fade in, slide up).
- Animate changes in size or position (e.g., expanding a card).

### Feedback
- Add subtle scale or color changes on hover or active states.
- Use motion to indicate success or error (e.g., a subtle shake for an invalid input).

### Attention
- Use subtle pulsing or bouncing to draw attention to important elements (use sparingly).

### Transitions
- Animate transitions between different views or pages to maintain context.
- Use shared element transitions to connect related content.

## Verify Motion

Test thoroughly:

- **Purpose**: Does the motion serve a clear purpose and improve usability?
- **Performance**: Are the animations smooth and performant (60fps)?
- **Accessibility**: Does the interface respect the \`prefers-reduced-motion\` preference?
- **Feel**: Do the animations feel natural and responsive?

Remember: Good motion is invisible. It should feel so natural that the user doesn't even notice it, but they would miss it if it were gone.`
  },
  {
    id: 'responsive',
    name: 'Responsive',
    icon: <MonitorSmartphone size={16} strokeWidth={1.5} />,
    description: 'Ensure the design works flawlessly across all device sizes.',
    code: `---
name: responsive
description: Ensure the design works flawlessly across all device sizes.
user-invokable: true
args:
  - name: target
    description: The component or page to make responsive (optional)
    required: false
---

Ensure the design adapts gracefully to all screen sizes, from mobile to desktop.

## Assess Responsive Needs

Identify areas that break or look awkward on different screen sizes:

1. **Mobile**: Is the content readable? Are touch targets large enough? Is there horizontal scrolling?
2. **Tablet**: Does the layout make good use of the available space?
3. **Desktop**: Does the content stretch too far? Is the layout balanced?

## Responsive Principles

Follow these core principles:

### Mobile-First
- Design and build for the smallest screens first, then progressively enhance for larger screens.
- Use \`min-width\` media queries (e.g., \`sm:\`, \`md:\`, \`lg:\` in Tailwind).

### Fluid Layouts
- Use relative units (%, vw, vh) and flexbox/grid to create fluid layouts that adapt to the container.
- Avoid fixed widths that break on smaller screens.

### Readable Typography
- Scale typography appropriately for different screen sizes.
- Ensure line lengths are comfortable to read (45-75 characters).

### Touch-Friendly
- Ensure interactive elements are large enough to tap comfortably (minimum 44x44px).
- Provide adequate spacing between interactive elements.

## Execute Responsive Design

Systematically address responsive issues:

### Layout Adjustments
- Stack columns vertically on mobile screens.
- Use CSS Grid or Flexbox to create flexible layouts.
- Adjust margins and padding for different screen sizes.

### Typography Adjustments
- Use responsive typography (e.g., \`text-sm md:text-base lg:text-lg\`).
- Adjust line height and letter spacing for readability.

### Component Adjustments
- Hide non-essential elements on smaller screens.
- Use off-canvas menus or accordions to save space.
- Ensure images and media scale proportionally.

## Verify Responsiveness

Test thoroughly:

- **Device Testing**: Test on actual mobile devices and tablets, not just browser DevTools.
- **Orientation**: Test both portrait and landscape orientations.
- **Edge Cases**: Test on very small screens (e.g., iPhone SE) and very large screens (e.g., ultrawide monitors).

Remember: Responsive design is not just about making things fit; it's about providing the best possible experience for every device.`
  },
  {
    id: 'typography',
    name: 'Typography',
    icon: <Type size={16} strokeWidth={1.5} />,
    description: 'Refine typography for better readability, hierarchy, and aesthetic appeal.',
    code: `---
name: typography
description: Refine typography for better readability, hierarchy, and aesthetic appeal.
user-invokable: true
args:
  - name: target
    description: The component or area to refine (optional)
    required: false
---

Refine typography to improve readability, establish clear hierarchy, and enhance the overall aesthetic appeal of the design.

## Assess Typography Needs

Identify areas for improvement:

1. **Readability**: Is the text easy to read? Is the font size, line height, or line length problematic?
2. **Hierarchy**: Is it clear what the most important information is? Are headings distinct from body text?
3. **Consistency**: Are the same fonts, sizes, and weights used consistently throughout the design?
4. **Aesthetics**: Does the typography align with the brand personality and overall design aesthetic?

## Typography Principles

Follow these core principles:

### Legibility and Readability
- Choose legible typefaces.
- Ensure sufficient contrast between text and background.
- Optimize line length (45-75 characters) and line height (1.4-1.6 for body text).

### Clear Hierarchy
- Use size, weight, and color to establish a clear visual hierarchy.
- Ensure headings stand out from body text.

### Consistency
- Use a limited number of typefaces (usually 1-2).
- Establish a typographic scale and stick to it.

### Alignment
- Align text consistently (usually left-aligned for readability).
- Avoid justified text, which can create awkward spacing.

## Execute Typography Refinements

Systematically refine typography:

### Font Selection
- Choose typefaces that align with the brand personality.
- Ensure the chosen typefaces have sufficient weights and styles.

### Typographic Scale
- Establish a scale for headings (H1-H6) and body text.
- Use consistent sizes and weights for each level of the hierarchy.

### Spacing and Alignment
- Adjust line height for optimal readability.
- Adjust letter spacing (kerning/tracking) for headings or all-caps text.
- Ensure consistent margins and padding around text elements.

### Color and Contrast
- Use color to reinforce hierarchy (e.g., darker color for primary text, lighter color for secondary text).
- Verify contrast ratios meet accessibility standards.

## Verify Typography

Test thoroughly:

- **Readability**: Read the text yourself. Is it comfortable to read?
- **Hierarchy**: Squint at the design. Is the hierarchy still clear?
- **Consistency**: Check multiple pages or components to ensure consistency.
- **Responsiveness**: Ensure typography scales appropriately on different screen sizes.

Remember: Typography is the foundation of good design. Get it right, and the rest will follow.`
  },
  {
    id: 'spacing',
    name: 'Spacing',
    icon: <Maximize size={16} strokeWidth={1.5} />,
    description: 'Adjust spacing and layout to create a more balanced and harmonious design.',
    code: `---
name: spacing
description: Adjust spacing and layout to create a more balanced and harmonious design.
user-invokable: true
args:
  - name: target
    description: The component or area to adjust (optional)
    required: false
---

Adjust spacing (margins, padding, gaps) to create a more balanced, harmonious, and readable design.

## Assess Spacing Needs

Identify areas for improvement:

1. **Clutter**: Does the design feel crowded or overwhelming?
2. **Disconnection**: Do related elements feel too far apart?
3. **Inconsistency**: Is spacing applied inconsistently across the design?
4. **Alignment**: Are elements misaligned due to incorrect spacing?

## Spacing Principles

Follow these core principles:

### Proximity
- Group related elements together by reducing the space between them.
- Separate unrelated elements by increasing the space between them.

### Whitespace (Negative Space)
- Use whitespace intentionally to give the design room to breathe.
- Don't be afraid of empty space; it helps focus the user's attention.

### Consistency
- Use a consistent spacing scale (e.g., 4px, 8px, 16px, 24px, 32px).
- Apply the same spacing rules to similar components.

### Alignment
- Ensure elements align to a grid or a common axis.
- Use consistent margins and padding to maintain alignment.

## Execute Spacing Adjustments

Systematically adjust spacing:

### Establish a Spacing Scale
- Define a set of spacing values (e.g., using Tailwind's default spacing scale).
- Stick to these values to ensure consistency.

### Adjust Margins and Padding
- Increase padding inside containers to give content room to breathe.
- Adjust margins between elements to clarify relationships (proximity).

### Use Flexbox and Grid Gaps
- Use \`gap\` properties in Flexbox and CSS Grid to create consistent spacing between items.

### Optical Alignment
- Adjust spacing slightly to compensate for visual weight (e.g., icons or specific letterforms).

## Verify Spacing

Test thoroughly:

- **Balance**: Does the design feel balanced and harmonious?
- **Clarity**: Are relationships between elements clear?
- **Consistency**: Is spacing applied consistently across the design?
- **Responsiveness**: Does the spacing adapt appropriately to different screen sizes?

Remember: Spacing is the invisible structure that holds a design together. Use it intentionally to guide the user's eye and create a sense of order.`
  },
  {
    id: 'icons',
    name: 'Icons',
    icon: <Smile size={16} strokeWidth={1.5} />,
    description: 'Refine icon usage for consistency, clarity, and aesthetic appeal.',
    code: `---
name: icons
description: Refine icon usage for consistency, clarity, and aesthetic appeal.
user-invokable: true
args:
  - name: target
    description: The component or area to refine (optional)
    required: false
---

Refine icon usage to ensure consistency, clarity, and alignment with the overall design aesthetic.

## Assess Icon Needs

Identify areas for improvement:

1. **Consistency**: Are icons from different sets or styles mixed together?
2. **Clarity**: Is the meaning of each icon immediately clear?
3. **Sizing**: Are icons sized consistently and appropriately for their context?
4. **Alignment**: Are icons optically aligned with adjacent text or elements?

## Icon Principles

Follow these core principles:

### Consistency
- Use icons from a single, cohesive set (e.g., Lucide, Heroicons).
- Ensure consistent stroke weight, corner radius, and style (solid vs. outline).

### Clarity
- Choose icons that are universally understood or clearly represent their function.
- Avoid overly complex or abstract icons.

### Context
- Use icons to support text, not replace it (unless the meaning is universally understood, like a magnifying glass for search).
- Size icons appropriately for their context (e.g., smaller for inline text, larger for standalone buttons).

### Accessibility
- Provide text alternatives (aria-labels) for standalone icons.
- Ensure icons have sufficient contrast against their background.

## Execute Icon Refinements

Systematically refine icon usage:

### Unify Icon Sets
- Replace mismatched icons with icons from a single set.
- Ensure consistent stroke weights and styles.

### Adjust Sizing and Alignment
- Size icons consistently (e.g., 16x16 for inline, 24x24 for standard buttons).
- Optically align icons with adjacent text (often requires a slight vertical offset).

### Improve Clarity
- Replace ambiguous icons with clearer alternatives.
- Add text labels to icons if their meaning is not immediately obvious.

### Ensure Accessibility
- Add \`aria-hidden="true"\` to decorative icons.
- Add descriptive \`aria-label\` attributes to functional icons without text labels.

## Verify Icons

Test thoroughly:

- **Consistency**: Do all icons look like they belong to the same family?
- **Clarity**: Ask someone else what they think each icon means.
- **Alignment**: Check alignment closely, especially when icons are next to text.
- **Accessibility**: Test with a screen reader to ensure functional icons are properly labeled.

Remember: Icons should enhance understanding and navigation, not create confusion. Keep them simple, consistent, and clear.`
  },
  {
    id: 'forms',
    name: 'Forms',
    icon: <FileText size={16} strokeWidth={1.5} />,
    description: 'Improve form design for better usability, conversion, and accessibility.',
    code: `---
name: forms
description: Improve form design for better usability, conversion, and accessibility.
user-invokable: true
args:
  - name: target
    description: The form or component to improve (optional)
    required: false
---

Improve form design to reduce friction, increase completion rates, and ensure accessibility.

## Assess Form Needs

Identify areas for improvement:

1. **Clarity**: Are the form fields and their purpose clear?
2. **Friction**: Is the form too long or overwhelming? Are there unnecessary fields?
3. **Feedback**: Are errors clearly communicated? Is success confirmed?
4. **Accessibility**: Can the form be navigated and completed using a keyboard or screen reader?

## Form Principles

Follow these core principles:

### Simplicity
- Only ask for essential information.
- Break long forms into multiple steps or logical sections.

### Clarity
- Use clear, descriptive labels for all fields.
- Provide helpful placeholder text or helper text where needed.

### Forgiveness
- Be forgiving of different input formats (e.g., phone numbers with or without dashes).
- Provide clear, actionable error messages.

### Accessibility
- Ensure all fields have associated \`<label>\` elements.
- Ensure logical tab order.
- Communicate errors to screen readers.

## Execute Form Improvements

Systematically improve form design:

### Layout and Structure
- Use a single-column layout for easier scanning (unless fields logically belong together, like First/Last Name).
- Group related fields together with clear headings.

### Labels and Inputs
- Place labels above inputs for better readability and responsiveness.
- Ensure inputs are appropriately sized for the expected content.
- Use appropriate input types (e.g., \`type="email"\`, \`type="tel"\`) to trigger the correct mobile keyboard.

### Feedback and Validation
- Validate input inline (on blur or on change) rather than waiting for submission.
- Display error messages clearly near the relevant field.
- Use color and icons to indicate success or error.

### Accessibility
- Associate labels with inputs using the \`for\` and \`id\` attributes.
- Use \`aria-describedby\` to link helper text or error messages to the input.
- Ensure focus indicators are clearly visible.

## Verify Forms

Test thoroughly:

- **Usability**: Try filling out the form yourself. Is it confusing or frustrating?
- **Validation**: Test with invalid data to ensure error messages are clear and helpful.
- **Accessibility**: Navigate the form using only a keyboard. Use a screen reader to verify labels and errors.
- **Mobile**: Test the form on a mobile device to ensure inputs are easy to tap and the correct keyboard appears.

Remember: Forms are often the primary point of interaction between a user and a business. Make them as painless as possible.`
  },
  {
    id: 'empty-states',
    name: 'Empty States',
    icon: <Inbox size={16} strokeWidth={1.5} />,
    description: 'Design helpful and engaging empty states for when there is no data to display.',
    code: `---
name: empty-states
description: Design helpful and engaging empty states for when there is no data to display.
user-invokable: true
args:
  - name: target
    description: The component or area needing an empty state (optional)
    required: false
---

Design helpful, engaging, and actionable empty states for when there is no data to display.

## Assess Empty State Needs

Identify areas where empty states are needed:

1. **First Use**: What does the user see when they first log in or use a feature?
2. **User Cleared**: What happens when the user deletes all items?
3. **No Results**: What happens when a search or filter returns no results?
4. **Errors**: What happens when data fails to load?

## Empty State Principles

Follow these core principles:

### Informative
- Clearly explain *why* the area is empty.
- Don't just leave a blank space or a generic "No data" message.

### Actionable
- Provide a clear next step or call to action (CTA).
- Help the user get started or recover from the empty state.

### Engaging
- Use illustrations, icons, or friendly copy to make the empty state less intimidating.
- Maintain the brand's tone and personality.

### Contextual
- Tailor the empty state to the specific context (e.g., a different message for "No search results" vs. "No projects created yet").

## Execute Empty State Design

Systematically design empty states:

### Visual Interest
- Add a relevant icon or illustration to draw attention and convey meaning.
- Ensure the visual element aligns with the overall design aesthetic.

### Clear Copy
- Write a clear, concise headline explaining the state (e.g., "No projects yet").
- Write a brief description explaining what will appear here or why it's empty.

### Call to Action
- Add a primary button or link to help the user resolve the empty state (e.g., "Create Project", "Clear Filters").
- Ensure the CTA is prominent and easy to click.

### Layout
- Center the empty state content within the available space.
- Ensure adequate whitespace around the content.

## Verify Empty States

Test thoroughly:

- **Clarity**: Is it immediately obvious why the area is empty?
- **Actionability**: Is it clear what the user should do next?
- **Tone**: Does the copy and imagery match the brand's tone?
- **Responsiveness**: Does the empty state look good on all screen sizes?

Remember: Empty states are an opportunity to guide, educate, and delight the user. Don't waste them on blank screens.`
  },
  {
    id: 'dark-mode',
    name: 'Dark Mode',
    icon: <Moon size={16} strokeWidth={1.5} />,
    description: 'Implement or refine dark mode for a better low-light experience.',
    code: `---
name: dark-mode
description: Implement or refine dark mode for a better low-light experience.
user-invokable: true
args:
  - name: target
    description: The component or area to update for dark mode (optional)
    required: false
---

Implement or refine dark mode to provide a comfortable viewing experience in low-light environments.

## Assess Dark Mode Needs

Identify areas for improvement:

1. **Missing Support**: Are there components or pages that don't have dark mode styles?
2. **Contrast Issues**: Is text legible against dark backgrounds? Are borders visible?
3. **Color Inversion**: Are colors simply inverted, or are they thoughtfully adjusted for dark mode?
4. **Brand Alignment**: Does the dark mode theme still feel like the brand?

## Dark Mode Principles

Follow these core principles:

### Avoid Pure Black
- Use dark grays (e.g., #121212) instead of pure black (#000000) for backgrounds to reduce eye strain.

### Adjust Saturation
- Desaturate colors slightly for dark mode to prevent them from vibrating against dark backgrounds.

### Maintain Contrast
- Ensure text and interactive elements have sufficient contrast against dark backgrounds (WCAG AA or AAA).

### Use Elevation
- Use lighter shades of gray or subtle borders to indicate elevation or depth (e.g., for cards or modals) rather than relying solely on shadows, which are less visible in dark mode.

## Execute Dark Mode Implementation

Systematically implement or refine dark mode:

### Backgrounds and Surfaces
- Define a base dark background color (e.g., Tailwind's \`bg-gray-900\` or \`bg-zinc-900\`).
- Define slightly lighter colors for elevated surfaces (e.g., \`bg-gray-800\` for cards).

### Typography
- Use off-white or light gray for primary text (e.g., \`text-gray-100\`).
- Use medium gray for secondary text (e.g., \`text-gray-400\`).

### Accents and Interactive Elements
- Adjust primary and accent colors to be slightly less saturated and lighter for better visibility.
- Ensure focus indicators and hover states are clearly visible.

### Borders and Dividers
- Use subtle, semi-transparent borders or dark grays for dividers (e.g., \`border-gray-700\`).

## Verify Dark Mode

Test thoroughly:

- **Toggle**: Ensure the user can easily toggle between light and dark modes (or respect system preferences).
- **Contrast**: Use tools to verify contrast ratios in dark mode.
- **Consistency**: Check all components and pages to ensure dark mode is applied consistently.
- **Aesthetics**: Does the dark mode theme look intentional and polished?

Remember: Dark mode is not just an inverted light mode. It requires thoughtful color adjustments to ensure readability and comfort.`
  },
  {
    id: 'performance',
    name: 'Performance',
    icon: <Zap size={16} strokeWidth={1.5} />,
    description: 'Optimize frontend performance for faster load times and smoother interactions.',
    code: `---
name: performance
description: Optimize frontend performance for faster load times and smoother interactions.
user-invokable: true
args:
  - name: target
    description: The component or page to optimize (optional)
    required: false
---

Optimize frontend performance to ensure fast load times, smooth interactions, and a responsive user experience.

## Assess Performance Needs

Identify areas for improvement:

1. **Load Times**: Is the initial page load slow? Are assets (images, scripts) taking too long to download?
2. **Interactivity**: Is there a delay between a user action and the visual response (e.g., clicking a button)?
3. **Animations**: Are animations janky or dropping frames?
4. **Bundle Size**: Is the JavaScript bundle too large?

## Performance Principles

Follow these core principles:

### Minimize Payload
- Send only the necessary code and assets to the client.
- Optimize images and compress text-based assets.

### Optimize Rendering
- Avoid unnecessary re-renders in React or other frameworks.
- Use efficient CSS selectors and avoid layout thrashing.

### Prioritize Critical Path
- Load critical CSS and JavaScript first.
- Defer non-essential scripts and lazy-load images.

### Smooth Animations
- Animate only \`transform\` and \`opacity\` properties to ensure hardware acceleration.

## Execute Performance Optimizations

Systematically optimize performance:

### Image Optimization
- Compress images using modern formats (e.g., WebP, AVIF).
- Use responsive images (\`srcset\`) to serve appropriate sizes for different devices.
- Lazy-load images that are below the fold (\`loading="lazy"\`).

### Code Splitting and Lazy Loading
- Split large JavaScript bundles into smaller chunks.
- Lazy-load components or routes that are not immediately needed.

### React Optimizations (if applicable)
- Use \`React.memo\`, \`useMemo\`, and \`useCallback\` to prevent unnecessary re-renders.
- Ensure lists use stable and unique \`key\` props.

### CSS Optimizations
- Remove unused CSS.
- Avoid complex CSS selectors that require significant calculation.

## Verify Performance

Test thoroughly:

- **Lighthouse/PageSpeed Insights**: Run automated audits to identify performance bottlenecks.
- **Network Tab**: Use browser DevTools to monitor asset sizes and load times.
- **Performance Tab**: Profile the application to identify long tasks or rendering issues.
- **Real Devices**: Test on actual mobile devices, especially those with slower processors or network connections.

Remember: Performance is a feature. A fast application improves user satisfaction and conversion rates.`
  },
  {
    id: 'seo',
    name: 'SEO',
    icon: <Search size={16} strokeWidth={1.5} />,
    description: 'Improve on-page SEO for better search engine visibility.',
    code: `---
name: seo
description: Improve on-page SEO for better search engine visibility.
user-invokable: true
args:
  - name: target
    description: The page or component to optimize (optional)
    required: false
---

Improve on-page Search Engine Optimization (SEO) to increase visibility and organic traffic.

## Assess SEO Needs

Identify areas for improvement:

1. **Meta Tags**: Are title tags and meta descriptions present, unique, and descriptive?
2. **Semantic HTML**: Is the content structured using appropriate HTML tags (headings, lists, articles)?
3. **Images**: Do images have descriptive alt text?
4. **Links**: Are internal and external links descriptive and functional?

## SEO Principles

Follow these core principles:

### Content is King
- Provide high-quality, relevant content that answers users' questions.

### Semantic Structure
- Use HTML tags to convey the structure and meaning of the content to search engines.

### Descriptive Metadata
- Write compelling title tags and meta descriptions that encourage clicks.

### Accessibility
- Good accessibility often translates to good SEO (e.g., alt text, clear link text).

## Execute SEO Improvements

Systematically improve on-page SEO:

### Meta Tags
- Ensure every page has a unique \`<title>\` tag (usually 50-60 characters).
- Add a descriptive \`<meta name="description">\` (usually 150-160 characters).
- Include Open Graph and Twitter Card meta tags for social sharing.

### Heading Structure
- Use a single \`<h1>\` tag per page for the main title.
- Use \`<h2>\`, \`<h3>\`, etc., logically to structure the content. Do not skip heading levels.

### Image Optimization
- Add descriptive \`alt\` text to all meaningful images.
- Use descriptive file names for images (e.g., \`red-running-shoes.jpg\` instead of \`IMG_1234.jpg\`).

### Link Text
- Use descriptive anchor text for links (e.g., "Read our guide on SEO" instead of "Click here").

## Verify SEO

Test thoroughly:

- **Lighthouse**: Run the SEO audit in Chrome DevTools.
- **View Source**: Check the HTML source code to ensure meta tags and semantic structure are correct.
- **Screen Readers**: Test with a screen reader to ensure the document outline makes sense.

Remember: SEO is about helping search engines understand your content so they can connect it with the right users.`
  },
  {
    id: 'copy',
    name: 'Copy',
    icon: <FileText size={16} strokeWidth={1.5} />,
    description: 'Refine UI copy for clarity, conciseness, and brand voice.',
    code: `---
name: copy
description: Refine UI copy for clarity, conciseness, and brand voice.
user-invokable: true
args:
  - name: target
    description: The component or area to refine (optional)
    required: false
---

Refine UI copy (microcopy) to ensure it is clear, concise, helpful, and aligned with the brand's voice and tone.

## Assess Copy Needs

Identify areas for improvement:

1. **Clarity**: Is the text easy to understand? Is there jargon or ambiguity?
2. **Conciseness**: Is the text too long? Can it be shortened without losing meaning?
3. **Tone**: Does the text sound like the brand? Is it appropriate for the context (e.g., empathetic for errors, enthusiastic for success)?
4. **Actionability**: Are button labels and calls to action clear about what will happen next?

## Copy Principles

Follow these core principles:

### Clear and Simple
- Use plain language. Avoid jargon and complex sentence structures.
- Write for a broad audience.

### Concise
- Cut unnecessary words. Every word must earn its place.
- Front-load important information.

### Helpful and Actionable
- Tell the user what they need to know or do.
- Use strong, active verbs for calls to action.

### Consistent
- Use consistent terminology throughout the interface.
- Maintain a consistent brand voice.

## Execute Copy Refinements

Systematically refine UI copy:

### Headings and Titles
- Make them descriptive and benefit-oriented.
- Keep them short and scannable.

### Buttons and Links
- Use clear, action-oriented verbs (e.g., "Save Changes", "Download PDF").
- Avoid vague labels like "Submit" or "Click Here".

### Error Messages
- Explain what went wrong clearly and simply.
- Tell the user how to fix the problem.
- Avoid blaming the user (e.g., use "Please enter a valid email" instead of "You entered an invalid email").

### Empty States and Helper Text
- Use empty states to guide the user on what to do next.
- Provide helper text to clarify complex inputs or requirements.

## Verify Copy

Test thoroughly:

- **Readability**: Read the copy out loud. Does it sound natural?
- **Context**: Does the copy make sense in the context of the UI?
- **User Testing**: Ask users if they understand what the text means and what they should do.

Remember: Good copy is just as important as good design. It guides the user, builds trust, and reduces friction.`
  },
  {
    id: 'layout',
    name: 'Layout',
    icon: <Layout size={16} strokeWidth={1.5} />,
    description: 'Improve page layout for better flow, hierarchy, and visual balance.',
    code: `---
name: layout
description: Improve page layout for better flow, hierarchy, and visual balance.
user-invokable: true
args:
  - name: target
    description: The page or component to improve (optional)
    required: false
---

Improve the page layout to create a logical flow, establish clear visual hierarchy, and achieve visual balance.

## Assess Layout Needs

Identify areas for improvement:

1. **Flow**: Does the eye move naturally through the content? Is the reading order logical?
2. **Hierarchy**: Is it clear what the most important elements are?
3. **Balance**: Does the page feel lopsided or top-heavy?
4. **Alignment**: Are elements aligned to a grid or a common axis?

## Layout Principles

Follow these core principles:

### Visual Hierarchy
- Use size, color, and placement to indicate the importance of elements.
- Guide the user's eye to the primary call to action.

### Grid Systems
- Use a grid system (e.g., 12-column grid) to create structure and alignment.
- Align elements to the grid to create a sense of order.

### Proximity and Grouping
- Group related elements together to show their relationship.
- Use whitespace to separate unrelated groups.

### Balance
- Distribute visual weight evenly across the page.
- Balance heavy elements (large images, bold text) with lighter elements or whitespace.

## Execute Layout Improvements

Systematically improve the layout:

### Establish a Grid
- Implement a CSS Grid or Flexbox-based layout system.
- Align major structural elements to the grid.

### Define the Flow
- Arrange content in a logical sequence (e.g., top-to-bottom, left-to-right).
- Use visual cues (arrows, lines, whitespace) to guide the eye.

### Adjust Proportions
- Ensure the main content area is prominent.
- Size sidebars, headers, and footers appropriately relative to the main content.

### Group and Separate
- Use cards, borders, or background colors to group related content.
- Increase margins or padding to separate distinct sections.

## Verify Layout

Test thoroughly:

- **Squint Test**: Squint your eyes and look at the page. Is the hierarchy still clear?
- **Responsiveness**: Does the layout adapt gracefully to different screen sizes?
- **Alignment**: Use a browser extension or DevTools to check alignment against a grid.

Remember: A good layout is invisible. It organizes content so naturally that the user doesn't even notice the structure, only the information.`
  },
  {
    id: 'navigation',
    name: 'Navigation',
    icon: <Compass size={16} strokeWidth={1.5} />,
    description: 'Refine navigation to ensure users can easily find their way around.',
    code: `---
name: navigation
description: Refine navigation to ensure users can easily find their way around.
user-invokable: true
args:
  - name: target
    description: The navigation component or area to refine (optional)
    required: false
---

Refine navigation menus, links, and wayfinding elements to ensure users can easily find what they are looking for and understand where they are.

## Assess Navigation Needs

Identify areas for improvement:

1. **Clarity**: Are navigation labels clear and descriptive?
2. **Discoverability**: Is the navigation easy to find? Are important links hidden?
3. **Orientation**: Does the user always know where they are within the site or app?
4. **Responsiveness**: Does the navigation work well on mobile devices?

## Navigation Principles

Follow these core principles:

### Simplicity
- Keep the primary navigation menu concise (usually 5-7 items max).
- Group related items into logical categories or dropdowns.

### Clarity
- Use clear, descriptive labels. Avoid clever or ambiguous terms.
- Use established conventions (e.g., a magnifying glass for search, a house for home).

### Orientation
- Highlight the current active page or section in the navigation.
- Use breadcrumbs for deep or complex hierarchies.

### Accessibility
- Ensure navigation can be used with a keyboard.
- Use appropriate ARIA roles (e.g., \`<nav>\`, \`aria-current\`).

## Execute Navigation Refinements

Systematically refine navigation:

### Simplify and Organize
- Review the current navigation structure and consolidate or remove unnecessary items.
- Group related links logically.

### Improve Labels
- Rewrite labels to be clear, concise, and user-focused.

### Add Wayfinding Cues
- Implement active states for navigation links to show the current location.
- Add breadcrumbs if the site has a deep hierarchy.
- Ensure page titles match the navigation labels.

### Optimize for Mobile
- Implement a responsive navigation pattern (e.g., a hamburger menu or bottom tab bar) for smaller screens.
- Ensure touch targets in the mobile menu are large enough.

## Verify Navigation

Test thoroughly:

- **Task-Based Testing**: Ask a user to find a specific piece of information. Can they do it easily?
- **Keyboard Navigation**: Tab through the navigation to ensure it is fully accessible.
- **Mobile Testing**: Test the mobile navigation menu on an actual device.

Remember: Good navigation is like a good map. It should quickly and clearly show the user where they are and how to get where they want to go.`
  },
  {
    id: 'search',
    name: 'Search',
    icon: <Search size={16} strokeWidth={1.5} />,
    description: 'Improve search functionality and the display of search results.',
    code: `---
name: search
description: Improve search functionality and the display of search results.
user-invokable: true
args:
  - name: target
    description: The search component or results page to improve (optional)
    required: false
---

Improve the search experience, from the input field to the display of results, ensuring users can quickly find what they need.

## Assess Search Needs

Identify areas for improvement:

1. **Discoverability**: Is the search input easy to find?
2. **Input Experience**: Is it clear what the user can search for? Are there helpful suggestions or autocomplete?
3. **Results Display**: Are the results easy to scan? Is the most relevant information highlighted?
4. **Empty States**: What happens when there are no results?

## Search Principles

Follow these core principles:

### Prominence
- Make the search input prominent if search is a primary way users navigate the site.

### Forgiveness
- Handle typos, synonyms, and different spellings gracefully.

### Relevance
- Ensure the most relevant results appear at the top.
- Highlight the search terms within the results.

### Clarity
- Clearly display the number of results found.
- Provide filtering and sorting options for large result sets.

## Execute Search Improvements

Systematically improve the search experience:

### The Search Input
- Use a clear placeholder text (e.g., "Search for products, articles...").
- Ensure the input is large enough to accommodate typical queries.
- Add a clear "submit" button (often a magnifying glass icon).

### Autocomplete and Suggestions
- Provide real-time suggestions as the user types.
- Group suggestions by category if applicable.

### Search Results Page
- Display the original search query clearly (e.g., "Results for 'shoes'").
- Show the total number of results.
- Highlight the search terms in the result titles and descriptions.

### Filtering and Sorting
- Provide relevant filters (e.g., by category, date, price).
- Allow users to sort results (e.g., relevance, newest, price: low to high).

### Empty States (No Results)
- Clearly state that no results were found for the specific query.
- Suggest alternative search terms or categories.
- Check for typos and suggest corrections (e.g., "Did you mean...?").

## Verify Search

Test thoroughly:

- **Usability**: Try searching for common items. Is the process smooth?
- **Relevance**: Are the top results actually relevant to the query?
- **Empty States**: Search for gibberish. Is the empty state helpful?
- **Responsiveness**: Does the search interface work well on mobile devices?

Remember: A good search experience can significantly improve user satisfaction and conversion rates. Make it fast, forgiving, and relevant.`
  },
  {
    id: 'tables',
    name: 'Tables',
    icon: <Table size={16} strokeWidth={1.5} />,
    description: 'Design clear, readable, and functional data tables.',
    code: `---
name: tables
description: Design clear, readable, and functional data tables.
user-invokable: true
args:
  - name: target
    description: The table component to improve (optional)
    required: false
---

Design data tables that are easy to read, scan, and interact with, even when dealing with large amounts of information.

## Assess Table Needs

Identify areas for improvement:

1. **Readability**: Is the data easy to scan? Is the text legible?
2. **Alignment**: Is the data aligned correctly (e.g., numbers right-aligned)?
3. **Interactivity**: Can users sort, filter, or paginate the data?
4. **Responsiveness**: Does the table work on smaller screens?

## Table Principles

Follow these core principles:

### Clarity Over Clutter
- Remove unnecessary borders, zebra striping, or background colors that distract from the data.
- Use whitespace to separate rows and columns.

### Logical Alignment
- Left-align text and categorical data.
- Right-align numbers and financial data (to align decimal points).
- Center-align icons or short status badges.

### Hierarchy
- Make column headers distinct from the data (e.g., using a slightly heavier font weight or a subtle background color).

### Actionability
- Make it clear which rows are interactive (e.g., using hover states).
- Place primary actions (e.g., edit, delete) in a consistent location, usually the last column.

## Execute Table Improvements

Systematically improve table design:

### Typography and Alignment
- Ensure consistent font sizes and weights.
- Apply correct alignment rules (left for text, right for numbers).
- Use tabular numerals (monospaced numbers) for financial data if available in the font.

### Borders and Dividers
- Use subtle horizontal dividers between rows instead of full grid lines.
- Avoid vertical borders unless necessary for complex data.

### Interactivity
- Add clear indicators for sortable columns (e.g., up/down arrows).
- Implement hover states for rows to help users track their place.
- Ensure interactive elements (buttons, links) within the table have adequate touch targets.

### Responsiveness
- For mobile screens, consider collapsing the table into a stacked card layout.
- Alternatively, allow horizontal scrolling for the table container while keeping the first column (e.g., ID or Name) sticky.

## Verify Tables

Test thoroughly:

- **Readability**: Can you quickly scan down a column of numbers?
- **Interactivity**: Do sorting and filtering work as expected?
- **Responsiveness**: Resize the browser window. Does the table break or become unusable?
- **Accessibility**: Ensure the table uses proper semantic HTML (\`<table>\`, \`<th>\`, \`<tr>\`, \`<td>\`) and includes a \`<caption>\` if necessary.

Remember: Tables are for data, not layout. Keep them clean, structured, and focused on the information they contain.`
  }
];
