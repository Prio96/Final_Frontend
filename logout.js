const handlelogOut=()=>{
    console.log("Logging out...")
    const token=localStorage.getItem("token")
    fetch("http://127.0.0.1:8000/staff/logout/",{
        method: "GET",
        headers:{
            "Authorization": `Token ${token}`,
        },
        credentials:"include"
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        localStorage.removeItem("token")
        localStorage.removeItem("user_id")
        window.location.href='login.html'
    })
}