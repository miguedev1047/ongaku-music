import { Field, FieldContent, FieldDescription, FieldLabel } from '@/components/ui/field'
import { ModeToggle } from '@/components/ui/mode-toggle'

export function Settings() {
  return (
    <div className="space-y-4">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel>Appearance</FieldLabel>
          <FieldDescription>Choose how the application looks.</FieldDescription>
        </FieldContent>
        <ModeToggle />
      </Field>
    </div>
  )
}
