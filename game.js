window.onload = function(){
    var alphabets=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    let categories=[
        ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester city", "newcastle united"],
        ["alien", "dirty harry", "gladiator", "finding nemo", "jaws"],
        ["manchester", "milan", "madrid", "amsterdam", "prague"] ];
    let selectedCatergory;
    let word;
    let guesses=[];
    let currentLevel=0;
    let lives=10;
    let cnt=0;
    let guess;
    let addQuestion;
    const showCategories= document.getElementById("showCategories");
    const addAlpha = document.getElementById("addAlpha");
    const Question = document.getElementById("Question");
    const level= document.getElementById("level");
    const displayLives= document.getElementById("displayLives");


    //add alphabets
    addAlpha.innerHTML = alphabets.map(alpha =>{
            return `<li class="smallbtns" id="letter" onClick="check('${alpha}')">${alpha}</li>`;
       }).join("");

    getHint = (e) =>{
        e.preventDefault();
        for(var i=0;i<word.length;i++){
            if(guesses[i].innerHTML =='_'){
                guesses[i].innerHTML = word[i];
                cnt++;
                //console.log("cnt from hint" +cnt);
                break;
            }
        }
        if(cnt === word.length){
            displayLives.innerText="Correct Answer!";
            setTimeout(() => {
                restart();
            }, 1000);
        }
    };
    

    //print out the category
    setCatergory = () =>{
        if(selectedCatergory === 0){
            //console.log("Football Teams");
            showCategories.innerHTML= "The Category is Football Teams";
        }
        else if(selectedCatergory === 1){
            //console.log("Movie");
            showCategories.innerHTML= "The Category is Movies";
        }
        else{
            //console.log("cities");
            showCategories.innerHTML= "The Category is Cities";
        }
    };

    //print out number of blanks of the question
    printQuestion=() =>{
        const len=word.length;
        addQuestion=document.createElement('ul');
        for(var i=0;i<len;i++){
            guess= document.createElement('li');
            guess.setAttribute("class","blanks");
            if(word[i]==='-'){
                guess.innerHTML='-';
            }
            else{
                guess.innerHTML='_';
            }
            guesses.push(guess);
            addQuestion.appendChild(guess); 
            Question.appendChild(addQuestion);
        }      
    };

    restart=() =>{
        Question.removeChild(addQuestion);
        guesses=[];
        cnt=0;
        lives=10;
        play();
    };

    //display number of lives left
    displaylives=()=>{
        if(lives<1){
            return restart();
        }
        displayLives.innerText="Number of live left: "+lives;
    };

    //check if the guessed letter is the correct one
    check=(alpha)=>{
        console.log(alpha);
        let flag=0;
        for(var i=0;i<word.length;i++){
            if(alpha === word[i]){
                guesses[i].innerHTML=word[i];
                cnt++;
                //console.log("cnt from check" +cnt);
                guesses[i].setAttribute("class","disabled");
                flag=1;
                }
            }
        if(cnt === word.length){
            displayLives.innerText="Correct Answer!";
            setTimeout(() => {
                restart();
            }, 1000);
        }
        if(flag===0)
        {
            lives-=1;
            displaylives();
        }
    };
    
    play = () => {
        selectedCatergory = (Math.floor(Math.random()* categories.length));
        const wordIndex = Math.floor(Math.random()*categories[selectedCatergory].length);
        //console.log(wordIndex);
        word=categories[selectedCatergory][wordIndex];
        word = word.replace(/\s/g, "-");
        console.log(word);
        currentLevel++;
        level.innerText="Level "+currentLevel;
        setCatergory();
        printQuestion();
        displaylives();
    };
    play();
    
};