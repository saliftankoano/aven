import { NextResponse } from "next/server";
import { env } from "@/lib/env";
/**
 * @fileoverview
 * @description Book a call with the Aven team
 * @param {Object} request - The request object
 * @param {string} request.name - The name of the person booking the call
 * @param {string} request.email - The email of the person booking the call
 * @param {string} request.phone - The phone number of the person booking the call
 * @param {string} request.bookingReason - The reason for the booking
 * @param {string} request.desiredSlot - The desired slot for the call
 * @returns {Object} - The response object containing data and error
 * @returns {Object} response.data - The data of the response
 * @returns {string} response.error - The error of the response
 */

export async function POST(request: Request): Promise<Response> {
  const calApiKey = env.CAL_API_KEY;
  const eventTypeId = 2032276;
  const { name, email, phone, bookingReason, desiredSlot } =
    await request.json();

  try {
    const response = await fetch(`https://api.cal.com/v2/bookings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${calApiKey}`,
        "Content-Type": "application/json",
        "cal-api-version": "2024-08-13",
      },
      body: JSON.stringify({
        start: desiredSlot,
        attendee: {
          name,
          email,
          timeZone: "America/New_York",
          phoneNumber: phone,
          language: "en",
        },
        bookingFieldsResponses: {
          booking_reason: bookingReason,
        },
        eventTypeId: eventTypeId,
      }),
    });

    const data = await response.json();

    return NextResponse.json(
      { data, error: null },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { data: null, error: error as string },
      {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
