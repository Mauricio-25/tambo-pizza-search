const { chromium } = require('playwright');

async function searchTamboPizzas(searchTerm = 'Pizzas') {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    let pizzas = [];

    try {
        console.log('Navegando a Tambo...');
        await page.goto('https://www.tambo.pe');

        console.log('Cerrando modal...');
        const closeModalButton = await page.waitForSelector('//div[@role="dialog"]//button//span[text()="Close"]/ancestor::button', { timeout: 10000 });
        await closeModalButton.click();

        console.log('Haciendo clic en el botón de búsqueda...');
        await page.click('[aria-label="Buscar"]');

        console.log('Esperando a que aparezca el modal de búsqueda...');
        await page.waitForSelector('[role="dialog"]', { timeout: 10000 });

        console.log('Esperando a que aparezca el campo de búsqueda...');
        await page.waitForSelector('[role="dialog"] input[type="text"]', { timeout: 10000 });

        console.log('Escribiendo en el campo de búsqueda...');
        await page.fill('[role="dialog"] input[type="text"]', searchTerm);
        await page.keyboard.press('Enter');

        console.log('Esperando resultados...');
        await page.waitForTimeout(7000);

        // Selecciona los productos
        const productCards = await page.$$('div.relative.product-card');
        for (let i = 0; i < Math.min(productCards.length, 5); i++) {
            try {
                // Imagen
                const imgEl = await productCards[i].$('img');
                const image = imgEl ? await imgEl.getAttribute('src') : '';

                // Nombre
                const nameEl = await productCards[i].$('span.line-clamp-2.orderProductName');
                const title = nameEl ? (await nameEl.textContent()).trim() : 'Sin título';

                // Precio
                const priceEl = await productCards[i].$('div.flex.gap-x-2.text-sm.flex-col.sm\\:flex-row > div:not(.line-through)');
                const price = priceEl ? (await priceEl.textContent()).trim() : 'Sin precio';

                pizzas.push({ title, image, price });
            } catch (error) {
                pizzas.push({ title: 'Error al obtener', image: '', price: '' });
            }
        }
    } catch (error) {
        console.error('Error durante la automatización:', error);
        await page.screenshot({ path: 'error.png' });
    } finally {
        await browser.close();
    }
    
    return pizzas;
}

module.exports = { searchTamboPizzas };

// Solo ejecutar si se llama directamente
if (require.main === module) {
    const term = process.argv[2] || 'Pizzas';
    searchTamboPizzas(term).then(results => {
        console.log('Resultados finales:', results);
    });
}