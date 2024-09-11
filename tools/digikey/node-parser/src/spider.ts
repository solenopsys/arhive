import {LAST_PAGE_LOAD_TIMEOUT, NAVIGATION_TIMEOUT, SECOND_TIMEOUT} from "./conf";
import {applyFilter, applyItemCount, awaitTable, clickOnButton, getPageRange} from "./tools";
import {Job, savePage, updateJob} from "./client";


const puppeteer = require("puppeteer");

const requestFilter = (request) => {
    if (
        request.resourceType() === 'image' ||
        request.resourceType() === 'stylesheet' ||
        request.resourceType() === 'font') {
        //  console.log("-------- non ABORTED", request.url());
        request.abort();
        //     request.continue();
    } else {
        //   console.log("APPLY", request.url());
        //   console.log("-------- non LOADED", request.url());
        request.continue();
    }
}

async function scanSteps(page, jobId: number) {
    const nextPageId = "btn-next-page";
    await clickOnButton(page, nextPageId);
    await mouseMove(page);


    let newVar = await getPageRange(page);
    let to = newVar.to
    let max = newVar.max
    let steps = Math.floor(max / to)

    // here

    let updated = await updateJob(jobId, max);
    if (!updated) {
        console.error("Job not updated")
        process.exit(1)
    }
    page.on('response', async (response) => {
        // Get the response URL and content type
        const url = response.url();
        if (url.includes("v4/filter-page")) {
            let content = await response.text();
            await savePage(content, jobId, newVar.from, newVar.to);
        }
    });

    for (let i = 0; i < steps; i++) {
        while (true) {
            await page.waitForTimeout(SECOND_TIMEOUT);
            newVar = await getPageRange(page);
            if (to !== newVar.to) {
                to = newVar.to
                await mouseMove(page);
                let boolean = await clickOnButton(page, nextPageId);
                if (boolean) {
                    break
                } else {
                    console.log("END PAGE BREAK")
                    // exit programm
                    process.exit(0)
                    return
                }
            }
        }
    }
}

async function mouseMove(page: any) {


    console.log("TO HEIGHT");
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });

    console.log("MOUSE MOVE");
    const x = Math.floor(Math.random() * 1000);
    const y = Math.floor(Math.random() * 1000);
    const steps = Math.floor(Math.random() * 20);


    await page.mouse.move(x, y, {steps: steps});
}

export async function start(job: Job) {
    console.log("STARTING JOB: ", job.id);

    // random 0-100
    const chrome = Math.floor(Math.random() * 100);
    const safari = Math.floor(Math.random() * 100);
    const bs = `--user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.${safari} (KHTML, like Gecko) Chrome/87.0.4280.${chrome} Safari/537.${safari}`
    console.log("BS: ", bs)
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', bs]
    });

    // show browser
    const page = await browser.newPage();
    console.log("NAVIGATION_TIMEOUT: ", NAVIGATION_TIMEOUT)
    await page.setDefaultNavigationTimeout(NAVIGATION_TIMEOUT);
    await page.setDefaultTimeout(NAVIGATION_TIMEOUT);
    await page.exposeFunction('reportEvent', info => console.log(info));


    // save request files
    await page.setRequestInterception(true);
    page.on('request', requestFilter);

    //let httpResponse =
    await page.goto(job.url);
    // let content = await httpResponse.text();

    const wpr = Math.floor(Math.random() * 100);

    console.log("RESIZE");
    await page.setViewport({
        width: 1920 + wpr,
        height: 1080 + wpr,
    });

    await mouseMove(page);
    await awaitTable(page);


    await applyFilter(page);

    await mouseMove(page);
    await awaitTable(page);

    await mouseMove(page);
    await applyItemCount(page);

    await mouseMove(page);
    await awaitTable(page);

    await scanSteps(page, job.id);

    await page.waitForTimeout(LAST_PAGE_LOAD_TIMEOUT);
    await browser.close();
}