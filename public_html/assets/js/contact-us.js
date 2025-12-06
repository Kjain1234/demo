const scriptURL = "contact.php";

const form = document.getElementById("contact-form");
const popupAlert = document.getElementById("popupAlert");
form.addEventListener("submit", (e) => {
	e.preventDefault();

	fetch(scriptURL, { method: "POST", body: new FormData(form) })
		.then((response) => response.text())
		.then((data) => {
			form.reset();
			popupAlert.style.display = "block";
			// Hide after 2 seconds
			setTimeout(() => {
				popupAlert.style.display = "none";
			}, 2000);
		})
		.catch((error) => console.error("Error!", error.message));
});
