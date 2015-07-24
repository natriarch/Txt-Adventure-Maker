$(document).ready(function() {
    var outElement = document.getElementById('output');
    var inElement = document.getElementById('input');
    var myDisp = new Display(inElement, outElement);

    var box = new Prop('box');
    var onBoxAction = new Action('box_on', 'with some effort, you climb atop the box'); 
    var openBoxAction = new Action('box_open', 'the box opens from the top. Inside you find a nickle!');
    var scene1 = new Scene('You are in an small room with containing only a small box and a door. What you do?'); 

    var scene2 = new Scene('You are in an identical room to the first'); 

    scene1.addProp(box); 
    box.addAction(onBoxAction);
    box.addAction(openBoxAction); 
    var myDir = new Director(scene1, myDisp);
    
    $(inElement).keydown(function (e) {
        if (e.which == 13) {
            myDir.currentInput = inElement.value;
            console.log('enter pressed. input: ' + myDir.currentInput);
            myDir.myDisplay.print(myDir.currentInput, 0, myDir.checkInput);
        }
    });

    myDir.myDisplay.outBox.value = '';
    myDir.runStory(); 
});

//Think scenes of a movie.
function Scene(text, key) {
    this.next;
    this.content = [text];
    this.props = [];
    this.hints = [];
}

Scene.prototype.addProp(prp) {
    this.props.push(prp);
}

function Prop(txt) {
    this.text = txt;
    this.actions = [];
}

Prop.prototype.addAction(act) {
    this.actions.push(act);        
}

function Player() {
    this.inventory = [];
}

function Action(k, txt, callback) {
    this.key = k; 
    this.result = txt;
    this.reaction = callback;
}

function Display(inEl, outEl) {
    this.inBox = inEl;
    this.outBox = outEl;
}

Display.prototype.print = function(text, speed, cb) {
        var that = this;
        var output = text;
        var callback = cb;

        console.log('displaying: ' + text);
        this.outBox.value += '\r\n\r\n';
        this.inBox.disabled = true;
        
        //helper method used to bind the correct value of i in our loop to our function            
        var helper = function(x) {
            var index = x;
            return function() {
                that.outBox.value += output.charAt(x);
                if (index === output.length - 1) 
                    callback();
            };
        }

        //loop through text and display each char after a delay
        for (var i = 0; i < text.length; i++) {      
            setTimeout(helper(i), i * speed);
        }
}

var Director = function(scn, disp) {
    var that = this;

    this.currentScene = scn;
    this.myDisplay = disp;
    this.currentInput;

    this.checkInput = function() {
        for (var i = 0; i < that.currentScene.length; i ++) {
            if (that.currentInput.toLowerCase() === that.currentScene[i].key.toLowerCase()) {
                console.log('input valid!');
                that.currentScene = that.currentScene[i];
                that.runStory();
            }
        }
    } 

    this.runStory = function() {
        if (Object.prototype.toString.call(that.currentScene) === '[object Array]') {
            that.myDisplay.inBox.disabled = false;

        } else {
            that.myDisplay.print(that.currentScene.content, 100, that.runStory);
            that.currentScene = that.currentScene.next; 
        }
    }
}

var Player = function() {
    this.inventory = [];
}
