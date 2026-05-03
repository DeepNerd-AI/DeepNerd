export default function TermsOfServicePage() {
  return (
    <main className="mx-auto w-full max-w-[1440px] border-x border-zinc-800 px-6 py-28 md:px-12 bg-black min-h-screen text-zinc-300 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <div>
          <div className="border border-zinc-800 bg-zinc-900 py-1 px-4 text-xs font-mono text-zinc-400 w-max mb-6">SYS_DOC // TERMS_AND_USAGE</div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">DeepNerd Terms of Service & Usage Policy</h1>
          <p className="text-lg text-zinc-400">
            Effective Date: May 3, 2026
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">1. Acceptance of Terms</h2>
          <p>
            By registering for an account, accessing the API, or utilizing the DeepNerd platform (including Vault Vault IDE and Muac Agent), you agree to these Terms of Service. If you are accepting these terms on behalf of a corporation or entity, you represent that you have the legal authority to bind that entity.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">2. Account Responsibilities</h2>
          <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-4">
            <li><strong>Security:</strong> You are responsible for all activities occurring under your account. You must explicitly safeguard your API keys and authentication tokens. DeepNerd will not be liable for any loss resulting from compromised credentials.</li>
            <li><strong>Accuracy:</strong> You must provide accurate billing and identity information and maintain its currency.</li>
            <li><strong>Age Restrictions:</strong> You must be at least 18 years old to access the DeepNerd API and developer ecosystem.</li>
          </ul>
        </section>

        <section className="space-y-4 border border-zinc-800 bg-zinc-950 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-4">3. Acceptable Use Policy (AUP)</h2>
          <p className="mb-4">As an AI orchestration platform, strict guardrails govern the use of DeepNerd's intelligence models, APIs, and agents. You may <strong>NOT</strong> use our Services to:</p>
          
          <h3 className="text-lg font-semibold text-zinc-100 mt-4">A. Prohibited AI Uses</h3>
          <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-4">
            <li>Generate, promote, or distribute illegal content, CSAM, or non-consensual intimate imagery.</li>
            <li>Facilitate physical harm, violence, self-harm, or terrorism.</li>
            <li>Generate highly deceptive content including deepfakes, disinformation campaigns, or large-scale astroturfing.</li>
            <li>Provide unverified, specialized advice where failure could lead to severe consequences (e.g., medical diagnoses without oversight, legal counsel, or critical financial charting).</li>
          </ul>

          <h3 className="text-lg font-semibold text-zinc-100 mt-4">B. Developer Misuse & Abuse</h3>
          <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-4">
            <li>Develop polymorphic malware, ransomware, or offensive cyber-attack frameworks.</li>
            <li>Execute automated agents to conduct unauthorized network scanning, scraping, or DDoS attacks against third parties.</li>
            <li>Reverse engineer, decompile, or attempt to extract DeepNerd model weights or proprietary routing algorithms.</li>
            <li>Evade, bypass, or spoof rate limits, automated billing pipelines, or AI safety moderation filters.</li>
          </ul>

          <h3 className="text-lg font-semibold text-zinc-100 mt-4">C. Enforcement & Consequences</h3>
          <p className="text-zinc-400">
            Violations of the AUP may result in immediate rate-limiting, shadow-banning, API key revocation, or permanent termination of your account without refund. In cases of severe abuse or illegal operations, we will preserve system logs and report findings to relevant law enforcement agencies.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">4. API and Developer Usage Rules</h2>
          <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-4">
            <li><strong>Rate Limiting:</strong> APIs are subject to tier-dependent rate limits. We reserve the right to throttle sustained, abusive, or abnormally spiky traffic paradigms to protect platform health.</li>
            <li><strong>Compliance Integration:</strong> Applications querying DeepNerd APIs that interface directly with consumers must clearly disclose that AI methodologies are being utilized to generate outputs.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">5. Content & Ownership</h2>
          <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-4">
            <li><strong>Your Inputs:</strong> You retain complete ownership of all code, prompts, and context you inject into our system.</li>
            <li><strong>AI Outputs:</strong> Subject to your compliance with these Terms, DeepNerd assigns to you all its right, title, and interest in and to the Outputs generated by the Services based on your Inputs.</li>
            <li><strong>AI Content Disclaimers:</strong> DeepNerd utilizes probabilistic machine learning. Outputs may be inaccurate, incomplete, or contain code flaws. You are entirely responsible for evaluating, testing, and compiling Outputs before deploying them into production environments.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">6. Payment & Subscription Terms</h2>
          <p>
            The Services use a combination of subscription tiers and pay-as-you-go metered billing for compute and API access.
          </p>
          <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-4">
            <li><strong>Billing Accuracy:</strong> You agree to pay all charges associated with your utilization of the API.</li>
            <li><strong>Taxes:</strong> Fees are exclusive of applicable taxes. You remain responsible for all taxes and duties.</li>
            <li><strong>Refunds:</strong> Payments are non-refundable except as legally required or at our absolute discretion.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">7. Enterprise Terms</h2>
          <p>
            If you access DeepNerd via an Enterprise Custom Agreement or MSA, the terms of that specific written agreement, including defined SLAs, specialized DPAs, and dedicated liability clauses, govern over conflicting sections of this generalized Terms of Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">8. Limitation of Liability</h2>
          <p className="uppercase font-semibold text-zinc-500 tracking-wider">Disclaimer of Warranties</p>
          <p>
            DeepNerd provides the Services "AS IS" and "AS AVAILABLE." We make no warranties (express or implied) regarding uptime, code compilation exactness, hallucination rates, or fitness for a particular commercial purpose. 
          </p>
          <p className="uppercase font-semibold text-zinc-500 tracking-wider mt-4">Limit of Liability</p>
          <p>
            To the maximum extent under applicable law, DeepNerd and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenues, or compiled data. In no event shall DeepNerd’s aggregate liability exceed the total amount you paid for the Service in the 12 months preceding the claim.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">9. Termination</h2>
          <p>
            You may stop using DeepNerd at any time. We reserve the right to suspend or terminate your API access, Vault IDE sessions, or entirely delete your account if we determine you have materially breached these terms, failed to pay metered fees, or presented critical risk to our data availability.
          </p>
        </section>

        <div className="pt-12 border-t border-zinc-800">
          <p className="text-sm font-mono text-zinc-500 text-center">
            END OF FILE // DEEPNERD_TOS
          </p>
        </div>
      </div>
    </main>
  );
}
