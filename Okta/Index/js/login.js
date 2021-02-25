var redirectUrl = 'https://thechadturner.github.io/coursera-test/Okta/Index/user.html';

if (oktaSignIn.token.hasTokensInUrl()) {
  oktaSignIn.token.parseTokensFromUrl(
    // If we get here, the user just logged in.
    function success(res) {
    	var accessToken = res[0];
        var idToken = res[1];

        oktaSignIn.tokenManager.add('accessToken', accessToken);
        oktaSignIn.tokenManager.add('idToken', idToken);

        window.location.hash='';

		console.log("success! redirecting...");
		window.location = redirectUrl;
    },
    function error(err) {
      console.error(err);
    }
  );
} 
else 
{
  oktaSignIn.session.get(function (res) {
  	console.log(res);
  	console.log("already signed in..." + res.status);

	// If we get here, the user is already signed in.
  	if (res.status === 'ACTIVE') {
    	console.log("redirecting...");
		window.location = redirectUrl;
		return;
    }

	oktaSignIn.renderEl(
      { el: '#okta-login-container' },
      function success(res) {
      	console.log("redirecting...");
      	res.session.setCookieAndRedirect(redirectUrl);
      },
      function error(err) {
        console.error(err);
      }
    );
 
  });
}

