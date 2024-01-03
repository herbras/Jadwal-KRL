<script lang="ts">
	// Impor onMount dari Svelte untuk menjalankan fungsi saat komponen dipasang
	import { onMount } from "svelte";

	// Inisialisasi ID stasiun keberangkatan dan kedatangan dengan nilai awal 'PWS'
	let departureStationId = "";
	let arrivalStationId = "";

	// Inisialisasi array jadwal kereta api dengan array kosong
	let schedules = [];
	let favorites = [];

	// Fungsi untuk menyimpan favorit ke Local Storage
	function saveToFavorites() {
		// Cek apakah departure dan arrival valid dan ada dalam daftar stationIDs
		const stationIDsOnly = stationIDs.map((s) => s.id);

		if (
			!stationIDsOnly.includes(departureStationId) ||
			!stationIDsOnly.includes(arrivalStationId)
		) {
			alert("Stasiun keberangkatan atau tujuan tidak valid.");
			return;
		}

		// Cek jika sudah ada 2 favorit
		if (favorites.length >= 2) {
			alert(
				"Maksimal 2 favorit. Silakan hapus salah satu untuk menambah yang baru.",
			);
			return;
		}

		const favorite = {
			departure: departureStationId,
			arrival: arrivalStationId,
		};

		// Cek jika favorit yang sama sudah ada
		const isDuplicate = favorites.some(
			(fav) =>
				fav.departure === favorite.departure &&
				fav.arrival === favorite.arrival,
		);
		if (isDuplicate) {
			alert("Favorit ini sudah ada.");
			return;
		}
		favorites = [
			...favorites,
			{ departure: departureStationId, arrival: arrivalStationId },
		];
		localStorage.setItem("favorites", JSON.stringify(favorites));
	}
	function removeFromFavorites(index) {
		favorites = []; // Set favorites to an empty array, removing all items
		localStorage.setItem("favorites", JSON.stringify(favorites));
	}

	// Fungsi untuk memuat favorit dari Local Storage
	function loadFavorites() {
		const storedFavorites = localStorage.getItem("favorites");
		if (storedFavorites) {
			favorites = JSON.parse(storedFavorites);
		} else {
			favorites = [];
		}
	}

	// Daftar ID stasiun
	const stationIDs = [
		{ id: "YK", label: "Yogyakarta" },
		{ id: "LPN", label: "Lempuyangan" },
		{ id: "MGW", label: "Maguwo" },
		{ id: "BBN", label: "Brambanan" },
		{ id: "SWT", label: "Sewugalur" },
		{ id: "KT", label: "Klaten" },
		{ id: "CE", label: "Ceper" },
		{ id: "DL", label: "Delanggu" },
		{ id: "GW", label: "Gawok" },
		{ id: "PWS", label: "Purwosari" },
		{ id: "SLO", label: "Solo Balapan" },
		{ id: "SK", label: "Solojebres" },
		{ id: "PL", label: "Palur" },
	];

	// pake pojok ke pojok eror mulu

	// URL API untuk mengambil jadwal kereta api
	const API_URL = "https://api-partner.krl.co.id/krlweb/v1/schedule";

	// Waktu mulai dan selesai untuk jadwal kereta api
	// Kenapa jam 1 ampe 11 malam? karena untuk ngambil semua datanya

	const TIME_TO = "23:00";

	let TIME_FROM = "01:00";
	let isCurrentTime = false;

	const toggleCurrentTime = () => {
		isCurrentTime = !isCurrentTime;
	};

	// Ubah fungsi setToCurrentTime untuk memperbarui TIME_FROM berdasarkan isCurrentTime
	$: {
		// Cek apakah nilai `isCurrentTime` bernilai true
		if (isCurrentTime) {
			// Jika ya, buat objek tanggal baru untuk mendapatkan tanggal dan waktu saat ini
			const currentDate = new Date();
			console.log(currentDate);

			// Dapatkan jam saat ini dari objek `currentDate`. `getHours()` mengembalikan nilai antara 0 (jam 12 malam) dan 23 (jam 11 malam)
			// Metode `padStart()` digunakan untuk menambahkan '0' di depan jam jika jam kurang dari 10 (e.g., '8' menjadi '08'). Metode ini menerima dua argumen:
			// cek disini qlm.one/padstart
			// 1. Panjang total string yang diinginkan. Dalam hal ini, itu adalah 2.
			// 2. Karakter yang akan ditambahkan jika string asli lebih pendek daripada panjang total. Dalam hal ini, itu adalah '0'.
			const currentHours = String(currentDate.getHours()).padStart(
				2,
				"0",
			);
			//console.log(currentHours)

			// Lakukan hal yang sama untuk menit. `getMinutes()` mengembalikan nilai antara 0 dan 59
			const currentMinutes = String(currentDate.getMinutes()).padStart(
				2,
				"0",
			);
			//console.log(currentMinutes)

			// Gabungkan jam dan menit dengan titik dua ':' untuk mendapatkan waktu dalam format HH:mm
			TIME_FROM = `${currentHours}:${currentMinutes}`;
			// console.log(TIME_FROM)
		} else {
			// Jika `isCurrentTime` bernilai false, atur `TIME_FROM` ke '01:00'
			TIME_FROM = "01:00";
		}

		// Setelah mengubah waktu, panggil fungsi `updateSchedules()` untuk memperbarui jadwal
		updateSchedules();
	}

	// Fungsi untuk mengambil data dari API
	async function fetchData(stationid) {
		// Periksa apakah Cache API tersedia di browser pengguna.
		if (typeof caches !== "undefined") {
			// Buka (atau buat, jika belum ada) cache dengan nama 'train-schedule'.
			const cache = await caches.open("train-schedule");
			// Mencoba mencari response yang telah disimpan di cache dengan URL tertentu.
			const cachedResponse = await cache.match(
				`${API_URL}?stationid=${stationid}&timefrom=${TIME_FROM}&timeto=${TIME_TO}`,
			);

			// Jika response ada di cache, maka kembalikan hasilnya dalam bentuk json.
			if (cachedResponse) {
				return cachedResponse.json();
			}
		}

		// Jika response tidak ada di cache, lakukan permintaan fetch seperti biasa.
		const response = await fetch(
			`${API_URL}?stationid=${stationid}&timefrom=${TIME_FROM}&timeto=${TIME_TO}`,
		);
		// Pastikan response ok (status 200) sebelum disimpan ke cache
		if (!response.ok) throw new Error("Maaf Sedang Maintance");

		// Clone response sebelum diproses karena response hanya bisa digunakan sekali.
		if (typeof caches !== "undefined") {
			const cache = await caches.open("train-schedule");
			// Simpan hasil request ke dalam cache untuk digunakan di masa mendatang.
			cache.put(
				`${API_URL}?stationid=${stationid}&timefrom=${TIME_FROM}&timeto=${TIME_TO}`,
				response.clone(),
			);
		}

		// Kembalikan hasil permintaan dalam bentuk json.
		return response.json();
	}
	function addMinutesToTimeString(timeString, minutes) {
		let [hours, mins] = timeString.split(":").map(Number); // Menghilangkan detik
		mins += minutes;
		if (mins >= 60) {
			hours += Math.floor(mins / 60);
			mins = mins % 60;
		}
		hours = hours % 24; // Menangani kasus di mana jam melewati tengah malam
		return `${hours.toString().padStart(2, "0")}:${mins
			.toString()
			.padStart(2, "0")}`;
	}

	function subtractMinutesFromTimeString(timeString, minutes) {
		let [hours, mins] = timeString.split(":").map(Number); // Menghilangkan detik
		mins -= minutes; // Pengurangan menit

		// Menangani kasus di mana pengurangan menit menghasilkan nilai negatif
		while (mins < 0) {
			hours--;
			mins += 60;
		}

		// Menangani kasus di mana jam menjadi negatif (sebelum tengah malam)
		if (hours < 0) {
			hours += 24;
		}

		// Format kembali ke string waktu
		return `${hours.toString().padStart(2, "0")}:${mins
			.toString()
			.padStart(2, "0")}`;
	}

	const fetchDataWithNearest = async (stationId, isArrival = false) => {
		let nearestStationId = stationId;
		let additionalMinutes = 0;

		// Atur stasiun terdekat dan menit tambahan
		if (stationId === "PL") {
			nearestStationId = "SK";
			additionalMinutes = 6;
		} else if (stationId === "YK") {
			nearestStationId = "LPN";
			additionalMinutes = 6;
		}

		const response = await fetchData(nearestStationId);

		// Pastikan bahwa data berupa array sebelum memprosesnya
		if (!Array.isArray(response.data)) {
			response.data = [];
		}

		// Modifikasi waktu estimasi berdasarkan konteks kedatangan atau keberangkatan
		const modifiedData = response.data.map((train) => {
			if (additionalMinutes > 0) {
				train.time_est = isArrival
					? addMinutesToTimeString(train.time_est, additionalMinutes)
					: subtractMinutesFromTimeString(
							train.time_est,
							additionalMinutes,
					  );

				train.time_est = train.time_est.substring(0, 5); // Menghilangkan detik jika ada
			}
			return train;
		});

		return modifiedData;
	};

	function formatTimeHHMM(timeString) {
		return timeString.substring(0, 5);
	}
	// Fungsi untuk memperbarui URL dengan parameter keberangkatan dan kedatangan
	function updateUrlParams(departureId, arrivalId) {
		// Construct the new URL using template literals and the provided IDs
		const newUrl = `/?departure=${departureId}&arrival=${arrivalId}`;

		// Use the goto function to navigate to the new URL
		goto(newUrl, { replaceState: true });
	}

	// Jalankan fungsi ini setiap kali nilai departureStationId atau arrivalStationId berubah
	$: if (departureStationId && arrivalStationId) {
		updateUrlParams(departureStationId, arrivalStationId);
	}

	// Fungsi untuk memperbarui jadwal kereta api
	const updateSchedules = async () => {
		// Menggunakan fetchDataWithNearest yang mengembalikan array langsung
		const departSchedules = await fetchDataWithNearest(
			departureStationId,
			false,
		);

		// Menandai bahwa ini adalah jadwal kedatangan (isArrival = true)
		const arriveSchedules = await fetchDataWithNearest(
			arrivalStationId,
			true,
		);

		// Temukan indeks stasiun keberangkatan dan kedatangan dari daftar stasiun
		// Di manapun Anda menggunakan stationIDs untuk mendapatkan indeks atau membandingkan ID
		const departureIndex = stationIDs.findIndex(
			(s) => s.id === departureStationId,
		);
		const arrivalIndex = stationIDs.findIndex(
			(s) => s.id === arrivalStationId,
		);

		let routeDirection;
		if (departureIndex < arrivalIndex) {
			routeDirection = "YOGYAKARTA-PALUR";
		} else {
			routeDirection = "PALUR-YOGYAKARTA";
		}

		// Filter jadwal berdasarkan arah rute
		let filteredDepartSchedules = departSchedules.filter((train) =>
			train.route_name.includes(routeDirection),
		);

		// Buat objek pencarian untuk data kedatangan menggunakan train_id
		let arriveLookup = {};
		arriveSchedules.forEach((train) => {
			arriveLookup[train.train_id] = {
				...train,
				time_est: formatTimeHHMM(train.time_est),
			};
		});
		updateUrlParams(departureStationId, arrivalStationId);

		// Gabungkan jadwal keberangkatan dengan data kedatangan yang sesuai
		schedules = filteredDepartSchedules.map((train) => {
			train.time_est = formatTimeHHMM(train.time_est);

			if (arriveLookup[train.train_id]) {
				return {
					...train,
					arrive_time: formatTimeHHMM(
						arriveLookup[train.train_id].time_est,
					),
				};
			}
			// Kembalikan data kereta apa adanya jika tidak ada data kedatangan yang cocok
			return train;
		});
	};

	// Jalankan fungsi updateSchedules saat komponen dipasang
	// Fungsi untuk mengambil nilai parameter dari URL
	function getQueryParam(param) {
		return new URLSearchParams(window.location.search).get(param);
	}
	function shuffleStations() {
		// Tukar nilai antara departure dan arrival
		let temp = departureStationId;
		departureStationId = arrivalStationId;
		arrivalStationId = temp;

		// Pastikan untuk memperbarui URL dan jadwal setelah tukar nilai
		updateUrlParams(departureStationId, arrivalStationId);
		updateSchedules();
	}

	// Jalankan saat komponen dipasang
	onMount(() => {
		loadFavorites(); // Memuat favorit dari local storage

		// Mengambil nilai parameter dari URL
		const departureParam = getQueryParam("departure");
		const arrivalParam = getQueryParam("arrival");

		// Jika ada, gunakan nilai tersebut untuk mengatur state
		if (departureParam) departureStationId = departureParam;
		if (arrivalParam) arrivalStationId = arrivalParam;

		// Kemudian perbarui jadwal
		updateSchedules();
	});

	import { goto } from "$app/navigation";

	function goToFavorite(favorite) {
		if (favorite.departure && favorite.arrival) {
			// Update the departure and arrival station IDs
			departureStationId = favorite.departure;
			arrivalStationId = favorite.arrival;

			// Update the URL
			goto(
				`/?departure=${favorite.departure}&arrival=${favorite.arrival}`,
			);

			// Update the schedules to reflect the new favorite selection
			updateSchedules();
		}
	}
	import { Button } from "$lib/components/ui/button";
	import * as Table from "$lib/components/ui/table";
