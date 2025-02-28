const token = localStorage.getItem("token")
const user_id=localStorage.getItem("user_id")

const JoinUsButton=document.getElementById("join-us-btn")
const LoginLink=document.getElementById("login-link")
const RegisterLink=document.getElementById("register-link")
const DropdownLink=document.getElementById("dropdown-link")

if (token){
    if(LoginLink){
        LoginLink.style.display='none'
    }
    if(RegisterLink){
        RegisterLink.style.display='none'
    }
    if(DropdownLink){
        DropdownLink.style.display='inline'
    }
    if(JoinUsButton){
        JoinUsButton.style.display='none'
    }
}
else{
    if(LoginLink){
        LoginLink.style.display='inline'
    }
    if(RegisterLink){
        RegisterLink.style.display='inline'
    }
    if(DropdownLink){
        DropdownLink.style.display='none'
    }
    if(JoinUsButton){
        JoinUsButton.style.display='inline'
    }
}
const handleMemberRegistration=(event)=>{
    event.preventDefault()
    const formData = new FormData()
    formData.append("username", getValue("username"))
    formData.append("first_name", getValue("first_name"))
    formData.append("last_name", getValue("last_name"))
    formData.append("email", getValue("email"))
    formData.append("password", getValue("password"))
    formData.append("confirm_password", getValue("confirm_password"))
    formData.append("image", document.getElementById("image").files[0])
    formData.append("mobile_no", getValue("mobile_no"))
    formData.append("gender", getValue("gender"))
    formData.append("weight", getValue("weight"))
    formData.append("height", getValue("height"))
    if (getValue("password") === getValue("confirm_password")){
        fetch("https://gmsfinal.vercel.app/member/register/", {
            method: "POST",
            body: formData,
        })
        .then(res=>res.json().then(data=>({status:res.status,body:data})))
        .then(({status,body}) => {
            if (!body.error) {
                console.log(body)
                ShowSuccessMessage(body);
                setTimeout(()=>{
                    window.location.href = "login.html"
                },2000)
            } 
            else {
                ShowErrorMessage(body)
            }
        })
        .catch(error=>{
            console.error("Error:", error)
            ShowCatchErrorMessage(error)
        })
    }
    else{
        document.getElementById("error-msg").innerText="Passwords do not match"
    }

}

const handleMemberLogin=(event)=>{
    event.preventDefault()
    const username=getValue("login-username")
    const password=getValue("login-password")
    fetch("https://gmsfinal.vercel.app/staff/login/",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({username,password}),
        credentials:"include"
    })
    .then(res=>res.json().then(data=>({status:res.status,body:data})))
    .then(({status,body})=>{
        if(!body.error){
            console.log(body) //Show user id and token in console
            localStorage.setItem("token",body.token)
            localStorage.setItem("user_id",body.user_id)
            document.getElementById("error-msg").innerText=''
            document.getElementById("success-msg").innerText='Login successful' //Custom success message (Instead of ShowSuccessMessage function) since the perfect success message for frontend(after login)has not been set in backend.
            setTimeout(()=>{
                window.location.href="profile.html"
            },2000)  
        }
        else{
            ShowErrorMessage(body)
        }
    })
    .catch(error=>{
        console.error("Error:", error)
        ShowCatchErrorMessage(error)
    })
}
const getValue=(id)=>{
    const value=document.getElementById(id).value
    return value
}
const ShowSuccessMessage=(body)=>{
    const ErrorElement=document.getElementById("error-msg")
    const SuccessElement=document.getElementById("success-msg")
    ErrorElement.innerText=""
    SuccessElement.innerText=body.success
    setTimeout(() => {
        SuccessElement.innerText=""
    }, 2000); 
}

const ShowErrorMessage=(body)=>{
    const ErrorElement=document.getElementById("error-msg")
    const SuccessElement=document.getElementById("success-msg")
    ErrorElement.innerText=body.error
    SuccessElement.innerText=""
    setTimeout(() => {
        ErrorElement.innerText=""
    }, 2000);
}

const ShowCatchErrorMessage=(error)=>{
    document.getElementById("error-msg").innerHTML=`Unexpected error occured: ${error}`
    document.getElementById("success-msg").innerText=""
    setTimeout(() => {
        document.getElementById("error-msg").innerText=""
    }, 2000)
}