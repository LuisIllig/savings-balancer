class SavingsBalancer {

    positions = [1, 2];

    createHtmlPosition(position, title) {
        let template = `
         <div id="position-${position}" class="container-position">

            <div class="container-headline">
                <label>
                    <input class="headline" type="text" tabindex="1" value="${title}">
                </label>
                <div class="container-headline-buttons">
                    <button class="button-position-delete" onclick="savingsBalancer.delete(this)">-</button>
                </div>
            </div>

            <div class="container-entry">

                <label class="label-entry">Current value:</label>
                <div class="container-values">
                    <div class="container-percentage-input">
                        <input class="input" id="input-current-percentage-${position}" type="text" value="0" disabled>
                        <span class="percentage">%</span>
                    </div>
                    <div class="container-number-input">
                        <input class="input" id="input-current-money-${position}" type="text" value="0"
                               onchange="savingsBalancer.update(this)">
                        <span class="currency">€</span>
                    </div>
                </div>

                <label class="label-entry">Target value:</label>
                <div class="container-values">
                    <div class="container-percentage-input">
                        <input class="input" id="input-goal-percentage-${position}" type="text" value="0" 
                                onchange="savingsBalancer.update(this)">
                        <span class="percentage">%</span>
                    </div>
                    <div class="container-number-input">
                        <input class="input" id="input-goal-money-${position}" type="text" value="0" disabled>
                        <span class="currency">€</span>
                    </div>
                </div>
            </div>
        </div>
        `
        return template.trim();
    }

    createElementFromHtml(html) {
        let template = document.createElement("template");
        template.innerHTML = html;
        return template.content.firstElementChild;
    }

    calculate() {
        console.log("calculating")
    }

    update(input) {
        this.updateValue(input);
    }

    updateValue(input) {
        let type = input.id.split("-")[1];
        if (type === "money") {
            let number = input.value.replace(/\./g, "");
            number = this.addDots(number);
            input.value = number;
        }
    }

    addDots(num) {
        num = num.toString();
        num = num.split('');
        for (let i = num.length - 3; i > 0; i -= 3) {
            num.splice(i, 0, '.');
        }
        num = num.join('');
        return num;
    }

    add() {
        let sum = 0;
        this.positions.forEach(position => {
            sum += position;
        });
        this.positions.push(sum);

        let currentPositions = document.getElementsByClassName("container-position");
        let title = "Position " + (currentPositions.length + 1)

        let html = this.createHtmlPosition(sum, title);
        let positionElement = this.createElementFromHtml(html);
        let container = document.getElementById("container-positions");
        container.appendChild(positionElement);
    }

    delete(input) {
        let position = this.findPositionContainer(input);
        let number = position.id.split("-")[1];
        let index = this.positions.indexOf(number);
        if (index !== -1) {
            this.positions.splice(index, 1);
        }
        position.remove();
    }

    findPositionContainer(node) {
        if (node.className === "container-position") {
            return node;
        } else {
            return this.findPositionContainer(node.parentElement);
        }
    }

    test() {
        let ejs = require("ejs");
    }

}