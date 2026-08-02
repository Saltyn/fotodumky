import Image from "@11ty/eleventy-img";
import path from "node:path";

async function ogFor(inputPath, image) {
  const src = inputPath.replace("index.md", image);
  const metadata = await Image(src, {
    widths: [1200],
    formats: ["jpeg"],
    outputDir: "_site/img/",
    urlPath: "/img/",
    sharpJpegOptions: { quality: 80 },
    filenameFormat: (id, s, width, format) =>
      `${path.basename(path.dirname(s))}-og.${format}`,
  });
  return metadata.jpeg[0].url;
}

export default {
  layout: "dumka.njk",
  tags: [],
  eleventyComputed: {
    permalink: (data) => (data.published ? `/f/${data.slug}/` : false),
    eleventyExcludeFromCollections: (data) => !data.published,
    pageTitle: (data) => data.thought_en || data.title,
    pageDescription: (data) =>
      `${data.thought_en} — a FotoDumka. ${data.site.motto_en}`,
    ogType: () => "article",
    ogImageUrl: async (data) =>
      data.published ? await ogFor(data.page.inputPath, data.image) : "",
    structuredData: async (data) =>
      data.published
        ? JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Photograph",
            name: data.title,
            caption: data.thought_en,
            inLanguage: ["uk", "en"],
            url: `${data.site.url}/f/${data.slug}/`,
            image: `${data.site.url}${await ogFor(data.page.inputPath, data.image)}`,
            datePublished: new Date(data.date).toISOString().slice(0, 10),
            creator: { "@type": "Person", name: data.site.author },
            copyrightNotice: `© ${data.site.author}`,
          })
        : "",
  },
};
