import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

export async function POST(request) {
  let browser = null;

  try {
    const body = await request.json();
    const { html, filename = "report.pdf" } = body || {};

    if (!html || typeof html !== "string") {
      return NextResponse.json({ error: "Missing HTML content" }, { status: 400 });
    }

    // Determine environment
    const isProduction = !!process.env.VERCEL;

    // Launch Puppeteer with environment-specific config
    browser = await puppeteer.launch({
      headless: chromium.headless,
      args: isProduction 
        ? [...chromium.args, '--disable-dev-shm-usage']
        : ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
      defaultViewport: chromium.defaultViewport,
      executablePath: isProduction
        ? await chromium.executablePath(
            'https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar'
          )
        : process.env.PUPPETEER_EXECUTABLE_PATH || 
          "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    });

    const page = await browser.newPage();

    // Set request interception BEFORE setting content
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const resourceType = req.resourceType();
      if (["stylesheet", "image", "font", "document"].includes(resourceType)) {
        req.continue();
      } else {
        req.continue();
      }
    });

    // Set content and wait for resources to load
    await page.setContent(html, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '10mm', right: '5mm', bottom: '10mm', left: '5mm' },
      scale: 0.7,
    });

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("POST /api/generate-pdf failure", error);
    return NextResponse.json(
      { error: "Failed to generate PDF", details: error.message || error.toString() },
      { status: 500 }
    );
  } finally {
    if (browser) await browser.close();
  }
}