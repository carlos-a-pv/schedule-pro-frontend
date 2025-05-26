import { Builder, By, until, WebDriver } from 'selenium-webdriver';

async function testLogout() {
  const driver: WebDriver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:4200/login');

    // Iniciar sesión antes de hacer logout
    await driver.findElement(By.css('input[formControlName="usuario"]')).sendKeys('admin');
    await driver.findElement(By.css('input[formControlName="password"]')).sendKeys('admin123');
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.urlContains('/dashboard'), 5000);

    // Hacer clic en el botón de logout (ajusta el selector a tu implementación)

    // Opción 1: si es un botón visible con texto
    const logoutBtn = await driver.findElement(By.xpath("//button[contains(text(),'Cerrar sesión')]"));

    // Opción 2: si usas un ícono con aria-label o clase
    // const logoutBtn = await driver.findElement(By.css('button[aria-label="logout"]'));

    await logoutBtn.click();

    // Esperar que redirija al login
    await driver.wait(until.urlContains('/login'), 5000);

    console.log('✅ Logout realizado correctamente');

  } catch (err) {
    console.error('❌ Error al hacer logout:', err);
  } finally {
    await driver.quit();
  }
}

testLogout();
