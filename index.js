const numeroInput = document.getElementById("numero");
const de1 = document.getElementById("de1");
const de2 = document.getElementById("de2");
const sortearBtn = document.getElementById("sortear");
const noRepeat = document.getElementById("noRepeat");

const divSorteado = document.querySelector(".sorteado");
const containerResultados = document.querySelector(".numeros-sorteados");
const numero1 = document.getElementById("numero1");

sortearBtn.addEventListener("click", function () {
    const qtd = parseInt(numeroInput.value);
    const min = parseInt(de1.value);
    const max = parseInt(de2.value);
    const evitarRepetidos = noRepeat.checked;

    if (isNaN(qtd) || isNaN(min) || isNaN(max)) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    if (min > max) {
        alert("O número mínimo não pode ser maior que o máximo.");
        return;
    }

    if (evitarRepetidos && qtd > (max - min + 1)) {
        alert("Quantidade de números maior que o intervalo disponível para não repetir.");
        return;
    }

    // gerar numeros sorteados
    const sorteados = [];
    while (sorteados.length < qtd) {
        const sorteado = Math.floor(Math.random() * (max - min + 1)) + min;
        if (evitarRepetidos) {
            if (!sorteados.includes(sorteado)) {
                sorteados.push(sorteado);
            }
        } else {
            sorteados.push(sorteado);
        }
    }

    // atualizar o primeiro quadrado com o primeiro numero sorteado
    numero1.querySelector("h2").textContent = sorteados[0];

    // apagar quadrados antigos extras 
    const quadradosExtras = containerResultados.querySelectorAll(".quad.extra");
    quadradosExtras.forEach(q => q.remove());

    // adicionar novos quadrados extras se precisar
    if (qtd > 1) {
        for (let i = 1; i < sorteados.length; i++) {
            const div = document.createElement("div");
            div.classList.add("quad", "extra");

            const h2 = document.createElement("h2");
            h2.textContent = sorteados[i];

            div.appendChild(h2);
            containerResultados.appendChild(div);
        }
    }

    // esconder a parte de sorteio
    document.querySelector(".numb").style.display = "none";

    // mostrar a área de sorteio
    divSorteado.style.display = "block";
});
