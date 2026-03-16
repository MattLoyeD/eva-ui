import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TitleScreen, type TitleScreenBlock } from "../TitleScreen";

const finaleBlocks: TitleScreenBlock[] = [
  { role: "masthead", text: ["NEON", "GENESIS"] },
  { role: "hero", text: "EVANGELION" },
  { role: "label", text: "FINALE:" },
  { role: "quote", text: ["Take care", "of yourself."] },
];

describe("TitleScreen", () => {
  it("renders only the first hero block as h1", () => {
    const { container } = render(
      <TitleScreen
        reveal="none"
        blocks={[
          { role: "hero", text: "EVANGELION" },
          { role: "hero", text: "FINALE" },
          { role: "quote", text: "Take care of yourself." },
        ]}
      />
    );

    const headings = container.querySelectorAll("h1");
    const heroBlocks = container.querySelectorAll('[data-role="hero"]');

    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent("EVANGELION");
    expect(heroBlocks).toHaveLength(2);
    expect(heroBlocks[1]?.tagName).toBe("DIV");
  });

  it("preserves line breaks from string arrays", () => {
    const { container } = render(
      <TitleScreen reveal="none" template="finale" blocks={finaleBlocks} />
    );

    const quote = container.querySelector('[data-role="quote"]');
    const lines = quote?.querySelectorAll("[data-title-screen-line]");

    expect(lines).toHaveLength(2);
    expect(screen.getByText("Take care")).toBeInTheDocument();
    expect(screen.getByText("of yourself.")).toBeInTheDocument();
  });

  it("applies template placement metadata for the canonical presets", () => {
    const { container: stacked } = render(
      <TitleScreen
        reveal="none"
        template="stacked"
        blocks={[
          { role: "masthead", text: "NEON" },
          { role: "hero", text: "EVANGELION" },
        ]}
      />
    );
    expect(stacked.querySelector('[data-role="masthead"]')?.getAttribute("data-anchor")).toBe(
      "top-left"
    );
    expect(stacked.querySelector('[data-role="hero"]')?.getAttribute("data-anchor")).toBe(
      "middle-left"
    );

    const { container: episode } = render(
      <TitleScreen
        reveal="none"
        template="episode"
        blocks={[
          { role: "label", text: "EPISODE:01" },
          { role: "hero", text: "ANGEL ATTACK" },
        ]}
      />
    );
    expect(episode.querySelector('[data-role="label"]')?.getAttribute("data-anchor")).toBe(
      "top-left"
    );
    expect(episode.querySelector('[data-role="hero"]')?.getAttribute("data-anchor")).toBe(
      "bottom-right"
    );

    const { container: finale } = render(
      <TitleScreen reveal="none" template="finale" blocks={finaleBlocks} />
    );
    expect(finale.querySelector('[data-role="label"]')?.getAttribute("data-anchor")).toBe(
      "bottom-left"
    );
    expect(finale.querySelector('[data-role="quote"]')?.getAttribute("data-anchor")).toBe(
      "bottom-right"
    );
  });

  it("applies glow styling without changing block structure", () => {
    const { container } = render(
      <TitleScreen
        reveal="none"
        appearance="glow"
        template="freeform"
        blocks={[
          { role: "hero", text: "NERV-UI", anchor: "middle-left" },
          { role: "support", text: "世界の中心でアイを叫んだけもの", anchor: "bottom-center" },
        ]}
      />
    );

    const hero = container.querySelector('[data-role="hero"]') as HTMLHeadingElement | null;
    const support = container.querySelector('[data-role="support"]');

    expect(container.querySelectorAll("[data-role]")).toHaveLength(2);
    expect(hero?.style.textShadow).toContain("rgba");
    expect(support?.getAttribute("data-anchor")).toBe("bottom-center");
  });

  it("omits motion wrappers when reveal is none", () => {
    const { container } = render(
      <TitleScreen reveal="none" template="finale" blocks={finaleBlocks} />
    );

    expect(container.querySelector("[data-motion]")).toBeNull();
    expect(container.querySelector('[data-reveal="none"]')).toBeTruthy();
  });

  it("does not render legacy filler copy", () => {
    render(<TitleScreen reveal="none" template="finale" blocks={finaleBlocks} />);

    expect(screen.queryByText(/title card/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/episode register/i)).not.toBeInTheDocument();
  });
});
