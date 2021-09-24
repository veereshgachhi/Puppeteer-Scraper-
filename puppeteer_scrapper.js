function scraper(x){

if (x=='Lets Scrape'){

const puppeteer = require('puppeteer');
const ObjectsToCsv = require('objects-to-csv');
const prompt = require('prompt-sync')();

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}
var name = prompt('input json in the following format \n{"base_url" : "https://www.jockey.in/men/innerwear",\n"pagination_y_or_n": "n",\n"no_of_pages" : "3",\n"page_multiplying_factor" : "36",\n"no_of_elements_req":"100",\n"css_img_urls" : "div.popularProDiv img",\n"css_name": "div.productItemInfoInner h4",\n"namedata_csv": "jockey.csv"}\n');
var data2 = JSON. parse(name);
console.log(data2);

(async () => {
  const browser = await puppeteer.launch({
    "headless": false,}
    );
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.setViewport({ width: 1366, height: 768});
  
  var add = data2.base_url
  await page.goto(add);
  const nopages = data2.no_of_pages
  const pagination = data2.pagination_y_or_n
  await page.evaluate( () => {
    window.scrollBy(0, 100);
  });

  if (pagination == 'y') {

  var obj=[]

  for (j=0 ; j < nopages ; j++) {
  
  await autoScroll2(page);

  var y=data2.css_name
  var z=data2.css_img_urls
  const name = await page.evaluate(variableInBROWSER => {
    return Array.from(document.querySelectorAll(variableInBROWSER)).map((partner) =>partner.innerText);
  }, y);
  const url = await page.evaluate(variableInBROWSER => {
    return Array.from(document.querySelectorAll(variableInBROWSER)).map((partner) =>partner.src);
  }, z);

  for (i=0 ; i<name.length ; i++){
    var data={name: name[i],
        url: url[i]}
    obj.push(data)
    }
  var fact=data2.page_multiplying_factor
  if (add.slice(-1) == 0){
    var url2 = add.slice(0, -1)+((j+1)*fact)
  } 
  else{
    var url2 = add.slice(0, -1)+((j+2)*fact)
  }
  console.log(url2)
  await page.goto(url2);
  }
  await browser.close();
  for (k=0; k<obj.length ; k++){
    if(obj[k].url==''){
      obj.pop(obj[k])
    }
  }
  obj = obj.filter((obj, index, self) =>
  index === self.findIndex((t) => (
    t.name === obj.name && t.url === obj.url
  ))
)
  const csv = new ObjectsToCsv(obj);
  await csv.toDisk('./'+data2.namedata_csv);
  
  
}
else{
  console.log('into the pagination function')
  var obj2=[]
  while(1){
  s=0
  while(s<100){
    await autoScroll(page);
    s++
  }
  var y=data2.css_name
  var z=data2.css_img_urls
  await delay(10000);
  var name = await page.evaluate(variableInBROWSER => {
    return Array.from(document.querySelectorAll(variableInBROWSER)).map((partner) =>partner.innerText);
  }, y);
  var url = await page.evaluate(variableInBROWSER => {
    return Array.from(document.querySelectorAll(variableInBROWSER)).map((partner) =>partner.src);
  }, z);
  console.log(name)
  console.log(url)

  url = url.filter(item => item);
  var l=url.length
  name=name.slice(0,l)
  var obj=[]
  for (i=0 ; i<name.length ; i++){
      var data={name: name[i],
          url: url[i]}
  obj.push(data)
  }
  console.log(obj)
  for (k=0; k<obj.length ; k++){
    if(obj[k].url==''){
      obj.pop(obj[k])
    }
  }
    obj2=obj2.concat(obj)
    obj2 = obj2.filter((obj2, index, self) =>
  index === self.findIndex((t) => (
    t.name === obj2.name && t.url === obj2.url
  ))
)
    if (obj2.length >= data2.no_of_elements_req){
        break;
    }}
  const csv = new ObjectsToCsv(obj2);
  await csv.toDisk('./'+data2.namedata_csv);
  await browser.close();

}})();

async function autoScroll(page){
  await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
          var totalHeight = 0;
          var distance = 100;
          var timer = setInterval(() => {
              var scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              clearInterval(timer);
              resolve();
          }, 400);
      });
    });
}

async function autoScroll2(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 400);
        });
    });
}}
else{
  console.log('No Scraping Done')
}}

module.exports.scraper = scraper;
