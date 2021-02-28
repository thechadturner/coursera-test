oktaSignIn.session.get(function (res) {
	// If we get here, the user is signed in.
	if (res.status === 'ACTIVE') {
	    getUserInfo().done(function(useroutput){
	    	let userInfo = parseUserInfo(useroutput);
	  		sessionStorage.setItem("userInfo", JSON.stringify(userInfo))

	  		let labeltext = userinfo.firstName + "'s Projects"
	  		document.getElementById("back").innerHTML = "<a href="Index/user.html"><h3>"+labeltext+"</h3></a>"; 

		  	getGroupInfo(userInfo.id).done(function(groupoutput){
				let groups = parseGroupInfo(groupoutput);
				sessionStorage.setItem("projects", JSON.stringify(groups));
		  	});
	    });

	  return;
	} 
	else 
	{
		document.getElementById("back").innerHTML = "<a href="Index/login.html"><h3>Login</h3></a>"; 
	}
});