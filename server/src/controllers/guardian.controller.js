import { analyzeGuardianCheck } from '../services/gemini.service.js';
import { getSupabaseClient, isSupabaseConfigured, memoryDb } from '../config/db.js';

// Helper to detect nonsensical keyboard mash or invalid inputs
const isInvalidInput = (text) => {
  if (!text || typeof text !== 'string') return true;
  const trimmed = text.trim();
  if (trimmed.length < 4) return true;

  // Check for repeated single characters e.g. "aaaaa" or "hhhhh"
  if (/^(.)\1+$/.test(trimmed)) return true;

  // Check for keyboard mash patterns without spaces or vowels (e.g. "asdfghjkl", "qwertyuiop", "zxcvbnm")
  const vowels = trimmed.match(/[aeiouyAEIOUY]/g);
  if (!vowels && trimmed.length > 4 && !trimmed.includes(' ')) return true;

  // Check for pure random digits/symbols without context e.g. "12345678" or "!@#$%"
  if (/^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+$/.test(trimmed)) return true;

  return false;
};

export const checkSituation = async (req, res) => {
  try {
    const { description } = req.body;
    const userId = req.userId || null;

    if (isInvalidInput(description)) {
      return res.status(400).json({
        error: 'invalid_input',
        message: 'Invalid input detected. Please describe a valid incident or scenario (e.g., "Received an urgent text claiming my package is on hold with a link").',
        riskLevel: 'invalid',
        redFlags: ['Unclear or nonsensical text input'],
        advice: 'Please provide a clear description of the call, text, or email you encountered so our AI engine can assess fraud indicators.'
      });
    }

    const result = await analyzeGuardianCheck(description);

    const checkRecord = {
      id: `g-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      user_id: userId,
      description,
      risk_level: result.riskLevel,
      red_flags: result.redFlags,
      advice: result.advice,
      created_at: new Date().toISOString()
    };

    if (userId && isSupabaseConfigured()) {
      const supabase = getSupabaseClient();
      await supabase.from('guardian_checks').insert([checkRecord]);
    }

    if (userId) {
      memoryDb.guardian_checks.unshift(checkRecord);
    }

    return res.json(result);
  } catch (error) {
    console.error('Guardian check error:', error);
    return res.status(500).json({ error: 'Failed to complete triage check', details: error.message });
  }
};
