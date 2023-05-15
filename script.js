const operacaoAnterior = document.querySelector("#operacao-anterior");
const operacaoAtual = document.querySelector("#operacao-atual");
const botoes =  document.querySelectorAll("#botoes button");

class Calculadora {
    constructor(operacaoAnterior, operacaoAtual) {
        this.operacaoAnterior = operacaoAnterior;
        this.operacaoAtual = operacaoAtual;
        this.atual = "";
    }

    // adicionar um digito à tela da calculadora
    addDigit(digit) {

        if(digit === "." && this.operacaoAtual.innerText.includes(".")){
            return;
        }

        this.atual = digit;
        this.updateScreen();
    }

    //processar todas as operações
    processarOperacoes(operation) {
        //checar se o valor atual está vazio
        if(this.operacaoAtual.innerText === "" && operation !== "C") {
            //mudar a operação 
            if(this.operacaoAnterior.innerText !== "") {
                this.mudarOperacao(operation);

            }
            return;
        }


        //receber valor atual e anterior
        let valorOperacao;
        const anterior = +this.operacaoAnterior.innerText.split(" ")[0];
        const valorAtual = +this.operacaoAtual.innerText;

        switch(operation) {
            case "+":
                valorOperacao = anterior + valorAtual;
                this.updateScreen(valorOperacao, operation, valorAtual, anterior);
                break;
            case "-":
                valorOperacao = anterior - valorAtual;
                this.updateScreen(valorOperacao, operation, valorAtual, anterior);
                break;
            case "*":
                valorOperacao = anterior * valorAtual;
                this.updateScreen(valorOperacao, operation, valorAtual, anterior);
                break;
            case "/":
                valorOperacao = anterior / valorAtual;
                this.updateScreen(valorOperacao, operation, valorAtual, anterior);
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processCEOperator();
                break;
            case "C":
                this.processClearAll();
                break;
            case "=":
                this.processEqual();
                break;
            default:
                return;

        }
    }

    // mudar valores da tela da calculadora
    updateScreen(valorOperacao = null, operation = null, valorAtual = null, anterior = null) {
        
        if(valorOperacao === null){
            this.operacaoAtual.innerText += this.atual;
        }
        else {
            //checar se o valor é 0, e se for adicionar o valor atual
            if(anterior === 0){
                valorOperacao = valorAtual;
            }

            //adicionar valor atual ao anterior
            this.operacaoAnterior.innerText = `${valorOperacao} ${operation}`;
            this.operacaoAtual.innerText = "";
        }
    }

    //mudar operação matemática
    mudarOperacao(operation) {
        
        const mathOperations = ["*", "/", "+", "-"];

        if (!mathOperations.includes(operation)) {
            return;
        }

        this.operacaoAnterior.innerText = this.operacaoAnterior.innerText.slice(0, -1) + operation;

    }

    //deletar o último dígito 
    processDelOperator() {
        this.operacaoAtual.innerText = this.operacaoAtual.innerText.slice(0, -1);
    }

    processCEOperator() {
        this.operacaoAtual.innerText = ""; 
    }

    processClearAll() {
        this.operacaoAtual.innerText = "";
        this.operacaoAnterior.innerText = "";
    }

    processEqual() {
        const operation = this.operacaoAnterior.innerText.slice(-1); // Obter a última operação
        const valorAtual = parseFloat(this.operacaoAtual.innerText);
    
        let valorOperacao;
    
        switch (operation) {
            case "+":
                valorOperacao = parseFloat(this.operacaoAnterior.innerText) + valorAtual;
                break;
            case "-":
                valorOperacao = parseFloat(this.operacaoAnterior.innerText) - valorAtual;
                break;
            case "*":
                valorOperacao = parseFloat(this.operacaoAnterior.innerText) * valorAtual;
                break;
            case "/":
                valorOperacao = parseFloat(this.operacaoAnterior.innerText) / valorAtual;
                break;
            default:
                return;
        }
    
        this.operacaoAnterior.innerText = "";
        this.operacaoAtual.innerText = valorOperacao;
    }
    
    
}

const calc = new Calculadora(operacaoAnterior, operacaoAtual);

botoes.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === ".") {
            calc.addDigit(value);
        } 
        else {
            calc.processarOperacoes(value);
        }
    })

})
