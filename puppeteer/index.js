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
    let img=await page.waitForSelector('#app > div > div.b4j4s > div > div > div > div.BK8tG > div > div.pRk2s > div.VCR4P > ul > li:nth-child(5) > a')
    console.log(img)
    // let images=await page.$$eval('.MorZF img',el=>el.map((image)=>image.src))
    // let altText=await page.$$eval('.MorZF img',el=>el.map((image)=>image.alt))

    // for(let i=0; i<images.length; i++)
    // {
    //     let picture=await page.goto(images[i])
    //     fs.writeFile(`./pics/${altText[i]}.jpeg`,await picture.buffer())
    // }

    await browser.close()
}

// webScrapping();

//----------------------scrapping the bookData from amazon------------------

async function scrapeBookData() {
    const browser = await puppeteer.launch({headless:'new'});
    const page = await browser.newPage();
  
    // Set up a navigation listener to wait until the content is fully loaded

    await page.goto('https://www.amazon.com/best-sellers-books-Amazon/zgbs/books', { waitUntil: 'domcontentloaded' });

    try {
        await page.waitForSelector('.p13n-gridRow', { timeout: 8000 });
    } catch (error) {
        console.error('Timeout waiting for book data to load.');
        await browser.close();
        return;
    }

    // Scrape book data
    const bookData = await page.evaluate(() => {
      const books = Array.from(document.querySelectorAll('.p13n-gridRow > div[id^="gridItemRoot"]'));
  
      return books.map((book) => {
        const titleElement = book.querySelector('a[class="a-link-normal"]');
        const authorElement = book.querySelector('a[class="a-size-small a-link-child"]');
        const formatElement = book.querySelector('span[class="a-size-small a-color-secondary a-text-normal"]');
        const priceElement = book.querySelector('span[class="a-size-base a-color-price"]');

        const title = titleElement ? titleElement.innerText.trim() : '';
        const author = authorElement ? authorElement.innerText.trim() : '';
        const format = formatElement ? formatElement.innerText.trim() : '';
        const price = priceElement ? priceElement.innerText.trim() : '';

        return { title, author, format, price };
      });
    });
  
    fs.writeFile('bookData.json', JSON.stringify(bookData, null, 2));
  
    await browser.close();
  }
  
  scrapeBookData();

  