"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2, ShieldAlert, Fingerprint } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Typewriter } from "@/components/ui/typewriter";

const STEPS = ["IDENTITY", "CAPABILITIES", "DEPLOYMENT", "COMPLIANCE"];

type OnboardingForm = {
  fullName: string;
  username: string;
  bio: string;
  role: string;
  organization: string;
  useCase: string;
  source: string;
  feedback: string;
  acceptedTerms: boolean;
};

export function OnboardingFlow() {
  const router = useRouter();
  const { toast } = useToast();
  // Use step -1 for animated welcome intro text
  const [step, setStep] = useState(-1);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [data, setData] = useState<OnboardingForm>({
    fullName: "",
    username: "",
    bio: "",
    role: "",
    organization: "",
    useCase: "",
    source: "",
    feedback: "",
    acceptedTerms: false,
  });

  const canContinue = useMemo(() => {
    if (step === -1) return false;
    if (step === 0) return data.fullName.trim() && data.username.trim();
    if (step === 1) return data.role.trim() && data.useCase.trim();
    if (step === 2) return true; // Optional fields
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
      // Optional check
      if (data.username && !(await validateUsername())) return;
    }
    if (step === 1) {
      if (!data.role.trim()) return setErrors((p) => ({ ...p, role: "Required" }));
      if (!data.useCase.trim()) return setErrors((p) => ({ ...p, useCase: "Required" }));
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
      // Fake completion delay for effect
      await new Promise(res => setTimeout(res, 1200));
      toast({ title: "Authorization granted", description: "Node activated. Welcome to DeepNerd." });
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Unexpected error",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (step === -1) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-black text-white relative px-6 text-center overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-2xl text-2xl md:text-3xl font-mono font-bold leading-relaxed tracking-tight relative z-10 text-white shadow-sm">
          <Typewriter
            texts={[
              "> SYSTEM INITIALIZATION...", 
              "> VERIFYING SECURE HANDSHAKE...", 
              "> ESTABLISHING NEURAL LINK...",
              "WELCOME TO DEEPNERD_ALPHA"
            ]}
            speed={40}
            deleteSpeed={20}
            pauseDuration={800}
            onComplete={() => {
              setTimeout(() => setStep(0), 1000);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen flex-col bg-black text-white relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-2xl mx-auto flex flex-col h-full px-6 py-12 pt-20 pb-8 relative z-10">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 border border-white/20 bg-white/5 flex items-center justify-center text-white">
              <Fingerprint className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-mono text-sm uppercase tracking-widest text-zinc-500">Secure Node Setup</h1>
              <div className="font-mono text-xs text-blue-400">SESSION_ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}</div>
            </div>
          </div>
          <ProgressStepper currentStep={step} />
        </div>
        
        <div className="flex-grow overflow-y-auto pr-2 no-scrollbar">
          <div className="bg-white/5 border border-white/10 backdrop-blur-md p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-8"
              >
                <StepContent step={step} data={data} update={update} errors={errors} suggestions={suggestions} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        <div className="pt-8 flex justify-between items-center relative z-20">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0 || isSubmitting}
            className="text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-white transition-colors disabled:opacity-0 px-4 py-2"
          >
            [ BACK ]
          </button>
          <button
            onClick={nextStep}
            disabled={!canContinue || isSubmitting || checkingUsername}
            className="group relative flex items-center gap-2 bg-white text-black px-8 py-4 text-xs font-mono font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          >
            <div className="absolute inset-0 bg-blue-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              {isSubmitting || checkingUsername ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> EXECUTING...
                </>
              ) : (
                <>
                  {step === STEPS.length - 1 ? "INITIALIZE NODE" : "PROCEED"} <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ProgressStepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex w-full items-center px-2">
      {STEPS.map((label, index) => (
        <div key={label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-2 relative z-10">
            <div
              className={cn(
                "size-8 border flex items-center justify-center text-xs font-mono transition-colors bg-black shadow-[0_0_15px_rgba(0,0,0,0.5)]",
                index === currentStep
                  ? "border-blue-500 text-blue-400 bg-blue-500/10"
                  : index < currentStep
                    ? "border-white/50 text-white"
                    : "border-white/10 text-white/30",
              )}
            >
              {index < currentStep ? <Check className="size-4" /> : index + 1}
            </div>
            <span className={cn("absolute top-10 text-[10px] whitespace-nowrap font-mono tracking-wider", index === currentStep ? "text-blue-400" : "text-zinc-600")}>
              {label}
            </span>
          </div>
          {index < STEPS.length - 1 && (
            <div className="h-[1px] flex-1 mx-2 relative overflow-hidden bg-white/10">
              {index < currentStep && (
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: "100%" }} 
                  className="absolute inset-0 bg-blue-500/50" 
                />
              )}
            </div>
          )}
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
        <div>
          <h2 className="text-2xl font-mono font-bold tracking-tight text-white mb-2">OPERATOR IDENTITY</h2>
          <p className="text-sm text-zinc-400 font-mono">Declare your system alias and full name to register with the orchestrator.</p>
        </div>
        <div className="space-y-6">
          <InputField label="Operator Full Name" value={data.fullName} onChange={(v) => update("fullName", v)} error={errors.fullName} />
          <InputField label="System Handle (Username)" value={data.username} onChange={(v) => update("username", v)} error={errors.username} />
          {suggestions.length > 0 && (
            <div className="text-xs text-zinc-500 font-mono">
              SUGGESTED HANDLES:{" "}
              {suggestions.map((item) => (
                <button key={item} className="underline mr-3 text-blue-400 hover:text-blue-300" onClick={() => update("username", item)}>
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </>
    );
  }
  if (step === 1) {
    return (
      <>
        <div>
          <h2 className="text-2xl font-mono font-bold tracking-tight text-white mb-2">NODE CAPABILITIES</h2>
          <p className="text-sm text-zinc-400 font-mono">Specify your role and intended usage parameters.</p>
        </div>
        <div className="space-y-6">
          <InputField label="Primary Role" value={data.role} onChange={(v) => update("role", v)} error={errors.role} placeholder="e.g. AI Engineer, Platform Architect" />
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-zinc-500 font-mono">Primary Use Case</label>
            <select
              value={data.useCase}
              onChange={(e) => update("useCase", e.target.value)}
              className={cn(
                "w-full bg-black/50 border p-4 text-sm font-mono text-white focus:outline-none focus:border-white transition-colors appearance-none",
                errors.useCase ? "border-red-500/50" : "border-white/10"
              )}
            >
              <option value="" disabled>Select execution vector</option>
              <option value="internal_tools">Internal AI Tooling</option>
              <option value="code_generation">Code Generation Assistants</option>
              <option value="autonomous_agents">Autonomous / Research Agents</option>
              <option value="testing_automation">Automated Testing & QA</option>
              <option value="other">Other Protocol</option>
            </select>
            {errors.useCase && <p className="text-xs text-red-500 font-mono mt-1">{errors.useCase}</p>}
          </div>
        </div>
      </>
    );
  }
  if (step === 2) {
    return (
      <>
        <div>
          <h2 className="text-2xl font-mono font-bold tracking-tight text-white mb-2">DEPLOYMENT CONTEXT</h2>
          <p className="text-sm text-zinc-400 font-mono">Optional parameters for workspace optimization.</p>
        </div>
        <div className="space-y-6">
          <InputField label="Organization ID (Optional)" value={data.organization} onChange={(v) => update("organization", v)} error={errors.organization} />
          <InputField label="Discovery Vector (Optional)" value={data.source} onChange={(v) => update("source", v)} error={errors.source} placeholder="How did you find this network?" />
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-zinc-500 font-mono">Initial Directives (Optional)</label>
            <textarea
              value={data.bio}
              onChange={(e) => update("bio", e.target.value)}
              rows={3}
              className="w-full bg-black/50 border border-white/10 p-4 text-sm font-mono text-white focus:outline-none focus:border-white transition-colors resize-none"
              placeholder="System prompt or bio..."
            />
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div>
        <h2 className="text-2xl font-mono font-bold tracking-tight text-white mb-2">SECURITY COMPLIANCE</h2>
        <p className="text-sm text-zinc-400 font-mono">Final authorization required before node initialization.</p>
      </div>
      
      <div className="border border-white/10 bg-black/50 p-6 mt-4">
        <div className="flex items-start gap-4 mb-6">
          <ShieldAlert className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
          <div className="text-xs font-mono text-zinc-400 leading-relaxed">
            WARNING: By activating this node, you grant DeepNerd infrastructure permission to execute remote operations and manage agent lifecycles on your behalf.
          </div>
        </div>
        
        <label className="flex items-start gap-4 cursor-pointer p-4 border border-white/5 hover:bg-white/5 transition-colors">
          <input
            type="checkbox"
            checked={data.acceptedTerms}
            onChange={(e) => update("acceptedTerms", e.target.checked)}
            className="mt-1 w-4 h-4 accent-blue-500 bg-black border-white/20"
          />
          <span className="text-sm font-mono text-zinc-300">
            [ACKNOWLEDGE] I have reviewed and accepted the DeepNerd Terms of Protocol and Data Privacy Directives.
          </span>
        </label>
      </div>
    </>
  );
}

function InputField({
  label,
  value,
  onChange,
  error,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2 relative">
      <label className="text-xs uppercase tracking-widest text-zinc-500 font-mono">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full bg-black/50 border p-4 text-sm font-mono text-white focus:outline-none focus:border-blue-500/50 transition-colors placeholder:text-zinc-700",
          error ? "border-red-500/50" : "border-white/10",
        )}
      />
      {error && <p className="text-[10px] uppercase tracking-widest font-mono text-red-500 absolute -bottom-5 left-0">{error}</p>}
    </div>
  );
}
