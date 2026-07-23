import { useMemo, useState, type ReactNode } from 'react'
import { ShellActionsContext, type QuickAddKind, type ShellActionsValue } from './shellActions'

export function ShellActionsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; kind?: QuickAddKind }>({ open: false })
  const value = useMemo<ShellActionsValue>(() => ({
    openQuickAdd: (kind) => setState({ open: true, kind }),
    closeQuickAdd: () => setState({ open: false }),
    quickAddOpen: state.open,
    quickAddKind: state.kind,
  }), [state])
  return <ShellActionsContext.Provider value={value}>{children}</ShellActionsContext.Provider>
}
