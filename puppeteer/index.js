
const puppeteer =require('puppeteer')
const fs=require('fs/promises')

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
    await page.goto('https://book-store-furation-tech-assignment.vercel.app/booklisting')

    await new Promise((r)=>setTimeout(r,4000))

    const list=await page.evaluate(()=>{
        return Array.from(document.querySelectorAll(".chakra-heading.css-479vt2")).map((el)=>el.textContent)
    })
    await fs.writeFile("list.txt",list.join("\n"))

    await browser.close()

}




webScrapping()



