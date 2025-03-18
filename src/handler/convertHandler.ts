import { exec } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

export default function convertWordToPDF(fileName: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const inputFile = join(__dirname, '../../uploads', fileName);
    const outputFile = join(__dirname, '../../output');
    const outputFileName = fileName.replace(/\.[^.]+$/, ".pdf");
    const outputFullPath = join(__dirname, '../../output', outputFileName);

    const command = `soffice --headless --convert-to pdf:writer_pdf_Export:EmbedStandardFonts=true --outdir "${outputFile}" "${inputFile}"`
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(`Conversion error: ${error}`);
        reject('conversion failed');
        return;
      }

      fs.readFile(outputFullPath, (err, data) => {
        if (err) {
          console.log("❌ Error reading PDF:", err)
          reject('conversion failed');
        } else {
          resolve(data);
        }

        fs.unlink(outputFullPath, (err) => {
          if (err) {
            console.error("❌ Error deleting PDF:", err);
          }
        });

        fs.unlink(inputFile, (err) => {
          if (err) {
            console.error("❌ Error deleting word:", err);
          }
        });
      });
    });
  });
}