const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job description"),

    technicalQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ),

    behavioralQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ),

    skillGaps: z.array(
        z.object({
            skill: z.string(),
            severity: z.enum(["low", "medium", "high"])
        })
    ),

    preparationPlan: z.array(
        z.object({
            day: z.number(),
            focus: z.string(),
            tasks: z.array(z.string())
        })
    )
});

async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
}) {

    console.log("generateInterviewReport() CALLED");
    console.log("API KEY:", process.env.GOOGLE_GENAI_API_KEY?.slice(0, 15));
    console.log("MODEL USED:", "gemini-2.5-flash");

    const prompt = `
Analyze the candidate based on the provided resume, self description, and job description.

Resume:
${resume.slice(0, 3000)}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Return ONLY valid JSON in the following format:

{
  "matchScore": 90,
  "technicalQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": "Explain in detail how the candidate should answer."
    }
  ],
  "behavioralQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": "Explain in detail how the candidate should answer."
    }
  ],
  "skillGaps": [
    {
      "skill": "",
      "severity": "low"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "",
      "tasks": [
        ""
      ]
    }
  ]
}

Rules:

- Return ONLY raw JSON.
- Do NOT wrap JSON inside markdown.
- Do NOT return arrays of strings.
- Every array must contain JSON objects.
- No explanation.
- No extra text.
- Every answer field MUST contain at least 100 words.
- Never leave answer empty.
`;

    try {

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                // responseSchema: zodToJsonSchema(interviewReportSchema)
            }
        });


        console.log("========== RAW GEMINI RESPONSE ==========");
        console.log(response.text);
        console.log("=========================================");
        

        const parsed = JSON.parse(response.text);

      console.log("========== PARSED JSON ==========");
      console.log(JSON.stringify(parsed, null, 2));
      console.log("================================");

      return parsed;


    } catch (err) {

        console.log("========== GEMINI ERROR ==========");
        console.log(err);
        console.log("==================================");

        throw err;
    }
}

module.exports = generateInterviewReport;