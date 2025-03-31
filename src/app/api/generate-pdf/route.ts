import puppeteer from "puppeteer";
import { NextResponse } from "next/server";

export async function GET() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const url = "http://localhost:3000/devta-vastu/G25MB-BCSDG-DHEQB-J4RPS"; // Update for production
  await page.goto(url, { waitUntil: "networkidle2" });

  // Wait for SVGs and dynamic content to load
  await page.waitForSelector("svg", { visible: true });
  await new Promise((resolve) => setTimeout(resolve, 3000)); // Manual delay

  await page.screenshot({ path: "debug.png", fullPage: true });
  await page.emulateMediaType("screen");


  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
  });

  await browser.close();

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=generated.pdf",
    },
  });
}
