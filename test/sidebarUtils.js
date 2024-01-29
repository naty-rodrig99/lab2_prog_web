import { assert, expect } from "chai";
import {findTag, prepareViewWithCustomEvents} from "./jsxUtilities.js";
import {dishInformation} from "./mockFetch.js";
import getModule from "./filesToTest.js";

const X= TEST_PREFIX;

const SidebarView= (await getModule(`/src/views/${X}sidebarView.jsx`))?.SidebarView;


function plusMinusEventName(){
    const{customEventNames, customEventParams}= prepareViewWithCustomEvents(
        SidebarView,
        {
            number:5,
            dishes:[dishInformation]

        },
        function collectControls(rendering){
            const buttons=findTag("button", rendering);
            expect(buttons[0].children[0], "Sidebar first button should have the label -").to.equal("-");
            expect(buttons[1].children[0], "Sidebar second button should have the label +").to.equal("+");
            return [buttons[0], buttons[1]];
        });


    const[minus, plus] = customEventNames;
    const[minusParam, plusParam]= customEventParams;
    expect(plus, "+ and - buttons should fire the same custom event").to.equal(minus);

    expect(plusParam.length, "expected custom event "+plus+" to be fired with one parameter").to.equal(1);
    expect(plusParam[0], "expected custom event "+plus+" to have a number parameter, number prop plus 1 for the plus button").to.equal(6);

    expect(minusParam.length, "expected custom event "+plus+" to be fired with one parameter").to.equal(1);
    expect(minusParam[0], "expected custom event "+plus+" to have a number parameter, number prop minus 1 for the minus button").to.equal(4);
    return minus;
}

function removeEventName(){
    const dishes= [dishInformation, {...dishInformation, id:42}, {...dishInformation, id:43}];
    const{customEventNames, customEventParams}= prepareViewWithCustomEvents(
        SidebarView,
        {
            number:5,
            dishes
        },
        function collectControls(rendering){
            const buttons=findTag("button", rendering);
            expect(buttons.length, "Sidebar view expected to have 5 buttons when there are three dishes").to.equal(5);
            expect(buttons[0].children[0], "Sidebar first button should have the label -").to.equal("-");
            expect(buttons[1].children[0], "Sidebar second button should have the label +").to.equal("+");
            expect(buttons[2].children[0].toLowerCase(), "Sidebar third button should have the label x").to.equal("x");
            return [buttons[2], buttons[3], buttons[4]];
        });
    const[xButton1, xButton2, xButton3] = customEventNames;
    expect(xButton1, "custom events fired by all x buttons should have the same name").to.equal(xButton2);
    expect(xButton2, "custom events fired by all x buttons should have the same name").to.equal(xButton3);
    return xButton1;
}


function currentDishEventName(){
    const dishes= [dishInformation, {...dishInformation, id:42}, {...dishInformation, id:43}];
    const{customEventNames, customEventParams}= prepareViewWithCustomEvents(
        SidebarView,
        {
            number:5,
            dishes
        },
        function collectControls(rendering){
            const links=findTag("a", rendering);
            expect(links.length, "Sidebar view expected to have 5 buttons when there are three dishes").to.equal(3);
            return links;

        });
    const[setCurrent1, setCurrent2, setCurrent3] = customEventNames;

    expect(setCurrent1, "custom events fired by all x buttons should have the same name").to.equal(setCurrent2);
    expect(setCurrent2, "custom events fired by all x buttons should have the same name").to.equal(setCurrent3);


    const[currentParam1, currentParam2, currentParam3]= customEventParams;
    return setCurrent1;
}

export {plusMinusEventName, removeEventName, currentDishEventName};
