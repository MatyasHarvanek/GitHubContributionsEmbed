const GitHubContributionsDaysElement = document.getElementById("github-contributions_days");
const GitHubContributionsTotalDaysElement = document.getElementById("github-contributions__total-days");
let DaysElements = [];
let currentIndex = 0
let contributions;
let showDaysInterval;

async function getData() {
    const url = "https://github-contributions-api.jogruber.de/v4/matyasharvanek?y=last";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error.message);
    }
}

for (let i = 0; i < 364; i++) {
    let newElement = document.createElement("div");
    newElement.classList.add("github-contributions_day");

    GitHubContributionsDaysElement.appendChild(newElement);
    DaysElements.push(newElement);
}



function ShowDays() {
    for (let i = 0; i < 14; i++) {
        var element = DaysElements[currentIndex];
        element.classList.add("github-contributions_day--shown");
        element.classList.add("github-contributions_day--" + contributions[currentIndex].level)

        var elementFromEnd = DaysElements[363 - currentIndex];
        elementFromEnd.classList.add("github-contributions_day--shown");
        elementFromEnd.classList.add("github-contributions_day--" + contributions[363 - currentIndex].level)

        currentIndex++;
        if (currentIndex >= 181) {
            clearInterval(showDaysInterval);
        }
    }
}

getData().then(x => {
    console.log(x.total.lastYear)
    GitHubContributionsTotalDaysElement.innerText = x.total.lastYear + " total contributions"
    contributions = x.contributions;
    // ShowDays();
    showDaysInterval = setInterval(ShowDays, 50);
})

