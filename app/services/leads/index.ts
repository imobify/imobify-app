import { Lead } from '@models/lead'
import { useToastStore } from '@stores/toastStore'
import { PaginatedLead } from '@models/lead/PaginatedLead'

import api from '../client'

export const getPaginatedLeads = async (take: number, cursor: number | undefined): Promise<{content: PaginatedLead[], cursor: number | undefined}> => {
  try {
    const { data } = await api.get<PaginatedLead[]>('/leads', {
      params: {
        take,
        ...(cursor ? { cursor } : {})
      }})

    return {
      content: data,
      cursor: data[data.length - 1]?.id || undefined
    }
  } catch (error) {
    console.error(error)
    useToastStore.getState().show('Não foi possível carregar a lista de clientes interessados.')
    throw error
  }
}

export const toggleLeadStatus = async (data: {realEstateId?: number, leadId?: number }): Promise<Lead | undefined> => {
  const { realEstateId, leadId } = data

  if (realEstateId !== undefined) {
    const post = {
      realEstate_id: realEstateId
    }

    const response = await api.post<Lead>('/leads', post)

    return response.data
  } else if (leadId !== undefined) {
    await api.delete(`/leads/${leadId}`)

    return
  }
}