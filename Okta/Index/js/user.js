oktaSignIn.session.get(function (res) {
	// If we get here, the user is already signed in.
	if (res.status === 'ACTIVE') {	
	    getUserInfo().done(function(useroutput){
		  	let userInfo = parseUserInfo(useroutput);
		  	sessionStorage.setItem("userInfo", userInfo)

		  	getGroupInfo(userInfo.id).done(function(groupoutput){
				let groups = parseGroupInfo(groupoutput);
				sessionStorage.setItem("projects", groups)

				let element = document.getElementById("projects")
				let html = ""
				let index = 0
				groups.forEach(group => {
					console.log(group.description)
					html += "<button onclick=selectProject("+index+")>"+group.description+"</button>"
					index += 1
				});	
				element.innerHTML = html	
		  	});

		  	if (window.location.href.indexOf('user.html') > 0) {
		  		document.getElementById("back").innerHTML = "<a href='#' onclick='logout()'><h3>Logout</h3></a>";
		  		document.getElementById("top").innerHTML = "Welcome Back - " + userInfo.firstName + "!";
		  	}
		});

	  	return;
	} 
	else 
	{
		window.location = 'https://thechadturner.github.io/coursera-test/Okta/Index/login.html'; 
	}
});

function selectProject(index) {
	let projects = sessionStorage.getItem("projects")
	console.log(projects)

	// localStorage.setItem("selectedProjectName", name);
	// localStorage.setItem("selectedProjectDesc", desc);

	// console.log("redirecting...");
	// window.location = 'https://thechadturner.github.io/coursera-test/Okta/Index/project.html';
}