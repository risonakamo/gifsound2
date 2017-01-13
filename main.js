window.onload=main;

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
    var userImg=document.querySelector(".userimg");
    userImg.src=d.image;

    setMusic(d);

    if (d.title)
    {
        var dtitle=document.querySelector(".title");
        
        dtitle.innerHTML=d.title;
        document.title=d.title;
        
        if (d.titlecolour)
        {
            dtitle.style.color=d.titlecolour;
        }
    }
    
    if (d.tall==1)
    {
        userImg.classList.add("tall");
    }
}

var playerObject;
function setMusic(d)
{
    var startTime=0;

    if (d.start)
    {
        startTime=d.start;
    }
    
    var playerVars=
        {loop:1,
         autoplay:1,
         start:startTime};

    if (d.end)
    {
        playerVars.end=d.end;
    }

    var eventObject=
        {
            onStateChange:function(e){
                if (e.data==YT.PlayerState.ENDED)
                {
                    player.playVideo();
                    player.seekTo(startTime);
                }
            }
        };
    
    playerObject=
        {
            width:0,
            height:0,
            videoId:d.audio.slice(32),
            playerVars:playerVars,
            events:eventObject
        };

    loadYT();
}

/*-- required by youtube api --*/
var player;
function loadYT()
{
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubeIframeAPIReady()
{
    player= new YT.Player("player",playerObject);
}
/*-- end required by youtube api --*/

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

var allowedPars=["title","tall","start","end","titlecolour"];
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
