import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/**
 * mdxComponents — maps MDX-rendered HTML elements onto the Astro design system.
 * Block elements get `.ds-prose-*` classes (spacing/rhythm lives in
 * app/styles/prose.css); headings carry the ids that rehype-slug generates so
 * the table-of-contents anchors resolve. `pre` is left to rehype-pretty-code,
 * which wraps it in a themed figure styled in prose.css.
 *
 * Internal links use next/link for client navigation; external links open in a
 * new tab.
 */
export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="ds-display-sm ds-prose-h" {...props} />,
  h3: (props) => <h3 className="ds-prose-h3" {...props} />,
  p: (props) => <p className="ds-body ds-prose-p" {...props} />,
  ul: (props) => <ul className="ds-prose-list" {...props} />,
  ol: (props) => <ol className="ds-prose-list ds-prose-list--ordered" {...props} />,
  li: (props) => <li className="ds-prose-li" {...props} />,
  blockquote: (props) => <blockquote className="ds-prose-quote" {...props} />,
  hr: () => <hr className="ds-prose-hr" />,
  a: ({ href = "", children, ...rest }) => {
    const external = /^https?:\/\//.test(href);
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="ds-prose-a" {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className="ds-prose-a">
        {children}
      </Link>
    );
  },
  // Inline code only — fenced blocks are replaced by rehype-pretty-code's <pre>.
  code: (props) => <code className="ds-prose-code" {...props} />,
};
