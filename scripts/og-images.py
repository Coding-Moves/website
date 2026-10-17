# One-off helper: renders social preview images (public/og/*.png) and the
# Apple touch icon. Needs Python + Playwright. Re-run if you change logos/brands.
import base64, pathlib, re
from playwright.sync_api import sync_playwright

root = pathlib.Path(__file__).resolve().parent.parent
src = (root / "src/data/brands.ts").read_text()
brands = re.findall(r'id: "([\w-]+)",\s*name: "([^"]+)",\s*short: "[^"]+",\s*path: "[^"]*",\s*status: "[^"]+",\s*accent: "(#\w+)",\s*accentSoft: "(#\w+)",[\s\S]*?oneLiner:\s*"([^"]+)"', src)

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1200, "height": 630})
    for bid, name, accent, soft, line in brands:
        logo = "data:image/svg+xml;base64," + base64.b64encode((root / f"public/logos/{bid}.svg").read_bytes()).decode()
        words = name.split(" ", 2)
        title = "Coding Moves" + (f' <span style="color:{soft}">{words[2]}</span>' if len(words) > 2 else "")
        pg.set_content(f"""<html><body style="margin:0;width:1200px;height:630px;display:flex;align-items:center;gap:56px;padding:0 80px;box-sizing:border-box;
          font-family:'Space Grotesk',system-ui,sans-serif;color:#f8fafc;
          background:radial-gradient(700px 400px at 90% 0%,{accent}55,transparent 70%),
          linear-gradient(rgba(148,163,184,.07) 1px,transparent 1px) 0 0/44px 44px,
          linear-gradient(90deg,rgba(148,163,184,.07) 1px,transparent 1px) 0 0/44px 44px,#0b1220">
          <img src="{logo}" width="300" height="300">
          <div><div style="font-size:64px;font-weight:700;line-height:1.05;letter-spacing:-.02em">{title}</div>
          <div style="font-size:30px;color:#94a3b8;margin-top:22px;line-height:1.35">{line}</div>
          <div style="font-size:20px;color:{soft};margin-top:34px;letter-spacing:.2em">BUILD · EXPLORE · IMPACT</div></div>
        </body></html>""")
        pg.screenshot(path=str(root / f"public/og/{bid}.png"))
    pg.set_viewport_size({"width": 180, "height": 180})
    pg.set_content(f'<html><body style="margin:0;background:#0b1220"><img src="data:image/svg+xml;base64,{base64.b64encode((root/"public/favicon.svg").read_bytes()).decode()}" width="180" height="180"></body></html>')
    pg.screenshot(path=str(root / "public/apple-touch-icon.png"))
    b.close()
print("og images:", [x[0] for x in brands])
