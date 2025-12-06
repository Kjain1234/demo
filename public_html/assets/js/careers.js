document
	.getElementById("careerForm")
	.addEventListener("submit", function (event) {
		event.preventDefault();

		let formData = new FormData(document.getElementById("careerForm"));
		console.log(
			"Form submitted with data:",
			Object.fromEntries(formData.entries()),
		);
		console.log("Form data:", formData);

		fetch("../careers-application.php", {
			method: "POST",
			body: formData,
		})
			.then((response) => response.text())
			.then((data) => {
				if (data.includes("success")) {
					document.getElementById("careerForm").reset();
					document.getElementById("successMessage").classList.remove("hidden");

					// 🔹 Reset upload UI
					const fileName = document.getElementById("fileName");
					const uploadText = document.getElementById("uploadText");
					uploadText.innerHTML =
						"📄 Drag & Drop your CV here <br> or <span>click to browse</span>";
					fileName.textContent = "";
				} else {
					alert("Error: " + data);
				}
			})
			.catch((error) => {
				alert("Something went wrong. Try again later.");
				console.error(error);
			});
	});
// Upload box logic
const uploadBox = document.getElementById("uploadBox");
const fileInput = document.getElementById("cv");
const fileName = document.getElementById("fileName");
const uploadText = document.getElementById("uploadText");

uploadBox.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", () => {
	if (fileInput.files.length > 0) {
		fileName.textContent = "Selected: " + fileInput.files[0].name;
		uploadText.innerHTML = "✅ File ready to upload";
	}
});

// Drag & Drop feature
uploadBox.addEventListener("dragover", (e) => {
	e.preventDefault();
	uploadBox.style.background = "#d9f6e6";
});

uploadBox.addEventListener("dragleave", () => {
	uploadBox.style.background = "#f9fffb";
});

uploadBox.addEventListener("drop", (e) => {
	e.preventDefault();
	fileInput.files = e.dataTransfer.files;
	if (fileInput.files.length > 0) {
		fileName.textContent = "Selected: " + fileInput.files[0].name;
		uploadText.innerHTML = "✅ File ready to upload";
	}
	uploadBox.style.background = "#f9fffb";
});
