#!/usr/bin/env python3

from __future__ import annotations

import argparse
import subprocess
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = ROOT / "docs" / "references" / "readme-surveillance-preview.gif"
CANVAS_SIZE = (1200, 675)
RESAMPLE_LANCZOS = getattr(getattr(Image, "Resampling", Image), "LANCZOS")
ADAPTIVE_PALETTE = getattr(getattr(Image, "Palette", Image), "ADAPTIVE", Image.ADAPTIVE)


@dataclass(frozen=True)
class FrameSpec:
    path: Path
    title: str
    subtitle: str
    accent: str
    duration: int
    focus_y: float = 0.5
    zoom: float = 1.0


FRAME_SPECS = [
    FrameSpec(
        path=ROOT / "banner.png",
        title="NERV-UI",
        subtitle="Industrial React surfaces with maximum signal density",
        accent="#FF9900",
        duration=900,
        focus_y=0.5,
    ),
    FrameSpec(
        path=ROOT / "docs" / "references" / "3-side-monitor.png",
        title="Subject Channels",
        subtitle="Triple-feed surveillance framing",
        accent="#00F6FF",
        duration=720,
        focus_y=0.48,
    ),
    FrameSpec(
        path=ROOT / "docs" / "references" / "magi-3-sides-quadrant-monitoring-display.png",
        title="MAGI Consensus",
        subtitle="Angular verdict routing and system arbitration",
        accent="#FF9900",
        duration=720,
        focus_y=0.46,
    ),
    FrameSpec(
        path=ROOT / "docs" / "references" / "phase-lists.png",
        title="Phase Rails",
        subtitle="Aggressive sidebar stacks for hot-path monitoring",
        accent="#FF2B1D",
        duration=720,
        focus_y=0.52,
    ),
    FrameSpec(
        path=ROOT / "output" / "playwright" / "readme-gif-frame-1.png",
        title="Video Intercept Deck",
        subtitle="New example page with pilot lanes, phase bus, and relay core",
        accent="#FF9900",
        duration=950,
        focus_y=0.42,
        zoom=1.02,
    ),
    FrameSpec(
        path=ROOT / "output" / "playwright" / "readme-gif-frame-3.png",
        title="Live Surveillance",
        subtitle="Dynamic states driven by the docs media video",
        accent="#00FF9D",
        duration=1100,
        focus_y=0.56,
        zoom=1.03,
    ),
]


