// pages/api/fetchBooks.ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { subject, maxResults = 12 } = req.query;

  // Validate query parameters
  if (!subject || typeof subject !== "string") {
    return res.status(400).json({
      error: true,
      message: "No valid 'subject' provided in query params",
    });
  }

  if (isNaN(Number(maxResults)) || Number(maxResults) < 1 || Number(maxResults) > 40) {
    return res.status(400).json({
      error: true,
      message: "'maxResults' must be a number between 1 and 40",
    });
  }

  // Validate environment variables
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_URL;

  if (!apiKey || !apiUrl) {
    return res.status(500).json({
      error: true,
      message: "Missing API configuration (API key or base URL)",
    });
  }

  // Construct Google Books API URL with query parameters
  const gbooksReqParams = new URLSearchParams({
    q: `subject:${subject}`,
    key: apiKey,
    printType: "books",
    startIndex: "0",
    maxResults: maxResults.toString(),
    langRestrict: "en",
  });

  const requestUrl = `${apiUrl}?${gbooksReqParams}`;

  try {
    // Fetch data from Google Books API
    const response = await fetch(requestUrl);

    if (!response.ok) {
      // Log error details for debugging
      console.error("Google Books API error response:", await response.json());
      throw new Error(`Google Books API error: ${response.statusText}`);
    }

    const booksData = await response.json();

    // Return books data
    res.status(200).json({
      data: booksData.items || [],
      totalItems: booksData.totalItems || 0,
    });
  } catch (error: unknown) {
    console.error("Server error:", error);

    if (error instanceof Error) {
      res.status(500).json({
        error: true,
        message: error.message || "Internal Server Error",
      });
    } else {
      res.status(500).json({
        error: true,
        message: "Unknown error occurred",
      });
    }
  }
}
