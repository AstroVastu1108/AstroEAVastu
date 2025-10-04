import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import pako from 'pako';

export async function GET(request) {
  let browser;

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id") || "K25MI-AIQB0-A0UK7-A6DZT"; // Default ID or extract from URL

    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu"
      ],
      executablePath:
        process.env.PUPPETEER_EXECUTABLE_PATH ||
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    });

    const page = await browser.newPage();

    // Navigate to the page
    await page.goto(`http://localhost:3000/kundali/${id}`, {
      waitUntil: "networkidle0",
      timeout: 60000 // Increased timeout
    });

    // Wait for the main content to be visible
    await page.waitForSelector('body', { timeout: 10000 });

    // Additional wait for any dynamic content
    await page.evaluate(() => {
      return new Promise((resolve) => {
        setTimeout(resolve, 2000); // Wait 2 seconds for content to render
      });
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
      preferCSSPageSize: false
    });

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="kundali-${id}.pdf"`,
      },
    });

  } catch (error) {
    console.error("GET /api/generate-pdf failure", error);
    return NextResponse.json({
      error: "Failed to generate PDF",
      details: error.message
    }, { status: 500 });
  } finally {
    if (browser) await browser.close();
  }
}

export async function POST(request) {
  let browser = null;

  try {
    const body = await request.json();
    const { html, filename = "report.pdf" } = body || {};
    // const binaryString = atob(html);
    // const charCodes = new Uint8Array(binaryString.length);

    // for (let i = 0; i < binaryString.length; i++) {
    //   charCodes[i] = binaryString.charCodeAt(i);
    // }

    // const decompressedHtml = pako.ungzip(charCodes, { to: 'string' });
    // if (!decompressedHtml || typeof decompressedHtml !== "string") {
    //   return NextResponse.json({ error: "Missing HTML content" }, { status: 400 });
    // }

    const isVercel = !!process.env.VERCEL_ENV;
    let puppeteer, launchOptions = { headless: true };

    if (isVercel) {
      const chromium = (await import("@sparticuz/chromium")).default;
      puppeteer = await import("puppeteer-core");
      launchOptions = {
        ...launchOptions,
        args: chromium.args,
        executablePath: await chromium.executablePath(),
      };
    } else {
      puppeteer = await import("puppeteer");
      launchOptions = {
        ...launchOptions,
        args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      };
    }

    browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();

    // Optional: prevent slow external requests if everything is inline
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      if (["image", "font", "stylesheet"].includes(req.resourceType())) {
        req.continue(); // or req.abort() if all resources are inline
      } else {
        req.continue();
      }
    });

    // Set content with long timeout or DOMContentLoaded only
    await page.setContent(html, {
      waitUntil: "domcontentloaded", // faster, no need for networkidle0 if HTML is fully inlined
      timeout: 0, // unlimited
    });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '10mm', right: '5mm', bottom: '10mm', left: '5mm' },
      scale: 0.7, // 0.9 can shrink content if too wide
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