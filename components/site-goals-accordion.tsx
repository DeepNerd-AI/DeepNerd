import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function SiteGoalsAccordion() {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">DeepNerd Core Goals</h2>
      <Accordion type="single" collapsible className="w-full max-w-2xl">
        <AccordionItem value="goal-1">
          <AccordionTrigger>Machine-Readable First</AccordionTrigger>
          <AccordionContent>
            DeepNerd prioritizes infrastructure that AI agents can natively read and interact with. We bypass brittle UI scraping to ensure seamless, deterministic integration across the entire development lifecycle.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="goal-2">
          <AccordionTrigger>Sub-10ms Latency & High Performance</AccordionTrigger>
          <AccordionContent>
            Our Rust-native backend guarantees instantaneous response times. We equip AI agents with the raw execution speed necessary to complete complex, recursive reasoning without platform bottlenecks.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="goal-3">
          <AccordionTrigger>Autonomous Automation Pipelines</AccordionTrigger>
          <AccordionContent>
            Deploy self-healing, agent-driven automation pipelines. We provide the primitives that allow AI to write, test, review, and independently deploy code rapidly without manual human intervention.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
