const loadAllClasses=()=>{
    fetch("https://final-backend-phi.vercel.app/class/classes/")
    .then(res=>res.json())
    .then(data=>console.log(data))
}

loadAllClasses()