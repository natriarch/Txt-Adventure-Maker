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

    var myDirector = new Director(myConsole);
    
    var pp1 = new PlotPoint('first');
    var pp2 = new PlotPoint('second');
    var pp3 = new PlotPoint('third', '3');
    var pp4 = new PlotPoint('fourth', '4');
    var input = new PlotPoint('3 or 4?'); 
    pp1.next.push(pp2);
    pp2.next.push(input);
    input.next.push(pp3);
    input.next.push(pp4);

    myDirector.action(pp1);
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
var Director = function(cons) {
    this.console = cons;
    this.currentInput = '';
    this.currentPP = undefined;
}


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


//~~~~~~~~~~~~~~~~DIRECTOR_METHODS~~~~~~~~~~~~~~~~~~
Director.prototype.getInput = function(t) {

    var that = t;
    console.log('getting input');
    
    this.activateInput();   


};

Director.prototype.activateInput= function() {
    this.console.inputArea.disabled = false;
}

Director.prototype.buildDisplayCb = function() {
    return function() { 
        that.console.display(text, speed, callback);
    }
}

//run the show. print plot points
//and act on user input.
Director.prototype.action = function(pp) { 
    var that = this;

    this.currentPP = pp;
    console.log(this.currentPP.text);
    var nextPlotCb = function() {
        that.action(pp.next[0]); 
    }

    var processInputCb = function() {
    }
    
    if (pp.next.length == 1){
        this.console.display(pp.text, 50, nextPlotCb);
    } 

    else if (pp.next.length > 1) {
        //this.console.display(pp.text, 50, this.getInput); 
        this.getInput(this);
    }
    else {
        console.log('end');
    }
};

Director.prototype.getCurrentPP = function() {
    return this.currentPP; 
};

Director.prototype.processInput = function() { 
    var input = this.currentInput;
    for (var i = 0; i < this.getCurrentPP.next.length; i++) {
        if (input === this.getCurrentPP.next[i].key) {
            action(this.getCurrentPP.next[i]);
        }
    }
};

//__PLOTPOINT_CONSTRUCTOR___________________________________
//the nodes of our script tree structure
//contain references for next plot points

var PlotPoint = function(text, key) {
    this.next = []; 
    this.text = text;
    this.key = undefined;
};

//__SRIPT_CONSTRUCTOR______________________________________
function Script(){
    this.start = null;
    this.end = null;
};

Script.prototype.add = function() {
    if (this.start === null) {
        this.start = List.makeNode();
        this.end = this.start;
    }
    else {
        this.end.next = List.makeNode();
        this.end = this.end.next;       
    }   
};

Script.makeNode = function() {
    return {data: null, next: null};
};

