oktaSignIn.session.get(function (res) {
	// If we get here, the user is already signed in.
	if (res.status === 'ACTIVE') {
		let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

		if (userInfo === null) {
			getInfo();
		}

		console.log(userInfo);

		buildGroups();

	  	return;
	} 
	else 
	{
		window.location = dns + 'Index/login.html'; 
	}
});

let selected
function buildGroups() {
	console.log("build groups");

	let element = document.getElementById("projects");
	let groups = JSON.parse(sessionStorage.getItem("projects"));

	if (groups != null) {
		let html = "<div class='tab'>";
		let index = 0;

		//BUILD TABS
		groups.forEach(group => {
			let name = group.name;

			if (index === 0) {
				html += "<button class='tablinks active' onclick=openProject(event,'"+name+"')>"+group.description+"</button>"
			} else {
				html += "<button class='tablinks' onclick=openProject(event,'"+name+"')>"+group.description+"</button>"
			}
			
			index += 1
		});	
		html += "</div><br>";

		//BUILD TAB CONTENT
		groups.forEach(group => {
			html += "<div id="+group.name+" class='tabcontent'>"
			html += "<h3>"+group.description+"</h3>"
			html += "<p>"+group.name+" is the folder name for data files and pages.</p>"
			html += "</div><br>"
		});	
		
		element.innerHTML = html;
	}
}

function openProject(evt, name) {
  // Declare all variables
  var i, tabcontent, tablinks;

  console.log(name)

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(name).style.display = "block";
  evt.currentTarget.className += " active";
}

function selectProject(index) {
	let projects = JSON.parse(sessionStorage.getItem("projects"))
	localStorage.setItem("selectedProject", JSON.stringify(projects[index]));
	window.location = dns + 'Index/project.html';
}

setTimeout(buildGroups, 2000);