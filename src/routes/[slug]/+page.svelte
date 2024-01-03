<script lang="ts">
    import LandingPage from "$lib/LandingPage.svelte";
    import { page } from "$app/stores";
    import seoDataArray from "./data.json";
	import "../../app.postcss";

    let seoData;
    let nextSeoData;

    $: $page.params.slug && updateSeoData($page.params.slug);

    function updateSeoData(slug) {
        const currentIndex = seoDataArray.findIndex(
            (data) => data.slug === slug,
        );
        if (currentIndex !== -1) {
            seoData = seoDataArray[currentIndex];
            nextSeoData = seoDataArray[currentIndex + 1] || seoDataArray[0];
        } else {
            // Menetapkan nilai default atau alternatif jika tidak ditemukan
            seoData = {
                title: "Tidak Ditemukan",
                description:
                    "Konten yang Anda cari tidak tersedia. Tapi kamu bisa ngecek jadwal KRL Kesayanganmu di bawah ini.",
                slug: "default",
            };
            // Menentukan nextSeoData sebagai item pertama dari array atau nilai default lainnya
            nextSeoData = seoDataArray[0];
        }
    }
</script>

<svelte:head>
    <title
        >{seoData
            ? seoData.title
            : "Jadwal KRL Solo Jogja - Informasi Terkini"}</title
    >
    <meta
        name="description"
        content={seoData
            ? seoData.description
            : "Temukan jadwal terbaru dan informasi perjalanan KRL Solo Jogja di sini."}
    />
    <meta
        name="keywords"
        content={seoData
            ? seoData.keywords
            : "jadwal KRL Solo Jogja, informasi kereta api, jadwal kereta"}
    />
</svelte:head>

<LandingPage {seoData} {nextSeoData} />
