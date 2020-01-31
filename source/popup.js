var agIsPluginPaused = false;
var agPopupsCleaned  = 0;
var agIsInstagramOpened = false;


function agPluginSwitchState(){
    
    agIsPluginPaused = !agIsPluginPaused;
  
    // query current tab url
    agQueryCurrentTabURL();
    
    console.log("about to do it");
    console.log(agIsInstagramOpened);
    // send a message to content.js so that plugin's state variable 
    // in the closed environment of the content script gets updated
    
    if (agIsInstagramOpened){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {msg: "agSwitchState", state : agIsPluginPaused}, function(response) { });
        });
    }
}

function agRedecorateStateButton(){
    
    let btn = $("#plugin-statebtn");
    
    if (agIsPluginPaused){
        btn.text("Unpause Anonygram");
        btn.css("background-color", "rgb(200, 66, 66)");
    }
    else
    {
        
        btn.text("Pause Anonygram");
        btn.css("background-color", "rgb(21, 200, 150)");

    }
    

}

function agRedecorateStateDesc(){
    
    let txt          = $("#state-info");
    let stateIcon    = $("#state-icon");
    let txtContainer = $(".state-container").first();
    
    let stateInfo    = agIsPluginPaused ? "paused" : "active";
    let colBgNew     = agIsPluginPaused ? "rgb(255, 210, 210)" : "rgb(210, 255, 230)";
    let colTextNew   = agIsPluginPaused ? "rgb(100,0,0)" : "rgb(0,100,65)";

    let newText      = `Anonygram is ${stateInfo}`; // and has removed ${agPopupsCleaned} popups`
    
    // apply text change
    txt.text(newText);
    
    // recolor the area 
    txtContainer.css("background-color", colBgNew);
    
    // recolor the text 
    txt.css("color", colTextNew);
    
    // change state icon 
    stateIcon.attr("src",agIsPluginPaused ? "state-off.png" : "state-on.png");
    

}

function agCallBack(tabs) {
    
    var currentTab = tabs[0]; 
    console.log("callback...", currentTab.url, currentTab.url.includes("www.instagram.com/"));
    agIsInstagramOpened = currentTab.url.includes("www.instagram.com/");
    console.log("callback end", agIsInstagramOpened);
    
}

function agQueryCurrentTabURL(){
    chrome.tabs.query({active: true, currentWindow: true}, agCallBack);
}

$("#plugin-statebtn").click(function(){
    
    // switch plugin state
    agPluginSwitchState();
    
    // re-redecorate state button
    agRedecorateStateButton();
    
    // re-decorate state description 
    agRedecorateStateDesc();
});


// query current tab url
agQueryCurrentTabURL();


