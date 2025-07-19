// Volunteer Form Handler
document.getElementById("volunteer-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    let name = document.getElementById("volunteer-name").value;
    let location = document.getElementById("volunteer-location").value;
    let skills = document.getElementById("volunteer-skills").value;
    let phone = document.getElementById("volunteer-phone").value;
    let email = document.getElementById("volunteer-email").value;
  
    let volunteers = JSON.parse(localStorage.getItem("volunteers")) || [];
    volunteers.push({ name, location, skills, phone, email });
    localStorage.setItem("volunteers", JSON.stringify(volunteers));
  
    alert("You have registered as a volunteer!");
    document.getElementById("volunteer-form").reset();
  });
  
  // Victim Form Handler
  document.getElementById("victim-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    let victimLocation = document.getElementById("victim-location").value;
    let volunteers = JSON.parse(localStorage.getItem("volunteers")) || [];
  
    let resultsDiv = document.getElementById("volunteers-list");
    resultsDiv.innerHTML = "<h3>Available Volunteers:</h3>";
  
    volunteers.forEach(volunteer => {
      let volunteerInfo = `
        <div class="volunteer-entry">
          <p><strong>${volunteer.name}</strong> - ${volunteer.location}<br>
          Skills: ${volunteer.skills}</p>
  
          <a href="tel:${volunteer.phone}">
            <button>📞 Call</button>
          </a>
  
          <a href="mailto:${volunteer.email}">
            <button>✉️ Email</button>
          </a>
        </div>
      `;
      resultsDiv.innerHTML += volunteerInfo;
    });
  });
  