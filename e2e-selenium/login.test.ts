import { Builder, By, until, WebDriver } from 'selenium-webdriver';

async function runTest() {
  let driver: WebDriver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://schedule-pro-36f5a.web.app'); 

    
    const userInput = await driver.wait(until.elementLocated(By.css('input[formControlName="email"]')), 5000);
    await userInput.sendKeys('jhogillds@gmail');

    // Esperar el input de la contraseña
    const passInput = await driver.findElement(By.css('input[formControlName="password"]'));
    await passInput.sendKeys('ADRyOj');

    // Clic en el botón de login
    const loginButton = await driver.findElement(By.css('button[type="submit"]'));
    await loginButton.click();

    // Esperar que redirija o aparezca algo en el dashboard
    await driver.wait(until.urlContains('/dashboard'), 10000);

    console.log('✅ Login test passed');

  } catch (error) {
    console.error('❌ Login test failed:', error);
  } finally {
    await driver.quit();
  }
}

runTest();
