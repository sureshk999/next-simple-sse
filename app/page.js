"use client"

import React, { useEffect, useState } from 'react';

export default function Test() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3005/events');
    eventSource.onmessage = (event) => {
      const message = event.data;
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>Server Side Events</h1>
      <p>This is a simple page to display server side events</p>
      <br />
      <p>If it is working properly then you should see a sequence of messages displayed below</p>
      <br />
      {messages.map((msg, index) => (
        <p key={index}>{msg}</p>
      ))}
    </div>
  );
}
