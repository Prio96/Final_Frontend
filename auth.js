const token = localStorage.getItem("token")
const user_id=localStorage.getItem("user_id")
if(token && user_id){
    alert("Token and user_id found")
    console.log(token)
    console.log(user_id)
}
else{
    alert("Token and user id not found")
}
const JoinUsButton=document.getElementById("join-us-btn")
const LoginLink=document.getElementById("login-link")
const RegisterLink=document.getElementById("register-link")
const DropdownLink=document.getElementById("dropdown-link")

if (token){
    LoginLink.style.display='none'
    RegisterLink.style.display='none'
    DropdownLink.style.display='inline'
    if(JoinUsButton){
        JoinUsButton.style.display='none'
    }
}
else{
    LoginLink.style.display='inline'
    RegisterLink.style.display='inline'
    DropdownLink.style.display='none'
    if(JoinUsButton){
        JoinUsButton.style.display='inline'
    }
}
const handleMemberRegistration=(event)=>{
    event.preventDefault()
    const formData = new FormData();
    formData.append("username", getValue("username"));
    formData.append("first_name", getValue("first_name"));
    formData.append("last_name", getValue("last_name"));
    formData.append("email", getValue("email"));
    formData.append("password", getValue("password"));
    formData.append("confirm_password", getValue("confirm_password"));
    formData.append("image", document.getElementById("image").files[0]);  // Append file object
    formData.append("mobile_no", getValue("mobile_no"));
    formData.append("gender", getValue("gender"));
    formData.append("weight", getValue("weight"));
    formData.append("height", getValue("height"));
    if (getValue("password") === getValue("confirm_password")){
        fetch("https://gymbackend-flax.vercel.app/member/register/", {
            method: "POST",
            body: formData,   // Sending as FormData
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error("Error:", err));
    }
    else{
        document.getElementById("error").innerText = "Passwords do not match"
    }
    // Sending FormData without setting headers
    
//     const username = getValue("username")
//     const first_name = getValue("first_name")
//     const last_name = getValue("last_name")
//     const email = getValue("email")
//     const password = getValue("password")
//     const confirm_password = getValue("confirm_password")
//     const image=document.getElementById("image").files[0]
//     const mobile_no=getValue("mobile_no")
//     const gender=getValue("gender")
//     const weight=getValue("weight")
//     const height=getValue("height")
    
//     const info = { username, first_name, last_name, email, password, confirm_password, mobile_no, gender, weight, height}

//     const formdata=new FormData()
//     formdata.append("image",image)
    
//     if (password === confirm_password) {
//         document.getElementById("error").innerText = ""
//         if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
//             console.log(info)
//             fetch("https://final-backend-phi.vercel.app/member/register/", {
//                 method: "POST",
//                 headers: { "content-type": "application/json" },
//                 body: JSON.stringify(info),
//             })
//             .then(res=>res.json())
//             .then(data=>{
//                 fetch("https://final-backend-phi.vercel.app/member/register/", {
//                     method: "POST",
//                     body: formdata,   
//                 })
//             })
//         }
//         else {
//             document.getElementById("error").innerText = "Password must contain at least a letter, a special character and a number"
//         }
//     }
//     else {
//         document.getElementById("error").innerText = "Passwords do not match"
//         // alert("Passwords do not match")
//     }

}

const handleMemberLogin=(event)=>{
    event.preventDefault()
    const username=getValue("login-username")
    const password=getValue("login-password")
    fetch("https://gymbackend-flax.vercel.app/staff/login/",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({username,password}),
        credentials:"include"
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(data.token && data.user_id){
            localStorage.setItem("token",data.token)
            localStorage.setItem("user_id",data.user_id)
            window.location.href="profile.html"
        }
    })
}
const getValue = (id) => {
    const value = document.getElementById(id).value
    return value
}