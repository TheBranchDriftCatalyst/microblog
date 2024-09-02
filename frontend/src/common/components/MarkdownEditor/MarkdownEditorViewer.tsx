import React, { useState } from 'react';
import MarkdownEditor from './MarkdownEditor';
import MarkdownViewer from './MarkdownViewer';

interface MarkdownEditorViewerProps {
  mode: 'edit' | 'view';
  initialContent?: string;
}

const MarkdownEditorViewer: React.FC<MarkdownEditorViewerProps> = ({ mode, initialContent = '' }) => {
  const [content, setContent] = useState<string>(initialContent);

  return (
    <div>
      {mode === 'edit' ? (
        <MarkdownEditor content={content} onChange={setContent} />
      ) : (
        <MarkdownViewer content={content} />
      )}
    </div>
  );
};

export default MarkdownEditorViewer;
import { FC } from 'react';
