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
/*
const webScrapping=async()=>{
    const browser=await puppeteer.launch({headless:'new'})
    const page=await browser.newPage()
    await page.goto('https://pptr.dev/api/puppeteer.page.screenshot')
    const sideList=await page.evaluate(()=>Array.from(document.querySelectorAll('.menu__link')).map((el)=>el.textContent))
    fs.writeFile('list.txt',sideList.join("\n"))

    await browser.close()
}
*/
//

//-------------------------for creating a PDF-----------------------------
/*
const webScrapping=async()=>{
    const browser=await puppeteer.launch({headless:'new'})
    const page=await browser.newPage()
    await page.goto('https://pptr.dev/api/puppeteer.page.pdf')
    // await page.emulateMediaType('screen')
    // await page.evaluate(()=>matchMedia('screen').matches)
    await page.pdf({path:'converting.pdf'})

    await browser.close()
}
*/

//-------------------------for download images---------------------------
const webScrapping=async()=>{
    const browser=await puppeteer.launch({headless:'new'})
    const page=await browser.newPage()
    await page.goto('https://unsplash.com/')
    // let img=await page.evaluate(()=>Array.from(document.querySelectorAll('.MorZF img')).map((el)=>el.alt))
    // console.log(img)
    let images=await page.$$eval('.MorZF img',el=>el.map((image)=>image.src))
    let altText=await page.$$eval('.MorZF img',el=>el.map((image)=>image.alt))

    for(let i=0; i<images.length; i++)
    {
        let picture=await page.goto(images[i])
        fs.writeFile(`./pics/${altText[i]}.jpeg`,await picture.buffer())
    }

    await browser.close()
}

webScrapping();
