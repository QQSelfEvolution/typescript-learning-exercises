import React, { useMemo } from 'react';
import { marked } from 'marked';

interface PreviewProps {
  content: string;
  className?: string;
}

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: true,
});

const Preview: React.FC<PreviewProps> = ({ content, className }) => {
  // Parse markdown to HTML
  const htmlContent = useMemo(() => {
    try {
      return marked.parse(content) as string;
    } catch (error) {
      console.error('Error parsing markdown:', error);
      return '<p>Error rendering markdown</p>';
    }
  }, [content]);

  return (
    <div className="preview-wrapper">
      <div
        className={`preview-content ${className || ''}`}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
};

export default Preview;
