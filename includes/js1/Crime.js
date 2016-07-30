console.time("Chicago Crime Data");
var Uniarr=[];
var cntArray=[6000];
for (var i = 0; i <6000; i++)
{
  cntArray[i]=0;
}
var getRequirement=1 , descriptionPos , theftPos , countOver=0 , countUnder=0 , yearPos;
var theft="Primary Type" , description="Description" , year="Year" , theft1="THEFT" , theftOver="OVER $500" , theftUnder="$500 AND UNDER";
const readline = require('readline');
var fs=require('fs');
var rl = readline.createInterface({
   input: fs.createReadStream('Crimes_-_2001_to_present.csv')
  //  output: process.stdout,
  //  terminal: false
});
rl.on('line', function(line) {
  arr=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);;
  // var arr=arr;
  // console.log(arr);
  while((getRequirement > 0))
  {
    if(arr.indexOf(theft)!=-1)
      {
        descriptionPos=arr.indexOf(theft);
        // console.log(descriptionPos);
      }
    if(arr.indexOf(description)!=-1)
      {
        theftPos=arr.indexOf(description);
        // console.log(theftPos);
      }
    if(arr.indexOf(year)!=-1)
      {
        yearPos=arr.indexOf(year);
        // console.log(yearPos);
      }
      getRequirement = getRequirement - 1;
    }

  if( (arr[descriptionPos].indexOf(theft1)!=-1) && ( (arr[theftPos].indexOf(theftOver)!=-1) || (arr[theftPos].indexOf(theftUnder)!=-1) ) && (2001<=arr[yearPos]<=2016) )
  {
      if(arr[theftPos].indexOf(theftOver)!=-1)
      {
        cntArray[arr[yearPos] * 2]++;
      }
      if(arr[theftPos].indexOf(theftUnder)!=-1)
      {
        cntArray[arr[yearPos]]++;
      }
  }
  else
  {
    return 0;
  }
});
rl.on('close', function() {
  var obj=[];
  for (var i = 2000; i<2017; i++)
  {
    if((cntArray[i]!=0)&&(i<2017))
    {
      var temp={};
      temp['Year']=i;
      temp['$500 AND UNDER']=cntArray[i];
      temp['OVER $500']=cntArray[i*2];
      obj.push(temp);
      delete temp;
    }
  }
  console.timeEnd("Chicago Crime Data");;
  // var random=JSON.stringify(obj1);
  // fs.appendFile('indica 1.json',random);
});
