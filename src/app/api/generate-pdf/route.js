// import { NextResponse } from "next/server";
// import puppeteer from "puppeteer-core";

// // GET handler - generates PDF from URL
// // export async function GET(request) {
// //   let browser;

// //   try {
// //     const url = new URL(request.url);
// //     const id = url.searchParams.get("id");

// //     if (!id) {
// //       return NextResponse.json({ error: "Missing ID" }, { status: 400 });
// //     }

// //     browser = await puppeteer.launch({
// //       headless: true,
// //       args: [
// //         "--no-sandbox",
// //         "--disable-setuid-sandbox",
// //         "--disable-dev-shm-usage",
// //         "--disable-gpu"
// //       ],
// //       executablePath:
// //         process.env.PUPPETEER_EXECUTABLE_PATH || 
// //         "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
// //     });

// //     const page = await browser.newPage();
// //     await page.goto(`http://localhost:3000/kundali/${id}`, { 
// //       waitUntil: "networkidle0",
// //       timeout: 30000
// //     });

// //     const pdfBuffer = await page.pdf({ 
// //       format: "A4", 
// //       printBackground: true,
// //       margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" }
// //     });

// //     return new NextResponse(pdfBuffer, {
// //       status: 200,
// //       headers: {
// //         "Content-Type": "application/pdf",
// //         "Content-Disposition": `attachment; filename="kundali-${id}.pdf"`,
// //       },
// //     });

// //   } catch (error) {
// //     console.error("GET /api/generate-pdf failure", error);
// //     return NextResponse.json({ error: "Failed to generate PDF", details: error.message }, { status: 500 });
// //   } finally {
// //     if (browser) await browser.close();
// //   }
// // }

// export async function GET(request) {
//   let browser;

//   try {
//     const url = new URL(request.url);
//     const id = url.searchParams.get("id");

//     if (!id) {
//       return NextResponse.json({ error: "Missing ID" }, { status: 400 });
//     }

//     browser = await puppeteer.launch({
//       headless: true,
//       args: [
//         "--no-sandbox",
//         "--disable-setuid-sandbox",
//         "--disable-dev-shm-usage",
//         "--disable-gpu"
//       ],
//       executablePath:
//         process.env.PUPPETEER_EXECUTABLE_PATH ||
//         "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
//     });

//     const page = await browser.newPage();

//     // Navigate to the page
//     await page.goto(`http://localhost:3000/kundali/${id}`, {
//       waitUntil: "networkidle0",
//       timeout: 60000 // Increased timeout
//     });

//     // Wait for the main content to be visible
//     await page.waitForSelector('body', { timeout: 10000 });

//     // Additional wait for any dynamic content
//     await page.evaluate(() => {
//       return new Promise((resolve) => {
//         setTimeout(resolve, 2000); // Wait 2 seconds for content to render
//       });
//     });

//     const pdfBuffer = await page.pdf({
//       format: "A4",
//       printBackground: true,
//       margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
//       preferCSSPageSize: false
//     });

//     return new NextResponse(pdfBuffer, {
//       status: 200,
//       headers: {
//         "Content-Type": "application/pdf",
//         "Content-Disposition": `attachment; filename="kundali-${id}.pdf"`,
//       },
//     });

//   } catch (error) {
//     console.error("GET /api/generate-pdf failure", error);
//     return NextResponse.json({
//       error: "Failed to generate PDF",
//       details: error.message
//     }, { status: 500 });
//   } finally {
//     if (browser) await browser.close();
//   }
// }

// // POST handler - generates PDF from HTML content
// // export async function POST(request) {
// //   let browser;

// //   try {
// //     const body = await request.json();
// //     const { html, filename = "report.pdf", viewport, pageSize } = body || {};

// //     if (!html || typeof html !== "string") {
// //       return NextResponse.json({ error: "Missing HTML content" }, { status: 400 });
// //     }

