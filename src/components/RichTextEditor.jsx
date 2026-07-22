'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';

const RichTextEditor = ({ value = '', onChange, placeholder = 'Enter content...' }) => {
  const [content, setContent] = useState(value || '');
  const editorRef = useRef(null);

  useLayoutEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const currentHtml = editor.innerHTML || '';
    const normalizedValue = value || '';

    if (normalizedValue !== currentHtml) {
      editor.innerHTML = normalizedValue;
      setContent(normalizedValue);
    }
  }, [value]);

  const handleInput = () => {
    const html = editorRef.current?.innerHTML || '';
    const normalized = html === '<br>' ? '' : html;
    setContent(normalized);
    if (onChange) onChange(normalized);
  };

  return (
    <div className="relative">
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="min-h-[180px] rounded border border-gray-300 p-3 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 bg-white text-sm leading-6"
        onInput={handleInput}
        onBlur={handleInput}
      />
      {!content && (
        <div className="pointer-events-none absolute inset-0 p-3 text-gray-400 text-sm leading-6">
          {placeholder}
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;

