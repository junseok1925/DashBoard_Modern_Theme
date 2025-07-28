var Handlebars = require('handlebars');

Handlebars.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});

Handlebars.registerHelper("env", function(value,options)
{    if(value == 1922 || value == 2085 || value == 2084 || value == 2082 || value == 2078){
        return true;
    }
});


Handlebars.registerHelper("add_date", function(value, options)
{
    if(value){
        return value;
    }
    return "-"
});

Handlebars.registerHelper("add_visi", function(value, options)
{
    if(value != null || value != undefined){
        return String(value.toLocaleString("ko-KR")) + "명";
    }
    return "-"
});

Handlebars.registerHelper("add_temp", function(value, options)
{
    if(value != null || value != undefined){
        return value + "℃";
    }
    return "-"
});

Handlebars.registerHelper("add_humi", function(value, options)
{
    if(value != null || value != undefined){
        return value + "%";
    }
    return "-"
});

Handlebars.registerHelper("add_dust", function(value, options)
{
    if(value != null || value != undefined){
        return value + "㎍/㎥";
    }
    return "-"
});

Handlebars.registerHelper("add_tvoc", function(value, options)
{
    if(value != null || value != undefined){
        return String(value.toLocaleString("ko-KR")) + "ppb";
    }
    return "-"
});

Handlebars.registerHelper("comma", function(value, options)
{
    if(value != null || value != undefined){
        return value.toLocaleString("ko-KR");
    }
    return value;
});

