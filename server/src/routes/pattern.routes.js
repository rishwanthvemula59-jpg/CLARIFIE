import { Router } from 'express';
import { memoryDb, isSupabaseConfigured, getSupabaseClient } from '../config/db.js';

const router = Router();

router.get('/patterns', async (req, res) => {
  try {
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase.from('scam_patterns').select('*').order('occurrence_count', { ascending: false }).limit(20);
      if (!error && data) {
        return res.json({ patterns: data });
      }
    }
    return res.json({ patterns: memoryDb.scam_patterns });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch scam patterns' });
  }
});

export default router;
