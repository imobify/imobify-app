import { create } from 'zustand'

type ToastState = {
  visible: boolean
  message: string
  show: (message: string) => void
  hide: () => void
}

export const useToastStore = create<ToastState>()((set) => ({
  visible: false,
  message: '',
  show: (message: string) => {
    set({ message, visible: true })

    setTimeout(() => {
      set({ message: '', visible: false })
    }, 8000)
  },
  hide: () => {
    set({ message: '', visible: false })
  }
}))