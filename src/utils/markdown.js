'use client'

import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export function MarkdownMessage({ message }) {
    return (
        <ReactMarkdown
            children={message}
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
        />
    )
};