const showTwo = (arr) => {
    const newEl = arr.map(iteam => `<span class="px-3 py-1 bg-red-200 rounded-full text-xs font-medium"><i
                                    class="fa-solid fa-bug"></i>${iteam}</span>`)
    console.log(newEl.join(""))
}
const labels = ["enhancement", "good first issue"];
showTwo(labels)

    < span class="px-3 py-1 bg-red-200 rounded-full text-xs font-medium" > <i
        class="fa-solid fa-bug"></i>BUG</span >
            <span class="px-3 py-1 bg-yellow-200 rounded-full text-xs font-medium"><i
                class="fa-regular fa-life-ring"></i>HELP WANTED</span>