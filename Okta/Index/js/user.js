oktaSignIn.session.get(function (res) {
	// If we get here, the user is already signed in.
	if (res.status === 'ACTIVE') {
		let groups = JSON.parse(sessionStorage.getItem("projects"));

		let element = document.getElementById("projects")
		let html = ""
		let index = 0
		groups.forEach(group => {
			console.log(group.description)
			html += "<button onclick=selectProject("+index+")>"+group.description+"</button>"
			index += 1
		});	
		element.innerHTML = html

	  	return;
	} 
	else 
	{
		window.location = 'https://thechadturner.github.io/coursera-test/Okta/Index/login.html'; 
	}
});

function selectProject(index) {
	let projects = JSON.parse(sessionStorage.getItem("projects"))
	localStorage.setItem("selectedProject", JSON.stringify(projects[index]));
	window.location = 'https://thechadturner.github.io/coursera-test/Okta/Index/project.html';
}