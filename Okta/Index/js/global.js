var oktaSignIn = new OktaSignIn({
    baseUrl: "https://dev-49934482.okta.com",
    clientId: "0oa91qqhzQkCZrZ2R5d6",
    authParams: {
      issuer: "default",
      responseType: ['token', 'id_token'],
      display: 'page'
    }
  });

function logout() {
  console.log("signing out...")
  oktaSignIn.signOut();
  window.location = 'https://thechadturner.github.io/coursera-test/Okta/index.html';
}

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
							userInfo.firstName = v_str;
						}
						else if (k_str === 'lastName') {
							var v_str = v.toString().trim()
							userInfo.lastName = v_str;
						}
						else if (k_str === 'login') {
							var v_str = v.toString().trim()
							userInfo.login = v_str;
						}
						else if (k_str === 'email') {
							var v_str = v.toString().trim()
							userInfo.email = v_str;
						}
					}
				}
			}
			else if (key_str === 'id') {
				var val_str = val.toString().trim()
				userInfo.id = val_str;
			}
			else if (key_str === 'lastLogin') {
				var val_str = val.toString().trim()
				userInfo.lastLogin = val_str;
			}
			else if (key_str === 'status') {
				var val_str = val.toString().trim()
				userInfo.status = val_str;
			}
		}
	}

	//console.log(userInfo)
	return userInfo
}

function parseGroupInfo(obj) {
	let groups = []
	//console.log(obj)

	for (var r in obj) {
		var row = obj[r]

		for(var key in row) {
			if (typeof key === 'string' || key instanceof String) {
				var key_str = key.toString().trim()
				var val = row[key];

				if (key_str === 'profile') {
					let groupinfo = {}

					for(var k in val){
						if (typeof k === 'string' || k instanceof String) {
							var k_str = k.toString().trim()
							var v = val[k];

							if (k_str === 'name') {
								var v_str = v.toString().trim()

								if (v_str != 'Everyone') {
									groupinfo.name = v_str;
								}
							} else if (k_str === 'description') {
								var v_str = v.toString().trim()

								if (v_str != 'All users in your organization') {
									groupinfo.description = v_str;
								}
							}
						}
					}

					groups.push(groupinfo)
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
	    }
	});
}