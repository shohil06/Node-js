var posCountryName, pos_expec, pos_year, posValue;
var floatValues=[];
var country="CountryName" , indicator="IndicatorName" , year="Year", lifeTotal="Life expectancy at birth, total (years)",Value="Value" ;
const readline = require('readline');
var fs=require('fs');
const r2 = readline.createInterface({
  input: fs.createReadStream('../../Indicators/Indicators.csv')
});
r2.on('line', function(line) {
    arr1=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    if(arr1.indexOf(country)!=-1)
    {
      posCountryName=arr1.indexOf(country);
    }
    if(arr1.indexOf(indicator)!=-1)
    {
      pos_expec=arr1.indexOf(indicator);
    }
    if (arr1.indexOf(year)!=-1)
    {
      pos_year=arr1.indexOf(year);
    }
    if(arr1[pos_year]==1960)
    {
      if(arr1[pos_expec].indexOf(lifeTotal)!=-1)
        {
          var obj={};
          obj['Country']=arr1[posCountryName];
          obj['value']=arr1[5];
          floatValues.push(obj);
        }
    }
});
r2.on('close', function() {
  floatValues.sort(function(a, b){return b.value-a.value});
  var bray=[];
  bray.push(floatValues[0]);
  bray.push(floatValues[1]);
  bray.push(floatValues[2]);
  bray.push(floatValues[3]);
  bray.push(floatValues[4]);
  // var random=JSON.stringify(bray);
  // fs.appendFile('../../Indicators/indica 2.json',random);
});
