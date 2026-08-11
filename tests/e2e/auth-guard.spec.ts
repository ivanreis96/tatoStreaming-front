import { test, expect } from '@playwright/test'

test.describe('Auth guard', () => {
  test('redireciona visitante para /login ao acessar rota privada', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveURL(/\/login$/)
  })
})
