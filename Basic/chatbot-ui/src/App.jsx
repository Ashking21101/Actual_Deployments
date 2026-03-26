import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("https://xpbtc2igsj.ap-south-1.awsapprunner.com/chat", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      const botMessage = { role: "bot", text: data.bot_response };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
    }

    setInput("");
  };

  return (
    <div style={styles.container}>
      <h2>💬 AI Chatbot</h2>

      <div style={styles.chatBox}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              ...styles.message,
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              background: msg.role === "user" ? "#007bff" : "#444",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div style={styles.inputBox}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button style={styles.button} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    fontFamily: "Arial",
    textAlign: "center",
  },
  chatBox: {
    display: "flex",
    flexDirection: "column",
    height: "400px",
    border: "1px solid #ccc",
    padding: "10px",
    overflowY: "auto",
    marginBottom: "10px",
  },
  message: {
    padding: "10px",
    borderRadius: "10px",
    margin: "5px",
    color: "white",
    maxWidth: "70%",
  },
  inputBox: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
  },
  button: {
    padding: "10px 20px",
  },
};

export default App;