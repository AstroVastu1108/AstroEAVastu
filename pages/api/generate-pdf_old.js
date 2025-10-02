
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 10; // 10 seconds max on free tier

export async function POST(request) {
  let browser = null;

  try {
    const body = await request.json();
    const { html } = body;
    
    if (!html) {
      return new Response(
        JSON.stringify({ error: "HTML not provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Optimize for smaller memory footprint
    chromium.setHeadlessMode = true;
    chromium.setGraphicsMode = false;

    browser = await puppeteer.launch({
      args: [
        ...chromium.args,
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--single-process', // Use single process to reduce memory
        '--no-zygote'
      ],
      executablePath: await chromium.executablePath(),
      headless: true,
    });

    const page = await browser.newPage();
    
    // Reduce viewport size to save memory
    await page.setViewport({ width: 794, height: 1123 }); // A4 size in pixels
    
    // Set content with shorter timeout
    await page.setContent(html, { 
      waitUntil: "domcontentloaded", // Changed from networkidle0 for speed
      timeout: 8000 
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "15mm", right: "15mm", bottom: "15mm", left: "15mm" },
    });

    await browser.close();
    browser = null;

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="bank_reconciliation.pdf"',
      },
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);

    if (browser) {
      try {
        await browser.close();
      } catch (e) {
        console.error("Failed to close browser:", e);
      }
    }

    return new Response(
      JSON.stringify({
        error: true,
        message: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}