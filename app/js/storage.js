﻿var workingList = [];
var reviewList = [];
var lastIsReviewing = false;

function saveStorage() {
    localStorage.setItem("workingList",workingList);
    localStorage.setItem("reviewList",reviewList);
    localStorage.setItem("lastIsReviewing",(lastIsReviewing)?1:0);
    setCookie("workingList",workingList);
    setCookie("reviewList",reviewList);
    setCookie("lastIsReviewing",(lastIsReviewing)?1:0);
}

function getStorage() {
    workingList = localStorage.getItem("workingList");
    reviewList = localStorage.getItem("reviewList");
    lastIsReviewing = localStorage.getItem("lastIsReviewing");

    if (!workingList || workingList == "")
        workingList = getCookie("workingList");

    if (!workingList || workingList == "")
        workingList = [];
    else
        workingList = eval("(["+workingList+"])");

    if (!reviewList || reviewList == "")
        reviewList = getCookie("reviewList");


    if (!reviewList || reviewList == "")
        reviewList = [];
    else
        reviewList = eval("(["+reviewList+"])");

    if (lastIsReviewing == null) {
        lastIsReviewing = getCookie("lastIsReviewing");
    }
    if (lastIsReviewing == "null")
        lastIsReviewing = 0;
    else
        lastIsReviewing = Number(lastIsReviewing);
    lastIsReviewing = (lastIsReviewing == 1);
}


function setCookie(c_name,value)
{
    var expiredays = 365;
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

//取回cookie
function getCookie(c_name)
{
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return "";
}