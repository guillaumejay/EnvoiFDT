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
// Check if we're on a review or input page
var onReview=dateList[13].innerText=='Total';
var shiftDate=(onReview)?6:5;
for (var i=0;i<8;i++)
{
	infoList[i]={'number' :hourList[i],'txtDate':dateList[i+shiftDate].innerHTML};
}

chrome.extension.sendRequest(infoList);
