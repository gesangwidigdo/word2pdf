import express, { Request, Response } from "express";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";
import upload from "../handler/uploadHandler";
import convertWordToPDF from "../handler/convertHandler";
import fs from 'fs';

const router = express.Router();

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(__dirname, '../pages');
router.get('/', (req: Request, res: Response) => {
  res.sendFile(join(htmlPath, 'index.html'));
});

router.post('/upload', upload.single('file'), async (req, res): Promise<void> => {
  if (!req.file) {
    console.log('no file uploaded');
    res.sendFile(join(htmlPath, 'index.html'));
    return;
  }

  const allowedExt = ['doc', 'docx'];
  const fileExt = req.file.originalname.split('.').pop()?.toLowerCase();

  if (!fileExt || !allowedExt.includes(fileExt)) {
    console.log('Invalid file type');
    res.sendFile(join(htmlPath, 'index.html'));
    return;
  }

  try {
    const pdfBuffer = await convertWordToPDF(req.file.filename);
    const outputFileName = req.file.originalname.replace(/\.[^.]+$/, ".pdf");
    res.setHeader('Content-Disposition', `attachment; filename=${outputFileName}`);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).send("File conversion failed");
  }
});

export default router;