var lin;
var fs = require('fs'),
   readline = require('readline');

var rd = readline.createInterface({
   input: fs.createReadStream('Indicators.csv'),
   output: process.stdout,
   terminal: false
});
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
                                obj1[i].LE_female = obj1[i].LE_female+(+(temp[5]));
                                    // console.log(obj1[i].LE_female);


                            }
                            else if(temp[2]==='"Life expectancy at birth, male (years)"')
                            {
                                obj1[i].LE_male = obj1[i].LE_male +(+(temp[5]));
                                    // console.log(obj1[i].LE_male);

                            }
                        }
                    }
                }
                else if((k[(+(temp[4]))]==0)&& ((temp[4]%5)==0))
                {
                    obj1[obj1.length] = new Object();
                    obj1[obj1.length-1].LE_male=0;
                    obj1[obj1.length-1].LE_female=0;
                    obj1[obj1.length-1].year=temp[4];

                    if(temp[2]=='"Life expectancy at birth, female (years)"')
                    {
                        obj1[obj1.length-1].LE_female+= (+(temp[5]));
                        // console.log((+(obj1[obj1.length-1].LE_female)));
                    }
                    else if(temp[2]=='"Life expectancy at birth, male (years)"')
                    {
                        obj1[obj1.length-1].LE_male+= (+(temp[5]));
                        // console.log((+(obj1[obj1.length-1].LE_male)));
                    }
                    k[(+(temp[4]))]=1;
                }
            }
        }
});

rd.on('close', function() {

    for(i=0;i<obj1.length;i++){
        console.log(k[obj1[i].year]);
        obj1[i].LE_male = (obj1[i].LE_male / 40);
        obj1[i].LE_female = (obj1[i].LE_female / 40);
    }
var random=JSON.stringify(obj1);
fs.appendFile('out.json',random);
});
