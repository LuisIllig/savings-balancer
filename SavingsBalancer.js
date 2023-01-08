class SavingsBalancer {

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

}