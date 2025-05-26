import { Builder, By, until, WebDriver } from 'selenium-webdriver';

async function testAgregarEmpleado() {
  const driver: WebDriver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:4200/empleados');

    // Esperar y hacer clic en "Agregar empleado"
    await driver.wait(until.elementLocated(By.xpath("//button[contains(text(),'Agregar empleado')]")), 5000).click();

    // Completar el formulario
    await driver.findElement(By.css('input[formControlName="nombre"]')).sendKeys('Carlos');
    await driver.findElement(By.css('input[formControlName="apellido"]')).sendKeys('Pérez');
    await driver.findElement(By.css('input[formControlName="email"]')).sendKeys('carlos@example.com');

    // Hacer clic en Guardar
    await driver.findElement(By.xpath("//button[contains(text(),'Guardar')]")).click();

    // Esperar que aparezca el nuevo empleado
    await driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'Carlos')]")), 5000);

    console.log('✅ Empleado agregado correctamente');
  } catch (err) {
    console.error('❌ Error al agregar empleado:', err);
  } finally {
    await driver.quit();
  }
}

testAgregarEmpleado();
