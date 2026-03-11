import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

let portfolioContext = "";
let initialized = false;
let genAI: InstanceType<typeof GoogleGenerativeAI> | null = null;

async function initRag() {
  if (initialized) return;

  try {
    if (!process.env.GOOGLE_API_KEY) {
      console.error("GOOGLE_API_KEY is not set. RAG initialization skipped.");
      return;
    }

    console.log("Initializing RAG Pipeline...");

    genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    // Read portfolio documents
    const resumePath = path.join(process.cwd(), "public", "resume.pdf");
    const indexPath = path.join(process.cwd(), "src", "app", "page.tsx");

    let portfolioText = "";

    // Try to parse resume PDF if it exists
    if (fs.existsSync(resumePath)) {
      try {
        const pdfParse = (await import("pdf-parse")).default;
        const dataBuffer = fs.readFileSync(resumePath);
        const pdfData = await pdfParse(dataBuffer);
        portfolioText +=
          "--- Vaibhav's Resume ---\n" + pdfData.text + "\n\n";
      } catch (err) {
        console.error("Error parsing resume PDF:", err);
      }
    }

    // Fallback context if no documents found
    if (!portfolioText) {
      portfolioText = `Vaibhav Ghoshi is a Full Stack Developer skilled in C++, JavaScript, React, Node.js, and more.
He has experience with HTML5, CSS3, Tailwind CSS, Bootstrap, MongoDB, Supabase, and Git.
He builds projects including Flying Modi Game, DSA with C++, Notification Popup UI, Git Project Tools, and various web development projects.
He is passionate about problem solving, open source contributions, and web development.
Contact: vaibhav7290119@gmail.com
GitHub: github.com/Classyvaibhav06
LinkedIn: linkedin.com/in/vaibhav-ghoshi`;
    }

    portfolioContext = portfolioText;
    initialized = true;
    console.log("RAG Pipeline initialized successfully!");
  } catch (err) {
    console.error("Error initializing RAG:", err);
  }
}

// Simple retry with exponential backoff
async function callWithRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (err: unknown) {
      const error = err as { status?: number; message?: string };
      const isRateLimit =
        error.status === 429 ||
        (error.message &&
          error.message.includes("Resource has been exhausted"));
      if (isRateLimit && i < maxRetries - 1) {
        const delay = Math.pow(2, i + 1) * 1000;
        console.log(`Rate limited, retrying in ${delay / 1000}s...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw err;
      }
    }
  }
  throw new Error("Max retries exceeded");
}

export async function handleChat(query: string): Promise<string> {
  await initRag();

  if (!initialized || !genAI) {
    return "I'm currently offline or missing API keys. Please try again later or contact Vaibhav directly!";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are Vaibhav Ghoshi's personal portfolio AI assistant.
Your job is to answer questions about Vaibhav, his skills, experience, projects, and website based ONLY on the following context.
If you do not know the answer based on the context, say so politely. Be friendly, energetic, and professional. Keep your answers concise unless asked for details.

Context:
${portfolioContext}

User Question: ${query}
Answer:`;

    const result = await callWithRetry(() => model.generateContent(prompt));
    const response = result.response;
    return response.text();
  } catch (err: unknown) {
    const error = err as { message?: string };
    console.error("Error during chat:", error.message || err);
    if (
      error.message &&
      error.message.includes("Resource has been exhausted")
    ) {
      return "I'm a bit overwhelmed right now (rate limit reached). Please wait a minute and try again! 🙏";
    }
    return "Oops! I encountered an error while trying to answer that. Please try again.";
  }
}
