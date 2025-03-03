const LoadAllPlans=()=>{
    fetch('https://gmsfinal.vercel.app/subscription/plans/')
    .then(res=>res.json())
    .then(data=>{
        console.log(data.results)
        document.getElementById("all-plans-spinner").innerHTML=""
        DisplayAllPlans(data.results)
    })
    .catch(error=>{
        console.error("Error fetching plans:", error)
        document.getElementById("all-plans-spinner").innerHTML=""
        ShowCatchErrorMessage(error)
    })
}
const LoadCurrentPlan=()=>{
    fetch("https://gmsfinal.vercel.app/subscription/subscribe/",{
        method:'GET',
        headers:{
            'Authorization':`Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        credentials: "include",
    })
    .then(res=>res.json())
    .then(data=>{
        if (data.error){
            console.log(data.error)
        }
        if(data.success){
            console.log(data.success)
            document.getElementById("current-plan").innerHTML=`Current Plan: <b>${data.data.plan}</b>`
        }
    })
    .catch(error=>{
        console.error("Error fetching current subscription:",error)
        ShowCatchErrorMessage(error)
    })
}
LoadCurrentPlan()
LoadAllPlans()
const DisplayAllPlans=(plans)=>{
    const parent=document.getElementById("all-plans")
    plans.forEach(plan=>{
        const div=document.createElement("div")
        div.classList.add("card" ,"plan-card")
        
        div.innerHTML=`
            <div class="card-body text-center">
                <h5 class="card-title mt-5">${plan.name}</h5>
                <h6 class="card-subtitle mb-2">$${plan.price}</h6>
                <a href="#" class="subscribe-btn btn btn-dark card-link">Subscribe</a>
            </div>
        `
        div.querySelector(".subscribe-btn").addEventListener("click",(event)=>{
            event.preventDefault()
            SubscribePlan(plan.id)
        })
        parent.appendChild(div)
    })
}
const SubscribePlan=(planId)=>{
    fetch("https://gmsfinal.vercel.app/subscription/subscribe/",{
        method:'POST',
        headers:{
            'Authorization':`Token ${token}`,
            "Content-Type": "application/json"
        },
        credentials:"include",
        body:JSON.stringify({plan:planId})
    })
    .then(res=>res.json().then(data=>({status:res.status,body:data})))
    .then(({status,body})=>{
        if(status===401){
            document.getElementById("error-msg").innerText="Please log in and try again"
            setTimeout(()=>{
                document.getElementById("error-msg").innerText=""
            }, 2000)
        }
        else if(status===403){
            document.getElementById("error-msg").innerText=body.detail
            setTimeout(() => {
                document.getElementById("error-msg").innerText=""
            }, 2000)
        }
        else if(body.error){
            ShowErrorMessage(body)
        }
        else{
            ShowSuccessMessage(body)
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        }
    })
    .catch(error=>{
        console.error("Error subscribing:",error)
        ShowCatchErrorMessage(error) 
    })
}
const OpenUpdateModal=()=>{
    $("#exampleModalCenter").modal("show")
    document.getElementById("plan-options").innerHTML=``
    fetch("https://gmsfinal.vercel.app/subscription/plans/")
    .then(res=>res.json())
    .then(plans=>{
        plans.results.forEach(plan=>{
            const parent=document.getElementById("plan-options")
            const li=document.createElement("li")
            li.classList.add("m-2")

            const button=document.createElement("button")
            button.classList.add("btn","btn-dark")
            button.innerText=`${plan.name} - $${plan.price}`
            button.value=plan.id

            li.appendChild(button)

            button.addEventListener("click", function(){
                document.querySelectorAll("#plan-options button").forEach(item=>{
                    item.classList.remove("selected")
                    item.classList.remove("btn-light")
                    item.classList.add("btn-dark")
                    item.style.color=""
                })
                this.classList.add("selected")
                this.classList.remove("btn-dark")
                this.classList.add("btn-light")
                this.style.color="black"
            })
            parent.appendChild(li)
        })
    })
    .catch(error=>{
        console.error("Error fetching plans:", error)
        CloseModal()
        ShowCatchErrorMessage(error)
    })
}
const UpdatePlan=()=>{
    const selectedPlan=document.querySelector("#plan-options button.selected")
    const planId=selectedPlan.value

    fetch("https://gmsfinal.vercel.app/subscription/update-subscription/", {
        method:"PUT",
        headers:{
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        },
        credentials:"include",
        body:JSON.stringify({plan:planId})
    })
    .then(res=>res.json().then(data=>({status:res.status,body:data})))
    .then(({status,body})=>{
        if(status===401){
            CloseModal()
            document.getElementById("error-msg").innerText="Please log in and try again"
            setTimeout(()=>{
                document.getElementById("error-msg").innerText=""
            }, 2000)
        }
        else if(status===403){
            CloseModal()
            document.getElementById("error-msg").innerText=body.detail
            setTimeout(() => {
                document.getElementById("error-msg").innerText=""
            }, 2000)
        }
        else if(body.error){
            console.log("Error updating plan:", body.error)
            CloseModal()
            ShowErrorMessage(body)
        }
        else{
            console.log(body.success)
            console.log("Details:",body.data)
            CloseModal()
            ShowSuccessMessage(body)
            setTimeout(() => {
                window.location.reload()
            }, 3000)
        }
    })
    .catch(error=>{
        CloseModal()
        console.error("Error updating plan:", error)
        ShowCatchErrorMessage(error)
    })  
}

const CloseModal=()=>{
    const modal = document.getElementById("exampleModalCenter")
    const bootstrapModal = bootstrap.Modal.getInstance(modal) 
    bootstrapModal.hide()
}


