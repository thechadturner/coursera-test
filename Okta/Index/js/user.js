oktaSignIn.session.get(function (res) {
	// If we get here, the user is already signed in.
	if (res.status === 'ACTIVE') {
		let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

		if (userInfo === null) {
			getInfo();
		}

		buildGroups();

	  	return;
	} 
	else 
	{
		window.location = 'https://thechadturner.github.io/coursera-test/Okta/Index/login.html'; 
	}
});

function buildGroups() {
	console.log("build groups");

	let element = document.getElementById("projects");
	let groups = JSON.parse(sessionStorage.getItem("projects"));

	if (groups != null) {
		let html = "<div class='tab'>";
		let index = 0;

		groups.forEach(group => {
			// html += "<button onclick=selectProject("+index+")>"+group.description+"</button>"
			html += "<button class='tablinks'>"+group.description+"</button>"
			index += 1
		});	
		html += "</div>";

		element.innerHTML = html;
	}
}

function selectProject(index) {
	let projects = JSON.parse(sessionStorage.getItem("projects"))
	localStorage.setItem("selectedProject", JSON.stringify(projects[index]));
	window.location = 'https://thechadturner.github.io/coursera-test/Okta/Index/project.html';
}

setTimeout(buildGroups, 2000);