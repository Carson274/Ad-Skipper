MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

console.log("QuickSkip is active.");

let ad_shown = false;

// callback function executes with any change to the page's html (DOM)
var observer = new MutationObserver(function(mutations){
    // this is the same as doing control + f and searching for "div.ad-showing"
    const ad_container = document.querySelector("div.ad-showing");

    // check to see if ad is playing; skip button if so
    if (ad_container && !ad_shown) {

        // ad is active as a video
        ad_shown = true;
        console.log("QuickSKip: Ad detected.");

        let button_clicked = false;

        // for 2 seconds, attempt to click the skip button every 100ms
        for(let time = 0; time <= 5000; time += 1){
            if(button_clicked){
                break;
            }
            setTimeout(() => {
                const button = document.querySelector("button.ytp-ad-skip-button, button.ytp-ad-skip-button-modern");
                
                if(button){
                    button.click();
                    button_clicked = true;
                    console.log(`QuickSkip: Button clicked at ${time}ms.`);
                }
            }, time);
        }
    }  
    // check to see if ad is no longer playing
    else if(!ad_container && ad_shown) {
        ad_shown = false;
        console.log("QuickSkip: Ad no longer playing.");
    }
    
});

// start observing DOM
observer.observe(document, {
    subtree: true,
    attributes: true
});