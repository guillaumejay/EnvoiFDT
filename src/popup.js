function sendEmail() {
  var fromEmail=document.getElementById('fromEmail').value;
  var toEmail=document.getElementById('toEmail').value;
  var body=document.getElementById('emailBody').value;
  
}
//https://developer.chrome.com/extensions/tut_oauth
chrome.extension.onRequest.addListener(function(infoList) {
	// var element=document.getElementById('totalh');
	// element.innerHTML=infoList[7].number;
	console.log('test');
	var texte="Bonjour\r\n\r\nVoici ma feuille de temps :\r\n" + infoList[0].txtDate + "&aacute" + infoList[6].txtDate;
	texte+="\r\n\r\n";
	for (var i=0;i<8;i++)
	{
		texte+=infoList[i].txtDate + " : " + infoList[i].number + "\r\n";
	}
	var element=document.getElementById('emailBody');
	texte+="\r\nBonne journ&eacute;e";
	element.innerHTML=texte;
});


document.addEventListener('DOMContentLoaded', function () {
  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query({active: true, windowId: currentWindow.id},
                      function(activeTabs) {
					  console.log("et la haut");
      chrome.tabs.executeScript(
        activeTabs[0].id, {file: 'contentscript.js', allFrames: false});
    });
  chrome.storage.sync.get("fromEmail", function(result)
  {
  if (Object.getOwnPropertyNames(result).length > 0)  {
  
	document.getElementById('fromEmail').value=result.fromEmail;
	}
  });
  chrome.storage.sync.get("toEmail", function(result)
  {
	var email=result.toEmail;
    if (Object.getOwnPropertyNames(result).length == 0) {
	result.toEmail="ft@vob-ti.com";
  }
	document.getElementById('toEmail').value=result.toEmail;
  });

 
  document.getElementById('sendEmail').onclick = sendEmail();
});
 });