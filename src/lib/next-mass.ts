import type { MassSchedule } from "@/types/database";

/**
 * Menentukan misa terjadwal berikutnya dari daftar jadwal.
 *
 * `day_label` adalah teks bebas yang diisi admin, jadi bentuknya beragam:
 * "Minggu", "Senin - Kamis", "Jumat Pertama", "3rd Saturday". Parser ini
 * SENGAJA hanya menangani hari tunggal dan rentang hari yang eksplisit.
 *
 * Label bersyarat seperti "Jumat Pertama" atau "3rd Saturday" tidak ikut
 * dihitung: menebaknya berarti berisiko menampilkan jam misa yang salah, dan
 * umat yang datang di hari keliru jauh lebih buruk daripada tidak melihat
 * panel ini sama sekali. Jadwal semacam itu tetap tampil di grid lengkap.
 */

const DAY_INDEX: Record<string, number> = {
  minggu: 0,
  senin: 1,
  selasa: 2,
  rabu: 3,
  kamis: 4,
  jumat: 5,
  "jum'at": 5,
  sabtu: 6,
};

/** Label yang mengandung kata-kata ini bersyarat — lewati, jangan ditebak. */
const CONDITIONAL = /\b(pertama|kedua|ketiga|keempat|terakhir|1st|2nd|3rd|4th|last)\b/i;

const SEPARATOR = /\s*(?:-|–|—|s\/d|sampai|hingga)\s*/;

function normalize(raw: string): string {
  return raw.toLowerCase().replace(/\./g, "").trim();
}

/** Hari-hari (0=Minggu) yang dicakup sebuah label, atau [] bila tidak yakin. */
export function parseDayLabel(label: string): number[] {
  if (CONDITIONAL.test(label)) return [];

  const text = normalize(label);

  const single = DAY_INDEX[text];
  if (single !== undefined) return [single];

  const parts = text.split(SEPARATOR);
  if (parts.length === 2) {
    const from = DAY_INDEX[parts[0].trim()];
    const to = DAY_INDEX[parts[1].trim()];
    if (from !== undefined && to !== undefined) {
      const days: number[] = [];
      // Rentang boleh melewati akhir pekan, mis. "Sabtu - Senin".
      for (let i = 0, d = from; i < 7; i++, d = (d + 1) % 7) {
        days.push(d);
        if (d === to) break;
      }
      return days;
    }
  }

  return [];
}

/** Mengubah "05.30" / "05:30" / "17.00 WIB" menjadi menit sejak tengah malam. */
export function parseTime(raw: string): number | null {
  const match = raw.match(/(\d{1,2})[.:](\d{2})/);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return null;
  return hours * 60 + minutes;
}

/** Waktu Jakarta saat ini sebagai { day: 0-6, minutes: sejak tengah malam }. */
function jakartaNow(now: Date): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const weekdays: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  };

  // Intl mengembalikan "24" untuk tengah malam pada hour12:false.
  const hour = Number(get("hour")) % 24;

  return {
    day: weekdays[get("weekday")] ?? 0,
    minutes: hour * 60 + Number(get("minute")),
  };
}

export interface NextMass {
  schedule: MassSchedule;
  /** 0 = hari ini, 1 = besok, dst. */
  daysAhead: number;
  dayLabel: string;
}

const DAY_NAMES = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

/**
 * Misa terjadwal paling dekat dari sekarang, atau null bila tidak ada jadwal
 * yang bisa dipastikan harinya.
 */
export function getNextMass(
  schedules: MassSchedule[],
  now: Date = new Date()
): NextMass | null {
  const current = jakartaNow(now);

  let best: NextMass | null = null;
  let bestDistance = Infinity;

  for (const schedule of schedules) {
    const minutes = parseTime(schedule.time);
    if (minutes === null) continue;

    for (const day of parseDayLabel(schedule.day_label)) {
      let daysAhead = (day - current.day + 7) % 7;
      // Jadwal hari ini yang jamnya sudah lewat berarti minggu depan.
      if (daysAhead === 0 && minutes <= current.minutes) daysAhead = 7;

      const distance = daysAhead * 1440 + minutes - current.minutes;
      if (distance < bestDistance) {
        bestDistance = distance;
        best = {
          schedule,
          daysAhead,
          dayLabel:
            daysAhead === 0
              ? "Hari ini"
              : daysAhead === 1
                ? "Besok"
                : DAY_NAMES[day],
        };
      }
    }
  }

  return best;
}
