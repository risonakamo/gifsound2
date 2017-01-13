$(document).ready(main);

function main()
{
    hashData=loadInput();

    if (hashData==-1)
    {
        return;
    }

    loadData(hashData);
}

function loadData(d)
{
    var userImg=$(".userimg");
    userImg[0].src=d.image;

    if (d.title)
    {
        $(".title")[0].innerHTML=d.title;
    }

    if (d.tall==1)
    {
        userImg[0].classList.add("tall");
    }
}

function loadInput()
{
    var windowHash=window.location.hash;
    if (windowHash[0]=="#")
    {
        windowHash=windowHash.substr(1);
    }

    else
    {
        return -1;
    }
    
    var input=windowHash.split("#");

    if (input.length<2)
    {
        return -1;
    }

    var result={};
    result.image=input[0];
    result.audio=input[1];

    if (input.length<2)
    {
        return result;
    }
    
    for (var x=2;x<input.length;x++)
    {
        additionalPar(input[x],result);
    }

    return result;
}

var allowedPars=["title","tall","start","end","center"];
function additionalPar(par,result)
{
    par=par.split("=");

    if (par.length!=2)
    {
        return -1;
    }

    for (var x=0;x<allowedPars.length;x++)
    {
        if (par[0]==allowedPars[x])
        {
            result[par[0]]=par[1];
            return 0;
        }
    }

    return -1;
}
