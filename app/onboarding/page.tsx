import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Setup Account | DeepNerd",
  description: "Initialize your DeepNerd Developer Portal.",
};

export default function OnboardingPage() {
  return <OnboardingFlow />;
}
