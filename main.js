const loadIsues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues ")
        .then(res => res.json())
        .then(data => console.log(data))

}
loadIsues()