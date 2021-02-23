var oktaSignIn = new OktaSignIn({
  baseUrl: "https://dev-49934482.okta.com",
  clientId: "0oa7yhklz0BvikmFq5d6",
  authParams: {
    issuer: "default",
    responseType: ['token', 'id_token'],
    display: 'page'
  }
});

var userInfo = undefined;
var userFirstName = undefined;
var userLastName = undefined;
var userLogin = undefined;
var lastlogin = undefined;
var status = undefined;

function findValues(obj, key) {
	console.log(obj)

	for(var key in obj){
		if (typeof key === 'string' || key instanceof String) {
			var key_str = key.toString().trim()
			var val = obj[key];

			if (key_str === 'profile') {
				for(var k in val){
					if (typeof k === 'string' || k instanceof String) {
						var k_str = k.toString().trim()
						var v = val[k];

						if (k_str === 'firstName') {
							var v_str = v.toString().trim()
							console.log(v_str)

							userFirstName = v_str
						}
						else if (k_str === 'lastName') {
							var v_str = v.toString().trim()

							userLastName = v_str
						}
						
						console.log(k,v);
					}
				}
			}
			else if (key_str === 'lastLogin') {
				var val_str = val.toString().trim()
				lastLogin = val_str

				console.log(key_str,val_str);
			}
			else if (key_str === 'status') {
				var val_str = val.toString().trim()
				status = val_str

				console.log(key_str,val_str);
			}
		}
	}
}

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

function getUserInfo() {
    return $.ajax({
	    url: "https://dev-49934482.okta.com/api/v1/users/me",
	    type: 'GET',
	    dataType: 'json',
	    contentType: 'application/json',
	    xhrFields: {
	        withCredentials: true
	    },
	    success: function (res) {
	    }
	});
}

if (oktaSignIn.token.hasTokensInUrl()) {
  oktaSignIn.token.parseTokensFromUrl(
    // If we get here, the user just logged in.
    function success(res) {
      var accessToken = res[0];
      var idToken = res[1];

      getUserInfo().done(function(res){
		userInfo = res;
	  });
      
      oktaSignIn.tokenManager.add('accessToken', accessToken);
      oktaSignIn.tokenManager.add('idToken', idToken);

      window.location.hash='';
      document.getElementById("messageBox").innerHTML = "You have successfully logged in under the user name: " + userFirstName + "! :)";
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
	  getUserInfo().done(function(res){
      	userInfo = res;

      	findValues(userInfo,'profile')
	  });

      document.getElementById("messageBox").innerHTML = "Howdy " + userFirstName + "! You are logged in! :)";
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