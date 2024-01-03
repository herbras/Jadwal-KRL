	// Daftar ID stasiun
	const stationIDs = [
		"YK",
		"LPN",
		"MGW",
		"BBN",
		"SWT",
		"KT",
		"CE",
		"DL",
		"GW",
		"PWS",
		"SLO",
		"SK",
		"PL",
	];
	// pake pojok ke pojok eror mulu

	// URL API untuk mengambil jadwal kereta api
	const API_URL = "https://api-partner.krl.co.id/krlweb/v1/schedule";

	// Waktu mulai dan selesai untuk jadwal kereta api
	// Kenapa jam 1 ampe 11 malam? karena untuk ngambil semua datanya

	const TIME_TO = "23:00";

	let TIME_FROM = "01:00";
    
export async function fetchData(stationid) {
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