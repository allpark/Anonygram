var agInterval;
var agHiddenPopups   = false;
var agIsPluginPaused = false;

// create timer on dom load
$( document ).ready(function() {
    
    // after dom is ready, call function every 1000 milliseconds
    agInterval = setInterval(aaCheckForActivePopups, 1000);  
});


function aaCheckForActivePopups(){

    // select all div elements with attribute "role" being equal to "presentation" 
    // instagram creates this element when forcing the users to log in and preventing them to scroll further down 
    let popups = $("div[role='presentation']");
 
    // if the first element of popups list is defined... and if plugin is not paused
    if (popups[0] != undefined && !agIsPluginPaused){
        
        let window  = $(popups[0]);
        let body = $('body');
        
        // enable overflow 
        body.css("overflow", "visible");
        
        
        // hide pop-up window
        window.hide();
            
        // clear interval so that this code is no longer called 
        clearInterval(agInterval);
    }
}


// create listener for state switch events 
chrome.runtime.onMessage.addListener( 
    function(request, sender, sendResponse) {
    if (request.msg == "agSwitchState")
        agIsPluginPaused = request.state == undefined ? false : request.state;
        sendResponse({received: true});
    }
);
