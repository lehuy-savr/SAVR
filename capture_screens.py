"""
SAVR app screen capture script — exports key screens as 9:16 PNG files
for use in commercial video production.
"""
import asyncio, os, time
from playwright.async_api import async_playwright

OUTPUT = '/Users/nguyenhuy/Downloads/savr-screenshots'
URL    = 'http://localhost:3000/'

# Phone frame: 390×844 viewport (iPhone 14 size), device pixel ratio 3 → crisp 1170×2532
W, H, DPR = 390, 844, 3

SCREENS = [
    {
        'name': '01_mood_picker',
        'label': 'Mood Picker — "How are you feeling today?"',
        'setup': """
            document.querySelector('#mood-splash').style.display = '';
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        """,
    },
    {
        'name': '02_fridge',
        'label': 'Fridge — color-coded ingredient tracker',
        'setup': """
            document.querySelector('#mood-splash').style.display = 'none';
            nav('fridge');
        """,
    },
    {
        'name': '03_fridge_scrolled',
        'label': 'Fridge — scrolled to show Vegetables',
        'setup': """
            document.querySelector('#mood-splash').style.display = 'none';
            nav('fridge');
            await new Promise(r => setTimeout(r, 300));
            const sa = document.querySelector('#fridge .sa');
            if (sa) sa.scrollTop = 340;
        """,
    },
    {
        'name': '04_planning',
        'label': 'Planning — Meal Plan with expiry alerts',
        'setup': """
            document.querySelector('#mood-splash').style.display = 'none';
            nav('planning');
        """,
    },
    {
        'name': '05_recipe_swipe',
        'label': 'Recipe Swipe — Pasta Carbonara card',
        'setup': """
            document.querySelector('#mood-splash').style.display = 'none';
            STATE.tinderQueue = FALLBACK_RECIPES;
            STATE.tinderIdx = 0;
            nav('fridge');
            await new Promise(r => setTimeout(r, 100));
            document.querySelectorAll('.screen.active').forEach(s => s.classList.remove('active'));
            const t = document.getElementById('tinder');
            t.style.transform = '';
            t.classList.add('active');
            showTinderLoading(false);
            renderTinderCard();
        """,
    },
    {
        'name': '06_recipe_swipe_2',
        'label': 'Recipe Swipe — Egg Fried Rice card',
        'setup': """
            document.querySelector('#mood-splash').style.display = 'none';
            STATE.tinderQueue = FALLBACK_RECIPES;
            STATE.tinderIdx = 1;
            document.querySelectorAll('.screen.active').forEach(s => s.classList.remove('active'));
            const t = document.getElementById('tinder');
            t.style.transform = '';
            t.classList.add('active');
            showTinderLoading(false);
            renderTinderCard();
        """,
    },
    {
        'name': '07_recipe_detail',
        'label': 'Recipe Detail — ingredients with In Fridge badges',
        'setup': """
            document.querySelector('#mood-splash').style.display = 'none';
            STATE.currentRecipe = FALLBACK_RECIPES[0];
            document.querySelectorAll('.screen.active').forEach(s => s.classList.remove('active'));
            const rd = document.getElementById('recipe-detail');
            rd.style.transform = '';
            rd.classList.add('active');
            renderRecipeDetail();
        """,
    },
    {
        'name': '08_social',
        'label': 'Social Feed — community recipes',
        'setup': """
            document.querySelector('#mood-splash').style.display = 'none';
            nav('social');
        """,
    },
    {
        'name': '09_profile',
        'label': 'Profile — user with streak and recipe grid',
        'setup': """
            document.querySelector('#mood-splash').style.display = 'none';
            nav('profile');
        """,
    },
    {
        'name': '10_recap',
        'label': 'Monthly Recap — money saved, food rescued',
        'setup': """
            document.querySelector('#mood-splash').style.display = 'none';
            nav('profile');
            await new Promise(r => setTimeout(r, 200));
            document.querySelectorAll('.screen.active').forEach(s => s.classList.remove('active'));
            const rec = document.getElementById('recap');
            rec.style.transform = '';
            rec.classList.add('active');
            document.getElementById('recap-meal-count').textContent = 7;
        """,
    },
]

async def capture():
    os.makedirs(OUTPUT, exist_ok=True)
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(
            viewport={'width': W, 'height': H},
            device_scale_factor=DPR,
        )
        page = await ctx.new_page()

        print(f'Loading {URL} ...')
        await page.goto(URL, wait_until='networkidle')
        await page.wait_for_timeout(1500)

        # Hide mood-splash initially to get a stable baseline
        await page.evaluate("document.querySelector('#mood-splash').style.display = 'none'")

        for screen in SCREENS:
            print(f"\n→ {screen['label']}")
            # Run setup (may contain `await` via top-level AsyncFunction trick)
            setup_js = f"""
            (async () => {{
                {screen['setup']}
            }})()
            """
            await page.evaluate(setup_js)
            await page.wait_for_timeout(700)   # let transitions settle + images load

            path = os.path.join(OUTPUT, f"{screen['name']}.png")
            await page.screenshot(path=path, full_page=False)
            print(f"   Saved → {path}")

        await browser.close()
        print(f'\nDone! {len(SCREENS)} screenshots in {OUTPUT}')

asyncio.run(capture())
