import { Router } from 'express';
import { createCase, getCases, getCaseById, getReport } from '../controllers/case.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { caseUpload } from '../middleware/upload.middleware.js';

const router = Router();

router.post('/cases', requireAuth, caseUpload, createCase);
router.get('/cases', requireAuth, getCases);
router.get('/cases/:id', requireAuth, getCaseById);
router.get('/cases/:id/report', requireAuth, getReport);

export default router;
