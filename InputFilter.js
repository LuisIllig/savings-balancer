class InputFilter {

    constructor() {
        this.applyFilters(0);
        this.applyFilters(1);
        this.applyFilters(2);
        this.applyFilters(3);
    }

    applyFilters(number) {
        let inputMoney = "input-money-" + number;
        let inputPercentage = "input-percentage-" + number;

        if (!document.getElementById(inputMoney).disabled) {
            this.setInputFilter(document.getElementById(inputMoney), function(value) {
                return /^(\d*.\d*)*$/.test(value);
            }, "Only digits and '.' are allowed");
        }

        if (!document.getElementById(inputPercentage).disabled) {
            this.setInputFilter(document.getElementById(inputPercentage), function(value) {
                return /^\d{0,2}(,\d{0,2})?$/.test(value);
            }, "dd,dd\nExample input: 5,05");
        }
    }

    setInputFilter(textbox, inputFilter, errMsg) {
        ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function (event) {
            textbox.addEventListener(event, function (e) {
                if (inputFilter(this.value)) {
                    if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
                        this.classList.remove("input-error");
                        this.setCustomValidity("");
                    }

                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                } else if (this.hasOwnProperty("oldValue")) {
                    this.classList.add("input-error");
                    this.setCustomValidity(errMsg);
                    this.reportValidity();
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                } else {
                    this.value = "";
                }
            });
        });
    }
}
