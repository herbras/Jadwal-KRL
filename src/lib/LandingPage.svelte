<script lang="ts">
  export let seoData: { title: string; description: string; image: string };

  function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Menghasilkan nomor acak untuk digunakan dalam nama file
  let randomNumber: number = getRandomNumber(1, 8);
  let backgroundUrl: string = `./KRL${randomNumber}.webp`;
</script>

<section
  class="relative bg-cover bg-center bg-no-repeat"
  style="background-image: url({backgroundUrl});"
>
  <div
    class="absolute inset-0"
    style="background: linear-gradient(45deg, rgba(179, 217, 255, 0.7) 20%, rgba(128, 191, 255, 0.7) 50%, rgba(77, 166, 255, 0.7) 72%)"
  ></div>

  <div
    class="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
  >
    <div
      class="max-w-xl backdrop-blur-md text-center border-white border-2 border-solid p-5 rounded-md"
    >
      <h1 class="text-3xl font-extrabold sm:text-5xl">
        Let us find your

        <strong class="block font-extrabold text-teal-800">
          {seoData.title}
        </strong>
      </h1>

      <p class="mt-4 font-bold max-w-lg sm:text-xl/relaxed">
        {seoData.description}
      </p>
      <div class="mt-8 flex flex-wrap gap-4 text-center">
        <a
          href="/"
          class=" px-6 py-3 bg-teal-900 rounded-full outline-none overflow-hidden border duration-300 ease-linear
        after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center
        after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-[#fff]
       text-lg md:text-2xl border-transparent relative hover:text-white hover:border-[#fff]
       hover:after:opacity-20 hover:after:scale-[2.5] min-w-max font-bold text-[#ffff00]"
        >
          Temukan Jadwal Keberangkatan KRL-mu
        </a>
      </div>
    </div>
  </div>
</section>
