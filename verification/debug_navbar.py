
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(viewport={'width': 375, 'height': 667})
        page = context.new_page()

        # Log console messages
        page.on("console", lambda msg: print(f"BROWSER CONSOLE: {msg.text}"))
        page.on("pageerror", lambda exc: print(f"BROWSER ERROR: {exc}"))

        print("Navigating to http://localhost:8080...")
        page.goto('http://localhost:8080', wait_until="networkidle")

        print("Waiting for .navbar selector...")
        try:
            page.wait_for_selector('.navbar', timeout=5000)
            navbar = page.locator('.navbar')
            is_visible = navbar.is_visible()
            box = navbar.bounding_box()
            print(f"Navbar visible: {is_visible}")
            print(f"Navbar bounding box: {box}")

            # Check toggle
            toggle = page.locator('.menu-toggle')
            print(f"Toggle visible: {toggle.is_visible()}")
            print(f"Toggle box: {toggle.bounding_box()}")

            page.click('.menu-toggle')
            page.wait_for_timeout(500)

            nav_links = page.locator('.nav-links')
            print(f"Nav links visible after toggle: {nav_links.is_visible()}")
            print(f"Nav links opacity: {page.evaluate('window.getComputedStyle(document.querySelector(\".nav-links\")).opacity')}")

        except Exception as e:
            print(f"Failed to find or interact with navbar: {e}")
            page.screenshot(path="verification/failed_navbar.png")

        browser.close()

if __name__ == "__main__":
    run()
