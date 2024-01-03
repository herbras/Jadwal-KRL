<script lang="ts">
	import Schedule from "$lib/Schedule.svelte";
	import { page } from "$app/stores";

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

	let title = "Jadwal Kereta Yogyakarta-Palur Sat-Set";
	let description =
		"Lengkap dengan jadwal kereta dari Yogyakarta ke Palur. Informasi terpercaya untuk perjalanan Anda sehari-hari. Jadwal terupdate, cepat, dan akurat.";

	function findStationLabel(id) {
		const station = stationIDs.find((station) => station.id === id);
		return station ? station.label : "";
	}

	$: {
		const departureParam = $page.url.searchParams.get("departure");
		const arrivalParam = $page.url.searchParams.get("arrival");
		const departureStationLabel = findStationLabel(departureParam);
		const arrivalStationLabel = findStationLabel(arrivalParam);

		// Update judul dan deskripsi jika parameter ada
		if (departureStationLabel && arrivalStationLabel) {
			title = `Jadwal KRL ${departureStationLabel} ke ${arrivalStationLabel}`;
			description = `Cari tahu jadwal kereta, informasi tarif, dan tips perjalanan dari ${departureStationLabel} ke ${arrivalStationLabel}. Dapatkan informasi perjalanan terkini dan akurat.`;
		}
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>
<section
	class="relative bg-cover bg-center bg-no-repeat"
	style="background-image: url(./KRL4.webp);"
>
	<div
		class="absolute inset-0"
		style="background: linear-gradient(45deg, rgba(179, 217, 255, 0.7) 20%, rgba(128, 191, 255, 0.7) 50%, rgba(77, 166, 255, 0.7) 72%)"
	></div>

	<div
		class="flex relative flex-col items-center justify-center min-h-screen pt-2 pb-12 dark:text-slate-800"
		role="main"
	>
		<div class="w-full" style="--radius: 0.5rem;">
			<div
				class="preview flex min-h-[150px] w-full justify-center p-5 items-center"
				style=""
			>
				<h1
					class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
				>
					{title}
				</h1>
			</div>
		</div>
		<Schedule />
	</div>
</section>

