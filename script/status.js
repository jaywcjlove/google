const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs-extra');
const data = require('../data.json');

let urlData = [...data.data];
let dataStatus = [...data.data];

const dataPath = path.join(process.cwd(), 'data.json');

async function getWebStatus(url) {
  let message = '';
  const time = new Date().getTime();
  url = urlData[0] && urlData[0].url;
  if (!url) {
    console.log('done!');
    return;
  }
  if (urlData[0] && urlData[0].status === 110) {
    console.log(':log:', urlData[0].status, url, ((new Date().getTime()) - time) / 1000, '该网站已被拦截');
    return;
  }
  const browser = await puppeteer.launch();
  let status = 0;
  try {
    const page = await browser.newPage();
    const response = await page.goto(url, {
      // timeout: 10000,
      waitUntil: ['load', 'domcontentloaded', 'networkidle0'],
    });
    const chain = response.request().redirectChain();
    const headers = response.request().response();
    status = headers.status();
    // 是否重定向
    if (chain.length > 0) {
      status = 300;
    }
  } catch (error) {
    if (error.name === 'TimeoutError') {
      status = 408;
    } else if (error.name === 'Error') {
      status = 0;
    }
    if (error.message) {
      message = `${error.name} - ${error.message}`;
    }
  }
  urlData = urlData.filter(m => m.url !== url);
  console.log(':log:', status, url, ((new Date().getTime()) - time) / 1000, message);
  await browser.close();
  dataStatus = dataStatus.map(item => {
    if (item.url === url) {
      item.status = status;
      item.time = ((new Date().getTime()) - time) / 1000;
      if (message) {
        item.message = message;
      }
    }
    return item;
  })
  await fs.writeFile(dataPath, JSON.stringify({
    update: new Date().getTime(),
    data: [...dataStatus],
  }, null, 2));
  await getWebStatus();
}
 
(async () => {
  console.log('Start! ', dataPath);
  console.log();
  await getWebStatus();
})();