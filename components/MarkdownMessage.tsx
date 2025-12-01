"use client";

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

type Props = {
  content: string;
};

export function MarkdownMessage({ content }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      className="prose prose-invert max-w-none prose-p:my-1 prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-code:text-cyan-300"
    >
      {content}
    </ReactMarkdown>
  );
}
