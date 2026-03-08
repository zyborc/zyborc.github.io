import puppeteer from 'puppeteer';
import express from 'express';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync, writeFileSync, rmSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = resolve(__dirname, 'dist');
const PORT = 4173;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function prerender() {
    console.log('Starting prerendering process...');
    const app = express();

    // Serve static files from dist
    app.use(express.static(distPath));

    // Fallback to index.html for SPA routing
    app.use((req, res) => {
        res.sendFile(resolve(distPath, 'index.html'));
    });

    const server = app.listen(PORT, () => {
        console.log(`Express server running on port ${PORT}`);
    });

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // We will crawl the site starting from the root
    const visited = new Set();
    const queue = ['/'];

    while (queue.length > 0) {
        const route = queue.shift();
        if (visited.has(route)) continue;
        visited.add(route);

        console.log(`Prerendering route: ${route}`);

        try {
            await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });

            // Give React a tiny bit more time to render any Suspense boundaries or async tags
            await sleep(1500);

            const html = await page.content();

            // Find all internal links to add to our queue
            const links = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('a'))
                    .map(a => a.getAttribute('href'))
                    .filter(href => href && href.startsWith('/') && !href.startsWith('//') && !href.match(/\.(png|jpg|jpeg|svg|css|js|json)$/i));
            });

            for (const link of links) {
                // Drop hash/search params for the queue purely for path matching
                const cleanPath = link.split('#')[0].split('?')[0];
                if (!visited.has(cleanPath) && !queue.includes(cleanPath)) {
                    queue.push(cleanPath);
                }
            }

            // Save the HTML file
            let outputPath;
            if (route === '/') {
                outputPath = join(distPath, 'index.html');
            } else {
                const dir = join(distPath, route);
                mkdirSync(dir, { recursive: true });
                outputPath = join(dir, 'index.html');
            }

            writeFileSync(outputPath, html);
        } catch (e) {
            console.error(`Error prerendering ${route}:`, e);
        }
    }

    console.log('\nPrerendering complete! Generated the following routes:');
    console.log(Array.from(visited).join('\n'));

    // Create a 404.html just in case (GitHub Pages uses this for unknown routes)
    try {
        const { readFileSync } = await import('fs');
        const indexHtml = readFileSync(join(distPath, 'index.html'), 'utf-8');
        writeFileSync(join(distPath, '404.html'), indexHtml);
    } catch (e) { }

    await browser.close();
    server.close();
}

prerender().catch(console.error);