// //     browser = await puppeteer.launch({
// //       headless: true,
// //       args: [
// //         "--no-sandbox",
// //         "--disable-setuid-sandbox",
// //         "--disable-dev-shm-usage",
// //         "--disable-gpu"
// //       ],
// //       executablePath:
// //         process.env.PUPPETEER_EXECUTABLE_PATH ||
// //         "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
// //     });

// //     const page = await browser.newPage();

// //     const parseViewportDimension = value => {
// //       const num = Number(value);
// //       return Number.isFinite(num) && num > 0 ? Math.round(num) : undefined;
// //     };

// //     // const defaultViewport = { width: 1440, height: 1500, deviceScaleFactor: 1 };
// //     // const requestedViewport = {
// //     //   width: 800,
// //     //   height: 1500,
// //     //   // width: parseViewportDimension(viewport?.width) ?? defaultViewport.width,
// //     //   // height: parseViewportDimension(viewport?.height) ?? defaultViewport.height,
// //     //   deviceScaleFactor: parseViewportDimension(viewport?.deviceScaleFactor) ?? defaultViewport.deviceScaleFactor
// //     // };

// //     // if (typeof page.setViewport === 'function') {
// //     //   await page.setViewport(requestedViewport);
// //     // }

// //     await page.emulateMediaType('screen');
// //     await page.setContent(html, { waitUntil: "networkidle0" });

// //     const parsePageDimension = value => {
// //       if (typeof value === 'string' && value.trim()) {
// //         return value.trim();
// //       }

// //       const num = Number(value);
// //       return Number.isFinite(num) && num > 0 ? `${Math.round(num)}px` : undefined;
// //     };

// //     const measuredWidth = parsePageDimension(pageSize?.width);
// //     const measuredHeight = parsePageDimension(pageSize?.height);
// //     const measuredMargin = pageSize?.margin;

// //     const pdfOptions = {
// //       printBackground: true,
// //       preferCSSPageSize: true
// //     };

// //     // if (measuredWidth && measuredHeight) {
// //     //   pdfOptions.width = measuredWidth;
// //     //   pdfOptions.height = '500mm';
// //     //   if (measuredMargin && typeof measuredMargin === 'object') {
// //     //     const sanitizeMargin = value => {
// //     //       if (typeof value === 'string' && value.trim()) return value.trim();
// //     //       const num = Number(value);
// //     //       return Number.isFinite(num) ? `${num}px` : '0';
// //     //     };
// //     //     pdfOptions.margin = {
// //     //       top: sanitizeMargin(measuredMargin.top),
// //     //       right: sanitizeMargin(measuredMargin.right),
// //     //       bottom: sanitizeMargin(measuredMargin.bottom),
// //     //       left: sanitizeMargin(measuredMargin.left)
// //     //     };
// //     //   } else {
// //     //     pdfOptions.margin = { top: "0", right: "0", bottom: "0", left: "0" };
// //     //   }
// //     // } else {
// //       pdfOptions.format = "A4";
// //       pdfOptions.landscape = false;
// //       pdfOptions.margin = { top: "20px", right: "20px", bottom: "20px", left: "20px" };
// //     // }

// //     const pdfBuffer = await page.pdf(pdfOptions);

// //     return new NextResponse(pdfBuffer, {
// //       status: 200,
// //       headers: {
// //         "Content-Type": "application/pdf",
// //         "Content-Disposition": `attachment; filename="${filename}"`,
// //       },
// //     });
// //   } catch (error) {
// //     console.error("POST /api/generate-pdf failure", error);
// //     return NextResponse.json({ error: "Failed to generate PDF", details: error.message }, { status: 500 });
// //   } finally {
// //     if (browser) await browser.close();
// //   }
// // }

// // src/app/api/generate-pdf/route.ts

// export async function POST(request) {
//   let browser = null;

//   try {
//     const body = await request.json();
//     const { html, filename = "report.pdf" } = body || {};

//     if (!html || typeof html !== "string") {
//       return NextResponse.json({ error: "Missing HTML content" }, { status: 400 });
//     }

//     // Launch Puppeteer
//     browser = await puppeteer.launch({
//       headless: true,
//       args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
//       executablePath:
//         process.env.PUPPETEER_EXECUTABLE_PATH ||
//         "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
//     });

