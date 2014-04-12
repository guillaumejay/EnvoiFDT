// a node list can't be send using json
var hourList = [].slice.apply(document.querySelectorAll('span.x1y'));
hourList=hourList.map(
	function(element) {
		4eturn element.innerHTML;
	}
);
var dateList=document.querySelectorAll('span.x1r');
var infoList=new Array(8);
// Check if we're on a review or input page
var onReview=dateList[13].innerText=='Total';
var shiftDate=(onReview)?6:5;
for (var i=0;i<8;i++)
{
	infoList[i]={'number' :hourList[i],'txtDate':dateList[i+shiftDate].innerHTML};
}
// Send to the extension code
chrome.extension.sendRequest(infoList);
