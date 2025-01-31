import { useState } from "react";

function App() {
	const [files, setFiles] = useState();
	const [jsonResult, setJsonResult] = useState("");

	const handleChange = (e) => {
		const files = e.target.files;
		if (!files.length) return;
		setFiles(files);
	};

	const rnFileMap = () => {
		const fileMap = {};
		for (let i = 0; i < files.length; i++) {
			const fileName = files[i].name;
			fileMap[fileName] = `require('../assets/diapos/${fileName}')`;
		}

		setJsonResult(JSON.stringify(fileMap, null, 2));
	};

	const themeImagesBuilder = () => {
		const fileMap = [];
		for (let i = 0; i < files.length; i++) {
			let fileName = files[i].name;
			fileName = fileName.substring(3);
			let index = fileName.lastIndexOf(".");
			fileName = index !== -1 ? fileName.slice(0, index) : fileName;
			const theme = {
				themeId: i + 1,
				label: fileName,
			};
			fileMap.push(theme);
		}
		setJsonResult(JSON.stringify(fileMap, null, 2));
	};

	const handleCopy = () => {
		navigator.clipboard
			.writeText(jsonResult)
			.then(() => {
				alert("Contenu copié dans le presse-papier !");
			})
			.catch((err) => {
				alert("Erreur lors de la copie : " + err);
			});
	};

	const handleReset = () => {
		setFiles(null);
		setJsonResult("");
		document.getElementById("input-file").value = "";
	};

	return (
		<div id="app">
			<div id="left">
				<input type="file" id="input-file" multiple onChange={handleChange} />
				<button type="button" onClick={rnFileMap}>
					File map
				</button>
				<button type="button" onClick={themeImagesBuilder}>
					Build themes
				</button>
			</div>
			<div id="right">
				<div id="toolbar">
					<button type="button" id="copy" onClick={handleCopy}>
						Copier
					</button>
					<button type="button" id="reset" onClick={handleReset}>
						Reset
					</button>
				</div>
				<pre>{jsonResult}</pre>
			</div>
		</div>
	);
}

export default App;
