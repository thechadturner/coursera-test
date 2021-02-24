var redirectUrl = 'https://thechadturner.github.io/coursera-test/Okta/Index/user.html';

var oktaSignIn = new OktaSignIn({
    baseUrl: "https://dev-49934482.okta.com",
    clientId: "0oa7yhklz0BvikmFq5d6",
    authParams: {
      issuer: "default",
      responseType: ['token', 'id_token'],
      display: 'page'
    }
  });

if (oktaSignIn.token.hasTokensInUrl()) {
  oktaSignIn.token.parseTokensFromUrl(
    // If we get here, the user just logged in.
    function success(res) {
    	console.log("recent sign in..." + res.status) 
		redirect(res)
    },
    function error(err) {
      console.error(err);
    }
  );
} 
else 
{
  oktaSignIn.session.get(function (res) {
  	console.log("already signed in..." + res.status) 

	// If we get here, the user is already signed in.
  	if (redirect(res) === False) {
  		oktaSignIn.renderEl(
	      { el: '#okta-login-container' },
	      function success(res) {
			redirect(res)
	      },
	      function error(err) {
	        console.error(err);
	      }
	    );
  	}    
  });
}

function redirect(res) {
	if (res.status === 'SUCCESS' || res.status === 'ACTIVE') {
    	console.log("redirecting...") 
		window.location = redirectUrl;

		return true
    }
    else
    {
    	return false
    }
}

function logout() {
  console.log("signing out...")
  oktaSignIn.signOut();
  window.location = 'https://thechadturner.github.io/coursera-test/Okta/index.html';
}

