import { type ChangeEventHandler, useState } from "react";
import MarkdownIt from "markdown-it";
import mditMathjax from "./mditMathjax/index.ts";
import exampleMd from "./exampleMd.md";

const mdit = new MarkdownIt();
mdit.use(mditMathjax, {
  tex: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
      //   ["@", "@"],
    ],
  },
});

function App() {
  const [markdown, setMarkdown] = useState(exampleMd);

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setMarkdown(event.target.value);
  };

  return (
    <div className="bg-slate-900 text-slate-50 h-screen w-screen">
      <div className="container mx-auto">
        <h1 className="text-5xl text-red-500 mb-12">Markdown It Mathjax</h1>
        <div className="card">
          <textarea
            className="w-full bg-slate-800 h-64 p-2 border border-gray-300 rounded"
            value={markdown}
            onChange={handleChange}
          />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: mdit.render(markdown) }}
          className="read-the-docs"
        ></div>
      </div>
    </div>
  );
}

export default App;
