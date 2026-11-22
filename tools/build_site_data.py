#!/usr/bin/env python3
"""Build js/data.js for the works index from cached GitHub data."""
import json
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTRIB = ROOT / "data" / "contributions.json"
OUT = ROOT / "js" / "data.js"

SITES = [
    {"no": "01", "name": "私人唱片档案", "en": "PRIVATE PLAYLIST", "tag": "音乐",
     "desc": "431 首歌，按风格收好；黑胶杂志式的桌面与曲目表。",
     "url": "https://tuxlin123233.github.io/my-play-list/", "accent": "ink"},
    {"no": "02", "name": "零食柜", "en": "SNACK SHELF", "tag": "食物",
     "desc": "11 盒有包装的零食，拟物木架和会随滚动仰俯的纸箱。",
     "url": "https://tuxlin123233.github.io/my-food-list/", "accent": "coral"},
    {"no": "03", "name": "一事一练", "en": "ONE THING A DAY", "tag": "工具",
     "desc": "AI 长期陪练与存档：60 个练点、本周练习卡、换 AI 续接。",
     "url": "https://tuxlin123233.github.io/json-prompt-form/", "accent": "sage"},
    {"no": "04", "name": "像素小镇", "en": "PIXEL TOWN", "tag": "像素",
     "desc": "云端像素画板：画画、存档、串门，还能投到灯板。",
     "url": "https://light-field.pages.dev", "accent": "blue"},
    {"no": "05", "name": "像素画网站", "en": "PIXEL SPACE", "tag": "图像",
     "desc": "我的像素画作品与创作空间。",
     "url": "https://pixel-space-9bn.pages.dev/", "accent": "blue"},
    {"no": "06", "name": "重力 2048", "en": "GRAVITY 2048", "tag": "游戏",
     "desc": "一个受重力影响的 2048 小游戏。",
     "url": "https://tuxlin123233.github.io/", "accent": "mustard"},
]

PROJECTS = [
    {"name": "fly-car", "desc": "果蝇大脑控制的 ESP32 小车", "lang": "C++ / ESP32",
     "url": "https://github.com/TuxLin123233/fly-car"},
    {"name": "Minecraft-Save-Manager", "desc": "Minecraft 存档批量导入工具", "lang": "Python",
     "url": "https://github.com/TuxLin123233/Minecraft-Save-Manager"},
    {"name": "pixel-town", "desc": "像素小镇的源码、文档与硬件", "lang": "Vue 3 / Cloudflare",
     "url": "https://github.com/TuxLin123233/pixel-town"},
    {"name": "PixelSpace", "desc": "像素画网站源码", "lang": "Vue / Vite",
     "url": "https://github.com/TuxLin123233/PixelSpace"},
    {"name": "my-play-list", "desc": "私人唱片档案源码", "lang": "HTML / CSS / JS",
     "url": "https://github.com/TuxLin123233/my-play-list"},
    {"name": "my-food-list", "desc": "零食柜源码", "lang": "HTML / CSS / JS",
     "url": "https://github.com/TuxLin123233/my-food-list"},
]


def main():
    raw = json.loads(CONTRIB.read_text(encoding="utf-8"))
    days = raw.get("contributions", [])
    total = raw.get("total", {}).get("lastYear", 0)
    data = {
        "profile": {
            "login": "TuxLin123233",
            "name": "Lin Sifan",
            "avatar": "assets/avatar.jpg",
            "url": "https://github.com/TuxLin123233",
            "repos": 8,
            "contributions": total,
            "since": "2025",
        },
        "calendar": {
            "start": days[0]["date"] if days else "",
            "end": days[-1]["date"] if days else "",
            "total": total,
            "days": [{"d": d["date"], "c": d["count"], "l": d["level"]} for d in days],
        },
        "sites": SITES,
        "projects": PROJECTS,
        "updated": date.today().isoformat(),
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("window.WORKS_DATA = " + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print(f"built {OUT} · {total} contributions · {len(SITES)} sites")


if __name__ == "__main__":
    main()
