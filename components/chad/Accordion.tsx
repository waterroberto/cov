import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
interface AccordionItemData {
  title: string;
  subTitle: string;
}

interface AccordionProps {
  data: AccordionItemData[];
}

export function AccordionDemo({data}: AccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full my-2">
      {data.map((a: AccordionItemData, index: number) => (
      <AccordionItem key={index} value={`item-${index}`}>
        <AccordionTrigger>{a.title}</AccordionTrigger>
        <AccordionContent>
          {a.subTitle}
        </AccordionContent>
      </AccordionItem>
      ))}
    </Accordion>
  )
}
