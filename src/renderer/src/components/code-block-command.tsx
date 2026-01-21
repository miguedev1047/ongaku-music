'use client'

import * as React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Check, Copy, Terminal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { detectOS } from '@/helpers/detect-os'

const OS_LABELS: Record<OS, string> = {
  windows: 'Windows',
  linux: 'Linux',
  macos: 'macOS'
}

type OS = 'windows' | 'linux' | 'macos'

interface CodeBlockCommandProps {
  __windows__?: string
  __linux__?: string
  __macos__?: string
  className?: string
}

export function CodeBlockCommand({
  __windows__,
  __linux__,
  __macos__,
  className
}: CodeBlockCommandProps) {
  const [copyState, setCopyState] = React.useState<'idle' | 'copied' | 'error'>('idle')

  const tabs = React.useMemo(
    () => ({
      windows: __windows__,
      linux: __linux__,
      macos: __macos__
    }),
    [__windows__, __linux__, __macos__]
  )

  const availableTabs = React.useMemo(
    () =>
      (Object.entries(tabs) as [OS, string | undefined][]).filter(
        ([_, value]) => value !== undefined
      ),
    [tabs]
  )

  const defaultTab = React.useMemo(() => {
    const detected = detectOS()
    return tabs[detected] ? detected : (availableTabs[0]?.[0] ?? 'windows')
  }, [tabs, availableTabs])

  const [activeTab, setActiveTab] = React.useState<OS>(defaultTab)

  React.useEffect(() => {
    if (copyState !== 'idle') {
      const timer = setTimeout(() => setCopyState('idle'), 2000)
      return () => clearTimeout(timer)
    }
  }, [copyState])

  const copyCommand = React.useCallback(async () => {
    const command = tabs[activeTab]
    if (!command) return

    try {
      await navigator.clipboard.writeText(command)
      setCopyState('copied')
    } catch {
      setCopyState('error')
    }
  }, [tabs, activeTab])

  if (availableTabs.length === 0) return null

  return (
    <div
      className={cn('relative overflow-hidden rounded-lg border', className)}
      role="region"
      aria-label="Command block"
    >
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as OS)}>
        <div className="flex items-center justify-between border-b bg-muted/50 px-3 py-1">
          <div className="flex items-center gap-2">
            <Terminal className="size-4 text-muted-foreground" />
            <TabsList className="h-8 bg-transparent p-0">
              {availableTabs.map(([key]) => (
                <TabsTrigger key={key} value={key} className="data-[state=active]:bg-background">
                  {OS_LABELS[key]}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="size-7"
                onClick={copyCommand}
                aria-label={`Copy ${OS_LABELS[activeTab]} command`}
              >
                {copyState === 'copied' ? (
                  <Check className="size-4 text-green-500" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {copyState === 'copied'
                ? 'Copied!'
                : copyState === 'error'
                  ? 'Failed to copy'
                  : 'Copy command'}
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Contenido de comandos */}
        {availableTabs.map(([key, value]) => (
          <TabsContent key={key} value={key} className="mt-0 p-4">
            <pre className="overflow-x-auto">
              <code className="font-mono text-sm">{value}</code>
            </pre>
          </TabsContent>
        ))}
      </Tabs>

      {/* Anuncio para screen readers */}
      <div aria-live="polite" className="sr-only">
        {copyState === 'copied' && 'Command copied to clipboard'}
        {copyState === 'error' && 'Failed to copy command'}
      </div>
    </div>
  )
}
