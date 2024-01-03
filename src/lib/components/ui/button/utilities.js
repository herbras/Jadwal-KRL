export function formatTimeHHMM(timeString) {
    return timeString.substring(0, 5);
}
export 	function addMinutesToTimeString(timeString, minutes) {
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