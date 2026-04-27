import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"

export function DocsExtras() {
  return (
    <section className="mt-10 space-y-6">
      <Separator />

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Developer Notes</CardTitle>
          <CardDescription>Quick references for implementation and rollout strategy.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="auth">Auth</TabsTrigger>
              <TabsTrigger value="limits">Limits</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="pt-3 text-sm text-muted-foreground">
              Use project-scoped keys and server-side request handlers for protected operations.
            </TabsContent>
            <TabsContent value="auth" className="pt-3 text-sm text-muted-foreground">
              Rotate API keys regularly and keep client-side tokens restricted to low-risk endpoints.
            </TabsContent>
            <TabsContent value="limits" className="pt-3 text-sm text-muted-foreground">
              Implement retries with exponential backoff for 429 and transient 5xx responses.
            </TabsContent>
          </Tabs>

          <Accordion type="single" collapsible>
            <AccordionItem value="faq-1">
              <AccordionTrigger>How do we version docs content?</AccordionTrigger>
              <AccordionContent>Store docs alongside app code and release them with the same deployment tag.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger>Can we add examples per product?</AccordionTrigger>
              <AccordionContent>
                Yes. Add additional markdown sections and map them to product-specific routes.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="secondary">Stable</Badge>
            This page follows the current production API behavior.
          </div>
        </CardContent>
      </Card>
    </section>
  )
}