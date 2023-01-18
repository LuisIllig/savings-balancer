class SavingsBalancer {

    positions = [1, 2];
    inputFilter;

    INPUT_CURRENT_PERCENTAGE = "input-current-percentage-";
    INPUT_CURRENT_MONEY = "input-current-money-";
    INPUT_GOAL_PERCENTAGE = "input-goal-percentage-";
    INPUT_GOAL_MONEY = "input-goal-money-";
    LABEL_DIFF = "label-diff-"
    DIFF_ADD = "diff-add";
    DIFF_REMOVE = "diff-remove"

    constructor(inputFilter) {
        this.inputFilter = inputFilter;
    }

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
        this.formatMoneyInput(input);
        this.calculateSimple();
    }

    calculateSimple() {
        let collectedInputs = new Map();
        this.positions.forEach(position => {
            let icm = document.getElementById(`${this.INPUT_CURRENT_MONEY}${position}`).value;
            icm = icm === undefined ? 0 : icm;
            icm = icm.replace(/\./g, "");
            let igp = document.getElementById(`${this.INPUT_GOAL_PERCENTAGE}${position}`).value
            igp = igp === undefined ? 0 : igp;
            collectedInputs.set(position, [icm, igp])
        });

        let total = 0;
        collectedInputs.forEach((value, key) => {
            total += Number(value[0]);
        });

        let output = new Map();

        collectedInputs.forEach((value, key) => {
            let icp = (value[0] / total) * 100;
            icp = icp.toString();
            icp = icp.substring(0, 5);
            let igm = (value[1] / 100) * total;
            let diff = igm - total;
            output.set(key, [icp, igm, diff]);
        });

        output.forEach((value, key) => {
            document.getElementById(`${this.INPUT_CURRENT_PERCENTAGE}${key}`).value = value[0];
            document.getElementById(`${this.INPUT_GOAL_MONEY}${key}`).value = value[1];
            let diff = document.getElementById(`${this.LABEL_DIFF}${key}`);
            if (value[2] >= 0) {
                if (diff.classList.contains(this.DIFF_REMOVE)) {
                    diff.classList.remove(this.DIFF_REMOVE);
                }
                diff.classList.add(this.DIFF_ADD);
                diff.value = `+ ${value[2]}€`;
            } else {
                if (diff.classList.contains(this.DIFF_ADD)) {
                    diff.classList.remove(this.DIFF_ADD);
                }
                diff.classList.add(this.DIFF_REMOVE);
                diff.value = `- ${value[2]}€`;
            }
            diff.value = "test";
        });
    }

    formatMoneyInput(input) {
        let type = input.id.split("-")[2];
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
        this.inputFilter.applyFilters(sum);
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

}