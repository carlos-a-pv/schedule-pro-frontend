import { Builder, By, until, WebDriver } from 'selenium-webdriver';

async function testEditarEmpleado() {
  const driver: WebDriver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:4200/empleados');

    // Buscar y hacer clic en botón de editar del primer empleado
    const editarBtn = await driver.wait(until.elementLocated(By.xpath("//tr[1]//button[contains(text(),'Editar')]")), 5000);
    await editarBtn.click();

    // Cambiar el apellido
    const apellidoInput = await driver.findElement(By.css('input[formControlName="apellido"]'));
    await apellidoInput.clear();
    await apellidoInput.sendKeys('Ramírez');

    // Guardar cambios
    await driver.findElement(By.xpath("//button[contains(text(),'Guardar')]")).click();

    // Confirmar que el nuevo apellido aparece
    await driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'Ramírez')]")), 5000);

    console.log('✅ Empleado editado correctamente');
  } catch (err) {
    console.error('❌ Error al editar empleado:', err);
  } finally {
    await driver.quit();
  }
}

testEditarEmpleado();
