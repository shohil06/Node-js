var fs = require('fs'),
   readline = require('readline');
   var i=0,a=0,b=0,h=0;
   var lin;
   var arr1={};
   var arr2={};
   var ar={};
   var ar2={};
   var year;
   var k=0;
   var type=0,value=0,arrest=0;
   var year="";
   var tot=[];
   var tot2=[];
   var rd = readline.createInterface({
   input: fs.createReadStream('Crime.csv'),
   output: process.stdout,
   terminal: false
   });

rd.on('line', function(line)
{
    if(i==0)
    {
      lin=line.split(",");
     for(var j=0;j<lin.length;j++)
     {
       if(lin[j]=="Year"){
         year=j;
       }
      if(lin[j]=="IndicatorName"){
         type=j;
       }
       if(lin[j]=="Value"){
         value=j;
       }
     }
     i++;
   }

var lin2=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
if(lin2[year]>=1960)
{

   if((lin2[type]=="Life expectancy at birth, male (years)" )|| (lin2[type]=="Life expectancy at birth, female (years)"))
   {
     var test=funtest(lin2[year]);
     if(lin2[des]=="OVER $500"){
       ar[lin2[year]].o= ar[lin2[year]].o+ 1;
     }
      if(lin2[des]=="$500 AND UNDER"){
       ar[lin2[year]].u=ar[lin2[year]].u+ 1;
      }
      arr1[lin2[year]]={
        "over":ar[lin2[year]].o,
        "under":ar[lin2[year]].u
       };
   }
   else if(lin2[type]=="ASSAULT"){
     var test2=funtest2(lin2[year]);
     if(lin2[arrest]=="true"){
       ar2[lin2[year]].t= ar2[lin2[year]].t+ 1;
     }
     else if(lin2[arrest]=="false"){
       ar2[lin2[year]].f= ar2[lin2[year]].f+ 1;
     }
     arr2[lin2[year]]={
       "Arrest":ar2[lin2[year]].t,
       "Not Arrest":ar2[lin2[year]].f
      };
   }

}

});
rd.on('close', function() {
 // console.log(arr1);
 // console.log(arr2);

   var file=JSON.stringify(arr1);
   fs.writeFile("part_1_json",file,"utf8",function(error){
     if(error)
     throw error;
     });
     var file=JSON.stringify(arr2);
   fs.writeFile("part_2_json",file,"utf8",function(error){
     if(error)
     throw error;
 });

});

function funtest(l){
 if(tot.indexOf(l)==-1){
   tot.push(l);
 ar[l]={
   o:0,
   u:0
 };
}
}

function funtest2(l){
 if(tot2.indexOf(l)==-1){
   tot2.push(l);
 ar2[l]={
   t:0,
   f:0
 };
}
}
