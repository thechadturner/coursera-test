let selectedProject = localStorage.getItem("selectedProject")

if (window.location.href.indexOf('project.html') > 0) {
	document.getElementById("top").innerHTML = selectedProject;
}

oktaSignIn.session.get(function (res) {
	// If we get here, the user is signed in.
	if (res.status === 'ACTIVE') {
	    getUserInfo().done(function(useroutput){
	    	let userInfo = parseUserInfo(useroutput);
	  		sessionStorage.setItem("userInfo", userInfo)

		  	getGroupInfo(userInfo.id).done(function(groupoutput){
				let groups = parseGroupInfo(groupoutput);
				sessionStorage.setItem("projects", groups);

				let allowaccess = false;
				groups.forEach(group => {
					if (group.name === selectedProject) {
						allowaccess = true;

						if (window.location.href.indexOf('project.html') > 0) {
					  		if (selectedProject === undefined) {
								window.location = 'https://thechadturner.github.io/coursera-test/Okta/Index/login.html'; 
					  		}	
					  	}

						return;
					}
				});

				if (allowaccess === false) {
					window.location = 'https://thechadturner.github.io/coursera-test/Okta/Index/denied.html'; 
				}
		  	});
	    });

	  return;
	} 
	else 
	{
		window.location = 'https://thechadturner.github.io/coursera-test/Okta/Index/login.html'; 
	}
});