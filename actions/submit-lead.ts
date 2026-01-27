'use server'

import { addLead } from '@/lib/supabase'
import type { Lead } from '@/types'

export async function submitLead(data: Lead) {
    try {
        const result = await addLead(data)
        if (result.error) {
            return { success: false, error: result.error.message }
        }
        return { success: true }
    } catch (e) {
        return { success: false, error: 'Unknown error occurred' }
    }
}
