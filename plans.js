const loadAllPlans=()=>{
    fetch('https://final-backend-phi.vercel.app/subscription/plans/')
    .then(res=>res.json())
    .then(data=>console.log(data))
}
loadAllPlans()