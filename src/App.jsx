import { useState } from "react";

function App() {
  const [jsonResult, setJsonResult] = useState("");

  const handleFiles = (e) => {
    const files = e.target.files;
    if (!files.length) return;

    const fileMap = {};
    for (let i = 0; i < files.length; i++) {
      const fileName = files[i].name;
      fileMap[fileName] = `require('../../assets/${fileName}')`;
    }

    setJsonResult(JSON.stringify(fileMap, null, 2));
  };

  return (
    <div id="app">
      <div id="left">
        <input type="file" id="input-file" multiple onChange={handleFiles} />
      </div>
      <div id="right">
        <pre>{jsonResult}</pre>
      </div>
    </div>
  );
}

export default App;
