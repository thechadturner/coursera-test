oktaSignIn.session.get(function (res) {
	// If we get here, the user is already signed in.
	if (res.status === 'ACTIVE') {
		let element = document.getElementById("projects")
		let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

		if (userInfo === null) {
			getInfo();
		}

	  	return;
	} 
	else 
	{
		window.location = 'https://thechadturner.github.io/coursera-test/Okta/Index/login.html'; 
	}
});

function buildGroups() {
	let groups = JSON.parse(sessionStorage.getItem("projects"));

	let html = ""
	let index = 0
	groups.forEach(group => {
		html += "<button onclick=selectProject("+index+")>"+group.description+"</button>"
		index += 1
	});	
	element.innerHTML = html
}

buildGroups();

function selectProject(index) {
	let projects = JSON.parse(sessionStorage.getItem("projects"))
	localStorage.setItem("selectedProject", JSON.stringify(projects[index]));
	window.location = 'https://thechadturner.github.io/coursera-test/Okta/Index/project.html';
}