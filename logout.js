const handlelogOut=()=>{
    console.log("Logging out...")
    const token=localStorage.getItem("token")
    fetch("https://final-backend-phi.vercel.app/staff/logout/",{
        method: "POST",
        headers:{
            "Authorization": `Token ${token}`,
        }
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        localStorage.removeItem("token")
        localStorage.removeItem("user_id")
        window.location.href='login.html'
    })
}