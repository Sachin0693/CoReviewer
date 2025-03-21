import { useState, useEffect } from 'react';
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios';
import { FaSun, FaMoon } from 'react-icons/fa';
import './App.css';

function App() {
  const [code, setCode] = useState('');
  const [review, setReview] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    const response = await axios.post('http://localhost:3000/ai/get-review', { code });
    setReview(response.data);
  }

  return (
    <div className={darkMode ? "dark" : "light"}>
      <nav className="navbar">
        <div className="logo">CoReviewer</div>
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </nav>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: 'Fira Code, monospace',
                fontSize: 16,
                color: 'white',
                borderRadius: "5px",
                height: "100%",
                width: "100%",
                overflow:scroll
              }}
            />
          </div>
          <div onClick={reviewCode} className="review">Review</div>
        </div>
        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </main>
    </div>
  );
}

export default App;
