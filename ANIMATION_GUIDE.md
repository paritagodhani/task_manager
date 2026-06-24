# Task Master - Complete Animation Guide

This document explains all animations in the Task Master app and how to customize them.

## Table of Contents

1. [Animation Libraries](#animation-libraries)
2. [Animation Types](#animation-types)
3. [Component-by-Component Breakdown](#component-by-component-breakdown)
4. [Advanced Patterns](#advanced-patterns)
5. [Performance Tips](#performance-tips)
6. [Customization Examples](#customization-examples)

## Animation Libraries

### Framer Motion

The app uses **Framer Motion 12.40.0**, a powerful React animation library.

**Key Features Used:**
- `motion` - Animated elements
- `AnimatePresence` - Exit animations for removed elements
- `variants` - Reusable animation configurations
- `whileHover` - Hover state animations
- `whileTap` - Click/tap state animations
- `layout` - Automatic layout animations
- `layoutId` - Shared layout animation IDs

### Tailwind CSS

Tailwind provides utility classes for:
- Color transitions: `transition-colors`, `transition-all`
- Duration: `duration-300`, `duration-500`
- Timing functions: `ease-in-out`, `cubic-bezier`

## Animation Types

### 1. Entrance Animations

Elements smoothly enter the viewport.

**Pattern:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

**Used for:**
- Page titles
- Form inputs
- Task cards
- Filter buttons

**Timing:**
- Duration: 0.3s for quick animations
- Stagger delay: 0.1s between elements

### 2. Exit Animations

Elements smoothly leave the viewport.

**Pattern:**
```tsx
<motion.div
  exit={{ opacity: 0, y: -20, scale: 0.95 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

**Used for:**
- Deleted task cards
- Closed modals
- Removed notifications

### 3. Hover Animations

Elements respond to mouse hover.

**Pattern:**
```tsx
<motion.button
  whileHover={{ scale: 1.05, y: -4 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>
```

**Used for:**
- Buttons
- Task cards
- Filter buttons
- Statistics cards

### 4. Staggered List Animations

Multiple elements animate in sequence.

**Pattern:**
```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

<motion.div variants={container} initial="hidden" animate="show">
  {items.map(item => (
    <motion.div key={item.id} variants={item}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

**Used for:**
- Task lists
- Filter buttons
- Form fields

### 5. Infinite Animations

Elements continuously animate in a loop.

**Pattern:**
```tsx
<motion.div
  animate={{ rotate: 360, y: [0, -10, 0] }}
  transition={{ duration: 2, repeat: Infinity }}
>
  Content
</motion.div>
```

**Used for:**
- Loading spinner
- Empty state emoji
- Pulsing effects

### 6. Layout Animations

Elements smoothly reposition when layout changes.

**Pattern:**
```tsx
<motion.div layout>
  Content
</motion.div>

<AnimatePresence mode="popLayout">
  {items.map(item => <motion.div key={item.id} layout>{item}</motion.div>)}
</AnimatePresence>
```

**Used for:**
- Filtered task list reordering
- Task deletion and repositioning

## Component-by-Component Breakdown

### 1. page.tsx (Main Page)

**Header Animation:**
```tsx
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  <h1>Task Master</h1>
</motion.div>
```
- **Duration:** 0.6s (slower for emphasis)
- **Effect:** Title slides down while fading in

**Create Button Animation:**
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  + Create New Task
</motion.button>
```
- **Hover:** 5% scale increase
- **Tap:** 5% scale decrease

**Loading Spinner Animation:**
```tsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 1, repeat: Infinity }}
  className="w-12 h-12 border-4 border-blue-500 border-t-emerald-500 rounded-full"
/>
```
- **Effect:** Continuous 360° rotation
- **Speed:** 1 second per rotation
- **Used for:** Loading state

**Empty State Animation:**
```tsx
<motion.div
  animate={{ y: [0, -10, 0] }}
  transition={{ duration: 2, repeat: Infinity }}
  className="text-6xl"
>
  📋
</motion.div>
```
- **Effect:** Bouncing up and down
- **Distance:** 10px up/down
- **Speed:** 2 second loop

**Task List Stagger Animation:**
```tsx
const container = { show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

<motion.div variants={container} initial="hidden" animate="show">
  {filteredTasks.map(task => (
    <motion.div key={task.id} variants={item}>
      <TaskCard />
    </motion.div>
  ))}
</motion.div>
```
- **Stagger delay:** 0.1s between each task
- **Each task:** 0.3s fade-in and slide-up

**Statistics Cards Hover:**
```tsx
<motion.div whileHover={{ y: -5 }}>
  Statistics content
</motion.div>
```
- **Effect:** Card lifts up 5px on hover
- **Creates:** Floating effect

### 2. TaskCard.tsx (Task Display)

**Card Container Animation:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20, scale: 0.95 }}
  whileHover={{ y: -4 }}
  layout
  className="...rounded-lg shadow-md hover:shadow-lg"
>
```
- **Entrance:** 0.3s fade-in and slide-up
- **Exit:** Slide-up and scale down
- **Hover:** Lifts 4px
- **Layout:** Reflows when other cards change

**Title Animation:**
```tsx
<motion.h3
  className={task.completed ? 'line-through text-gray-400' : 'text-gray-900'}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  {task.title}
</motion.h3>
```
- **Effect:** Fades in text content
- **Condition:** Strikethrough if completed

**Checkbox Animation:**
```tsx
<motion.input
  type="checkbox"
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
/>
```
- **Hover:** 10% scale increase
- **Tap:** 5% scale decrease

**Button Animations:**
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="px-3 py-1 bg-blue-500"
>
  Edit
</motion.button>
```
- **Hover:** 5% scale increase
- **Tap:** 5% scale decrease
- **Color:** Smooth transition to darker shade on hover

**Badge Animation (Due Date):**
```tsx
<motion.span
  className="px-3 py-1 bg-purple-100 text-purple-800"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.2 }}
>
  Due: {date}
</motion.span>
```
- **Delay:** 0.2s after title appears
- **Effect:** Staggered reveal

### 3. TaskForm.tsx (Modal Form)

**Modal Backdrop Animation:**
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  className="fixed inset-0 bg-black/50"
/>
```
- **Effect:** Smooth fade-in/out of dark overlay
- **Duration:** 0.3s

**Form Container Animation:**
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.95, y: 20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.95, y: 20 }}
  transition={{ duration: 0.3 }}
  className="bg-white rounded-lg p-8"
>
```
- **Entrance:** Scales up from 95%, fades in, slides up
- **Exit:** Reverses the entrance animation
- **Creates:** Spring-like pop effect

**Title Animation:**
```tsx
<motion.h2
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  className="text-2xl font-bold"
>
  {initialData ? 'Edit Task' : 'Create New Task'}
</motion.h2>
```
- **Effect:** Slides down while fading in

**Form Fields Stagger:**
```tsx
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.1 }}
>
  <input />
</motion.div>

<motion.div transition={{ delay: 0.15 }}>
  <textarea />
</motion.div>

<motion.div transition={{ delay: 0.2 }}>
  <select />
</motion.div>
```
- **Effect:** Fields slide in from left
- **Stagger:** 0.05s delay between each field
- **Distance:** 20px from left

**Error Message Animation:**
```tsx
<motion.div
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  className="p-4 bg-red-50 border border-red-200"
>
  {error}
</motion.div>
```
- **Effect:** Appears with fade and slight upward slide
- **Creates:** Non-intrusive error display

**Submit Button Animation:**
```tsx
<motion.button
  type="submit"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="flex-1 px-4 py-2 bg-blue-500"
>
  Save Task
</motion.button>
```
- **Hover:** 2% scale increase
- **Tap:** 2% scale decrease

### 4. FilterBar.tsx (Filter Controls)

**Container Stagger:**
```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

<motion.div variants={container} initial="hidden" animate="show">
```
- **Stagger:** 0.1s between each section

**Filter Button Animation:**
```tsx
<motion.button
  onClick={() => onPriorityChange(btn.value)}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className={`px-4 py-2 rounded-lg font-medium transition-all ${
    selectedPriority === btn.value
      ? 'bg-blue-500 text-white shadow-lg'
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
  }`}
>
```
- **Hover:** 5% scale increase
- **Tap:** 5% scale decrease
- **Selection:** Changes color with shadow
- **Transition:** Smooth color change

### 5. Toast.tsx (Notifications)

**Toast Animation:**
```tsx
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
  className={`${bgColor} text-white px-6 py-4`}
>
```
- **Entrance:** Slides down and fades in
- **Exit:** Slides up and fades out
- **Duration:** 0.3s
- **Auto-dismiss:** 3 seconds

**Toast Container:**
```tsx
<div className="fixed top-4 right-4 z-50 space-y-2">
  <AnimatePresence>
    {messages.map(msg => (
      <Toast key={msg.id} message={msg} />
    ))}
  </AnimatePresence>
</div>
```
- **Positioned:** Top-right corner
- **Multiple toasts:** Stack vertically with 0.5rem spacing
- **Stacking:** Latest toast appears below

## Advanced Patterns

### 1. Shared Layout Animations

Multiple elements share the same animation when layout changes:

```tsx
<motion.div layout layoutId="tasks-container">
  {tasks.map(task => (
    <motion.div key={task.id} layout layoutId={`task-${task.id}`}>
      <TaskCard />
    </motion.div>
  ))}
</motion.div>
```

### 2. Gesture-Based Animations

Respond to user gestures (hover, tap):

```tsx
<motion.button
  whileHover={{ backgroundColor: '#f0f0f0' }}
  whileTap={{ backgroundColor: '#e0e0e0' }}
  onHoverStart={() => console.log('hover start')}
  onHoverEnd={() => console.log('hover end')}
>
  Interactive Button
</motion.button>
```

### 3. Orchestrated Animations

Coordinate multiple animations with sequencing:

```tsx
const sequence = async () => {
  await animateOne();
  await animateTwo();
  await animateThree();
};
```

### 4. Conditional Animations

Different animations based on state:

```tsx
const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  hidden: { opacity: 0 }
};

<motion.div
  variants={variants}
  initial="initial"
  animate={isVisible ? "animate" : "hidden"}
>
```

## Performance Tips

### 1. Use `transform` for Animations

Better performance than animating position:
```tsx
// Good ✓
animate={{ x: 100, y: 50 }}

// Bad ✗
animate={{ marginLeft: 100, marginTop: 50 }}
```

### 2. Use `opacity` for Visibility

More performant than `display`:
```tsx
// Good ✓
animate={{ opacity: 0 }}

// Bad ✗
animate={{ display: 'none' }}
```

### 3. Optimize Stagger for Large Lists

For lists > 50 items, reduce stagger or use virtual scrolling:
```tsx
// Default
transition: { staggerChildren: 0.1 }  // Can be slow

// Optimized
transition: { staggerChildren: 0.02 }  // Faster stagger
```

### 4. Use `layoutId` for Smooth Morphing

Share layout between similar components:
```tsx
<motion.div layoutId="card-123">
  {/* Same ID in both views = smooth morph */}
</motion.div>
```

## Customization Examples

### Example 1: Change Animation Speed

**Original:**
```tsx
transition={{ duration: 0.3 }}
```

**Make it slower (0.5s):**
```tsx
transition={{ duration: 0.5 }}
```

**Make it faster (0.15s):**
```tsx
transition={{ duration: 0.15 }}
```

### Example 2: Change Entrance Direction

**Slide from left:**
```tsx
initial={{ opacity: 0, x: -20 }}
```

**Slide from right:**
```tsx
initial={{ opacity: 0, x: 20 }}
```

**Slide from top:**
```tsx
initial={{ opacity: 0, y: -20 }}
```

**Zoom in:**
```tsx
initial={{ opacity: 0, scale: 0.8 }}
```

### Example 3: Add Bounce Effect

Use `ease` configuration:
```tsx
transition={{
  duration: 0.6,
  ease: "backOut"
}}
```

**Available easing functions:**
- `"linear"` - Constant speed
- `"easeIn"` - Slow start
- `"easeOut"` - Slow end
- `"easeInOut"` - Slow start and end
- `"backIn"` - Bounces back in
- `"backOut"` - Bounces out
- `"anticipate"` - Anticipatory movement
- `"circIn"`, `"circOut"`, `"circInOut"` - Circular easing
- Custom Bezier: `[0.25, 0.1, 0.25, 1.0]`

### Example 4: Add Rotation Animation

```tsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 2, repeat: Infinity }}
>
  Rotating element
</motion.div>
```

### Example 5: Add Scale Animation

```tsx
<motion.div
  animate={{ scale: [1, 1.1, 1] }}
  transition={{ duration: 2, repeat: Infinity }}
>
  Pulsing element
</motion.div>
```

### Example 6: Combine Multiple Animations

```tsx
<motion.div
  animate={{
    x: 100,
    y: [0, -10, 0],
    rotate: 360,
    scale: [1, 1.05, 1]
  }}
  transition={{
    duration: 2,
    repeat: Infinity
  }}
>
  Complex animation
</motion.div>
```

## Debugging Animations

### Check Animation Performance

Open DevTools Performance tab and record:
1. Hit record
2. Interact with app
3. Stop recording
4. Look for smooth 60fps frames

### Visualize Animation Timing

Add color indicators:
```tsx
<motion.div
  initial={{ backgroundColor: 'red' }}
  animate={{ backgroundColor: 'green' }}
>
  Animation progress shown as color change
</motion.div>
```

### Log Animation Events

```tsx
<motion.div
  onAnimationStart={() => console.log('Started')}
  onAnimationComplete={() => console.log('Completed')}
>
  Logging animations
</motion.div>
```

## Browser Compatibility

All animations use transform and opacity, ensuring:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Resources

- **Framer Motion Docs:** https://www.framer.com/motion
- **Web Animation Performance:** https://web.dev/animations-guide/
- **CSS Transitions vs JS Animation:** https://css-tricks.com/css-animation-tricks/

---

**Ready to create amazing animations!** 🎬✨
