import { createContext } from 'react'
import type { ToastInput } from '@/components/common/ToastProvider'

export const ToastContext = createContext<{ toast: (input: ToastInput) => string } | null>(null)
