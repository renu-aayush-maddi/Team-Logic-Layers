// src/utils/exporters.js
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, HeadingLevel, TextRun } from "docx";
import PptxGenJS from "pptxgenjs";

/**
 * Download raw JSON
 */
export function downloadJSON(obj, filename = "template.json") {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json;charset=utf-8" });
  saveAs(blob, filename);
}

/**
 * Convert template to DOCX and download (requires `docx` + file-saver)
 * simple mapping: title -> heading, sections -> paragraphs
 */
export async function downloadDocx(template, filename = "template.docx") {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: template.title || "Document",
            heading: HeadingLevel.TITLE,
          }),
          ...(template.sections || []).flatMap((s) => [
            new Paragraph({ text: s.title || "", heading: HeadingLevel.HEADING_2 }),
            new Paragraph({ children: [new TextRun({ text: s.body || "", font: "Calibri" })] }),
          ]),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, filename);
}


/**
 * Convert template to PPTX and download (requires pptxgenjs)
 * Each section becomes one slide with title + body text.
 */
export function downloadPptx(template, filename = "template.pptx") {
  const pptx = new PptxGenJS();
  const sections = template.sections || [];

  // Title slide
  const titleSlide = pptx.addSlide();
  titleSlide.addText(template.title || "Presentation", { x: 0.5, y: 1.2, fontSize: 32, bold: true });

  sections.forEach((s) => {
    const slide = pptx.addSlide();
    slide.addText(s.title || "", { x: 0.5, y: 0.3, fontSize: 28, bold: true });
    slide.addText(s.body || "", { x: 0.5, y: 1.2, fontSize: 14, w: "90%", h: "60%" });
  });

  pptx.writeFile({ fileName: filename });
}
