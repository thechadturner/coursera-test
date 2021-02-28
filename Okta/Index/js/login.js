var redirectUrl = 'https://thechadturner.github.io/coursera-test/Okta/Index/user.html';

if (oktaSignIn.token.hasTokensInUrl()) {
  oktaSignIn.token.parseTokensFromUrl(
    // If we get here, the user just logged in.
    function success(res) {
    	var accessToken = res[0];
        var idToken = res[1];

        oktaSignIn.tokenManager.add('accessToken', accessToken);
        oktaSignIn.tokenManager.add('idToken', idToken);

        console.log('logged in');
    },
    function error(err) {
      console.error(err);
    }
  );
} 
else 
{
  oktaSignIn.session.get(function (res) {
	// If we get here, the user is already signed in.
  	if (res.status === 'ACTIVE') {
  		console.log('already logged in');

		return;
    }

	oktaSignIn.renderEl(
      { el: '#okta-login-container' },
      function success(res) {
      	getInfo();
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

	  	getGroupInfo(userInfo.id).done(function(groupoutput){
			let groups = parseGroupInfo(groupoutput);
			sessionStorage.setItem("projects", JSON.stringify(groups));
	  	});
	});

	let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
	console.log(userInfo)
	// if (userInfo.status = 'ACTIVE') {
	// 	window.location = redirectUrl;
	// }
}

//getInfo()



