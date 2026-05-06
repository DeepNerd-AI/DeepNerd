import { Navbar } from "@/components/ui/navbar";
import { DeepNerdFooter } from "@/components/ui/flickering-footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ContactCard } from "@/components/ui/contact-card";
import { MailIcon, MapPinIcon, GlobeIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — DeepNerd | Get in Touch",
  description:
    "Reach out to the DeepNerd team. Whether you have questions about our AI infrastructure, partnership inquiries, or feedback — we respond within 1 business day.",
  alternates: { canonical: "https://deepnerd.tech/contact" },
  openGraph: {
    title: "Contact — DeepNerd",
    description: "Get in touch with the DeepNerd team.",
    url: "https://deepnerd.tech/contact",
    siteName: "DeepNerd",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — DeepNerd",
    description: "Get in touch with the DeepNerd team.",
    creator: "@deepnerdai",
  },
};

export default function ContactPage() {
  return (
    <SmoothScroll>
      <div className="bg-[#050505] text-on-background font-['Space_Grotesk'] antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center px-4 py-24 md:py-32">
          <div className="mx-auto max-w-5xl w-full">
            <ContactCard
              title="Get in touch"
              description="Whether you have questions about our AI infrastructure products, partnership inquiries, or just want to say hello — we respond within 1 business day."
              contactInfo={[
                {
                  icon: MailIcon,
                  label: "Email",
                  value: "hello@deepnerd.tech",
                },
                {
                  icon: GlobeIcon,
                  label: "Website",
                  value: "deepnerd.tech",
                },
                {
                  icon: MapPinIcon,
                  label: "Location",
                  value: "Remote-First · Global",
                  className: "col-span-2",
                },
              ]}
              className="bg-[#111] border-zinc-800 text-white rounded-none"
              formSectionClassName="bg-[#0a0a0a] border-zinc-800"
            >
              <form action="" className="w-full space-y-4">
                <div className="flex flex-col gap-2">
                  <Label className="text-zinc-300">Name</Label>
                  <Input
                    type="text"
                    placeholder="Your name"
                    className="bg-[#050505] border-zinc-700 text-white placeholder:text-zinc-600 rounded-none focus-visible:ring-white"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-zinc-300">Email</Label>
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    className="bg-[#050505] border-zinc-700 text-white placeholder:text-zinc-600 rounded-none focus-visible:ring-white"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-zinc-300">Subject</Label>
                  <Input
                    type="text"
                    placeholder="Partnership / Feedback / Other"
                    className="bg-[#050505] border-zinc-700 text-white placeholder:text-zinc-600 rounded-none focus-visible:ring-white"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-zinc-300">Message</Label>
                  <Textarea
                    placeholder="Tell us what you need..."
                    className="bg-[#050505] border-zinc-700 text-white placeholder:text-zinc-600 rounded-none focus-visible:ring-white min-h-[100px]"
                  />
                </div>
                <Button
                  className="w-full bg-white text-black hover:bg-zinc-200 rounded-none font-bold uppercase tracking-widest"
                  type="button"
                >
                  Send Message
                </Button>
              </form>
            </ContactCard>
          </div>
        </main>
        <DeepNerdFooter />
      </div>
    </SmoothScroll>
  );
}
