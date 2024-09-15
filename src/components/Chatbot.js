import React, { useState } from "react";
import './Chatbot.css'; // Import the CSS file
import chatbotIcon from '../chatbot-icon.png';

const intents = [
  {
    patterns: ["how to register", "register", "signup", "get started"],
    response: "To register, click 'Get Started' and choose your role as either a Mentor or Mentee.",
  },
  {
    patterns: ["how to go to mentor signup", "mentor signup"],
    response: "To sign up as a mentor, go to 'Get Started', select the Mentor role, and fill in your details.",
  },
  {
    patterns: ["can i add resume as proof id", "resume proof id","resume","collegeid"],
    response: "Yes, you can add your resume as proof ID during registration.",
  },
  {
    patterns: ["can i register without making it a pdf", "non-pdf resume"],
    response: "Please make your resume a PDF before registering.",
  },
  {
    patterns: ["how the test is conducted", "test process", "mentor test"],
    response: "The test will be conducted by your assigned mentor.",
  },
  {
    patterns: ["hello", "hi", "hey", "greetings"],
    response: "Hello! How can I assist you today?",
  },
  {
    patterns: ["how to choose my mentor", "mentor selection", "choose mentor"],
    response: "Based on your area of interest, mentors are assigned to match your preferences. If you need more guidance, please provide your area of interest.",
  },
];

const getResponse = (input) => {
  const message = input.toLowerCase().trim(); // Normalize input

  for (const intent of intents) {
    if (intent.patterns.some(pattern => message.includes(pattern))) {
      return intent.response;
    }
  }

  return "I'm sorry, I don't understand your question. Could you rephrase?";
};

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you today?", fromBot: true },
  ]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, fromBot: false };
    setMessages([...messages, userMessage]);

    const botResponse = getResponse(input);

    setTimeout(() => {
      const botMessage = { text: botResponse, fromBot: true };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 500);

    setInput(""); // Clear the input field
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen); // Toggle chat visibility
  };

  return (
    <div className="chatbot-container">
      {/* Chatbot Toggle Icon */}
      <img
        src={chatbotIcon}
        alt="Chatbot Icon"
        className="chatbot-icon"
        onClick={toggleChat}
      />

      {/* Chatbot UI */}
      {isChatOpen && (
        <div className="chatbot-box">
          <h2 className="chatbot-header">Chatbot</h2>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatbot-message ${
                  msg.fromBot ? "chatbot-message-bot" : "chatbot-message-user"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className="chatbot-input"
          />
          <button onClick={handleSendMessage} className="chatbot-button">
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
