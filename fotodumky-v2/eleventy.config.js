import Image from "@11ty/eleventy-img";
import path from "node:path";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets/css": "assets/css" });
  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "assets/fonts" });
  eleventyConfig.addPassthroughCopy({ "src/assets/img": "assets/img" });
  
  // Collection of published FotoDumky, newest first
  eleventyConfig.addCollection("fotodumky", (api) =>
    api
      .getFilteredByGlob("src/content/fotodumky/*/index.md")
      .filter((p) => p.data.published)
      .sort((a, b) => b.data.date - a.data.date)
  );

  // Responsive image shortcode. `pageUrl` keeps generated files per-item.
  eleventyConfig.addAsyncShortcode(
    "foto",
    async function (src, alt, sizes = "(min-width: 760px) 720px, 94vw", loading = "lazy") {
      const metadata = await Image(src, {
        widths: [480, 760, 1080, 1440],
        formats: ["avif", "webp", "jpeg"],
        outputDir: "_site/img/",
        urlPath: "/img/",
        sharpJpegOptions: { quality: 82, mozjpeg: true },
        sharpAvifOptions: { quality: 55 },
        sharpWebpOptions: { quality: 78 },
        filenameFormat: (id, src, width, format) =>
          `${path.basename(path.dirname(src))}-${width}.${format}`,
      });
      const attrs = { alt, sizes, loading, decoding: "async", class: "foto" };
      if (loading === "eager") attrs.fetchpriority = "high";
      return Image.generateHTML(metadata, attrs);
    }
  );

  // Metadata for og:image (largest jpeg) — reuse the same pipeline
  eleventyConfig.addAsyncShortcode("ogimage", async function (src) {
    const metadata = await Image(src, {
      widths: [1200],
      formats: ["jpeg"],
      outputDir: "_site/img/",
      urlPath: "/img/",
      sharpJpegOptions: { quality: 80 },
      filenameFormat: (id, src, width, format) =>
        `${path.basename(path.dirname(src))}-og.${format}`,
    });
    return metadata.jpeg[0].url;
  });

  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("humanDate", (d) =>
    new Date(d).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })
  );

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
