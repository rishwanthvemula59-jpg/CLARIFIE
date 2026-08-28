import { Router } from 'express';
import { checkSituation } from '../controllers/guardian.controller.js';
import { validateBody, guardianCheckSchema } from '../middleware/validate.middleware.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

// Auth is optional for guardian check so guests can do quick triage, but if header present auth middleware populates req.userId
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return requireAuth(req, res, next);
  }
  next();
};

router.post('/guardian/check', optionalAuth, validateBody(guardianCheckSchema), checkSituation);

export default router;
