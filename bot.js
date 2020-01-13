function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
function getElementsByXpath(xpath, parent) {
    let results = [];
    let query = document.evaluate(xpath, parent || document,
        null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0, length = query.snapshotLength; i < length; ++i) {
        results.push(query.snapshotItem(i));
    }
    return results;
}
isAccepting = false;
checkisAccepting();
function checkisAccepting() {
    if (!isAccepting) {
        startAccept();

    }
}


function startAccept() {
    isAccepting = true;
    setTimeout(function () {
        getElementByXpath("//*[@id='react-root']/section/nav/div[2]/div/div/div[3]/div/div[2]/a").click();
        setTimeout(function () {
            botonRequest = getElementByXpath("(//div[@class='PUHRj eKc9b H_sJK'])[1]");
            if (botonRequest == null) {
                isAccepting = false;
                getElementByXpath("//*[@id='react-root']/section/nav/div[2]/div/div/div[3]/div/div[2]/a").click();
                checkisAccepting();

            } else {
                botonRequest.click();
            }

            setTimeout(function () {
                buttons = getElementsByXpath("(//button[contains(text(),'Confirm')])");

                for (i = 0; i < buttons.length; i++) {
                    isLast = false;
                    if (i == buttons.length - 1) {
                        isLast = true;
                    }
                    setTimeout(function (but, isLast) {
                        but.click();
                        if (isLast) {
                            isAccepting = false;
                            getElementByXpath("//*[@id='react-root']/section/nav/div[2]/div/div/div[3]/div/div[2]/a").click();
                            checkisAccepting();
                        }
                    }, i * 1000, buttons[i], isLast)



                }

            }, 3000);
        }, 3000);
    }, 3000);
}