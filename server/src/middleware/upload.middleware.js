import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const field = file.fieldname;
  const mime = file.mimetype;
  const ext = path.extname(file.originalname).toLowerCase();

  if (field === 'audio') {
    const allowedExts = ['.mp3', '.wav', '.m4a', '.aac', '.ogg'];
    const isAudioMime = mime.startsWith('audio/') || mime === 'video/mp4' || allowedExts.includes(ext);
    if (isAudioMime) return cb(null, true);
    return cb(new Error('Invalid audio file format. Allowed: mp3, wav, m4a, aac, ogg'));
  }

  if (field === 'image') {
    const allowedExts = ['.png', '.jpg', '.jpeg', '.webp'];
    const isImageMime = mime.startsWith('image/') || allowedExts.includes(ext);
    if (isImageMime) return cb(null, true);
    return cb(new Error('Invalid image file format. Allowed: png, jpg, webp'));
  }

  if (field === 'document') {
    const allowedExts = ['.pdf'];
    const isPdf = mime === 'application/pdf' || ext === '.pdf';
    if (isPdf) return cb(null, true);
    return cb(new Error('Invalid document format. Allowed: pdf'));
  }

  cb(null, true);
};

export const caseUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 25 * 1024 * 1024 // 25MB max
  }
}).fields([
  { name: 'audio', maxCount: 1 },
  { name: 'image', maxCount: 1 },
  { name: 'document', maxCount: 1 }
]);
