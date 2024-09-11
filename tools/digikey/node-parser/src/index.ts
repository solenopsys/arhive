import {start} from "./spider";
import {getJob} from "./client";


const puppeteer = require("puppeteer");

export const CONTROLLER_API = process.env.CONTROLLER_API;

if(!CONTROLLER_API){
    console.error("CONTROLLER_API env is not defined")
    process.exit(1)
}

(async () => {
    console.log("CONTROLLER_API", CONTROLLER_API)

    let job = await getJob()
    while (job ) {
        await start(job)
        job = await getJob()
    }
})();