import {MAX_FILTER_TIME_OUT, SECOND_TIMEOUT} from "./conf";

export async function getPageRange(page) {
    const div = await page.$('div[data-testid="per-page-selector-container"]');
    let text = await page.evaluate(element => element.textContent, div);
    text = text.replace(/Showing/, "")
    text = text.replace(/,/, "")
    let result = text.split("of ");
    let max = result[1]
    let range = result[0].split(" - ");
    //  console.log("DIV OK", range, max)
    return {from: parseInt(range[0]), to: parseInt(range[1]), max}
}

export async function clickOnButton(page, key) {
    const element = await page.$(`button[data-testid="${key}"]`); //
    console.log("ELEMENT OK", element)
    if (element==null) {
        return false;
    } else {
        await page.evaluate(element => element.click(), element);
        return true
    }
}

export async function applyFilter(page) {
    const label = await page.$('label[title="Normally Stocking"]');
    await label.focus();
    await page.click('label[title="Normally Stocking"]');
    const filterButton = await page.$(`button[data-testid="apply-all-button"]`);

    for (let i = 0; i < MAX_FILTER_TIME_OUT; i++) {
        await page.waitForTimeout(SECOND_TIMEOUT);
        let classes = await page.evaluate(element => element.className, filterButton);

        if (!classes.includes("Mui-disabled")) {
            console.log("BUTTON ENABLED")
            break;
        }
    }

    await page.evaluate(filterButton => filterButton.click(), filterButton);
    await page.waitForTimeout(SECOND_TIMEOUT);
    await page.waitForNavigation();
    console.log("APPLY FILTER OK")
    //
}

export async function applyItemCount(page) {
    console.log("SELECT ITEM COUNT")
    const div = await page.$('div[data-testid="per-page-selector"]');
    await div.focus();

    div.click();
    await page.waitForTimeout(SECOND_TIMEOUT);
    const li = await page.$('li[data-testid="per-page-100"]');
    li.click();
    console.log("APPLY ITEM COUNT OK")
}

export async function awaitTable(page) {
    console.log("AWAIT TABLE")
    await page.waitForSelector("#data-table-0")
    console.log("TABLE OK")
}

