const handlelogOut=()=>{
    console.log("Logging out...")
    const token=localStorage.getItem("token")
    fetch("https://gymbackend-flax.vercel.app/staff/logout/",{
        method: "GET",
        headers:{
            "Authorization": `Token ${token}`,
        },
        credentials:"include"
    })
    .then(res=>res.json())
    .then(data=>{
        localStorage.removeItem("token")
        localStorage.removeItem("user_id")
        window.location.href='login.html'
    })
}