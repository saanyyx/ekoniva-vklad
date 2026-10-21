#!/usr/bin/env python3
"""Скачивает официальные фото товаров ЭкоНивы (ekoniva-moloko.com) для каталога прототипа.

Только stdlib (urllib) + встроенный macOS sips для ресайза/сжатия — без pip-зависимостей.
Страницы товаров подобраны вручную (категории/слаги сверены на сайте), скрипт просто
скачивает и обрабатывает. Если сайт отдаёт не 200 (антибот и т.п.) — просто пропускаем
товар и пишем это в отчёт, обход защиты не делаем (см. задачу).
"""
import re
import subprocess
import time
import urllib.error
import urllib.request
from pathlib import Path

BASE = "https://www.ekoniva-moloko.com"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
IMAGES_DIR = Path(__file__).parent / "images"
MAX_SIDE = 800
JPEG_QUALITY = 78

# product id (должен совпадать с id в PRODUCTS внутри app.js) -> (папка категории, путь страницы товара)
TARGETS = {
    # молоко
    "milk32":           ("milk",     "/catalog/moloko/moloko-pasterizovannoe-32"),
    "milk25":           ("milk",     "/catalog/moloko/moloko-ultrapasterizovannoe-25"),
    "milkLF":           ("milk",     "/catalog/moloko/moloko-pitevoe-ultrapasterizovannoe-bezlaktoznoe-ekoniva-professional-line-25"),
    "milkBaked":        ("milk",     "/catalog/moloko/49"),
    # творог и сметана
    "curd5":            ("curd",     "/catalog/tvorog/162"),
    "curd9":            ("curd",     "/catalog/tvorog/163"),
    "curdBerry":        ("curd",     "/catalog/tvorozhnye-produkty/tvorog-malina-zemlyanika-5"),
    "smetana20":        ("curd",     "/catalog/kislomolochnye-produkty/176"),
    # йогурты (питьевые, разные вкусы одной линейки)
    "yogDrink":         ("yogurt",   "/catalog/jogurty/91"),
    "yogPeach":         ("yogurt",   "/catalog/jogurty/92"),
    "yogBlueberry":     ("yogurt",   "/catalog/jogurty/93"),
    "yogNatural":       ("yogurt",   "/catalog/jogurty/94"),
    # масло
    "butter825":        ("butter",   "/catalog/maslo-slivochnoe/maslo-slivochnoe-825-180-g"),
    "butter825_350":    ("butter",   "/catalog/maslo-slivochnoe/maslo-slivochnoe-825-350-g"),
    "butter725":        ("butter",   "/catalog/maslo-slivochnoe/maslo-slivochnoe-725-180-g"),
    # сыры (реального SKU моцареллы на сайте нет — используем реальный ассортимент)
    "cheeseDurr3":      ("cheese",   "/catalog/cheeses/drr-hard-cheese-3-months-aging-50"),
    "cheeseDurr6":      ("cheese",   "/catalog/cheeses/drr-hard-cheese-6-months-aging-50"),
    "cheeseKolybelsky": ("cheese",   "/catalog/cheeses/120"),
    "cheeseShchuchansky": ("cheese", "/catalog/cheeses/semi-hard-cheese-shchuchansky-50"),
    # мороженое
    "icePlombir":       ("icecream", "/catalog/ice-cream/243"),
    "iceChoco":         ("icecream", "/catalog/ice-cream/chocolate-ice-cream-ice-cream-80-g"),
    "iceCremeBrulee":   ("icecream", "/catalog/ice-cream/244"),
    "iceBerry":         ("icecream", "/catalog/ice-cream/245"),
    # ЗОЖ
    "ryazhenka":        ("zoj",      "/catalog/kislomolochnye-produkty/ryazhenka-4"),
    "kefir1":           ("zoj",      "/catalog/kislomolochnye-produkty/kefir-1-pet"),
    "whey":             ("zoj",      "/catalog/kislomolochnye-produkty/snezhok"),  # точного SKU сыворотки нет — ближайший аналог линейки
    "highFocus":        ("zoj",      "/catalog/18/216"),
    "highFocusBrownie": ("zoj",      "/catalog/18/215"),
}

IMG_RE = re.compile(r'<img[^>]*class="[^"]*product-slider__firstPic[^"]*"[^>]*src="([^"]+)"')


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.read()


def main() -> None:
    ok, failed = [], []
    for pid, (category, path) in TARGETS.items():
        url = BASE + path
        try:
            html = fetch(url).decode("utf-8", "ignore")
        except urllib.error.HTTPError as e:
            print(f"[{pid}] {e.code} на {url} — пропускаю, оставляю эмодзи-заглушку")
            failed.append(pid)
            continue
        except Exception as e:
            print(f"[{pid}] ошибка сети: {e}")
            failed.append(pid)
            continue

        matches = IMG_RE.findall(html)
        src = next((m for m in matches if "front" in m.lower()), None) or (matches[0] if matches else None)
        if not src:
            print(f"[{pid}] на странице {url} не нашёл фото товара")
            failed.append(pid)
            continue

        img_url = src if src.startswith("http") else BASE + src
        try:
            img_bytes = fetch(img_url)
        except Exception as e:
            print(f"[{pid}] не скачалось изображение {img_url}: {e}")
            failed.append(pid)
            continue

        out_dir = IMAGES_DIR / category
        out_dir.mkdir(parents=True, exist_ok=True)
        raw_path = out_dir / f"_{pid}_raw{Path(img_url).suffix or '.jpg'}"
        out_path = out_dir / f"{pid}.jpg"
        raw_path.write_bytes(img_bytes)

        subprocess.run(
            ["sips", "-Z", str(MAX_SIDE), "-s", "format", "jpeg",
             "-s", "formatOptions", str(JPEG_QUALITY), str(raw_path), "--out", str(out_path)],
            check=True, capture_output=True,
        )
        raw_path.unlink()
        print(f"[{pid}] OK -> images/{category}/{pid}.jpg")
        ok.append(pid)

        time.sleep(1)  # не долбим сайт частыми запросами подряд

    print("\n--- Итог ---")
    print(f"Скачано: {len(ok)}/{len(TARGETS)}")
    if failed:
        print("Без фото (остаются emoji-заглушки):", ", ".join(failed))


if __name__ == "__main__":
    main()
