const loadAllPlans=()=>{
    fetch('https://gymbackend-flax.vercel.app/subscription/plans/')
    .then(res=>res.json())
    .then(data=>{
        console.log(data.results)
        DisplayAllPlans(data.results)
    })
    .catch(error=>console.error("Error fetching plans:", error))
}
loadAllPlans()
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
        div.querySelector(".subscribe-btn").addEventListener("click", (event) => {
            event.preventDefault();
            SubscribePlan(plan.id);
        });
        parent.appendChild(div)
    })
}
const SubscribePlan=(planId)=>{
    fetch("https://gymbackend-flax.vercel.app/subscription/subscribe/",{
        method:'POST',
        headers:{
            'Authorization':`Token ${token}`,
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({plan:planId})
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.error){
            console.error("Error subscribing:", data.error)
        }
        else{
            console.log("Subscription successful:",data)
            alert("Successfully subscribed to the plan!")
        }
        
        // window.location.href="index.html"
    })
    .catch(error=>{
        console.error("Error subscribing:", error)
        alert("Failed to subscribe. Please try again.")
    })
}
const OpenUpdateModal=()=>{
    const modal=document.getElementById("exampleModalCenter")
    $("#exampleModalCenter").modal("show")
    document.getElementById("plan-options").innerHTML=``
    fetch("https://gymbackend-flax.vercel.app/subscription/plans/")
    .then(res=>res.json())
    .then(plans=>{
        plans.results.forEach(plan=>{
            const parent=document.getElementById("plan-options")
            const li=document.createElement("li")
            li.classList.add("m-2")
            li.innerHTML=`<button class="btn btn-dark">${plan.name} - $${plan.price}</button>`
            li.value=plan.id
            li.addEventListener("click", function() {
                document.querySelectorAll("#plan-options li").forEach(item => item.classList.remove("selected"));
                this.classList.add("selected");
            })
        parent.appendChild(li)
    })
    
    })
    .catch(error=>console.error("Error fetching plans:", error))
}
const UpdatePlan=()=>{
    const selectedPlan=document.querySelector("#plan-options li.selected")
    const planId=selectedPlan.value

    fetch("https://gymbackend-flax.vercel.app/subscription/update-subscription/", {
        method: "PUT",
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ plan: planId })
    })
    .then(res=>res.json())
    .then(data => {
        if(data.error){
            console.error("Error updating plan:", data.error);
        }
        else{
            console.log("Subscription updated:", data)
            alert("Plan updated successfully!")
            document.getElementById("update-modal").style.display = "none"
        }
    })
    .catch(error => console.error("Error updating plan:", error))
}
const CloseUpdateModal = () => {
    const modal = document.getElementById("update-modal");
    modal.style.display = "none"; 
};

// https://gymbackend-flax.vercel.app/
