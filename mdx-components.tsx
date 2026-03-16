import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable } from "@/components/docs/PropsTable";
import { Callout } from "@/components/docs/Callout";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // ─── Standard markdown overrides ───

    h1: ({ children }) => (
      <h1
        className="text-3xl md:text-4xl font-bold uppercase tracking-[0.2em] text-nerv-orange mb-8 border-l-4 border-nerv-orange pl-5"
        style={{ fontFamily: "var(--font-nerv-display)" }}
      >
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2
        className="text-2xl font-bold uppercase tracking-[0.15em] text-nerv-orange mb-6 mt-14 border-b border-nerv-mid-gray pb-3"
        style={{ fontFamily: "var(--font-nerv-display)" }}
      >
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3
        className="text-lg font-bold uppercase tracking-[0.1em] text-nerv-green mb-4 mt-10"
        style={{ fontFamily: "var(--font-nerv-display)" }}
      >
        <span className="text-nerv-orange/40 mr-2">//</span>
        {children}
      </h3>
    ),

    p: ({ children }) => (
      <p
        className="text-nerv-white leading-relaxed mb-5 text-sm"
        style={{ fontFamily: "var(--font-nerv-body)" }}
      >
        {children}
      </p>
    ),

    a: ({ href, children }) => (
      <a
        href={href}
        className="text-nerv-cyan hover:text-nerv-orange underline underline-offset-2 transition-colors"
      >
        {children}
      </a>
    ),

    code: ({ children, className }) => {
      // Fenced code blocks have a className like "language-tsx"
      if (className) {
        const language = className.replace("language-", "");
        return (
          <CodeBlock code={String(children).trimEnd()} language={language} />
        );
      }
      // Inline code
      return (
        <code
          className="bg-nerv-dark-gray text-nerv-cyan px-1.5 py-0.5 text-xs border border-nerv-mid-gray"
          style={{ fontFamily: "var(--font-nerv-mono)" }}
        >
          {children}
        </code>
      );
    },

    pre: ({ children }) => {
      // The <pre> wrapping is handled by CodeBlock; just pass through
      return <>{children}</>;
    },

    table: ({ children }) => (
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border border-nerv-mid-gray">
          {children}
        </table>
      </div>
    ),

    th: ({ children }) => (
      <th
        className="text-left px-4 py-3 bg-nerv-dark-gray text-nerv-orange uppercase tracking-wider text-xs border-b border-nerv-mid-gray font-bold"
        style={{ fontFamily: "var(--font-nerv-display)" }}
      >
        {children}
      </th>
    ),

    td: ({ children }) => (
      <td className="px-4 py-3 text-white border-b border-nerv-mid-gray/40 text-sm font-mono">
        {children}
      </td>
    ),

    ul: ({ children }) => (
      <ul className="mb-6 space-y-2 ml-4">{children}</ul>
    ),

    ol: ({ children }) => (
      <ol className="mb-6 space-y-2 ml-4 list-decimal list-inside text-nerv-orange">
        {children}
      </ol>
    ),

    li: ({ children }) => (
      <li
        className="text-white text-sm flex items-start gap-2"
        style={{ fontFamily: "var(--font-nerv-body)" }}
      >
        <span className="text-nerv-orange mt-1.5 text-[8px]">&#9654;</span>
        <span>{children}</span>
      </li>
    ),

    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-nerv-orange bg-nerv-dark-gray/50 pl-5 py-3 mb-6 text-white italic">
        {children}
      </blockquote>
    ),

    hr: () => <hr className="border-nerv-mid-gray my-10" />,

    // ─── Custom components available in MDX ───
    ComponentPreview,
    PropsTable,
    Callout,

    ...components,
  };
}
