var oktaSignIn = new OktaSignIn({
  baseUrl: "https://dev-49934482.okta.com",
  clientId: "0oa7yhklz0BvikmFq5d6",
  authParams: {
    issuer: "default",
    responseType: ['token', 'id_token'],
    display: 'page'
  }
});

// function getUserInfo() {
// 	return Promise.resolve(jQuery.ajax({
// 	    url: "https://dev-49934482.okta.com/api/v1/users/me",
// 	    type: 'GET',
// 	    dataType: 'json',
// 	    contentType: 'application/json',
// 	    xhrFields: {
// 	        withCredentials: true
// 	    }
// 	}));
// };

// var output = "";
// $.ajax({
//     url: "/controller/GetOutput",
//     type: 'Get',
//     dataType: "json",

//     success: function (result) {
//         output = result; 
//     },
//     error: function failCallBk(XMLHttpRequest, textStatus, errorThrown) {
//         alert("An error occurred while processing your request. Please try again.");
//     }
// });

function getUserInfo() {
	var output = null;

    $.ajax({
	    url: "https://dev-49934482.okta.com/api/v1/users/me",
	    type: 'GET',
	    dataType: 'json',
	    contentType: 'application/json',
	    xhrFields: {
	        withCredentials: true
	    },
	    success: function (res) {
			output = res;
	    },
	    error: function (err) {
	    	console.log(err);
	    }
	});

	return output;
}

if (oktaSignIn.token.hasTokensInUrl()) {
  oktaSignIn.token.parseTokensFromUrl(
    // If we get here, the user just logged in.
    function success(res) {
      var accessToken = res[0];
      var idToken = res[1];
      
      oktaSignIn.tokenManager.add('accessToken', accessToken);
      oktaSignIn.tokenManager.add('idToken', idToken);

      window.location.hash='';
      document.getElementById("messageBox").innerHTML = "You have successfully logged in under the user name: " + idToken.claims.email + "! :)";
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
      var userinfo = getUserInfo()
      console.log(userinfo)

      document.getElementById("messageBox").innerHTML = "Hello, " + res.login + "! You are logged in! :)";
      return;
    }

    oktaSignIn.renderEl(
      { el: '#okta-login-container' },
      function success(res) {},
      function error(err) {
        console.error(err);
      }
    );
  });
}

function logout() {
  console.log("signing out...")
  oktaSignIn.signOut();
  oktaSignIn.show();
  location.reload()
}

function info() {
	jQuery.ajax({
	    url: "https://dev-49934482.okta.com/api/v1/users/me",
	    type: 'GET',
	    dataType: 'json',
	    contentType: 'application/json',
	    xhrFields: {
	        withCredentials: true
	    },
	    success: function (data) {
	        console.log(data);
	    },
	    error: function(err){
	        console.log(JSON.stringify(err));
	    }
	});
}