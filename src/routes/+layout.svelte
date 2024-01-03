<script lang="ts">
	import "../app.postcss";
</script>

<slot />
 <div
      role="button"
      aria-label="Hubungi twitter kami"
      id="Twitter-buttons"
      class="fixed bottom-8 z-50 right-5"
    >
      <a
	  href="https://twitter.com/intent/tweet?screen_name=sarbeh_&text=Maaf,%20saya%20menemukan%20kesalahan%20pada%20jadwal%20berikut:%20(detail%20kesalahan)%20atau%20ada%20masalah%20teknis%20di%20website."
        target="_blank"
        class="bg-gray-800 hover:bg-gray-900 text-white text-md font-bold p-2 rounded-full decoration-none shadow-lg flex items-center"
      >
        <div class="w-3 h-3 mr-2 i-tabler-brand-x"></div>

         Hubungi Kami
      </a>
    </div>
<footer class="text-white border-t border-gray-200">
	<h6 class="text-center pt-5 text-slate-100 font-bold text-xl">Sponsor</h6>
	<div class="container mx-auto px-5 py-8 flex gap-8 flex-wrap md:flex-nowrap">
	
		<div class="w-full md:w-1/2 flex flex-col justify-between">
			<div>
				<h6 class="text-xl md:text-2xl font-bold text-gray-100 mb-3">
					Sunat <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-yellow-500">Nyaman</span>, Anak <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-yellow-500">Ceria</span>
				</h6>
				<p class="text-gray-100">
					Sunat Khitan Modern SOLO Kami siap memberikan pelayanan yang maksimal kepada para pasien, baik itu bayi maupun dewasa.
				</p>
			</div>
			<div class="  flex gap-3 flex-wrap md:flex-nowrap">
				<a href="https://www.sunatnyaman.com/" target="_blank" class="mt-4 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900">
				Kunjungi Situs Kami
			</a><a href="https://api.whatsapp.com/send/?phone=6282140536672&text=Assalamualaikum,+saya+ingin+konsultasi+khitan" target="_blank" class="mt-4 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900">
				 Konsultasi Sunat Anak
			</a></div>
		</div>
		<div 		class="relative flex items-center text-gray-100 hover:text-black self-stretch p-4 -mx-4 transition-colors group hover:bg-gray-100 sm:self-auto sm:rounded-2xl lg:mx-0 lg:self-auto lg:p-6"
		>
			<a href="https://twitter.com/sarbeh_" target="_blank" class="flex items-center">
				<img class="h-12 w-12 rounded-full" src="https://pbs.twimg.com/profile_images/1739646178092883968/1Pyyw7G9_400x400.jpg" alt="@sarbeh_">
				<div class="ml-3">
					<p class="text-lg font-medium ">
						Ibrahim Nurul Huda / Sarbeh
					</p>
					<p class="text-sm ">
						Yuk berteman di sosial media, kita bisa saling berbagi cerita dan update.
					</p>
				</div>
			</a>
		</div>
	</div>
</footer>