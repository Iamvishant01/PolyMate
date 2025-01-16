import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function Bot() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');  // State to store AI's response
  const [isLoading, setIsLoading] = useState(false);  // State to track loading status

  const handleInputChange = (e) => {
    setUserInput(e.target.value);  // Save user input to the state
  };
  const curriculum = {
    "1stSem": {
      "AppliedMathematicsI": ["Mathematical Functions", "Differentiation", "Integration", "Linear Algebra"],
      "ComputerProgramming": ["Intro to Computers", "C Basics", "Control Structures", "Functions & Arrays"],
      "EngineeringPhysics": ["Mechanics", "Waves & Optics", "Electricity & Magnetism", "Semiconductor Physics"],
      "EngineeringChemistry": ["Water Chemistry", "Organic Chemistry", "Industrial Chemistry", "Environmental Chemistry"],
      "BasicElectricalEngineering": ["DC Circuits", "AC Circuits", "Electric Machines", "Transformers"],
      "EnglishCommunication": ["Grammar", "Writing Skills", "Listening Skills", "Oral Communication"]
    },
    "2ndSem": {
      "AppliedMathematicsII": ["Differential Equations", "Fourier Transforms", "Probability", "Vector Analysis"],
      "ComputerOrganization": ["Computer Org", "ALU", "Control Unit", "Memory & I/O"],
      "DataStructures": ["Intro to Data Structures", "Arrays & Linked Lists", "Stacks & Queues", "Searching & Sorting"],
      "DiscreteMathematics": ["Set Theory", "Logic & Proofs", "Graph Theory", "Combinatorics"],
      "DigitalElectronics": ["Number Systems", "Boolean Algebra", "Circuits", "Flip-Flops"],
      "EngineeringDrawing": ["Geometrical Constructions", "Projection", "Sectional Views", "Isometric Drawing"]
    },
    "3rdSem": {
      "ObjectOrientedProgramming": ["OOP Concepts", "Classes & Objects", "Inheritance & Polymorphism", "Exception Handling"],
      "OperatingSystems": ["OS Concepts", "Process Management", "Memory Management", "File Systems"],
      "DatabaseSystems": ["DB Concepts", "SQL", "Normalization", "Transactions & Concurrency"],
      "ComputerNetworks": ["Protocols", "Networking Devices", "Routing", "Network Security"],
      "Microprocessors": ["8085", "Assembly Programming", "Interrupts", "8051 Microcontroller"],
      "EnvironmentalStudies": ["Environmental Awareness", "Natural Resources", "Pollution Control", "Sustainable Development"]
    },
    "4thSem": {
      "DataCommunication": ["Transmission Media", "Modulation", "Error Detection", "Protocols"],
      "SoftwareEngineering": ["SDLC", "Design", "Testing", "Quality Metrics"],
      "WebTechnologies": ["HTML, CSS, JS", "Web Frameworks", "Server-Side Scripting", "Databases in Web"],
      "ComputerGraphics": ["Graphics Fundamentals", "Graphics Transformation", "2D & 3D Systems", "Rendering"],
      "Algorithms": ["Introduction", "Divide & Conquer", "Greedy", "Dynamic Programming"],
      "IndustrialManagement": ["Management", "Product Design", "Marketing", "Entrepreneurship"]
    },
    "5thSem": {
      "MobileDevelopment": ["Mobile Dev Intro", "UI/UX", "Android Basics", "Cloud Integration"],
      "CloudComputing": ["Cloud Intro", "Virtualization", "Cloud Models", "Cloud Security"],
      "AdvancedDataStructures": ["Graphs & Trees", "Searching Techniques", "Heaps", "Dynamic Programming"],
      "EthicalHacking": ["Cyber Security", "Ethical Hacking", "Cryptography", "Security Policies"],
      "AIandML": ["AI Basics", "Machine Learning", "Supervised & Unsupervised", "Neural Networks"],
      "ProjectWork": ["Based on selected project"]
    },
    "6thSem": {
      "IoT": ["IoT Intro", "IoT Architectures", "Sensors & Actuators", "Applications"],
      "SystemSoftware": ["Assembler", "Linker", "Compiler Parsing", "Optimization"],
      "BigDataAnalytics": ["Big Data Intro", "Hadoop", "Data Analysis", "Real-Time Data"],
      "AdvancedWebTech": ["HTML5, CSS3", "Web Services", "JS Frameworks", "Web Security"],
      "SoftwareProjectManagement": ["Planning", "Risk Management", "Quality Assurance", "Agile & Scrum"],
      "Internship": ["Industry Projects"]
    }
  };
  
  const handleAskQuestion = async () => {
    const prompt = "i am going to use ask you questions realated to MSBTE syllabus and polytechnic studies , this is the points you can refer"+curriculum+"and if dont get the answer from refer points you can use your own knowledge regarding to topic or MSBTE Syllabus and polytechnic, and your developed by Vishant Netke with the help of Google api and my question is "+userInput;
    setIsLoading(true);  // Set loading state to true
    try {
      const result = await model.generateContent(prompt);  // Send the user input to the AI model
      const responseText = result.response.text();  // Get the response text
      setResponse(responseText);  // Set the AI response to state
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setResponse('Sorry, I couldn’t get an answer. Please try again.');  // Fallback error message
    } finally {
      setIsLoading(false);  // Set loading state to false when request completes
    }
  };

  return (
    <div className="main-container">
      <div className="question-container">
        <p>Have syllabus doubts? Let’s solve them !</p>
        <input
          placeholder="Jisne aaj tak notes nahi likha, kya wo bhi syllabus khatam kar sakta hai?"
          className="input"
          type='text'
          value={userInput}  // Bind input to the state variable
          onChange={handleInputChange}  // Update state when input changes
        />
        <button className="button" onClick={handleAskQuestion}>Ask</button> {/* Trigger AI response */}
      </div>
      <div className="answer-container">
        {"You : " + userInput} {/* Show the user's input in real-time */}
        <br />
        <br />
        {"PolyMate : "}
        {isLoading ? 'Loading...' : response} {/* Show loading text while waiting for response */}
      </div>
    </div>
  );
}
