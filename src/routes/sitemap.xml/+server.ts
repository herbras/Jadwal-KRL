import seoDataArray from "../[slug]/data.json";

export async function GET({ request }) {
    const rootURL = new URL(request.url).origin + "/";

    // Membuat string kosong untuk menampung entri URL dalam Sitemap
    let sitemapEntries = "";

    // Mengambil tanggal hari ini dalam format YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];

    // Loop melalui seoDataArray dan membuat entri URL untuk setiap slug
    for (const data of seoDataArray) {
        const slug = data.slug;
        // Membuat URL lengkap dengan rootURL dan slug
        const fullURL = `${rootURL}${slug}`;

        // Mengatur tanggal menjadi hari ini
        const lastModified = today;

        // Mengatur prioritas selalu menjadi 0.9 atau 1.0
        const priority = data.priority === 1 ? "1.0" : "0.9";

        // Membuat entri URL dalam Sitemap dengan data yang diambil
        sitemapEntries += `
      <url>
        <loc>${fullURL}</loc>
        <lastmod>${lastModified}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>${priority}</priority>
      </url>
    `;
    }

    // Menghasilkan XML Sitemap dengan entri URL yang telah dibuat
    const sitemapXML = `
    <?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >  <url>
    <loc>${rootURL}</loc>
    <lastmod>2023-12-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
      ${sitemapEntries}
    </urlset>
  `.trim();

    return new Response(sitemapXML, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
