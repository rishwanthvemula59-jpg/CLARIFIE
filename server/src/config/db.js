import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const isConfigured =
  supabaseUrl &&
  !supabaseUrl.includes('your-supabase-project') &&
  supabaseServiceKey &&
  !supabaseServiceKey.includes('your_service_role_key');

let supabase = null;

if (isConfigured) {
  try {
    supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
      db: { schema: 'public' }
    });
    console.log('✅ Connected to Supabase Cloud PostgreSQL (clarifie-forensics)');
  } catch (err) {
    console.warn('⚠️  Could not initialize Supabase client:', err.message);
  }
} else {
  console.log('ℹ️  Supabase credentials not configured. Running with in-memory persistence.');
}

// In-Memory fallback store (used when Supabase is not configured)
const memoryStore = {
  users: [],
  cases: [],
  case_evidence: [],
  guardian_checks: [],
  scam_patterns: [
    {
      id: 'p-101',
      signature_text: 'Urgent Bank Fraud Dept impersonation + SMS Bitly phishing link + predatory high-yield loan agreement',
      occurrence_count: 7,
      last_seen: new Date().toISOString()
    },
    {
      id: 'p-102',
      signature_text: 'Authority impersonation (Police/IRS) requesting OTP + fake penalty fee notice PDF',
      occurrence_count: 4,
      last_seen: new Date().toISOString()
    },
    {
      id: 'p-103',
      signature_text: 'Deepfake executive voice clone requesting emergency wire transfer',
      occurrence_count: 12,
      last_seen: new Date().toISOString()
    }
  ]
};

export const getSupabaseClient = () => supabase;
export const isSupabaseConfigured = () => Boolean(supabase);
export const memoryDb = memoryStore;
