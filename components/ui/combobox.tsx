"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

export type ComboboxOption = {
  value: string
  label: string
}

type ComboboxProps = {
  options: ComboboxOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  showChevron?: boolean
  align?: "start" | "center"
}

/**
 * Reusable Combobox using existing Popover/Command primitives.
 * Keeps sizing via `className` so it can match input widths.
 */
export function Combobox({
  options,
  value = "",
  onChange,
  placeholder = "Select...",
  className = "w-full justify-between",
  showChevron = true,
  align = "start",
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLDivElement | null>(null)
  const [triggerWidth, setTriggerWidth] = React.useState<number | null>(null)

  React.useEffect(() => {
    const measure = () => {
      const w = triggerRef.current?.getBoundingClientRect().width ?? null
      setTriggerWidth(w)
    }

    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  // update width when opened as well
  React.useEffect(() => {
    if (open) {
      const w = triggerRef.current?.getBoundingClientRect().width ?? null
      setTriggerWidth(w)
    }
  }, [open])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div ref={triggerRef} className="inline-block w-full">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={className}
          >
            {value ? options.find((o) => o.value === value)?.label : placeholder}
            {showChevron && <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        align={align}
        sideOffset={4}
        style={triggerWidth ? { width: triggerWidth } : undefined}
      >
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No result found.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.value}
                  onSelect={(currentValue) => {
                    const newVal = currentValue === value ? "" : currentValue
                    onChange?.(newVal)
                    setOpen(false)
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === opt.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {opt.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

// Backwards-compatible export: example configured combobox
export function ExampleCombobox() {
  const [value, setValue] = React.useState("")
  return (
    <Combobox
      options={frameworks}
      value={value}
      onChange={setValue}
      placeholder="Select framework..."
      className="w-[200px] justify-between"
    />
  )
}