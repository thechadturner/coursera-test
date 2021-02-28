oktaSignIn.session.get(function (res) {
	// If we get here, the user is already signed in.
	if (res.status === 'ACTIVE') {
		let element = document.getElementById("projects")

		let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
		console.log("do we have users yet?")
		console.log(userInfo)

		if (userInfo === null) {
			let x = getInfo();
			console.log("x: "+x)
		}

		let groups = JSON.parse(sessionStorage.getItem("projects"));

		console.log("do we have groups yet?")
		console.log(groups)

		let html = ""
		let index = 0
		groups.forEach(group => {
			html += "<button onclick=selectProject("+index+")>"+group.description+"</button>"
			index += 1
		});	
		element.innerHTML = html

		console.log("element completed")

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

console.log("js completed")