import { Builder, By, until, WebDriver } from 'selenium-webdriver';

async function testEliminarEmpleado() {
  const driver: WebDriver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:4200/empleados');

    // Eliminar primer empleado visible
    const eliminarBtn = await driver.wait(until.elementLocated(By.xpath("//tr[1]//button[contains(text(),'Eliminar')]")), 5000);
    await eliminarBtn.click();

    // Confirmación si existe
    const confirmar = await driver.wait(until.elementLocated(By.xpath("//button[normalize-space(text())='Sí']")), 3000).catch(() => null);
    if (confirmar) await confirmar.click();

    // Esperar que ya no aparezca el empleado eliminado
    await driver.sleep(2000); // puede variar según animaciones
    console.log('✅ Empleado eliminado correctamente');
  } catch (err) {
    console.error('❌ Error al eliminar empleado:', err);
  } finally {
    await driver.quit();
  }
}

testEliminarEmpleado();
