class Calculator {
  constructor(previousCalcTextElement, currentCalcTextElement) {
    this.previousCalcTextElement = previousCalcTextElement;
    this.currentCalcTextElement = currentCalcTextElement;
    this.clear();
  }

  clear() {
    this.currentCalc = "";
    this.previousCalc = "";
    this.operation = undefined;
  }
  delete() {
    this.currentCalc = this.currentCalc.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currentCalc.includes(".")) return;
    this.currentCalc = this.currentCalc.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currentCalc === "") return;
    if (this.previousCalc !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousCalc = this.currentCalc;
    this.currentCalc = "";
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previousCalc);
    const current = parseFloat(this.currentCalc);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentCalc = computation;
    this.operation = undefined;
    this.previousCalc = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentCalcTextElement.innerText = this.getDisplayNumber(
      this.currentCalc
    );
    if (this.operation != null) {
      this.previousCalcTextElement.innerText = `${this.getDisplayNumber(
        this.previousCalc
      )} ${this.operation}`;
    } else {
      this.previousCalcTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousCalcTextElement = document.querySelector("[data-previous-calc]");
const currentCalcTextElement = document.querySelector("[data-current-calc]");

const calculator = new Calculator(
  previousCalcTextElement,
  currentCalcTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
