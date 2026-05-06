import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Model [CLASSIFIED] — Coming Soon",
  description: "DeepNerd's proprietary foundational model designed specifically for software engineering tasks and agentic logic. Built to natively understand every tool, agent, and interface in the DeepNerd ecosystem.",
  alternates: { canonical: "https://deepnerd.tech/model-teaser-1" },
  openGraph: {
    title: "DeepNerd Model — [CLASSIFIED]",
    description: "A proprietary foundational model for software engineering. Coming soon.",
    url: "https://deepnerd.tech/model-teaser-1",
    siteName: "DeepNerd",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DeepNerd Model — [CLASSIFIED]",
    description: "A proprietary foundational model. Coming soon.",
    creator: "@deepnerdai",
  },
};

export default function ModelTeaserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
