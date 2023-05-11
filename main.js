const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;

function calculateAge() {
	const form = document.getElementById("birth-date-form");
	const formData = Object.fromEntries(new FormData(form).entries());

	const dayValid = isValidDate(formData, "d");
	const monthValid = isValidDate(formData, "m");
	const yearValid = isValidDate(formData, "y");
	const dateValid = isValidDate(formData);

	if (dateValid) {
		validateForm("var(--light-grey)", "var(--smokey-grey)", "", "d");
		validateForm("var(--light-grey)", "var(--smokey-grey)", "", "m");
		validateForm("var(--light-grey)", "var(--smokey-grey)", "", "y");

		let now = new Date();
		let nowDate = now.getDate();
		let nowMonth = now.getMonth() + 1;
		let nowYear = now.getFullYear();
		let daysInMonth = new Date(formData.year, formData.month, 0).getDate();

		let year = nowYear - formData.year;
		let month = nowMonth - formData.month;
		let date = nowDate - formData.day;

		if (nowMonth < formData.month) {
			year--;
			month += 12;
		}

		if (nowDate < formData.day) {
			date = daysInMonth + date;
			month--;
		}

		if (nowMonth == formData.month) {
			if (formData.day > nowDate) {
				year--;
				month += 12;
			}
		}

		document.getElementById("year-result-number").textContent =
			year.toString();
		document.getElementById("year-result-text").textContent =
			year > 1 ? "years" : "year";
		document.getElementById("month-result-number").textContent =
			month.toString();
		document.getElementById("month-result-text").textContent =
			month > 1 ? "months" : "month";
		document.getElementById("day-result-number").textContent =
			date.toString();
		document.getElementById("day-result-text").textContent =
			date > 1 ? "days" : "day";
	}
	if (!dayValid) {
		validateForm("var(--red)", "var(--red)", "Must be a valid day", "d");
	}
	if (!monthValid) {
		validateForm("var(--red)", "var(--red)", "Must be a valid month", "m");
	}
	if (!yearValid) {
		validateForm("var(--red)", "var(--red)", "Must be in the past", "y");
	}
}

function isValidDate(birthDate, check) {
	const currentYear = new Date().getFullYear();
	let { day, month, year } = birthDate;

	const dayValid = day >= 1 && day <= 31;
	const monthValid = month >= 1 && month <= 12;
	const yearValid = year >= 1 && year <= currentYear;

	switch (check) {
		case "d":
			return dayValid;
		case "m":
			if (!dayValid) {
				day = 1;
			}
			return monthValid;
		case "y":
			if (!dayValid) {
				day = 1;
			}

			if (!monthValid) {
				month = 12;
			}

			if (year > currentYear) {
				console.error(`${year} exceeded ${currentYear}`);
			} else return yearValid;
		default:
			return yearValid && monthValid && dayValid;
	}
}

function validateForm(borderColor, labelColor, message, selector) {
	const dayInput = document.getElementById("day");
	const monthInput = document.getElementById("month");
	const yearInput = document.getElementById("year");

	const labelStyle = `color: ${labelColor}`;
	const borderStyle = `border: 1px solid ${borderColor}`;

	switch (selector) {
		case "d":
			dayInput.setAttribute("style", borderStyle);

			const dayLabel = document.querySelector('label[for="day"]');
			dayLabel.setAttribute("style", labelStyle);

			const dayError =
				dayInput.parentNode.querySelector(".error-message");
			dayError.innerHTML = message || "";
			dayError.setAttribute("style", "color: var(--red)");
			break;
		case "m":
			monthInput.setAttribute("style", borderStyle);

			const monthLabel = document.querySelector('label[for="month"]');
			monthLabel.setAttribute("style", labelStyle);

			const monthError =
				monthInput.parentNode.querySelector(".error-message");
			monthError.innerHTML = message || "";
			monthError.setAttribute("style", "color: var(--red)");
			break;
		case "y":
			yearInput.setAttribute("style", borderStyle);

			const yearLabel = document.querySelector('label[for="year"]');
			yearLabel.setAttribute("style", labelStyle);

			const yearError =
				yearInput.parentNode.querySelector(".error-message");
			yearError.innerHTML = message || "";
			yearError.setAttribute("style", "color: var(--red)");
			break;
	}
}
