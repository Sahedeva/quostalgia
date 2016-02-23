console.log("%c                                                 \n           __..--''``\\--....___   _..,_          \n       _.-'    .-/\";  `        ``<._  ``-+'~=.   \n   _.-' _..--.'_    \\                    `(^) )  \n  ((..-'    (< _     ;_..__               ; `'   \n             `-._,_)'      ``--...____..-'       \n                                                 \n                                                 \n            consoleCat - by Bob                  \n                                                 ", "color:yellow;background-color:black;");

$('#loginForm').on('submit', function(){
	var name = $("#loginName").val();
	var password = $("#loginPassword").val();
	console.log(name,password);
	return false;
});

$('#registerForm').on('submit', function(){
	var name = $("#registerName").val();
	var password = $("#registerPassword").val();
	var avatarUrl = $("#registerAvatar").val();
	console.log(name,password,avatarUrl);
	return false;
});
