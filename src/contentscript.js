// a node list can't be send using json
console.log("testtest");
var hourList = [].slice.apply(document.querySelectorAll('span.x1y'));
hourList=hourList.map(
function(element) {
  return element.innerHTML;
  }
);
var dateList=document.querySelectorAll('span.x1r');
var infoList=new Array(8);
for (var i=0;i<8;i++)
{
	infoList[i]={'number' :hourList[i],'txtDate':dateList[i+5].innerHTML};
}

chrome.extension.sendRequest(infoList);
