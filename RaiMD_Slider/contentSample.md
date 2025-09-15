# Markdown Presentation Tool

This is a powerful client-side presentation tool.
All content is generated from a simple markdown file.

Presented by:
**Your Name Here**

---

## Parametric Design

Everything is configurable in `config.js`.

- Base font size
- Colors for text and headings
- Background color
- Global watermark image
- Transition speed

---

### Continuous Content

This is a section with a lot of text that will scroll on a single slide. It demonstrates the continuous content feature. You can press space to reveal more of the text, one screenful at a time. The background will darken with each scroll, creating a visual effect to indicate progress. This allows you to present a long topic without needing to create a new slide for every paragraph. It is a great way to keep your audience focused on a single point while you explain it in detail.

This is a second paragraph that will be revealed on the next space press. It's important to provide a good user experience, and this feature helps achieve that by maintaining context. The last line of the previous view becomes the first line of the new view, which is a key requirement.

Another screen of text to demonstrate the feature. It's a simple yet effective way to manage large chunks of content. The tool is designed to be as user-friendly as possible.
\\
\\
\\
Final line of the continuous content. The next press of the spacebar will take you to the next slide.

### Math Rendering

We can render complex math formulas using MathJax.

Inline math: $\sqrt{3x-1}+(1+x)^2$ is a great formula.

Display math:
$$
\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)
$$

---

## Image as Background

![A beautiful scenic view of mountains and a lake](./assets/mountains.jpg)

This image will first be shown full screen. On the next key press, it will become a faded background and the text will be displayed on top.

This is the text that will appear on the slide. This feature is great for creating visually appealing presentations. The image remains as a watermark until a new section or image is encountered.