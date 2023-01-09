class SavingsBalancer {

    positions = [0, 1];

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