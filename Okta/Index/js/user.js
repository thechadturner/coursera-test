oktaSignIn.session.get(function (res) {
	// If we get here, the user is already signed in.
	if (res.status === 'ACTIVE') {
		let element = document.getElementById("projects")

		if (sessionStorage.getItem("userInfo") === null) {
			getUserInfo().done(function(useroutput){
				let userInfo = parseUserInfo(useroutput);
				sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
				console.log(userInfo);

			  	getGroupInfo(userInfo.id).done(function(groupoutput){
					let groups = parseGroupInfo(groupoutput);
					sessionStorage.setItem("projects", JSON.stringify(groups));
					console.log(groups);
			  	});
			});
		}

		let groups = JSON.parse(sessionStorage.getItem("projects"));

		let html = ""
		let index = 0
		groups.forEach(group => {
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