</script>

<div
	class="w-full bg-white max-w-xl mx-auto variant-soft-primary p-8 rounded-lg shadow-md"
>
	<div class="flex flex-wrap text-slate-700 gap-5 mb-6">
		<div class="w-full space-y-5 px-3">
			<label
				class="pb-30 text-xl font-bold tracking-tight"
				for="departure-select"
			>
				Berangkat Dari:
			</label>
			<div class="relative">
				<div
					class="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2"
				>
					<div class="i-tabler-train text-slate-800 border-5" />
				</div>
				<select
					id="departure-select"
					class="font-bold text-slate-800 appearance-none block w-full border border-gray-200 rounded py-3 pl-[calc(2rem+10px)] pr-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
					bind:value={departureStationId}
					on:change={updateSchedules}
					aria-label="Stasiun keberangkatan"
				>
					<option value="" disabled selected
						>{departureStationId
							? "Pilih Stasiun Keberangkatan"
							: "Silakan Pilih Tempat Keberangkatan"}</option
					>
					{#each stationIDs as station (station.id)}
						<option class="font-bold" value={station.id}
							>{station.label}</option
						>
					{/each}
				</select>
			</div>
		</div>

		<div class="w-full space-y-5 px-3">
			<label
				class=" text-xl font-bold tracking-tight"
				for="arrival-select"
			>
				Menuju Ke:
			</label>

			<div class="relative">
				<div
					class="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2"
				>
					<div class="i-tabler-home text-slate-800 border-5" />
				</div>
				<select
					id="arrival-select"
					class="font-bold text-slate-800 appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 pl-[calc(2rem+10px)] pr-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
					bind:value={arrivalStationId}
					on:change={updateSchedules}
					aria-label="Stasiun tujuan"
				>
					<option value="" disabled selected
						>{arrivalStationId
							? "Pilih Stasiun Tujuan"
							: "Silakan Pilih Tempat Tujuan"}</option
					>

					{#each stationIDs as station (station.id)}
						<option class="font-bold" value={station.id}
							>{station.label}</option
						>
					{/each}
				</select>
			</div>
		</div>

		<div
			class="w-fit flex flex-wrap gap-5 mx-auto justify-left text-center text-slate-700"
		>
			<Button
				class="bg-secondary text-secondary-foreground hover:bg-secondary/80"
				on:click={toggleCurrentTime}
				aria-label="Perbarui waktu ke waktu saat ini"
			>
				<div class="i-tabler-train mr-3 text-gray-100" />

				{#if isCurrentTime}
					<span>Lihat Jadwal Hari Ini?</span>
				{:else}
					<span>Berangkat Sekarang?</span>
				{/if}
			</Button>
			<Button
				class="bg-secondary text-secondary-foreground hover:bg-secondary/80"
				on:click={saveToFavorites}
				type="button"
			>
				<div class="i-tabler-star-filled mr-3 text-gray-100" />
				<span>Favorit</span>
			</Button>
			<Button
				class="bg-secondary text-secondary-foreground hover:bg-secondary/80"
				on:click={shuffleStations}
			>
				<div class="i-tabler-exchange mr-3 text-gray-100" />

				Tukar Stasiun
			</Button>
		</div>
		{#if favorites.length > 0}
			<div
				class="w-fit space-y-5 mx-auto text-center text-slate-700 max-w-md"
			>
				<h4 class="scroll-m-20 text-xl font-bold tracking-tight">
					Tujuan Favorit
				</h4>
				<ul
					class="w-fit flex flex-wrap gap-5 mx-auto justify-left text-center text-slate-700"
				>
					{#each favorites as favorite}
						<Button
							on:click={() => goToFavorite(favorite)}
							class="flex gap-4"
						>
							<span>{favorite.departure}</span>
							<div
								class="i-tabler-arrows-left-right text-gray-700"
							/>
							<span>{favorite.arrival}</span>
						</Button>
					{/each}

					<Button
						type="button"
						class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						on:click={() => removeFromFavorites()}
					>
						Reset
					</Button>
				</ul>
			</div>
		{/if}
	</div>
	<div aria-label="Tabel jadwal kereta api">
		<Table.Root>
			<Table.Header class="bg-slate-200/50">
				<Table.Row>
					<Table.Head
						><div
							class="i-tabler-home text-slate-700"
						/></Table.Head
					>

					<Table.Head class="lg:w-[100px]">ID Kereta</Table.Head>
					<Table.Head>Dari {departureStationId}</Table.Head>
					<Table.Head>Sampai {arrivalStationId}</Table.Head>
					<Table.Head class="text-right">Rute</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each schedules as train}
					<Table.Row
						class={train.ka_name === "COMMUTER LINE YK"
							? "bg-white hover:text-slate-700 text-slate-800"
							: train.ka_name ===
							    "COMMUTER LINE YK (WEEKENDS ONLY)"
							  ? "bg-gray-500 font-bold text-slate-100"
							  : ""}
					>
						<Table.Cell class="font-medium"
							><div class="i-tabler-train" /></Table.Cell
						>
						<Table.Cell class="font-medium"
							>{train.train_id || "-"}</Table.Cell
						>
						<Table.Cell>{train.time_est || "-"}</Table.Cell>
						<Table.Cell>{train.arrive_time || "-"}</Table.Cell>
						<Table.Cell class="text-right"
							>{train.route_name || "-"}</Table.Cell
						>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="pb-5 py-7 space-y-2">
		<p class="leading-7 [&:not(:first-child)]:mt-6">

			Data jadwal kereta ini dikompilasi dari API resmi
			<a
				class="text-slate-700 font-extrabold decoration-underline"
				href="https://commuterline.id/perjalanan-krl/jadwal-kereta"
				target="_blank">Commuterline Indonesia</a
			>. Kami berusaha keras menyajikan informasi yang akurat dan terkini.
			Namun, perlu diperhatikan bahwa mungkin ada selisih waktu 2-5 menit
			dalam jadwal yang disajikan.
		</p>

		<p class="leading-7 [&:not(:first-child)]:mt-6">

			Untuk memastikan Anda tidak ketinggalan kereta, kami menyarankan
			untuk tiba di stasiun setidaknya 5-10 menit sebelum waktu
			keberangkatan yang tercantum. Jika Anda menemukan ketidaksesuaian
			dalam jadwal, atau mengalami masalah teknis di situs web,
			<a
				class="text-slate-700 font-extrabold decoration-underline"
				href="https://twitter.com/intent/tweet?screen_name=sarbeh_&text=Maaf,%20saya%20menemukan%20kesalahan%20pada%20jadwal%20berikut:%20(detail%20kesalahan)%20atau%20ada%20masalah%20teknis%20di%20website."
				target="_blank">beritahu kami di Twitter</a
			>. Umpan balik Anda sangat berharga untuk membantu kami memperbaiki
			dan meningkatkan kualitas layanan kami.
		</p>
	</div>
</div>
