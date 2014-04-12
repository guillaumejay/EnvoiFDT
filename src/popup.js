function sendEmail() {
	var signature=document.getElementById('signature').value;
	var toEmail=document.getElementById('toEmail').value;
	var body=document.getElementById('emailBody').value;
	chrome.storage.sync.set({"signature": signature});
	chrome.storage.sync.set({"toEmail": toEmail});
	body+="\r\n" + signature;
	var emailUrl= "mailto:" + toEmail + "?subject=" + encodeURIComponent("Ma Feuille De Temps") + "&body=";
	emailUrl+=encodeURIComponent(body);
	var wnd = window.open(emailUrl,"_blank");
	setTimeOut(function() { wnd.close();}, 500);  
}

chrome.extension.onRequest.addListener(function(infoList) {
	var texte="Bonjour\r\n\r\nVoici ma feuille de temps :\r\n" + infoList[0].txtDate + "&agrave" + infoList[6].txtDate;
	texte+="\r\n\r\n";
	for (var i=0;i<8;i++)	{
		texte+=infoList[i].txtDate + " : " + infoList[i].number + "\r\n";
	}
	var element=document.getElementById('emailBody');
	texte+="\r\nMerci et bonne journ&eacute;e";
	element.innerHTML=texte;
});

document.addEventListener('DOMContentLoaded', function () {
  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query({active: true, windowId: currentWindow.id},
                      function(activeTabs) {
      chrome.tabs.executeScript(
        activeTabs[0].id, {file: 'contentscript.js', allFrames: false});
    });
	chrome.storage.sync.get("signature", function(result)  {
		if (Object.getOwnPropertyNames(result).length > 0)  {
		document.getElementById('signature').value=result.signature;
		}
	});
	chrome.storage.sync.get("toEmail", function(result){
		var email=result.toEmail;
		if (Object.getOwnPropertyNames(result).length == 0) {
		result.toEmail="ft@vob-ti.com";
	}
	document.getElementById('toEmail').value=result.toEmail;
	});
	});
  document.getElementById('sendEmail').onclick = sendEmail;
 });