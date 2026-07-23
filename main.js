const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove('hidden')
        document.getElementById("issue-container").classList.add('hidden')
    } else {
        document.getElementById("issue-container").classList.remove('hidden')
        document.getElementById("spinner").classList.add('hidden')
    }
}
// toshowing the labels only
const showTwo = (arr) => {
    const newEl = arr.map(iteam => `<span class="px-3 py-1 ${iteam == 'bug' ? 'bg-red-200' : iteam == 'enhancement' ? 'bg-green-200' : iteam == 'documentation' ? 'bg-blue-200' : iteam == 'good first issue' ? 'bg-gray-300' : 'bg-orange-300'}  rounded-full text-xs font-medium">${iteam}</span>`)
    return (newEl.join(""))
}

// shared
const issueCOntainer = document.getElementById("issue-container")
const totalIssues = document.getElementById('total-issues')
const calCulate = () => {
    totalIssues.innerText = issueCOntainer.children.length;

}
// fetches all issues
const loadAllIssues = (status = "all") => {
    manageSpinner(true)
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => {
            let issues = data.data;
            if (status !== "all") {
                issues = issues.filter(issue => issue.status === status)
            }
            displayIssues(issues)
        })

}
const displayIssues = (issues) => {
    const issueCOntainer = document.getElementById("issue-container");
    issueCOntainer.innerHTML = "";
    issues.forEach(issue => {
        const creatCard = document.createElement('div')
        creatCard.addEventListener('click', () => loadSingleIssue(issue.id))
        creatCard.innerHTML = `
        <div  class="p-3 cursor-pointer shadow-sm m-3 rounded-sm h-full border-t-3 ${issue.status == 'open' ? 'border-green-300' : 'border-[#A855F7]'}">

                    <div class="space-y-2">
                        <div class="flex justify-between items-center">
                            <img src="${issue.status === 'open'
                ? './assets/Open-Status.png'
                : './assets/Closed-Status.png'}" alt="">
                            <p class="${issue.priority == 'high' ? 'text-red-600 bg-red-200' : issue.priority == 'medium' ? 'text-yellow-600 bg-yellow-100' : 'text-gray-600 bg-gray-100'} rounded-full  font-medium px-3 py-1">${issue.priority}</p>
                        </div>
                        <h1 class="font-bold">${issue.title}</h1>
                        <p class="small line-clamp-2">${issue.description}
                        </p>
                        <div class="flex flex-wrap gap-2">
                        ${showTwo(issue.labels)}
                          
                    </div>

                    <hr class="my-2 text-gray-300 ">
                    <div class="space-y-2">
                        <p class="small">${issue.author}</p>
                        <p class="small">${issue.updatedAt}</p>
                    </div>
                </div>`
        issueCOntainer.appendChild(creatCard)
        manageSpinner(false)

    });
    calCulate()

}
const loadSingleIssue = (id) => {


    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayEveryIssue(data.data))

}
const displayEveryIssue = (iteam) => {
    const singleIssueBox = document.getElementById('single-issue-box')
    singleIssueBox.innerHTML = "";
    const newDiv = document.createElement('div');
    newDiv.innerHTML =
        ` <div class="space-y-4">
                            <div class="space-y-3">
                                <h1 class="font-bold text-2xl">${iteam.title}</h1>
                                <div>
                                    <span class="bg-red-400 rounded-full px-2 py-1 text-white">${iteam.status}</span>
                                    <span class="font-bold">.</span>
                                    <span class="small">Opened by ${iteam.author}</span>
                                    <span>.</span>
                                    <span class="small">${iteam.createdAt}</span>
                                </div>
                            </div>
                            <div class = "flex gap-1">
                                ${showTwo(iteam.labels)}
                            </div>
                            <p class="small">The navigation menu doesn't collapse properly on mobile devices. Need to
                                fix the
                                responsive
                                behavior.</p>
                            <div class="flex justify-around">
                                <div>
                                    <p>Assignee:</p>
                                    <h2 class="font-bold">Ikbal</h2>

                                </div>
                                <div class = "space-y-1">
                                    <p>Priority:</p>
                                    <span class="bg-red-400 text-white rounded-full text-sm px-3 py-1">${iteam.priority}</span>

                                </div>
                            </div>
                        </div>`
    singleIssueBox.appendChild(newDiv);
    document.getElementById("my_modal").showModal()

}

const searchBar = document.getElementById("search-btn")
// console.log(searchBar)

searchBar.addEventListener('input', (event) => {

    const query = event.target.value.trim();
    if (!query) {
        loadIssues(); // or whatever function loads all issues
        return;
    }

    // console.log("Searching for:", query);
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayIssues(data.data))

})


const removeActive = () => {
    const buttons = document.querySelectorAll(".btn-category")
    buttons.forEach(button => {
        button.classList.remove('active')
    })
}

const allBtn = document.getElementById("all")
const openBtn = document.getElementById("open")
const closeBTn = document.getElementById("close");

allBtn.addEventListener("click", () => {
    removeActive()
    allBtn.classList.add('active')
    loadAllIssues("all")
});
openBtn.addEventListener('click', () => {
    removeActive()
    openBtn.classList.add('active')
    loadAllIssues("open")
})
closeBTn.addEventListener('click', () => {
    removeActive()
    closeBTn.classList.add('active')
    loadAllIssues("closed")
})


// Add your filtering logic here
// loadSingleIssue()
loadAllIssues()