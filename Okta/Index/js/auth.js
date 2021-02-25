oktaSignIn.session.get(function (res) {
	// If we get here, the user is signed in.
	if (res.status === 'ACTIVE') {
	  getUserInfo().done(function(output){
	  	let userInfo = parseUserInfo(output)
	  	getGroupInfo(userInfo.id)

	  	document.getElementById("back").innerHTML = "<a href='#' onclick='logout()'><h3>Logout</h3></a>";

	  	if (window.location.href.indexOf('user.html') > 0) {
	  		document.getElementById("top").innerHTML = "Welcome Back - " + userInfo.firstName + "!";
	  	} 
	  	else if (window.location.href.indexOf('project.html') > 0) {
	  		if (selectedProject != undefined) {
				document.getElementById("top").innerHTML = selectedProject;
	  		} else {
				window.location = 'https://thechadturner.github.io/coursera-test/Okta/Index/login.html'; 
	  		}	
	  	}
	  });

	  return;
	} 
	else 
	{
		window.location = 'https://thechadturner.github.io/coursera-test/Okta/Index/login.html'; 
	}
});