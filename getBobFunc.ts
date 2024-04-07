import { Builder, Browser, By, Capabilities } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
export default async function getCrawl() {
  async function getGaja() {
    let driver = await new Builder().forBrowser(Browser.FIREFOX).build();

    // .setChromeOptions(
    //   new chrome.Options()
    //     .addArguments("--headless")
    //     .addArguments("--disable-gpu")
    //     .addArguments("--no-sandbox")
    //     .addArguments("--disable-dev-shm-usage")
    // )

    const url =
      "https://www.gnu.ac.kr/main/ad/fm/foodmenu/selectFoodMenuView.do?mi=1341";

    const capabilities = new Capabilities();
    capabilities.setPageLoadStrategy("eager");

    await driver.get(url);

    async function clickBtn(xpath: string) {
      const chilamBtn = await driver.findElement(By.xpath(xpath));
      await chilamBtn.click();
    }

    async function awaitPageChange() {
      await driver.manage().setTimeouts({ implicit: 500 });
    }

    try {
      //가좌식당 겟
      await clickBtn(
        '//*[@id="sub_content"]/div[2]/div[2]/div/div[1]/div[1]/div/ul/li[2]/a'
      );
      await awaitPageChange();

      const bobs = [
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
      return bobs;
    } catch {
      driver.close();
      return [
        [[], [], [], [], [], [], []],
        [[], [], [], [], [], [], []],
        [[], [], [], [], [], [], []],
      ];
    }
  }

  async function getChilam() {
    let driver = await new Builder().forBrowser(Browser.CHROME).build();

    const url =
      "https://www.gnu.ac.kr/main/ad/fm/foodmenu/selectFoodMenuView.do?mi=1341";

    const capabilities = new Capabilities();
    capabilities.setPageLoadStrategy("eager");

    await driver.get(url);

    async function clickBtn(xpath: string) {
      const chilamBtn = await driver.findElement(By.xpath(xpath));
      await chilamBtn.click();
    }

    async function awaitPageChange() {
      await driver.manage().setTimeouts({ implicit: 500 });
    }

    try {
      //칠암식당 겟
      await clickBtn('//*[@id="sub_content"]/div[2]/div[1]/div/ul/li[2]/a');
      await awaitPageChange();
      await clickBtn(
        '//*[@id="sub_content"]/div[2]/div[2]/div/div[1]/div[1]/div/ul/li[2]/a'
      );
      await awaitPageChange();

      const bobs = [
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

      return bobs;
    } catch (e) {
      console.log(e);
      driver.close();
      return [
        [[], [], [], [], [], [], []],
        [[], [], [], [], [], [], []],
        [[], [], [], [], [], [], []],
      ];
    }
  }

  const cbob = await getChilam();
  const gbob = await getGaja();

  return {
    c: { bf: cbob[0], lc: cbob[1], dn: cbob[2] },
    g: { bf: gbob[0], lc: gbob[1], dn: gbob[2] },
  };
}
