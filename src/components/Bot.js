import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function Bot() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => setUserInput(e.target.value);

  const curriculumSummary = {
    "1stSem": ["Mathematics", "Physics", "Chemistry", "Programming", "Basic Electrical"],
    "2ndSem": ["Mathematics", "Data Structures", "Discrete Maths", "Engineering Drawing", "Digital Electronics"],
  };

  const handleAskQuestion = async () => {
    const prompt = `
      I am your assistant developed to answer MSBTE syllabus and polytechnic-related questions.
      Key topics you can refer to include:
      ${Object.entries(curriculumSummary)
        .map(([sem, subjects]) => `${sem}: ${subjects.join(', ')}`)
        .join('\n')}
      
      Question: ${userInput}
    `;

    setIsLoading(true);
    try {
      const result = await model.generateContent({ prompt });
      const responseText = result?.text || "No response found."; // Adjust based on actual API response format
      setResponse(responseText);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setResponse('Sorry, I couldn’t get an answer. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-container">
      <div className="question-container">
        <p>Have syllabus doubts? Let’s solve them!</p>
        <input
          placeholder="Ask your question about MSBTE syllabus here..."
          className="input"
          type="text"
          value={userInput}
          onChange={handleInputChange}
        />
        <button className="button" onClick={handleAskQuestion}>
          {isLoading ? 'Loading...' : 'Ask'}
        </button>
      </div>
      <div className="answer-container">
        <p><strong>You:</strong> {userInput}</p>
        <p><strong>PolyMate:</strong> {response || 'Awaiting your question...'}</p>
      </div>
    </div>
  );
}
