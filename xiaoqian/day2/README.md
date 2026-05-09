# Markdown Previewer

A real-time Markdown preview component built with TypeScript and React.

## Features

- Split-pane layout (editor / preview)
- Real-time rendering
- Support for basic Markdown syntax
- Syntax highlighting for code blocks
- Line numbers in editor
- Theme support

## Project Structure

```
day2/
├── src/
│   ├── App.tsx           # Main app component
│   ├── App.css           # Main styles
│   ├── components/
│   │   ├── Editor.tsx    # Markdown editor component
│   │   ├── Preview.tsx  # Markdown preview component
│   │   └── Editor.css   # Editor styles
│   └── index.tsx         # Entry point
├── public/
│   └── index.html
├── package.json
└── tsconfig.json
```

## Getting Started

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm start
```

### Build for production

```bash
npm run build
```

## Markdown Syntax Support

### Headers

```markdown
# H1
## H2
### H3
```

### Emphasis

```markdown
*italic* or _italic_
**bold** or __bold__
***bold italic***
~~strikethrough~~
```

### Lists

```markdown
- Unordered item
- Another item

1. Ordered item
2. Another item
```

### Links and Images

```markdown
[Link text](https://example.com)
![Alt text](image-url.png)
```

### Code

```markdown
`inline code`

​```javascript
const greeting = "Hello World";
console.log(greeting);
​```
```

### Blockquotes

```markdown
> This is a blockquote
> It can span multiple lines
```

### Tables

```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
```

### Horizontal Rules

```markdown
---
```

## Component API

### Editor

```tsx
interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showLineNumbers?: boolean;
}
```

### Preview

```tsx
interface PreviewProps {
  content: string;
  className?: string;
}
```

## Customization

You can customize the editor theme by modifying `components/Editor.css`.

Default theme colors:
- Background: `#1e1e1e`
- Line numbers: `#858585`
- Text: `#d4d4d4`
- Selection: `#264f78`
