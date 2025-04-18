// src/components/ChatbotPanel.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const ChatbotPanel = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Slide open on mount
    const timer = setTimeout(() => setIsOpen(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const askAI = async () => {
    setResponse('Thinking...');
    try {
        console.log(question);
      const res = await axios.post('http://localhost:5000/ask', { question });
      console.log(res.data.answer);
      setResponse(res.data.answer);
    } catch (err) {
      setResponse(err.response?.data?.message || 'Error connecting to server.');
    }
  };

  return (
    <div className='parent-container'>
    <div className={`chat-panel ${isOpen ? 'open' : ''}`}>
      <h2>How may I help you?</h2>
      <input
        type="text"
        placeholder="Type your health question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && askAI()}
      />
      <button onClick={askAI}>Ask</button>
      <div className="response">{response}</div>
    </div>
    </div>
  );
};

export default ChatbotPanel;