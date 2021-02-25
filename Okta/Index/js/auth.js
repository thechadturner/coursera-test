oktaSignIn.session.get(function (res) {
	// If we get here, the user is already signed in.
	if (res.status === 'ACTIVE') {
	  getUserInfo().done(function(output){
	  	let userInfo = parseUserInfo(output)
	  	getGroupInfo(userInfo.id)

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