

function init(){
    setDownloadLink()
    loadBg()
}

function getPlatform(){
    var appVersion = navigator.appVersion
    if(appVersion.indexOf("Linux")!=-1 || appVersion.indexOf("X11")!=-1){
        return "linux"
    } else if(appVersion.indexOf("Win")!=-1){
        return "windows"
    } else if(appVersion.indexOf("Mac")!=-1){
        if(navigator.platform.indexOf("x86-64")!=-1){
            return "macos-x64"
        }
        return "macos-arm64"
    }
}

function getPlatformName(){
    if(getPlatform() == "linux"){
        return "Linux"
    } else if(getPlatform() == "windows"){
        return "Windows"
    } else if (getPlatform() == "macos-x64" || getPlatform() == "macos-arm64"){
        return "MacOS"
    }
    return ""
}

function getPlatformExtension(){
    if(getPlatform() == "linux"){
        return ".AppImage"
    } else if(getPlatform() == "windows"){
        return ".exe"
    } else if (getPlatform() == "macos-x64"){
        return "-x64.dmg"
    } else if (getPlatform() == "macos-arm64"){
        return "-arm64.dmg"
    }
    return "Unknown"
}

function setDownloadLink(){ // set the download link to point to the latest release on github for the user's current platform

    fetch("https://api.github.com/repos/AxolotlClient/Axolotlclient-launcher/releases/latest",
          {
        headers: {
            "Content-Type": "application/x-www-form-urlencocoded",
        },
        method: "GET"
        }
    )
    .then(data=>data.json())
    .then(data=>{

        var version = data.tag_name.substring("1")
        var btn = document.getElementById("download")
        btn.innerHTML="<button>Download for "+getPlatformName()+"</button>"
        btn.setAttribute('href', "https://github.com/AxolotlClient/Axolotlclient-launcher/releases/download/"+data.tag_name+"/AxolotlClient-"+version+getPlatformExtension())
    })
    .catch(err=>console.log(err))
}

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function loadBg(){
    var img = document.getElementById("bg")
     img.src = "images/"+randomIntFromInterval(0,8)+".jpg"
}
