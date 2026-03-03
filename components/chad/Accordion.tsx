import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { randomUUID } from "crypto"

interface Props {
  data: {title: string, subTitle: string}[]
}

export function AccordionDemo({data}: Props) {
  return (
    <Accordion type="single" collapsible className="w-full my-2">
      {data.map(a => (
      <AccordionItem key={a.title + randomUUID()} value={a.title + randomUUID()}>
        <AccordionTrigger>{a.title}</AccordionTrigger>
        <AccordionContent>
          {a.subTitle}
        </AccordionContent>
      </AccordionItem>

      ))}
    </Accordion>
  )
}
