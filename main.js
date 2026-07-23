const showTwo = (arr) => {
    const newEl = arr.map(iteam => `<span class="px-3 py-1 ${iteam == 'bug' ? 'bg-red-200' : iteam == 'enhancement' ? 'bg-green-200' : iteam == 'documentation' ? 'bg-blue-200' : iteam == 'good first issue' ? 'bg-gray-300' : 'bg-orange-300'}  rounded-full text-xs font-medium">${iteam}</span>`)
    return (newEl.join(""))
}

const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => displayIssues(data.data))

}
const displayIssues = (issues) => {
    const issueCOntainer = document.getElementById("issue-container");
    // issueCOntainer.innerHTML = "";
    issues.forEach(issue => {
        const creatCard = document.createElement('div')
        creatCard.innerHTML = `
        <div class="p-3 shadow-sm m-3 rounded-sm h-full border-t-3">

                    <div class="space-y-2">
                        <div class="flex justify-between items-center">
                            <img src="./assets/Open-Status.png" alt="">
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

    });

}
loadIssues()