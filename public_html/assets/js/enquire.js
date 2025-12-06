const popupScriptURL = "enquire.php";

const popupForm = document.getElementById("popup-form");
const popupFormAlert = document.getElementById("popupAlert");
popupForm.addEventListener("submit", (e) => {
	e.preventDefault();

	fetch(popupScriptURL, { method: "POST", body: new FormData(popupForm) })
		.then((response) => response.text())
		.then((data) => {
			popupForm.reset();
			popupFormAlert.style.display = "block";
			// Hide after 2 seconds
			setTimeout(() => {
				popupFormAlert.style.display = "none";
			}, 2000);
		})
		.catch((error) => console.error("Error!", error.message));
});
