import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    schema_version: "v1",
    name_for_human: "DeepNerd",
    name_for_model: "deepnerd",
    description_for_human:
      "DeepNerd builds infrastructure for AI agents — IDE, agents, automation, tools, and a proprietary model.",
    description_for_model:
      "DeepNerd is a developer infrastructure company that builds tools specifically for autonomous AI agents. Products include: Vault IDE (Rust-native code editor with sub-10ms response), Agents (autonomous code operators), Automation (pipeline engine), Tools (execution primitives like DeepShell, Native-FS, V-GPU), and a proprietary model for software engineering. Website: https://deepnerd.tech",
    auth: { type: "none" },
    api: { type: "openapi", url: "https://deepnerd.tech/sitemap.xml" },
    logo_url: "https://deepnerd.tech/favicon.ico",
    contact_email: "hello@deepnerd.tech",
    legal_info_url: "https://deepnerd.tech/terms",
  });
}
