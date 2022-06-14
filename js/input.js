class InputHandler {
    constructor(wordsArray) {
        document.addEventListener('keydown', (event) => {
            this.logKeys(wordsArray,event);
        });
        this.prevChar = "";
        this.firstChar = true;
    };

    choice(wordsArray, key) {
        let found = false;
        let selectedIndex = 0;
        for (let i = 0; i < wordsArray.length; i++) {
            if (key === wordsArray[i].charAt(0)) {
                selectedIndex = i;
                found = true;
            };
        };
        if (found) {
            return selectedIndex;
        } else {
            return -1;
        };
    };

    logKeys(wordsArray,event) {
        let selectedWord = "";
        if (this.firstChar) {
            this.prevChar = event.key;
            let selectedIndex = this.choice(wordsArray, event.key);
            if (selectedIndex !== -1) {
                //console.log(wordsArray[selectedIndex]);
                //console.log(event.key);
                this.firstChar = false;
                //firstPart = document.querySelector(`#word${selectedIndex} #first-part`);
                //firstPart.classList.add("orange");
            } else {
                console.log('Continua intentant-ho');
            };
            console.log(this.prevChar);
        } else {
            //console.log('paraula ja bloquejada:');
            this.prevChar += event.key;
            
            //spell
            let found = false;
            let selectedIndex = 0;
            for (let i = 0; i < wordsArray.length; i++) {
                if (wordsArray[i].indexOf(this.prevChar) !== -1) {
                    selectedIndex = i;
                    found = true;
                    if (wordsArray[i] === this.prevChar) {
                        //console.log('paraula completa!');
                        //treure la paraula de l'array
                        wordsArray.splice(i, 1);
                        console.log(wordsArray);
                        //buildHTML(wordsArray);
                        this.firstChar = true;
                    };
                    if (wordsArray.length === 0) {
                        console.log('Win!');
                        //passem de nivell
                    };
                };
            };
            if (found) {
                //console.log(wordsArray[selectedIndex]);
            } else {
                console.log(`error corregit!`);
                this.prevChar = this.prevChar.slice(0, -1);
            };
            console.log(this.prevChar);
        };
    };

    deleteWord(wordToDelete) {
        this.blockTextsArray.filter(function (eachWord) {
            return eachWord !== 'html';
        });
    }
};