//     const page = await browser.newPage();

//     // Optional: prevent slow external requests if everything is inline
//     await page.setRequestInterception(true);
//     page.on("request", (req) => {
//       if (["image", "font", "stylesheet"].includes(req.resourceType())) {
//         req.continue(); // or req.abort() if all resources are inline
//       } else {
//         req.continue();
//       }
//     });

//     // Set content with long timeout or DOMContentLoaded only
//     await page.setContent(html, {
//       waitUntil: "domcontentloaded", // faster, no need for networkidle0 if HTML is fully inlined
//       timeout: 0, // unlimited
//     });

//     // Generate PDF
//     // const pdfBuffer = await page.pdf({
//     //   format: "A4",
//     //   printBackground: true,
//     //   preferCSSPageSize: true,
//     //   margin: {
//     //     top: "10mm",
//     //     right: "10mm",
//     //     bottom: "10mm",
//     //     left: "10mm",
//     //   },
//     // });
//     const pdfBuffer = await page.pdf({
//       format: 'A4',
//       printBackground: true,
//       preferCSSPageSize: true,
//       margin: { top: '10mm', right: '5mm', bottom: '10mm', left: '5mm' },
//       scale: 0.7, // 0.9 can shrink content if too wide
//     });
//     console.log("filename : ",filename)

//     return new NextResponse(pdfBuffer, {
//       status: 200,
//       headers: {
//         "Content-Type": "application/pdf",
//         "Content-Disposition": `attachment; filename="${filename}"`,
//       },
//     });
//   } catch (error) {
//     console.error("POST /api/generate-pdf failure", error);
//     return NextResponse.json(
//       { error: "Failed to generate PDF", details: error.message || error.toString() },
//       { status: 500 }
//     );
//   } finally {
//     if (browser) await browser.close();
//   }
// }

// working code in local
// import puppeteer from "puppeteer-core";
// import chromium from "@sparticuz/chromium";
// import { NextResponse } from "next/server";

// export const runtime = "nodejs"; // required for Vercel (not edge)

// export async function POST(request) {
//   let browser = null;

//   try {
//     const body = await request.json();
//     const { html, filename = "report.pdf" } = body || {};

//     if (!html || typeof html !== "string") {
//       return NextResponse.json({ error: "Missing HTML content" }, { status: 400 });
//     }

//     // Determine if we are in a production (Vercel) environment
//     const isProd = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";

//     // Choose executable path based on environment
//     const executablePath = isProd
//       ? await chromium.executablePath()
//       : "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

//     browser = await puppeteer.launch({
//       args: chromium.args,
//       executablePath,
//       headless: chromium.headless,
//       defaultViewport: chromium.defaultViewport,
//     });

//     const page = await browser.newPage();

//     await page.setContent(html, { waitUntil: "domcontentloaded", timeout: 0 });

//     const pdfBuffer = await page.pdf({
//       format: "A4",
//       printBackground: true,
//       margin: { top: "10mm", right: "5mm", bottom: "10mm", left: "5mm" },
//       scale: 0.7,
//     });

//     return new NextResponse(pdfBuffer, {
//       status: 200,
//       headers: {
//         "Content-Type": "application/pdf",
//         "Content-Disposition": `attachment; filename="${filename}"`,
//       },
//     });
//   } catch (error) {
//     console.error("POST /api/generate-pdf failure", error);
//     return NextResponse.json(
//       { error: "Failed to generate PDF", details: error.message || error.toString() },
//       { status: 500 }
//     );
//   } finally {
//     if (browser) await browser.close();
//   }
// }
// End 
import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 10; // 10 seconds max on free tier

export async function POST(request) {
  let browser = null;
  console.log("coming here")

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

    // ...existing code...
    const executablePath =
      (await chromium.executablePath()) ||
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

    browser = await puppeteer.launch({
      args: [
        ...chromium.args,
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--single-process",
        "--no-zygote"
      ],
      executablePath,
      headless: true
    });
    // ...existing code...

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