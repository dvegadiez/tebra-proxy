import { CalendarData } from "../types/tebra";

function parseUTCDate(s: string): Date {
  const [datePart, timePart, ampm] = s.split(" ");
  const [M, D, Y] = datePart.split("/").map(Number);
  let [h, m, sec] = timePart.split(":").map(Number);
  if (ampm === "PM" && h < 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return new Date(Date.UTC(Y, M - 1, D, h, m, sec));
}

function formatTimeSlot(d: Date) {
  const pad = (n: number) => n.toString().padStart(2, "0");
  const hh = pad(d.getUTCHours()), mm = pad(d.getUTCMinutes());
  return (`${hh}:${mm}`) ;
}

export function getAvailability(
  appointments: CalendarData[],
) {
  const updated = {  } ;

  for (const appt of appointments) {
    const start = parseUTCDate(appt.startDate);
    const end   = parseUTCDate(appt.endDate);

    let cursor = start;
    while (cursor < end) {
      const slot = formatTimeSlot(cursor);
      updated[slot] = true;  
      cursor = new Date(cursor.getTime() + 30 * 60_000);
    }
  }

  return updated;
}
