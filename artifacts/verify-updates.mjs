import { chromium } from 'playwright';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
try {
 const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await page.goto('http://localhost:3000/',{waitUntil:'networkidle'});
 await page.locator('.stack-2').scrollIntoViewIfNeeded();
 const cards=await page.locator('.stack-card').evaluateAll(els=>els.map(el=>({position:getComputedStyle(el).position,top:el.getBoundingClientRect().top,bottom:el.getBoundingClientRect().bottom})));
 if(cards.some(c=>c.position!=='sticky')||cards[0].bottom<=cards[1].top)throw Error('Mobile stack failed');
 console.log('Mobile cards sticky and overlapping',cards);
 await page.screenshot({path:'artifacts/mobile-stack.png'});
 await page.goto('http://localhost:3000/gallery',{waitUntil:'networkidle'});
 await page.route('**/_next/image?*',async route=>{await new Promise(r=>setTimeout(r,1300));await route.continue();});
 await page.getByRole('button',{name:/Enlarge image 1/}).click();
 await page.locator('.lightbox-loading').waitFor({state:'visible'});
 await page.locator('.lightbox-image .is-loaded').waitFor();
 await page.getByRole('button',{name:'Next image',exact:true}).click();
 await page.locator('.lightbox-loading').waitFor({state:'visible'});
 await page.screenshot({path:'artifacts/gallery-loader.png'});
 await page.locator('.lightbox-image .is-loaded').waitFor();
 console.log('Loader on open and image change, image ready passed');
 await page.unroute('**/_next/image?*');
 await page.route('**/_next/image?*',route=>route.abort());
 await page.getByRole('button',{name:'Next image',exact:true}).click();
 await page.locator('.lightbox-image-error').waitFor({state:'visible'});
 if(await page.locator('.lightbox-loading').count())throw Error('Loader stuck on failure');
 await page.keyboard.press('Escape');
 console.log('Image error state and Escape passed');
} finally {await browser.close();}
