oktaSignIn.session.get(function (res) {
	// If we get here, the user is signed in.
	if (res.status === 'ACTIVE') {
		let projectAccess = false
	    let selectedProject = localStorage.getItem("selectedProject")
	    let selectedProjectDescription = undefined

	    getUserInfo().done(function(output){
	    let userInfo = parseUserInfo(useroutput);
	  	sessionStorage.setItem("userInfo", userInfo)

	  	getGroupInfo(userInfo.id).done(function(groupoutput){
			let groups = parseGroupInfo(groupoutput);
			sessionStorage.setItem("projects", groups)

			groups.forEach(group => {
				if (group.name === selectedProject) {
					selectedProjectDescription = group.description
					projectAccess = true
				}
			});
	  	});

	  	if (projectAccess === true) {
		  	document.getElementById("back").innerHTML = "<a href='#' onclick='logout()'><h3>Logout</h3></a>";

		  	if (window.location.href.indexOf('user.html') > 0) {
		  		document.getElementById("top").innerHTML = "Welcome Back - " + userInfo.firstName + "!";
		  	} 
		  	else if (window.location.href.indexOf('project.html') > 0) {  		
		  		if (selectedProject != undefined) {
					document.getElementById("top").innerHTML = selectedProjectDescription;
		  		} else {
					window.location = 'https://thechadturner.github.io/coursera-test/Okta/Index/login.html'; 
		  		}	
		  	}
	  	}
	  	else
	  	{
	  		window.location = 'https://thechadturner.github.io/coursera-test/Okta/Index/denied.html'; 
	  	}
	  });

	  return;
	} 
	else 
	{
		window.location = 'https://thechadturner.github.io/coursera-test/Okta/Index/login.html'; 
	}
});