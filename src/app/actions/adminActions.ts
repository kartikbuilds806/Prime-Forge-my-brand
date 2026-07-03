'use server'

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'forge-admin-2026'

function verifyPasscode(passcode: string): boolean {
  return passcode === ADMIN_PASSCODE;
}

export async function getAdminRequestsAction(passcode: string) {
  try {
    if (!verifyPasscode(passcode)) {
      return { success: false, error: 'Unauthorized: Invalid admin passcode.' };
    }

    // Query Supabase for all client requests
    const { data: requests, error } = await supabase
      .from('client_requests')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) {
      console.error('Supabase admin fetch error:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    return { success: true, data: requests || [] };

  } catch (error) {
    console.error('getAdminRequestsAction error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch admin requests.'
    };
  }
}

export async function updateRequestStatusAction(id: string | number, newStatus: string, passcode: string) {
  try {
    if (!verifyPasscode(passcode)) {
      return { success: false, error: 'Unauthorized: Invalid admin passcode.' };
    }

    // Update status in Supabase
    const { data, error } = await supabase
      .from('client_requests')
      .update({ status: newStatus })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Supabase status update error:', error);
      throw new Error(`Database update failed: ${error.message}`);
    }

    return { success: true, data: data };

  } catch (error) {
    console.error('updateRequestStatusAction error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update request status.'
    };
  }
}
