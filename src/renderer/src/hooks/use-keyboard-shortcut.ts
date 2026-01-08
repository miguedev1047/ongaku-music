import { useEffect, useRef } from 'react'

type KeyCombo = {
  code: string
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
  meta?: boolean
}

type KeyboardShortcutOptions = {
  combo: KeyCombo
  handler: () => void
  enabled?: boolean
  preventDefault?: boolean
}

export function useKeyboardShortcut({
  combo,
  handler,
  enabled = true,
  preventDefault = true
}: KeyboardShortcutOptions) {
  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    if (!enabled) return

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null

      const isInput = target && target.tagName === 'INPUT'
      const isTextarea = target && target.tagName === 'TEXTAREA'
      const isContentEditable = target && target.isContentEditable
      const isDialogActive = target && target.closest('[role="dialog"], [data-state="open"]')

      if (isInput || isTextarea || isContentEditable) {
        return
      }

      if (isDialogActive) {
        return
      }

      const matches =
        e.code === combo.code &&
        !!combo.ctrl === e.ctrlKey &&
        !!combo.shift === e.shiftKey &&
        !!combo.alt === e.altKey &&
        !!combo.meta === e.metaKey

      if (!matches) return

      if (preventDefault) e.preventDefault()
      handlerRef.current()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [combo, enabled, preventDefault])
}
