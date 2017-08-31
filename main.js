window.onload=main;

function main()
{
    parseUrl();
}

function parseUrl()
{
    var urlInput=window.location.hash.split("#");

    //requires youtube id and imgur img link
    if (urlInput.length<3)
    {
        return;
    }

    var vidurl=urlInput[1];
    var imgurl="http://i.imgur.com/"+urlInput[2];
    var options={start:0,end:0,loop:1,wide:0};

    if (urlInput.length>3)
    {
        var value;
        for (var x=3;x<urlInput.length;x++)
        {
            value=urlInput[x].split("=");

            if (value.length==2)
            {
                if (value[0]=="start" || value[0]=="end" ||
                    value[0]=="loop" || value[0]=="wide")
                {
                    options[value[0]]=value[1];
                }
            }
        }
    }

    loadImg(imgurl,options.wide,vidurl,options);
}

//set wide=1 to scale by width
function loadImg(img,wide,vidurl,options)
{
    var imgInsert=document.querySelector(".image");

    imgInsert.src=img;

    if (wide)
    {
        imgInsert.classList.add("wide");
    }

    imgInsert.onload=()=>{
        imgInsert.classList.remove("hidden");
        loadVideo(vidurl,options.start,options.end,options.loop);
    };
}

function loadVideo(id,start=0,end=0,loop=1)
{
    var video=document.querySelector(".video");

    var playerVars={
        autoplay:1,
        start:start,
        end:end,
        loop:loop
    };

    if (!end)
    {
        delete playerVars.end;
    }

    var player=new YT.Player(video,{videoId:id,playerVars:playerVars,events:{
        onStateChange:(state)=>{
            if (state.data==0)
            {
                player.seekTo(start);
            }
        }
    }});
}