def resolve_font(pattern: str, size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    try:
        font_path = (
            subprocess.check_output(["fc-match", "-f", "%{file}\n", pattern], text=True)
            .strip()
        )
        if font_path:
            return ImageFont.truetype(font_path, size)
    except Exception:
        pass
    return ImageFont.load_default()


def fit_cover(image: Image.Image, target_size: tuple[int, int], *, focus_y: float, zoom: float) -> Image.Image:
    source = image.convert("RGBA")
    width, height = source.size
    target_w, target_h = target_size
    source_ratio = width / height
    target_ratio = target_w / target_h

    if source_ratio > target_ratio:
        crop_h = height / zoom
        crop_w = crop_h * target_ratio
    else:
        crop_w = width / zoom
        crop_h = crop_w / target_ratio

    left = max(0.0, min(width - crop_w, (width - crop_w) / 2))
    top = max(0.0, min(height - crop_h, (height - crop_h) * focus_y))
    cropped = source.crop((int(left), int(top), int(left + crop_w), int(top + crop_h)))
    return cropped.resize(target_size, RESAMPLE_LANCZOS)


def draw_scanlines(canvas: Image.Image) -> None:
    draw = ImageDraw.Draw(canvas)
    width, height = canvas.size
    for y in range(0, height, 4):
        draw.line((0, y, width, y), fill=(0, 0, 0, 24), width=1)


def add_hud_chrome(canvas: Image.Image, *, title: str, subtitle: str, accent: str) -> Image.Image:
    draw = ImageDraw.Draw(canvas)
    title_font = resolve_font("DejaVu Sans:style=Bold", 58)
    subtitle_font = resolve_font("DejaVu Sans Mono:style=Book", 18)
    chip_font = resolve_font("DejaVu Sans Mono:style=Book", 14)

    width, height = canvas.size
    orange = ImageColor(accent)
    pale = ImageColor("#E8E2D6")

    draw.rectangle((18, 18, width - 18, height - 18), outline=orange + (180,), width=2)
    draw.line((18, 64, width - 18, 64), fill=orange + (140,), width=2)
    draw.line((18, height - 70, width - 18, height - 70), fill=orange + (140,), width=2)

    draw.rectangle((34, 30, 196, 56), fill=(0, 0, 0, 185), outline=orange + (220,), width=1)
    draw.text((48, 36), "NERV_UI PREVIEW", font=chip_font, fill=orange + (255,))

    title_y = height - 152
    draw.rectangle(
        (34, title_y - 22, width - 34, height - 34),
        fill=(0, 0, 0, 168),
        outline=orange + (190,),
        width=1,
    )
    draw.text((56, title_y), title.upper(), font=title_font, fill=orange + (255,))
    draw.text((58, title_y + 68), subtitle, font=subtitle_font, fill=pale + (220,))

    return canvas


def ImageColor(hex_value: str) -> tuple[int, int, int]:
    hex_value = hex_value.lstrip("#")
    return tuple(int(hex_value[index : index + 2], 16) for index in (0, 2, 4))


def stylize(spec: FrameSpec) -> Image.Image:
    base = fit_cover(Image.open(spec.path), CANVAS_SIZE, focus_y=spec.focus_y, zoom=spec.zoom)
    base = ImageEnhance.Contrast(base).enhance(1.08)
    base = ImageEnhance.Color(base).enhance(0.9)

    overlay = Image.new("RGBA", CANVAS_SIZE, (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    overlay_draw.rectangle((0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]), fill=(0, 0, 0, 54))
    overlay_draw.rectangle((0, CANVAS_SIZE[1] - 240, CANVAS_SIZE[0], CANVAS_SIZE[1]), fill=(0, 0, 0, 112))
    overlay_draw.rectangle((0, 0, CANVAS_SIZE[0], 180), fill=(0, 0, 0, 76))

    accent = ImageColor(spec.accent)
    vignette = Image.new("RGBA", CANVAS_SIZE, (0, 0, 0, 0))
    vignette_draw = ImageDraw.Draw(vignette)
    vignette_draw.ellipse((-180, -180, 520, 520), fill=accent + (42,))
    vignette_draw.ellipse((CANVAS_SIZE[0] - 420, -180, CANVAS_SIZE[0] + 120, 360), fill=accent + (24,))
    vignette = vignette.filter(ImageFilter.GaussianBlur(40))

    composed = Image.alpha_composite(base, overlay)
    composed = Image.alpha_composite(composed, vignette)
    draw_scanlines(composed)
    return add_hud_chrome(composed, title=spec.title, subtitle=spec.subtitle, accent=spec.accent)


def build_frames(specs: Iterable[FrameSpec]) -> tuple[list[Image.Image], list[int]]:
    frames: list[Image.Image] = []
    durations: list[int] = []

    for spec in specs:
        frame = stylize(spec)
        frames.append(frame.convert("P", palette=ADAPTIVE_PALETTE))
        durations.append(spec.duration)

    return frames, durations


def main() -> None:
    parser = argparse.ArgumentParser(description="Build the README preview GIF.")
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()

    missing = [spec.path for spec in FRAME_SPECS if not spec.path.exists()]
    if missing:
        missing_list = "\n".join(f"- {path}" for path in missing)
        raise SystemExit(f"Missing source assets:\n{missing_list}")

    frames, durations = build_frames(FRAME_SPECS)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    frames[0].save(
        args.output,
        save_all=True,
        append_images=frames[1:],
        loop=0,
        duration=durations,
        optimize=False,
        disposal=2,
    )
    print(args.output.relative_to(ROOT))


if __name__ == "__main__":
    main()
