//Nate Le
//7-7-15

/*TODOODOO__________________________________________________
  ==  time multiple display() calls so that they wait for previous
    one to finish.
  ==  differentiate user inputted text (color, justification).   
  ==  separate this fuckin tome into different files
  ==  Develop tree script structure
*/

$(document).ready(function() {
    var outputEl = document.getElementById('output');
    var inputEl = document.getElementById('user_input'); 
    var myConsole = new Console(outputEl, inputEl);
    
    outputEl.value = '';
    inputEl.value = ''; 

    var prompt1 = new PlotPoint('narrator');
    prompt1.text = 'You' + "'" + 're at a hotdog stand. You find the health standards at this establishment wanting. How you gonna act?';   
    prompt1.id = 'p1';

    var input1 = new PlotPoint('user');
    input1.id = 'i1';
        
    var prompt2a = new PlotPoint('narrator');
    prompt2a.text = 'The owner looks down in shame. When you pass by next week, the hotdog stand is gone';
    prompt2a.id = 'p2a';

    var prompt2b = new PlotPoint('narrator');
    prompt2b.text = 'The owner applies a gray-green relish analog to your dog and charges you $7';
    prompt2b.id = 'p2b';

    var input2 = new PlotPoint('user'); 
    input2.id = 'i2';    

    var input3 = new PlotPoint('user'); 
    input3.id = 'i3';

    var prompt3 = new PlotPoint('narrator'); 
    prompt3.text = 'The end';
    prompt3.id = 'p3';

    prompt1.addNextPP('This should not print', input1);
    input1.addNextPP('complain', prompt2a);
    input1.addNextPP('suck it up', prompt2b);
    prompt2a.addNextPP('', input2);
    prompt2b.addNextPP('', input2);
    input2.addNextPP('end', prompt3);
    prompt3.addNextPP('', input3);
    input3.addNextPP('again', prompt1);
     
    var myDirector = new Director(myConsole);

    myDirector.action(prompt1);
     
});

 
//__CONSOLE_CONSTRUCTOR_____
//Console objects handle the display of text directed
//by a Director object

var Console = function(textEl, inputEl) {
    this.textArea = textEl;
    this.inputArea = inputEl;
    this.displaySpeed = 50; //in ms
};

//______CONSOLE_METHODS______

//_Display some text with a delay between chars.
Console.prototype.display = function(text, delay, callback) { 

    console.log('displaying: ' + text);
    var that = this;
    var output = text;    

    this.textArea.value += '\r\n';

    this.inputArea.disabled = true;    

    //loop through text and display each char after a delay
    for (var i = 0; i < text.length; i++) {      
        setTimeout(function(x) {
            return function() {
                that.textArea.value += output.charAt(x);
                if (x === output.length - 1) {
                    if (callback) callback();
                }
            };
        }(i), i * delay); 
    }
};

//__DIRECTOR_CONSTRUCTOR_____________________________________
//This object will feed text to the Console object for displaying
//Coordinates interaction with user

var Director = function(cons) { 
    this.console = cons;
    this.currentInput = '';
};

//______DIRECTOR_METHODS______

Director.prototype.getInput = function(callback) {

    var that = this;
    console.log('getting input');
    
    this.console.inputArea.disabled = false;   

    $(this.console.inputArea).keypress(function (e) {
        if (e.which === 13) {
            that.currentInput = that.console.inputArea.value;
            callback();
        }
    });
};

//run the show. print plot points
//and act on user input.
Director.prototype.action = function(pp) { 

    var thePP = pp;
    var nextPP;
    console.log('thePP: ' + typeof thePP);
    var that = this;

    var inCallback = function() {
        that.console.display(that.currentInput, 0, callback);
    };    

    var callback = function(){
        if (thePP.who === 'narrator') {
            nextPP = thePP.next[0].nextPlotPoint;
        }
        else if (thePP.who === 'user'){
            for (var i = 0; i < thePP.next.length; i++) {
                if (that.currentInput === thePP.next[i].inputKey) {
                    var nextPP = thePP.next[i].nextPlotPoint;
                }
            }
        }
        that.action(nextPP);
    };
    
    if (thePP.who === 'user'){
        console.log('user pp');
        that.getInput(inCallback);
    } 
    if (thePP.who === 'narrator') {
        that.console.display(thePP.text, 0, callback);
    }
};

//__PLOTPOINT_CONSTRUCTOR___________________________________
//the nodes of our script tree structure
//contain references for next plot points

var PlotPoint = function(user) {
    this.end = false;
    this.who = user; //either 'narrator' or 'user'
    this.next = []; 
    this.text = '';
    this.id = '';
};

//______PLOTPOINT_METHODS___
PlotPoint.prototype.addNextPP = function(key, pp) {
    nextPP = {inputKey: key, nextPlotPoint: pp}; 
    this.next.push(nextPP);
};
