"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const STEPS = ["BASIC INFO", "PROFILE", "DISCOVERY", "COMPLIANCE"];

type OnboardingForm = {
  fullName: string;
  username: string;
  bio: string;
  source: string;
  feedback: string;
  acceptedTerms: boolean;
};

export function OnboardingFlow() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [data, setData] = useState<OnboardingForm>({
    fullName: "",
    username: "",
    bio: "",
    source: "",
    feedback: "",
    acceptedTerms: false,
  });

  const canContinue = useMemo(() => {
    if (step === 0) return data.fullName.trim() && data.username.trim();
    if (step === 2) return data.source.trim();
    if (step === 3) return data.acceptedTerms;
    return true;
  }, [step, data]);

  function update<K extends keyof OnboardingForm>(field: K, value: OnboardingForm[K]) {
    setData((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  }

  async function validateUsername() {
    setCheckingUsername(true);
    try {
      const res = await fetch(`/api/user/username/check?username=${encodeURIComponent(data.username)}`);
      const payload = await res.json();
      if (!res.ok || !payload.available) {
        setErrors((p) => ({ ...p, username: payload.reason ?? "Username is unavailable" }));
        setSuggestions(payload.suggestions ?? []);
        return false;
      }
      setSuggestions([]);
      return true;
    } finally {
      setCheckingUsername(false);
    }
  }

  async function nextStep() {
    if (step === 0) {
      if (!data.fullName.trim()) return setErrors((p) => ({ ...p, fullName: "Required" }));
      if (!data.username.trim()) return setErrors((p) => ({ ...p, username: "Required" }));
      if (!(await validateUsername())) return;
    }
    if (step === 2 && !data.source.trim()) {
      return setErrors((p) => ({ ...p, source: "Required" }));
    }
    if (step === 3) {
      await submit();
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  async function submit() {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/onboarding/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await res.json();
      if (!res.ok) {
        if (payload.suggestions?.length) setSuggestions(payload.suggestions);
        throw new Error(payload.error ?? "Failed to complete onboarding.");
      }
      toast({ title: "Onboarding complete", description: "Welcome to your DeepNerd dashboard." });
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Onboarding failed",
        description: error instanceof Error ? error.message : "Unexpected error",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex h-screen w-screen flex-col bg-black text-white">
      <div className="w-full max-w-xl mx-auto flex flex-col h-full px-6 py-12 pt-24 pb-8 relative">
        <ProgressStepper currentStep={step} />
        <div className="flex-grow overflow-y-auto pr-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6 pt-4 pb-24"
            >
              <StepContent step={step} data={data} update={update} errors={errors} suggestions={suggestions} />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="pt-6 border-t border-white/10 flex justify-between items-center bg-black">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0 || isSubmitting}
            className="text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-white transition-colors disabled:opacity-0"
          >
            Back
          </button>
          <button
            onClick={nextStep}
            disabled={!canContinue || isSubmitting || checkingUsername}
            className="flex items-center gap-2 bg-white text-black px-6 py-3 text-xs font-mono font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting || checkingUsername ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Processing
              </>
            ) : (
              <>
                {step === STEPS.length - 1 ? "Complete Setup" : "Continue"} <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProgressStepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex w-full items-center mb-12 px-2">
      {STEPS.map((label, index) => (
        <div key={label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-2 relative z-10">
            <div
              className={cn(
                "size-8 rounded-full border flex items-center justify-center text-xs font-mono transition-colors bg-black",
                index === currentStep
                  ? "border-white text-white"
                  : index < currentStep
                    ? "border-zinc-500 text-zinc-300"
                    : "border-zinc-800 text-zinc-700",
              )}
            >
              {index < currentStep ? <Check className="size-4" /> : index + 1}
            </div>
            <span className="absolute top-10 text-[10px] whitespace-nowrap font-mono tracking-wider text-zinc-500">
              {label}
            </span>
          </div>
          {index < STEPS.length - 1 && <div className="h-[1px] flex-1 mx-2 bg-zinc-800" />}
        </div>
      ))}
    </div>
  );
}

function StepContent({
  step,
  data,
  update,
  errors,
  suggestions,
}: {
  step: number;
  data: OnboardingForm;
  update: <K extends keyof OnboardingForm>(key: K, value: OnboardingForm[K]) => void;
  errors: Record<string, string>;
  suggestions: string[];
}) {
  if (step === 0) {
    return (
      <>
        <h2 className="text-2xl font-bold tracking-tight">Basic Info</h2>
        <InputField label="Full Name" value={data.fullName} onChange={(v) => update("fullName", v)} error={errors.fullName} />
        <InputField label="Username" value={data.username} onChange={(v) => update("username", v)} error={errors.username} />
        {suggestions.length > 0 && (
          <div className="text-xs text-zinc-500">
            Suggestions:{" "}
            {suggestions.map((item) => (
              <button key={item} className="underline mr-2" onClick={() => update("username", item)}>
                {item}
              </button>
            ))}
          </div>
        )}
      </>
    );
  }
  if (step === 1) {
    return (
      <>
        <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-zinc-500 font-mono">Bio (Optional)</label>
          <textarea
            value={data.bio}
            onChange={(e) => update("bio", e.target.value)}
            rows={4}
            className="w-full bg-zinc-950 border border-zinc-800 p-4 text-sm text-white focus:outline-none focus:border-white transition-colors resize-none"
            placeholder="Tell us what you build..."
          />
        </div>
      </>
    );
  }
  if (step === 2) {
    return (
      <>
        <h2 className="text-2xl font-bold tracking-tight">Discovery</h2>
        <InputField label="Referral Source" value={data.source} onChange={(v) => update("source", v)} error={errors.source} />
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-zinc-500 font-mono">Feedback (Optional)</label>
          <textarea
            value={data.feedback}
            onChange={(e) => update("feedback", e.target.value)}
            rows={3}
            className="w-full bg-zinc-950 border border-zinc-800 p-4 text-sm text-white focus:outline-none focus:border-white transition-colors resize-none"
          />
        </div>
      </>
    );
  }
  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight">Compliance</h2>
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={data.acceptedTerms}
          onChange={(e) => update("acceptedTerms", e.target.checked)}
          className="mt-1"
        />
        <span className="text-sm text-zinc-400">I accept DeepNerd Terms and Privacy Policy.</span>
      </label>
    </>
  );
}

function InputField({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-widest text-zinc-500 font-mono">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full bg-zinc-950 border p-4 text-sm text-white focus:outline-none focus:border-white transition-colors",
          error ? "border-red-500/50" : "border-zinc-800",
        )}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
