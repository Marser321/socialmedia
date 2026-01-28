---
name: Scroll Expert & Envelope Effects
description: Definitive guide for implementing seamless "envelope" and "reveal" scroll animations without gaps or dead space.
---

# Scroll Expert: The "Envelope" Technique

## Core Philosophy
The "Envelope" effect (a section visually covering the previous one using fixed/sticky positioning) often fails due to:
1.  **Dead Scroll**: The animation finishes (e.g., at 90% scroll) leaving 10% of "nothing happening".
2.  **Gap/Tearing**: The sticky element unpins before the next element is ready, revealing the body background.
3.  **Interpolation Mismatch**: Scaling/Translation doesn't align with the container's physical height.

## 1. The Golden Ratio of Sticky Scroll
For a full-screen transition, use `h-[200vh]` to `h-[300vh]`. 
- **100vh** is the viewport itself.
- **Extra vh** is the "timeline" of the animation.

**Formula**:
If you want an animation to feel 1:1 with scroll speed:
- `useScroll` target: container
- Animation Range: `[0, 1]` (Use the whole container!)
- **NEVER** leave the range `[0.9, 1.0]` empty unless you specifically want a static pause. Gaps happen here.

## 2. The "Envelope" Pattern (Problem -> Solution)
When covering one layer with another (clip-path or slide-over):

### Structure
```tsx
<div className="relative h-[200vh]"> {/* The Timeline */}
  <div className="sticky top-0 h-screen overflow-hidden"> {/* The Viewport */}
    
    {/* Layer A: Bottom (exits or stays) */}
    <div className="absolute inset-0">...</div>
    
    {/* Layer B: Top (The Envelope) */}
    <motion.div 
      style={{ clipPath: revealProgress }} // or y: slideProgress
      className="absolute inset-0 z-10" 
    >
      ...
    </motion.div>

  </div>
</div>
```

### The Fix for "Empty Space"
If users see empty space ("gaps") at the bottom:
1.  **Extend Animation to End**: Ensure your `useTransform` ranges go all the way to `1` (or `0.95` with a tiny buffer, but `1` is safer for continuity).
    *   *Bad*: `[0, 0.8]` (Remaining 20% is dead space)
    *   *Good*: `[0, 1]`
2.  **Overshoot**: If using `clipPath`, go beyond 100%.
    *   `circle(150% at 50% 50%)` ensures corners are cleared.
3.  **Background Color Continuity**: The `relative` container background MUST match the *final state* of the animation.
    *   If Layer B is Green, the Container bg should be Green. If the sticky element unpins early, the background shows through.

## 3. High-Performance Mobile Tuning
- **Will-Change**: Always add `will-change-transform` in CSS or `willChange: "transform"` in Framer Motion.
- **Precision**: Use percentages over pixels for responsive reveals.

## 4. Checklist for "Dead Space" Bugs
- [ ] Is `usescroll` offset correct? Usually `["start start", "end end"]`.
- [ ] Does the animation curve flatten out (`[..., 1, 1]`) too early?
- [ ] Is the parent container background color transparent? (Set it to the NEXT section's color).
- [ ] Are we using `margin-bottom` on the sticky element? (Avoid. Use padding on parent).
