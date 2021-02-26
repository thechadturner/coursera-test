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
			groups.forEach(group => {
				html += "<button onclick=selectProject('"+group+"')>"+group.description+"</button>"
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

function selectProject(group) {
	localStorage.setItem("selectedProject", group);
	console.log("selected project: " + group);

	console.log("redirecting...");
	window.location = 'https://thechadturner.github.io/coursera-test/Okta/Index/project.html';
}