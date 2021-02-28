var redirectUrl = 'https://thechadturner.github.io/coursera-test/Okta/Index/user.html';

if (oktaSignIn.token.hasTokensInUrl()) {
  oktaSignIn.token.parseTokensFromUrl(
    // If we get here, the user just logged in.
    function success(res) {
    	var accessToken = res[0];
        var idToken = res[1];

        oktaSignIn.tokenManager.add('accessToken', accessToken);
        oktaSignIn.tokenManager.add('idToken', idToken);

        console.error('logged in');

		// window.location = redirectUrl;
    },
    function error(err) {
      console.error(err);
    }
  );
} 
else 
{
  oktaSignIn.session.get(function (res) {
  	console.log("already signed in..." + res.status);

	// If we get here, the user is already signed in.
  	if (res.status === 'ACTIVE') {
  		console.error('already logged in');
  		
		// window.location = redirectUrl;
		return;
    }

	oktaSignIn.renderEl(
      { el: '#okta-login-container' },
      function success(res) {
      },
      function error(err) {
        console.error(err);
      }
    );
 
  });
}

function getInfo() {
	getUserInfo().done(function(useroutput){
		let userInfo = parseUserInfo(useroutput);
			sessionStorage.setItem("userInfo", JSON.stringify(userInfo))

			console.log(userInfo)

			let labeltext = userInfo.firstName + "'s Projects"
			document.getElementById("back").innerHTML = "<a href='Index/user.html'><h3>"+labeltext+"</h3></a>"; 

	  	getGroupInfo(userInfo.id).done(function(groupoutput){
			let groups = parseGroupInfo(groupoutput);
			sessionStorage.setItem("projects", JSON.stringify(groups));
	  	});
	});

	let groups = JSON.parse(sessionStorage.getItem("projects"))
	console.log(groups)
}

getInfo()



