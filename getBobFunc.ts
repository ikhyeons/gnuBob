import { Builder, Browser, By, Capabilities } from "selenium-webdriver";

export default async function getCrawl() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();

  const url =
    "https://www.gnu.ac.kr/main/ad/fm/foodmenu/selectFoodMenuView.do?mi=1341";

  const capabilities = new Capabilities();
  capabilities.setPageLoadStrategy("eager");

  async function clickBtn(xpath: string) {
    const chilamBtn = await driver.findElement(By.xpath(xpath));
    await chilamBtn.click();
  }

  async function awaitPageChange() {
    await driver.manage().setTimeouts({ implicit: 500 });
  }

  await driver.get(url);

  //가좌식당 겟
  await clickBtn(
    '//*[@id="sub_content"]/div[2]/div[2]/div/div[1]/div[1]/div/ul/li[2]/a'
  );
  await awaitPageChange();

  const [cBreakfirst, cLunch, cDinner] = [
    await Promise.all(
      Array.from({ length: 7 }, async (_, i) => {
        const element = await driver.findElement(
          By.xpath(
            `//*[@id="detailForm"]/div/table/tbody/tr[1]/td[${i + 1}]/div/p`
          )
        );
        return (await element.getAttribute("innerHTML")).split("<br>");
      })
    ),
    await Promise.all(
      Array.from({ length: 7 }, async (_, i) => {
        const element = await driver.findElement(
          By.xpath(
            `//*[@id="detailForm"]/div/table/tbody/tr[2]/td[${i + 1}]/div/p`
          )
        );
        return (await element.getAttribute("innerHTML")).split("<br>");
      })
    ),
    await Promise.all(
      Array.from({ length: 7 }, async (_, i) => {
        const element = await driver.findElement(
          By.xpath(
            `//*[@id="detailForm"]/div/table/tbody/tr[3]/td[${i + 1}]/div/p`
          )
        );
        return (await element.getAttribute("innerHTML")).split("<br>");
      })
    ),
  ];

  //칠암식당 겟
  await clickBtn('//*[@id="sub_content"]/div[2]/div[1]/div/ul/li[2]/a');
  await awaitPageChange();
  await clickBtn(
    '//*[@id="sub_content"]/div[2]/div[2]/div/div[1]/div[1]/div/ul/li[2]/a'
  );
  await awaitPageChange();

  const [gBreakfirst, gLunch, gDinner] = [
    await Promise.all(
      Array.from({ length: 7 }, async (_, i) => {
        const element = await driver.findElement(
          By.xpath(
            `//*[@id="detailForm"]/div/table/tbody/tr[1]/td[${i + 1}]/div/p`
          )
        );
        return (await element.getAttribute("innerHTML")).split("<br>");
      })
    ),
    await Promise.all(
      Array.from({ length: 7 }, async (_, i) => {
        const element = await driver.findElement(
          By.xpath(
            `//*[@id="detailForm"]/div/table/tbody/tr[2]/td[${i + 1}]/div/p`
          )
        );
        return (await element.getAttribute("innerHTML")).split("<br>");
      })
    ),
    await Promise.all(
      Array.from({ length: 7 }, async (_, i) => {
        const element = await driver.findElement(
          By.xpath(
            `//*[@id="detailForm"]/div/table/tbody/tr[3]/td[${i + 1}]/div/p`
          )
        );
        return (await element.getAttribute("innerHTML")).split("<br>");
      })
    ),
  ];
  driver.close();
  return {
    c: { bf: cBreakfirst, lc: cLunch, dn: cDinner },
    g: { bf: gBreakfirst, lc: gLunch, dn: gDinner },
  };
}
