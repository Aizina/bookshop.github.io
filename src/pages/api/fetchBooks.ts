// pages/api/fetchBooks.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { subject, maxResults } = req.query;

  if (!subject) {
    return res.status(400).json({
      error: true,
      message: "No subject provided in query params",
    });
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_URL;


  const gbooksReqParams = new URLSearchParams({
    q: `subject:${subject}` as string,
    key: apiKey as string,
    printType: "books" as string,
    startIndex: '0' as string,
    maxResults: `${maxResults}` as string,
    langRestrict: "en" as string,
  });

  try {
    const response = await fetch(`${apiUrl}?${gbooksReqParams}`);
    if (!response.ok) {
      throw new Error(`Google Books API error: ${response.statusText}`);
    }
    console.log()
    const booksData = await response.json();
    res.status(200).json({
      data: booksData.items || [],
      totalItems: booksData.totalItems || 0,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        error: true,
        message: error.message || "Internal Server Error",
      });
    } else {
      res.status(500).json({
        error: true,
        message: "Internal Server Error",
      });
    }
  }
}


 
