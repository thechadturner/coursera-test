var oktaSignIn = new OktaSignIn({
  baseUrl: "https://dev-49934482.okta.com",
  clientId: "0oa7yhklz0BvikmFq5d6",
  authParams: {
    issuer: "default",
    responseType: ['token', 'id_token'],
    display: 'page'
  }
});

// var userID = undefined;
// var userFirstName = undefined;
// var userLastName = undefined;
// var userLogin = undefined;
// var userEmail = undefined;
// var lastlogin = undefined;
// var status = undefined;

function parseUserInfo(obj) {
	let userInfo = {}
	//console.log(obj)

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

							//userFirstName = v_str
							//console.log(k_str,v_str);

							userInfo.firstName = val_str;
						}
						else if (k_str === 'lastName') {
							var v_str = v.toString().trim()

							//userLastName = v_str
							//console.log(k_str,v_str);

							userInfo.lastName = val_str;
						}
						else if (k_str === 'login') {
							var v_str = v.toString().trim()

							//userLogin = v_str
							//console.log(k_str,v_str);

							userInfo.login = val_str;
						}
						else if (k_str === 'email') {
							var v_str = v.toString().trim()

							//userEmail = v_str
							//console.log(k_str,v_str);

							userInfo.email = val_str;
						}
					}
				}
			}
			else if (key_str === 'id') {
				var val_str = val.toString().trim()

				//userID = val_str
				//console.log(key_str,val_str);

				userInfo.id = val_str;
			}
			else if (key_str === 'lastLogin') {
				var val_str = val.toString().trim()

				//lastLogin = val_str
				//console.log(key_str,val_str);

				userInfo.lastLogin = val_str;
			}
			else if (key_str === 'status') {
				var val_str = val.toString().trim()

				//status = val_str
				//console.log(key_str,val_str);

				userInfo.status = val_str;
			}
		}
	}

	console.log(userInfo)
	return userInfo
}

function parseGroupInfo(obj) {
	let groups = []

	for (var r in obj) {
		var row = obj[r]

		for(var key in row) {
			if (typeof key === 'string' || key instanceof String) {
				var key_str = key.toString().trim()
				var val = row[key];

				if (key_str === 'profile') {
					for(var k in val){
						if (typeof k === 'string' || k instanceof String) {
							var k_str = k.toString().trim()
							var v = val[k];

							if (k_str === 'name') {
								var v_str = v.toString().trim()

								if (v_str != 'Everyone') {
									groups.push(v_str);
								}
							}
						}
					}
				}
			}
		}
	}

	return groups;
}

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

function getGroupInfo(userID) {
    return $.ajax({
	    url: "https://dev-49934482.okta.com/api/v1/users/"+userID+"/groups",
	    type: 'GET',
	    dataType: 'json',
	    contentType: 'application/json',
	    xhrFields: {
	        withCredentials: true
	    },
	    success: function (res) {
	    	var groups = parseGroupInfo(res)
	    	console.log(groups)
	    }
	});
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

      getUserInfo().done(function(output){
		let userInfo = parseUserInfo(output)
		getGroupInfo(userInfo.id)
		document.getElementById("messageBox").innerHTML = "You have successfully logged in under the user name: " + userInfo.firstName + "! :)";
	  });
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
	  getUserInfo().done(function(output){
      	let userInfo = parseUserInfo(output)
      	getGroupInfo(userInfo.id)
      	document.getElementById("messageBox").innerHTML = "Howdy " + userInfo.firstName + "! You are logged in! :)";
	  });

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