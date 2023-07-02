"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arquivo = void 0;
const fs = __importStar(require("fs"));
class Arquivo {
    constructor(nome, caminhoFisico) {
        this.nome = nome;
        this.caminhoFisico = caminhoFisico;
    }
    getNome() {
        return this.nome;
    }
    getCaminhoFisico() {
        return this.caminhoFisico;
    }
    setNome(nome) {
        this.nome = nome;
    }
    setCaminhoFisico(caminhoFisico) {
        this.caminhoFisico = caminhoFisico;
    }
    criarArquivoFisico() {
        fs.writeFile(this.caminhoFisico, '', (err) => {
            if (err) {
                console.log(`Falha ao criar o arquivo: ${this.nome}`);
            }
            else {
                console.log(`Arquivo criado com sucesso: ${this.nome}`);
            }
        });
    }
    escreverConteudo(conteudo) {
        fs.writeFile(this.caminhoFisico, conteudo, (err) => {
            if (err) {
                console.log(`Ocorreu uma exceção ao escrever no arquivo: ${this.nome}`);
            }
            else {
                console.log(`Conteúdo escrito no arquivo: ${this.nome}`);
            }
        });
    }
    apagarArquivoFisico() {
        fs.unlink(this.caminhoFisico, (err) => {
            if (err) {
                console.log(`Falha ao remover o arquivo fisicamente: ${this.nome}`);
            }
            else {
                console.log(`Arquivo removido fisicamente: ${this.nome}`);
            }
        });
    }
}
exports.Arquivo = Arquivo;
//# sourceMappingURL=Arquivo.js.map