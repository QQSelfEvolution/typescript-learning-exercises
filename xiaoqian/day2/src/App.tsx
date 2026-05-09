import React, { useState, useCallback } from 'react';
import Editor from './components/Editor';
import Preview from './components/Preview';

const defaultMarkdown = `# Welcome to Markdown Previewer!

This is a **real-time** Markdown previewer built with *React* and *TypeScript*.

## Features

- Split-pane layout with editor and preview
- Real-time rendering as you type
- Support for basic Markdown syntax

### Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));
\`\`\`

### List Example

- Item one
- Item two
  - Nested item
  - Another nested item
- Item three

### Quote Example

> This is a blockquote.
> It can span multiple lines.

### Link Example

Check out [GitHub](https://github.com) for more!

---

Start typing in the editor to see the preview update!
`;

const App: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(defaultMarkdown);

  const handleMarkdownChange = useCallback((value: string) => {
    setMarkdown(value);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 Markdown Previewer</h1>
        <p>Type Markdown on the left, see the preview on the right!</p>
      </header>
      <main className="app-main">
        <div className="editor-panel">
          <div className="panel-header">
            <span className="panel-icon">✏️</span>
            <span>Editor</span>
          </div>
          <Editor 
            value={markdown} 
            onChange={handleMarkdownChange}
            placeholder="Type your Markdown here..."
          />
        </div>
        <div className="preview-panel">
          <div className="panel-header">
            <span className="panel-icon">👁️</span>
            <span>Preview</span>
          </div>
          <Preview content={markdown} />
        </div>
      </main>
    </div>
  );
};

export default App;
