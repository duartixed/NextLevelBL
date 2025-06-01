import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import firefox from 'selenium-webdriver/firefox.js';

const BROWSER = 'firefox'; // Cambia a 'firefox' si quieres probar Firefox

async function testReactApp() {
  let driver;

  if (BROWSER === 'chrome') {
    driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
  } else if (BROWSER === 'firefox') {
    driver = await new Builder().forBrowser('firefox').setFirefoxOptions(new firefox.Options()).build();
  } else {
    console.error('❌ Navegador no soportado:', BROWSER);
    return;
  }

  try {
    console.log('🌐 Abriendo app en el navegador...');
    await driver.get('http://localhost:3000');

    console.log('⌛ Esperando botón...');
    await driver.wait(until.elementLocated(By.css('button')), 15000);

    console.log('✅ Botón encontrado, haciendo clic...');
    const button = await driver.findElement(By.css('button'));
    await button.click();

    console.log('⏳ Esperando 5 segundos antes de cerrar...');
    await driver.sleep(50000000);
  } catch (err) {
    console.error('❌ Error durante el test:', err);
  } finally {
    await driver.quit();
    console.log('🚪 Navegador cerrado');
  }
}

testReactApp();
