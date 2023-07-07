
const puppeteer =require('puppeteer')

const webScrapping= async()=>{
 const browser=await puppeteer.launch({headless:'new'})
 const page=await browser.newPage()
 await page.setViewport({width:1440, height:1080})
 await page.goto('https://pptr.dev/')
 await page.screenshot({path:'screenshot.jpeg',fullPage:true})

 await browser.close()
}

webScrapping()



