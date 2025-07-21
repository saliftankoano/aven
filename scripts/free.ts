/**
 * @fileoverview
 * @description Provide the next available free slot for the Aven team
 * @returns {string} - The next available free slot
 */
import { env } from "@/lib/env";

interface FreeResponse {
  data: {
    [date: string]: {
      [time: string]: string;
    };
  } | null;
  error: string | null;
}
async function free(): Promise<FreeResponse> {
  const calApiKey = env.CAL_API_KEY;
  const eventTypeId = "2032276";

  // Prepare the date range for the next 30 days
  const today = new Date().toISOString();
  const thirtyDaysFromNow = new Date(
    Date.now() + 30 * 24 * 60 * 60 * 1000
  ).toISOString();

  // First get available slots based on the event type id for the next 30 days
  const slotsResponse = await fetch(
    `https://api.cal.com/v2/slots?eventTypeId=${eventTypeId}&start=${today}&end=${thirtyDaysFromNow}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${calApiKey}`,
        "Content-Type": "application/json",
        "cal-api-version": "2024-09-04",
      },
    }
  );

  const slots = await slotsResponse.json();
  const availableDates = Object.keys(slots.data);

  // If no slots are available, return an error
  if (availableDates.length === 0) {
    console.log("No slots available");
    return { data: null, error: "No slots available" } as FreeResponse;
  }

  // return all available slots
  console.log(slots.data);
  return { data: slots.data, error: null } as FreeResponse;
}

free();
