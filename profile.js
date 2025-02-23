// const token=localStorage.getItem("token")
const loadProfile = () => {
    fetch("https://gymbackend-flax.vercel.app/member/member_profile/", {
        method: "GET",
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(res=>res.json())
    .then(data=>{
        if (data.error) {
            console.error(data.error);
            return;
        }

        // Display member details
        console.log(data)
        document.getElementById("profile-image").src = data.member.image;
        document.getElementById("member-name").innerText = `${data.member.user.first_name} ${data.member.user.last_name}`;
        document.getElementById("member-mobile").innerText = `Mobile: ${data.member.mobile_no}`;
        document.getElementById("member-gender").innerText = `Gender: ${data.member.gender}`;
        document.getElementById("member-weight").innerText = `Weight: ${data.member.weight} kg`;
        document.getElementById("member-height").innerText = `Height: ${data.member.height} cm`;
        document.getElementById("date-joined").innerText = `Joined on: ${data.member.date_joined}`;

        // Display booking history
        const bookingList = document.getElementById("booking-history");
        bookingList.innerHTML = "";
        data.bookings.forEach(booking => {
            const li = document.createElement("li");
            li.innerText = `${booking.class_session} - ${booking.booking_date}`;
            bookingList.appendChild(li);
        });
    })
    .catch(error => console.error("Error fetching profile:", error));
};

loadProfile()