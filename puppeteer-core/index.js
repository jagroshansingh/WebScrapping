const puppeteer=require('puppeteer-core')

const webScrapping=async()=>{
    const executablePath=`C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe`;
    const launchOptions={
        executablePath,
        channel:'stable'
    }
    const browser=await puppeteer.launch(launchOptions)
    // console.log(browser)
    const page=await browser.newPage()
    await page.setViewport({width:1440,height:1440})
    await page.goto(`https://www.npmjs.com/`)
    await page.screenshot({path:'npmLandingPage.png',fullPage:true})

    await browser.close()
}

webScrapping()