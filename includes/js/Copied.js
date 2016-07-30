var lin;
var fs = require('fs'),
   readline = require('readline');
var rd = readline.createInterface({
   input: fs.createReadStream('Indicators.csv'),
   output: process.stdout,
   terminal: false
});
/*function Con_fm(year){
    this.male=0;
    this.female=0;
    this.year=year;
}*/
var countryName=["Afghanistan","Armenia","Azerbaijan","Bahrain","Bangladesh","Bhutan","Brunei Darussalam","Cambodia","China","India","Indonesia","Iran, Islamic Rep.","Iraq","Israel","Palestine","Japan","Jordan","Kazakhstan","Kuwait","Lebanon","Malaysia","Maldives","Mongolia","Myanmar","Nepal","Oman","Pakistan","Philippines","Qatar","Russian Federation","Saudi Arabia","Singapore","Sri Lanka","Syrian Arab Republic","Tajikistan","Thailand","Turkey","Turkmenistan","United Arab Emirates","Uzbekistan","Vietnam","Yemen, Rep."];
var i=0,k=new Array(),delta=1;
for(i=1960;i<2015;i++)
{
    k[i]=0;
}
var obj1=[];
var header=[];
rd.on('line', function(line) {
        lin=line;
       temp=lin.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
       if(delta==1)
       {
           header=temp;
           delta=0;
       }
        if(countryName.indexOf(temp[0])!=-1)
        {
            //  console.log(temp);
            if ((temp[2]=='"Life expectancy at birth, female (years)"')||( temp[2]=='"Life expectancy at birth, male (years)"'))
            {
                if(k[(+(temp[4]))]!=0)
                {
                    for(i=0;i<obj1.length;i++)
                    {
                        if(obj1[i].year==temp[4])
                        {
                            if(temp[2]==='"Life expectancy at birth, female (years)"')
                            {
                                obj1[i].female = obj1[i].female+(+(temp[5]));
                                    // console.log(obj1[i].female);
                                        k[(+(temp[4]))]++;
                            }
                            else if(temp[2]==='"Life expectancy at birth, male (years)"')
                            {
                                obj1[i].male = obj1[i].male +(+(temp[5]));
                                    // console.log(obj1[i].male);
                                        k[(+(temp[4]))]++;
                            }
                        }
                    }
                }
                else if((k[(+(temp[4]))]==0)&& ((temp[4]%5)==0))
                {
                    obj1[obj1.length] = new Object();
                    obj1[obj1.length-1].male=0;
                    obj1[obj1.length-1].female=0;
                    obj1[obj1.length-1].year=temp[4];
                    if(temp[2]=='"Life expectancy at birth, female (years)"')
                    {
                        obj1[obj1.length-1].female+= (+(temp[5]));
                        // console.log((+(obj1[obj1.length-1].female)));
                    }
                    else if(temp[2]=='"Life expectancy at birth, male (years)"')
                    {
                        obj1[obj1.length-1].male+= (+(temp[5]));
                        // console.log((+(obj1[obj1.length-1].male)));
                    }
                    k[(+(temp[4]))]=1;
                }
            }
        }
});
rd.on('close', function() {
    for(i=0;i<obj1.length;i++){
        k[obj1[i].year]/=2;
        obj1[i].male = (obj1[i].male /k[obj1[i].year]);
        obj1[i].female = (obj1[i].female / k[obj1[i].year]);
    }
    // console.log(obj1);
var random=JSON.stringify(obj1);
fs.appendFile('indica 1.json',random);
});
/*
// Split on row
f = f.split("\n");
// Get first row for column headers
headers = f.shift().split(",");
var json = [];
f.forEach(function(d){
    // Loop through each row
    tmp = {}
    row = d.split(",")
    for(var i = 0; i < headers.length; i++){
        tmp[headers[i]] = row[i];
    }
    // Add object to list
    json.push(tmp);
});
// Convert object to string, write json to file
fs.writeFile('hi.txt', lin, 'utf8',
    function(err){console.log(err);});
*/
