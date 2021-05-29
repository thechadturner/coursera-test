var redirectUrl = dns + 'Index/user.html';

if (oktaSignIn.token.hasTokensInUrl()) {
  oktaSignIn.token.parseTokensFromUrl(
    // If we get here, the user just logged in.
    function success(res) {
    	var accessToken = res[0];
        var idToken = res[1];

        oktaSignIn.tokenManager.add('accessToken', accessToken);
        oktaSignIn.tokenManager.add('idToken', idToken);

        console.log('logged in');
        // console.log(redirectUrl);
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
	// If we get here, the user is already signed in.
  	if (res.status === 'ACTIVE') {
  		console.log('already logged in');
  		// console.log(redirectUrl);
  		window.location = redirectUrl;

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



