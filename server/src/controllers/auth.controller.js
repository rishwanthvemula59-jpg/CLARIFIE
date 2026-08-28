import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getSupabaseClient, isSupabaseConfigured, memoryDb } from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'clarifie_super_secret_jwt_key_2026_forensics_security';

export const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const emailLower = email.toLowerCase().trim();
    const finalUsername = (username && username.trim()) ? username.trim() : emailLower.split('@')[0];

    const passwordHash = await bcrypt.hash(password, 10);

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseClient();
      
      // Check existing
      const { data: existing } = await supabase.from('users').select('id').eq('email', emailLower).single();
      if (existing) {
        return res.status(400).json({ error: 'An account with this email already exists' });
      }

      const { data: user, error } = await supabase
        .from('users')
        .insert([{ email: emailLower, password_hash: passwordHash, username: finalUsername }])
        .select('id, email, username, created_at')
        .single();

      if (error) {
        // If username column doesn't exist in Supabase DB yet, insert without username
        const { data: fallbackUser, error: fallbackError } = await supabase
          .from('users')
          .insert([{ email: emailLower, password_hash: passwordHash }])
          .select('id, email, created_at')
          .single();
        
        if (fallbackError) throw fallbackError;
        const token = jwt.sign({ userId: fallbackUser.id, email: fallbackUser.email, username: finalUsername }, JWT_SECRET, { expiresIn: '7d' });
        return res.status(201).json({ token, user: { id: fallbackUser.id, email: fallbackUser.email, username: finalUsername } });
      }

      const token = jwt.sign({ userId: user.id, email: user.email, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(201).json({ token, user: { id: user.id, email: user.email, username: user.username || finalUsername } });
    }

    // In-memory DB
    const existing = memoryDb.users.find(u => u.email === emailLower);
    if (existing) {
      return res.status(400).json({ error: 'An account with this email already exists' });
    }

    const newUser = { id: userId, email: emailLower, username: finalUsername, password_hash: passwordHash, created_at: new Date().toISOString() };
    memoryDb.users.push(newUser);

    const token = jwt.sign({ userId: newUser.id, email: newUser.email, username: newUser.username }, JWT_SECRET, { expiresIn: '7d' });
    return res.status(201).json({ token, user: { id: newUser.id, email: newUser.email, username: newUser.username } });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to create user account', details: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailLower = email.toLowerCase().trim();

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseClient();
      const { data: user, error } = await supabase.from('users').select('*').eq('email', emailLower).single();

      if (error || !user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const derivedUsername = user.username || user.email.split('@')[0];
      const token = jwt.sign({ userId: user.id, email: user.email, username: derivedUsername }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, user: { id: user.id, email: user.email, username: derivedUsername } });
    }

    // In-Memory
    const user = memoryDb.users.find(u => u.email === emailLower);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const derivedUsername = user.username || user.email.split('@')[0];
    const token = jwt.sign({ userId: user.id, email: user.email, username: derivedUsername }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user: { id: user.id, email: user.email, username: derivedUsername } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to authenticate', details: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const userId = req.userId;
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseClient();
      const { data: user } = await supabase.from('users').select('id, email, username, created_at').eq('id', userId).single();
      if (user) {
        const derivedUsername = user.username || user.email.split('@')[0];
        return res.json({ user: { ...user, username: derivedUsername } });
      }
    }

    const user = memoryDb.users.find(u => u.id === userId);
    if (user) {
      const derivedUsername = user.username || user.email.split('@')[0];
      return res.json({ user: { id: user.id, email: user.email, username: derivedUsername, created_at: user.created_at } });
    }

    const email = req.user?.email || 'user@clarifie.sec';
    const fallbackUsername = req.user?.username || email.split('@')[0];
    return res.json({ user: { id: userId, email, username: fallbackUsername } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};
