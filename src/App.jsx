import { useState } from "react";

function App() {
	const [files, setFiles] = useState();
	const [jsonResult, setJsonResult] = useState("");
	const [copyMessage, setCopymessage] = useState(false);

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

	const filesArray = () => {
		const array = [];
		for (let i = 0; i < files.length; i++) {
			array.push(files[i].name);
		}
		setJsonResult(JSON.stringify(array, null, 2));
	};

	const soundImageObj = () => {
		const filesArray = Array.from(files);
		const images = filesArray.filter((file) => file.name.endsWith(".webp"));
		const sounds = filesArray.filter((file) => file.name.endsWith(".mp3"));

		const soundMap = new Map();
		sounds.forEach((sound) => {
			const baseName = sound.name.replace(".mp3", "");
			soundMap.set(baseName, sound.name);
		});

		const result = images.map((image) => {
			const baseName = image.name.replace(".webp", "");
			return soundMap.has(baseName)
				? { image: image.name, sound: soundMap.get(baseName) }
				: { image: image.name };
		});

		result.sort((a, b) => a.image.localeCompare(b.image));

		setJsonResult(JSON.stringify(result, null, 2));
	};

	const handleCopy = () => {
		navigator.clipboard
			.writeText(jsonResult)
			.then(() => {
				setCopymessage(true);
				setTimeout(() => {
					setCopymessage(false);
				}, 5000);
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
				<button type="button" onClick={filesArray}>
					Tableau de fichiers
				</button>
				<button type="button" onClick={soundImageObj}>
					Objet son + image
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
					{copyMessage && <p id="confirm-copy">Elément copié</p>}
				</div>
				<pre>{jsonResult}</pre>
			</div>
		</div>
	);
}

export default App;
