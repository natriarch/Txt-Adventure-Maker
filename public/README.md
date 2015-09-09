Txt-Adventure-Maker is a set of tools that can be used to create and present an interactive text-driven adventure game on an HTML page.

-----DISPLAYING TEXT-----
To begin, you will need an HTML <textarea> element, an <input type='text'> element, this module and your wits.

The module provids a 'display' object. It is created like this:
    
    var myDisplay = new Display(inElement, outElement);

where inElement and outElement are the above-mentioned HTML elements.    



Text can be displayed in your <textarea> element using the display object's print method: 

    myDisplay.print(text, speed[, callback]);

the 'text' parameter is the string to be displayed and 'speed' is the rate at which it will be displayed in MILLISECONDS (char by char). The optional callback parameter specifies a function to be run after the completion of the text display.

       

-----CREATING SCENES-----
Scenes are the content holders of your story. Think of them like the scenes of a movie.

Create a scene like this:

    var myScene = new Scene(text[, key]);

the 'text' parameter is a string the holds the text content of the scene. This will be displayed when the scene is passed to a 'Director' object (we'll get to this shortly), and subsequently the 'Display' object.

the optional 'key' parameter changes the behavior of a scene so that the user can only progress to it by entering the correct keyword intothe <input type='text'> area. If no key is provided, a scene will immediately move to the next scene after completion.

scenes are implemented as elements of a linked-list tied together to form a larger plot using the addNext(scene) method of any scene:

    var sceneOne = new scene('This is scene one!');
    var sceneTwo = new scene('Scene two now!', 'go to scene two');
    
    sceneOne.addNext(sceneTwo);

Some pointers:
    A single scene can be linked to any number of other scenes to allow for branching plotlines.
    If no key is provided to a scene, that scene will run immediately after the previously linked scene completes.


-----THE DIRECTOR OBJECT-----
The 'director' object manages your story by advancing through your list of scenes, reacting to user input, and telling the display object what to show to the user.

The director object takes two parameters, the FIRST scene in your story and a display object. Create it like this:

    var myDirector = new Director(sceneOne, myDisplay);

the runStory() method of the director object kicks off the story and loops until the story is finished, taking input when necessary and displaying scene content when necessary.

    myDirector.runStory();





        
