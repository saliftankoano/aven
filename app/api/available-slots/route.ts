/**
 * @fileoverview
 * @description Provide the next available slots for 30 days for the Aven team
 * @returns {Object} - The response object
 * @returns {Object} response.data - The next available slots for 30 days
 */
import { env } from "@/lib/env";
import { NextResponse } from "next/server";

export async function GET(): Promise<Response> {
  try {
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

    if (availableDates.length === 0) {
      return NextResponse.json(
        {
          data: null,
          error: "No slots available",
        },
        { status: 400 }
      );
    }

    // return all available slots
    return NextResponse.json(
      {
        data: slots.data,
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: null, error: error as string },
      { status: 400 }
    );
  }
}
