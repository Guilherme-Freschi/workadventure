import {Page} from "@playwright/test";

class EntityEditor {
    async selectEntity(page: Page, nb: number, search?: string){
        if(search != undefined){
            await page.getByPlaceholder('Search').click();
            await page.getByPlaceholder('Search').fill(search);
        }
        await page.locator('.map-editor .item-picker .item-picker-container .pickable-item').nth(nb).click();
    }

    async moveAndClick(page: Page, x: number, y: number) {
        await page.mouse.move(x, y);
        await page.mouse.down();
        await page.mouse.up();
    }

    async quitEntitySelector(page: Page){
        await page.locator('.map-editor .item-picker .item-variations img[alt="Unselect object picked"]').click();
    }

    async addProperty(page: Page, property: string) {
        await page.locator('.map-editor .sidebar .properties-buttons .add-property-button', {hasText: property}).click();
    }
}

export default new EntityEditor();
