import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserRole = 'buyer' | 'seller'

interface RoleStore {
  role: UserRole
  setRole: (role: UserRole) => void
  toggleRole: () => void
}

export const useRoleStore = create<RoleStore>()(
  persist(
    (set, get) => ({
      role: 'buyer', // Default to buyer as requested
      setRole: (role: UserRole) => set({ role }),
      toggleRole: () => set({ role: get().role === 'buyer' ? 'seller' : 'buyer' }),
    }),
    {
      name: 'user-role-storage',
    }
  )
)