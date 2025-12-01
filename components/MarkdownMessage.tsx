"use client";

import type { Components } from "react-markdown";
import ReactMarkdown_ from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

type Props = {
  content: string;
};

const ReactMarkdown = ReactMarkdown_ as React.ComponentType<{
  children: string;
  remarkPlugins?: any[];
  rehypePlugins?: any[];
  components?: Components;
}>;

export function MarkdownMessage({ content }: Props) {
  return (
    <div className="prose prose-invert max-w-none prose-p:my-1 prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-code:text-cyan-300">
      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
