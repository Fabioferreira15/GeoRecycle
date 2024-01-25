const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const service = new chrome.ServiceBuilder("chromedriver");

async function loginLogout() {
  try {
    let driver = await new Builder()
      .setChromeOptions(
        new chrome.Options().windowSize({ width: 1920, height: 1080 })
      )
      .forBrowser("chrome")
      .build();

    await driver.get("http://localhost:5173/");

    //login btn
    let loginBtn = await driver.findElement(By.id("login"));
    await loginBtn.click();
    await driver.sleep(10000);
    //username
    let username = await driver.findElement(By.id("username"));
    await username.sendKeys("Admin");
    await driver.sleep(10000);
    //password
    let password = await driver.findElement(By.id("password"));
    await password.sendKeys("Esmad_2223");
    await driver.sleep(10000);
    //login btn
    let loginBtn2 = await driver.findElement(By.id("botaoLogin"));
    await loginBtn2.click();
    await driver.sleep(10000);

    //logout btn
    let logoutBtn = await driver.findElement(By.id("logout"));
    await logoutBtn.click();

    await driver.sleep(5000);
    await driver.quit();
  } catch (error) {
    console.log(error);
  }
}

(async function interacoes() {
  try {
    await loginLogout(); // Aguarda a conclusão do primeiro bloco de código

    let driver = await new Builder()
      .setChromeOptions(
        new chrome.Options().windowSize({ width: 1920, height: 1080 })
      )
      .forBrowser("chrome")
      .build();

    await driver.get("http://localhost:5173/");

    //login btn
    let loginBtn = await driver.findElement(By.id("login"));
    await loginBtn.click();
    await driver.sleep(10000);
    //username
    let username = await driver.findElement(By.id("username"));
    await username.sendKeys("Admin");
    await driver.sleep(10000);
    //password
    let password = await driver.findElement(By.id("password"));
    await password.sendKeys("Esmad_2223");
    await driver.sleep(10000);
    //login btn
    let loginBtn2 = await driver.findElement(By.id("botaoLogin"));
    await loginBtn2.click();
    await driver.sleep(10000);

    //rankings page
    let rankingsBtn = await driver.findElement(By.id("rankings"));
    await rankingsBtn.click();
    await driver.sleep(10000);

    let ecopontosBtn = await driver.findElement(By.id("ecopontos"));
    await ecopontosBtn.click();
    await driver.sleep(10000);

    let pontosBtn = await driver.findElement(By.id("pontos"));
    await pontosBtn.click();
    await driver.sleep(10000);

    let lojaBtn = await driver.findElement(By.id("loja"));
    await lojaBtn.click();
    await driver.sleep(10000);

    let faqBtn = await driver.findElement(By.id("faq"));
    await faqBtn.click();
    await driver.sleep(10000);

    let logoutBtn = await driver.findElement(By.id("logout"));
    await logoutBtn.click();

    await driver.sleep(5000);
    await driver.quit();
  } catch (error) {
    console.log(error);
  }
})();
