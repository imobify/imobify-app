import { useMutation } from '@tanstack/react-query'
import { toggleLeadStatus } from '@services/leads'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDeleteLeadMutation = (onSucessFn: () => any) => useMutation({
  mutationFn: (variables: { leadId: number }) => toggleLeadStatus(variables),
  onSuccess: onSucessFn
})