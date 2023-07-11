const puppeteer = require("puppeteer");
const fs = require("fs/promises");

//---------------------for taking screenshot---------------------------
/*
const webScrapping= async()=>{
 const browser=await puppeteer.launch({headless:'new'})
 const page=await browser.newPage()
 await page.setViewport({width:1440, height:1080})
 await page.goto('https://pptr.dev/')
 await page.screenshot({path:'screenshot.jpeg',fullPage:true})

 await browser.close()
}
*/

//------------------for listing out all the product name-------------------
const webScrapping=async()=>{
    const browser=await puppeteer.launch({headless:'new'})
    const page=await browser.newPage()
    await page.goto('https://pptr.dev/api/puppeteer.page.screenshot')
    const sideList=await page.evaluate(()=>Array.from(document.querySelectorAll('.menu__link')).map((el)=>el.textContent))
    fs.writeFile('list.txt',sideList.join("\n"))

    await browser.close()
}

webScrapping();
