"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pasta = void 0;
const Arquivo_1 = require("./Arquivo");
class Pasta {
    constructor(nome, pastaPai, caminhoFisico) {
        this.nome = nome;
        this.pastaPai = pastaPai;
        this.caminhoFisico = caminhoFisico;
        this.subpastas = [];
        this.arquivos = [];
    }
    getNome() {
        return this.nome;
    }
    getCaminhoFisico() {
        return this.caminhoFisico;
    }
    getPastaPai() {
        return this.pastaPai;
    }
    criarSubpasta(nomeSubpasta) {
        const caminhoSubpasta = `${this.caminhoFisico}/${nomeSubpasta}`;
        const subpasta = new Pasta(nomeSubpasta, this, caminhoSubpasta);
        this.subpastas.push(subpasta);
        console.log(`Subpasta '${nomeSubpasta}' criada com sucesso.`);
    }
    criarArquivo(nomeArquivo) {
        const arquivo = new Arquivo_1.Arquivo(nomeArquivo, this.caminhoFisico);
        this.arquivos.push(arquivo);
        console.log(`Arquivo '${nomeArquivo}' criado com sucesso.`);
    }
    visualizarConteudo() {
        console.log(`Conteúdo da pasta '${this.nome}':`);
        console.log('Subpastas:');
        this.subpastas.forEach((subpasta) => {
            console.log(`- ${subpasta.getNome()}`);
        });
        console.log('Arquivos:');
        this.arquivos.forEach((arquivo) => {
            console.log(`- ${arquivo.getNome()}`);
        });
    }
    renomearElemento(nomeAtual, novoNome) {
        const elemento = this.buscarElemento(nomeAtual);
        if (elemento !== null) {
            if (elemento instanceof Arquivo_1.Arquivo) {
                elemento.setNome(novoNome);
                console.log(`Arquivo '${nomeAtual}' renomeado para '${novoNome}' com sucesso.`);
            }
            else if (elemento instanceof Pasta) {
                elemento.renamePasta(novoNome);
                console.log(`Pasta '${nomeAtual}' renomeada para '${novoNome}' com sucesso.`);
            }
        }
        else {
            console.log(`Não foi possível encontrar o elemento '${nomeAtual}'.`);
        }
    }
    acessarSubpasta(nomeSubpasta) {
        const subpasta = this.buscarSubpasta(nomeSubpasta);
        if (subpasta !== null) {
            return subpasta;
        }
        else {
            console.log(`Não foi possível encontrar a subpasta '${nomeSubpasta}'.`);
            return null;
        }
    }
    apagarArquivo(nomeArquivo) {
        const indice = this.buscarIndiceArquivo(nomeArquivo);
        if (indice !== -1) {
            this.arquivos.splice(indice, 1);
            console.log(`Arquivo '${nomeArquivo}' apagado com sucesso.`);
        }
        else {
            console.log(`Não foi possível encontrar o arquivo '${nomeArquivo}'.`);
        }
    }
    apagarPasta(nomePasta) {
        const indice = this.buscarIndiceSubpasta(nomePasta);
        if (indice !== -1) {
            this.subpastas.splice(indice, 1);
            console.log(`Pasta '${nomePasta}' apagada com sucesso.`);
        }
        else {
            console.log(`Não foi possível encontrar a pasta '${nomePasta}'.`);
        }
    }
    buscarElemento(nomeElemento) {
        const subpasta = this.buscarSubpasta(nomeElemento);
        if (subpasta !== null) {
            return subpasta;
        }
        else {
            const arquivo = this.buscarArquivo(nomeElemento);
            if (arquivo !== null) {
                return arquivo;
            }
            else {
                return null;
            }
        }
    }
    renamePasta(novoNome) {
        this.nome = novoNome;
    }
    buscarSubpasta(nomeSubpasta) {
        for (const subpasta of this.subpastas) {
            if (subpasta.getNome() === nomeSubpasta) {
                return subpasta;
            }
        }
        return null;
    }
    buscarArquivo(nomeArquivo) {
        for (const arquivo of this.arquivos) {
            if (arquivo.getNome() === nomeArquivo) {
                return arquivo;
            }
        }
        return null;
    }
    buscarIndiceArquivo(nomeArquivo) {
        for (let i = 0; i < this.arquivos.length; i++) {
            if (this.arquivos[i].getNome() === nomeArquivo) {
                return i;
            }
        }
        return -1;
    }
    buscarIndiceSubpasta(nomeSubpasta) {
        for (let i = 0; i < this.subpastas.length; i++) {
            if (this.subpastas[i].getNome() === nomeSubpasta) {
                return i;
            }
        }
        return -1;
    }
}
exports.Pasta = Pasta;
//# sourceMappingURL=Pasta.js.map