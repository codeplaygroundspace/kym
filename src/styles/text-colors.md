# Text Color System

## Available Text Colors

### Primary Text Colors

- `text-text-primary` - Main titles and headings
  - Light: `#111827` (gray-900)
  - Dark: `#f9fafb` (gray-50)

### Secondary Text Colors

- `text-text-secondary` - Subtitles and secondary content
  - Light: `#6b7280` (gray-500)
  - Dark: `#d1d5db` (gray-300)

### Muted Text Colors

- `text-text-muted` - Labels and less important text
  - Light: `#9ca3af` (gray-400)
  - Dark: `#9ca3af` (gray-400)

## Usage Guidelines

### When to Use Each Color:

- **text-text-primary**: Page titles, section headings, main content
- **text-text-secondary**: Subheadings, important secondary content
- **text-text-muted**: Labels, timestamps, helper text, placeholders

### Examples:

```jsx
// Page title
<h1 className="text-2xl font-bold text-text-primary">Journey</h1>

// Section heading
<h2 className="text-xl font-semibold text-text-primary">Recent Journey</h2>

// Stats numbers
<div className="text-3xl font-bold text-text-primary">25</div>

// Stats labels
<div className="text-xs text-text-muted">weeks strong</div>

// Timeline dates
<div className="text-sm text-text-muted uppercase">YESTERDAY</div>

// Timeline descriptions
<span className="text-text-primary font-medium">Felt tired, some back pain</span>
```

## Benefits:

1. **Consistency**: All text colors are centralized
2. **Dark Mode**: Automatic dark mode support
3. **Maintainability**: Easy to update colors globally
4. **Semantic**: Clear naming convention
5. **Performance**: CSS variables are efficient
