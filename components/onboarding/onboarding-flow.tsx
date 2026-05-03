"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "@/components/ui/typewriter";
import { useRouter } from "next/navigation";
import { Upload, ChevronRightIcon, ArrowRight, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

function ProgressStepper({ steps, currentStep }: { steps: string[]; currentStep: number }) {
  return (
    <div className="flex w-full items-center mb-12 px-2">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isPast = index < currentStep;
        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2 relative z-10 group">
              <div
                className={cn(
                  "size-8 rounded-full border flex items-center justify-center text-xs font-mono transition-colors bg-black relative",
                  isActive ? "border-white text-white" : isPast ? "border-zinc-500 text-zinc-300" : "border-zinc-800 text-zinc-700"
                )}
              >
                {isPast ? <Check className="size-4" /> : index + 1}
              </div>
              <span className={cn(
                "absolute top-10 text-[10px] whitespace-nowrap font-mono tracking-wider transition-colors",
                isActive ? "text-white" : isPast ? "text-zinc-400" : "text-zinc-800"
              )}>
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="h-[1px] flex-1 mx-2 bg-zinc-800 relative">
                <div 
                  className="absolute inset-y-0 left-0 bg-white transition-all duration-500" 
                  style={{ width: isPast ? '100%' : '0%' }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const STEPS = ["BASIC INFO", "PROFILE", "DISCOVERY", "SECURITY", "COMPLIANCE"];

export function OnboardingFlow() {
  const router = useRouter();
  const [phase, setPhase] = useState<"intro" | "form" | "outro">("intro");
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    age: "",
    gender: "",
    bio: "",
    source: "",
    feedback: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  });

  const handleUpdate = (field: string, value: any) => {
    setFormData((p) => ({ ...p, [field]: value }));
    if (errors[field]) {
      setErrors((p) => ({ ...p, [field]: "" }));
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    if (step === 0) {
      if (!formData.fullName) { newErrors.fullName = "Required"; isValid = false; }
      if (!formData.username) { newErrors.username = "Required"; isValid = false; }
      if (!formData.age) { newErrors.age = "Required"; isValid = false; }
      if (!formData.gender) { newErrors.gender = "Required"; isValid = false; }
    } else if (step === 1) {
      // Profile picture / bio are optional
    } else if (step === 2) {
      if (!formData.source) { newErrors.source = "Required"; isValid = false; }
    } else if (step === 3) {
      if (formData.password.length < 8) { newErrors.password = "Min 8 chars"; isValid = false; }
      if (formData.password !== formData.confirmPassword) { newErrors.confirmPassword = "Passwords do not match"; isValid = false; }
    } else if (step === 4) {
      if (!formData.acceptedTerms) { newErrors.acceptedTerms = "Must accept terms"; isValid = false; }
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep((p) => p + 1);
      } else {
        submitForm();
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((p) => p - 1);
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setPhase("outro");
  };

  if (phase === "intro") {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-black text-white px-6">
        <Typewriter
          texts={[
            "Hey, Welcome to DeepNerd.",
            "Let's setup your DeepNerd Account!"
          ]}
          speed={60}
          deleteSpeed={30}
          pauseDuration={1000}
          className="text-2xl md:text-5xl font-bold tracking-tighter"
          onComplete={() => {
            setTimeout(() => setPhase("form"), 800);
          }}
        />
      </div>
    );
  }

  if (phase === "outro") {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-black text-white px-6">
        <Typewriter
          texts={["Yayy! Account Creation successful 🎉"]}
          speed={60}
          pauseDuration={1500}
          className="text-2xl md:text-5xl font-bold tracking-tighter"
          onComplete={() => {
            setTimeout(() => router.push("/dashboard"), 1000);
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen flex-col bg-black text-white overflow-hidden">
      <div className="w-full max-w-xl mx-auto flex flex-col h-full px-6 py-12 pt-24 pb-8 relative">
        <ProgressStepper steps={STEPS} currentStep={currentStep} />
        
        <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col gap-6 pt-4 pb-24"
            >
              <StepContent 
                step={currentStep} 
                data={formData} 
                update={handleUpdate} 
                errors={errors} 
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="pt-6 border-t border-white/10 flex justify-between items-center bg-black">
          <button 
            onClick={prevStep} 
            disabled={currentStep === 0 || isSubmitting}
            className="text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-white transition-colors disabled:opacity-0"
          >
            Back
          </button>
          
          <button 
            onClick={nextStep}
            disabled={isSubmitting || (currentStep === 4 && !formData.acceptedTerms)}
            className="flex items-center gap-2 bg-white text-black px-6 py-3 text-xs font-mono font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <><Loader2 className="size-4 animate-spin" /> Processing</>
            ) : (
              <>{currentStep === STEPS.length - 1 ? "Complete Setup" : "Continue"} <ArrowRight className="size-4" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function StepContent({ step, data, update, errors }: any) {
  switch (step) {
    case 0:
      return (
        <>
          <div>
            <h2 className="text-2xl font-bold mb-1 tracking-tight">Basic Info</h2>
            <p className="text-sm text-zinc-500">Let's get to know you better. How should we address you?</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-mono">Full Name</label>
              <input value={data.fullName} onChange={e => update("fullName", e.target.value)} className={cn("w-full bg-zinc-950 border p-4 text-sm font-sans text-white focus:outline-none focus:border-white transition-colors", errors.fullName ? "border-red-500/50" : "border-zinc-800")} placeholder="Alan Turing" />
              {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-mono">Username</label>
              <input value={data.username} onChange={e => update("username", e.target.value)} className={cn("w-full bg-zinc-950 border p-4 text-sm font-sans text-white focus:outline-none focus:border-white transition-colors", errors.username ? "border-red-500/50" : "border-zinc-800")} placeholder="alanturing1912" />
              {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-zinc-500 font-mono">Age</label>
                <input type="number" value={data.age} onChange={e => update("age", e.target.value)} className={cn("w-full bg-zinc-950 border p-4 text-sm font-sans text-white focus:outline-none focus:border-white transition-colors", errors.age ? "border-red-500/50" : "border-zinc-800")} placeholder="42" />
                {errors.age && <p className="text-xs text-red-500">{errors.age}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-zinc-500 font-mono">Gender</label>
                <select value={data.gender} onChange={e => update("gender", e.target.value)} className={cn("w-full bg-zinc-950 border p-4 text-sm font-sans text-white focus:outline-none focus:border-white transition-colors appearance-none", errors.gender ? "border-red-500/50" : "border-zinc-800")}>
                  <option value="" disabled>Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                {errors.gender && <p className="text-xs text-red-500">{errors.gender}</p>}
              </div>
            </div>
          </div>
        </>
      );
    case 1:
      return (
        <>
          <div>
            <h2 className="text-2xl font-bold mb-1 tracking-tight">Identity</h2>
            <p className="text-sm text-zinc-500">Upload an avatar and drop a quick flex.</p>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="size-24 rounded-full bg-zinc-900 border border-zinc-800 border-dashed flex items-center justify-center">
                <Upload className="text-zinc-600 size-6" />
              </div>
              <button className="text-sm bg-zinc-900 border border-zinc-800 px-4 py-2 hover:bg-zinc-800 transition-colors">
                Select Image
              </button>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-mono">Bio (Optional)</label>
              <textarea value={data.bio} onChange={e => update("bio", e.target.value)} rows={4} className="w-full bg-zinc-950 border border-zinc-800 p-4 text-sm font-sans text-white focus:outline-none focus:border-white transition-colors resize-none" placeholder="I build autonomous agents that build autonomous agents..." />
            </div>
          </div>
        </>
      );
    case 2:
      return (
        <>
          <div>
            <h2 className="text-2xl font-bold mb-1 tracking-tight">Discovery</h2>
            <p className="text-sm text-zinc-500">Help us map the network. How did you arrive here?</p>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-mono">Referral Source</label>
              <select value={data.source} onChange={e => update("source", e.target.value)} className={cn("w-full bg-zinc-950 border p-4 text-sm font-sans text-white focus:outline-none focus:border-white transition-colors appearance-none", errors.source ? "border-red-500/50" : "border-zinc-800")}>
                <option value="" disabled>Select Source</option>
                <option value="twitter">X / Twitter</option>
                <option value="github">GitHub Trending</option>
                <option value="youtube">YouTube</option>
                <option value="friend">Friend / Colleague</option>
                <option value="other">Other</option>
              </select>
              {errors.source && <p className="text-xs text-red-500">{errors.source}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-mono">Feedback (Optional)</label>
              <textarea value={data.feedback} onChange={e => update("feedback", e.target.value)} rows={3} className="w-full bg-zinc-950 border border-zinc-800 p-4 text-sm font-sans text-white focus:outline-none focus:border-white transition-colors resize-none" placeholder="What are you hoping to build with us?" />
            </div>
          </div>
        </>
      );
    case 3:
      return (
        <>
          <div>
            <h2 className="text-2xl font-bold mb-1 tracking-tight">Access Control</h2>
            <p className="text-sm text-zinc-500">Secure your portal. Strong cryptographic keys only.</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-mono">Password</label>
              <input type="password" value={data.password} onChange={e => update("password", e.target.value)} className={cn("w-full bg-zinc-950 border p-4 text-sm font-sans text-white focus:outline-none focus:border-white transition-colors", errors.password ? "border-red-500/50" : "border-zinc-800")} placeholder="••••••••" />
              {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-mono">Confirm Password</label>
              <input type="password" value={data.confirmPassword} onChange={e => update("confirmPassword", e.target.value)} className={cn("w-full bg-zinc-950 border p-4 text-sm font-sans text-white focus:outline-none focus:border-white transition-colors", errors.confirmPassword ? "border-red-500/50" : "border-zinc-800")} placeholder="••••••••" />
              {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
            </div>
          </div>
        </>
      );
    case 4:
      return (
        <>
          <div>
            <h2 className="text-2xl font-bold mb-1 tracking-tight">Compliance & Protocols</h2>
            <p className="text-sm text-zinc-500">Final step. Read through and accept our operational constraints.</p>
          </div>
          <div className="space-y-6">
            <div className="bg-zinc-950 border border-zinc-800 p-6 h-48 overflow-y-auto custom-scrollbar space-y-4 text-xs text-zinc-400 font-mono leading-relaxed">
              <p className="text-white font-bold text-sm">DEEPNERD AUP & TOS [SYS_SUMMARIZED]</p>
              <p>By proceeding, you acknowledge that you are injecting into a high-compute AI environment. DeepNerd enforces strict zero-training guarantees for enterprise endpoints, meaning your telemetry and inputs remain yours.</p>
              <p>However, abuse of our orchestration layer—including DDoS attempts, polymorphic malware generation, or evasive web scraping—will result in immediate termination and potential IP blacklisting.</p>
              <p>We do not warrant uptime nor do we accept liability for AI output hallucinations. You are responsible for all deterministic validations before production deployments.</p>
              <p>End of summary. You are cleared for deployment.</p>
            </div>
            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-0.5">
                <input 
                  type="checkbox" 
                  checked={data.acceptedTerms} 
                  onChange={(e) => update("acceptedTerms", e.target.checked)} 
                  className="peer appearance-none size-5 border border-zinc-700 bg-zinc-950 checked:bg-white checked:border-white transition-colors cursor-pointer" 
                />
                <ChevronRightIcon className="absolute size-4 text-black opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity stroke-[3px]" />
              </div>
              <span className="text-sm font-sans text-zinc-400 group-hover:text-zinc-300 transition-colors">
                I hereby declare that I have read, understood, and accept the DeepNerd Terms of Service and Privacy Policy boundaries.
              </span>
            </label>
            {errors.acceptedTerms && <p className="text-xs text-red-500">{errors.acceptedTerms}</p>}
          </div>
        </>
      );
    default:
      return null;
  }
}
