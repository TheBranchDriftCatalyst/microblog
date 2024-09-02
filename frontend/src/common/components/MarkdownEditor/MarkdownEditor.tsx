import React, { useState } from 'react';

interface MarkdownEditorProps {
  content: string;
  onChange: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ content, onChange }) => {
  return (
    <textarea
      value={content}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: '100%', height: '200px' }}
    />
  );
};

export default MarkdownEditor;
