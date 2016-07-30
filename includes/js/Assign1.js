var Uniarr=[];
var countryPosition, indicatorPosition , yearPosition , valuePosition;
var country="CountryName" , indicator="IndicatorName" , year="Year" , lifeMale="Life expectancy at birth, male (years)" , lifeFemale="Life expectancy at birth, female (years)";
var cntryName=["Afghanistan","Armenia","Azerbaijan","Bahrain","Bangladesh","Bhutan","Brunei","Cambodia","China","Taiwan","East Timor","India","Indonesia","Iran","Iraq","Israel","Palestine","Japan","Jordan","Kazakhstan","Kuwait","Kyrgyzstan","Laos","Lebanon","Malaysia","Maldives","Mongolia","Myanmar","Nepal","North Korea","Oman","Pakistan","Philippines","Qatar","Russia","Saudi Arabia","Singapore","South Korea","Sri Lanka","Syria","Tajikistan","Thailand","Taiwan","Turkey","Turkmenistan","United Arab Emirates","Uzbekistan","Vietnam","Yemen"];
var years=[];
var yearsData=[];
var maleCount=0 , femaleCount=0 , maleTotal=0 , femaleTotal=0;

const readline = require('readline');
var fs=require('fs');
const rl = readline.createInterface({
  input: fs.createReadStream('../../Indicators/Indicators.csv')
});
rl.on('line', function(line) {
  arr=line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
  if(arr.indexOf(country)!=-1)
  {
    countryPosition=arr.indexOf(country);
    // console.log(arr[countryPosition]);
  }
  if(arr.indexOf(indicator)!=-1)
  {
    indicatorPosition=arr.indexOf(indicator);
    // console.log(arr[indicatorPosition]);
  }
  if (arr.indexOf(year)!=-1)
  {
    yearPosition=arr.indexOf(year);
    // console.log(arr[yearPosition]);
  }
  // function yearsData(year,maleTotal,maleCount,femaleTotal,femaleCount)
  // {
  //   this.year='year';
  //   this.maleTotal='maleTotal';
  //   this.maleCount='maleCount';
  //   this.femaleTotal='femaleTotal';
  //   this.femaleCount='femaleCount';
  // }

  if(cntryName.indexOf(arr[countryPosition])!=-1)
  {
    // console.log("Hiii!");
    if((arr[indicatorPosition].indexOf(lifeMale)) || (arr[indicatorPosition].indexOf(lifeFemale)))
    {
      // console.log("hi i m here!");
      if(years.indexOf(arr[yearPosition])!=-1)
      {
          var index=years.indexOf(arr[yearPosition]);
          // console.log(index);
          // yearsData[index]=
      }
      else
      {
        if((arr[indicatorPosition].indexOf(lifeMale)))
        {
          maleTotal=maleTotal+ (+(arr[arr.length-1]));
          ++maleCount;
          console.log(maleTotal);
          // console.log(maleCount);
          // var obj={};
          // obj['year']=arr[yearPosition];
          // obj['Male']=maleTotal/maleCount;
          // obj['Female']=femaleTotal/femaleCount;
          // new yearsData(arr[yearPosition],maleTotal,maleCount,femaleTotal,femaleCount);
        }
        else if((arr[indicatorPosition].indexOf(lifeFemale)))
        {
          femaleTotal=femaleTotal+ (+(arr[arr.length-1]));
          ++femaleCount;
          console.log(femaleTotal);
          // var obj=new yearsData(arr[yearPosition],maleTotal,maleCount,femaleTotal,femaleCount);
          // var obj={};
          // obj['year']=arr[yearPosition];
          // obj['Male']=maleTotal/maleCount;
          // obj['Female']=femaleTotal/femaleCount;
        }
        var obj={};
        obj['year']=arr[yearPosition];
        obj['Male']=maleTotal/maleCount;
        obj['Female']=femaleTotal/femaleCount;
        // console.log(obj);
        years.push(arr[yearPosition]);
        yearsData.push(obj);
        delete obj;
      }
    }
  }
});
