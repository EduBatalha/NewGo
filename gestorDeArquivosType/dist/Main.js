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
const readline = __importStar(require("readline"));
const Pasta_1 = require("./Pasta");
class Main {
    static main() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        const diretorioProjeto = process.cwd();
        const caminhoSimulacro = `${diretorioProjeto}/${Main.PASTA_SIMULACRO}`;
        const pastaSimulacro = new Pasta_1.Pasta(Main.PASTA_SIMULACRO, null, caminhoSimulacro);
        let pastaAtual = pastaSimulacro;
        let executando = true;
        const exibirOpcoesMenu = () => {
            console.log('--- Gerenciador de Arquivos ---');
            console.log('Pasta atual: ' + pastaAtual.getCaminhoFisico());
            console.log('1. Visualizar conteúdo da pasta');
            console.log('2. Criar pasta');
            console.log('3. Criar arquivo');
            console.log('4. Renomear pasta ou arquivo');
            console.log('5. Acessar subpasta');
            console.log('6. Voltar à pasta anterior');
            console.log('7. Apagar um arquivo');
            console.log('8. Apagar uma pasta');
            console.log('9. Fechar');
            console.log('Escolha uma opção: ');
        };
        const criarPasta = (nomePasta) => {
            pastaAtual.criarSubpasta(nomePasta);
        };
        const criarArquivo = (nomeArquivo, extensaoArquivo) => {
            const nomeCompletoArquivo = `${nomeArquivo}.${extensaoArquivo}`;
            pastaAtual.criarArquivo(nomeCompletoArquivo);
        };
        const renomearElemento = () => {
            rl.question('Digite o nome atual do elemento: ', (nomeAtual) => {
                rl.question('Digite o novo nome do elemento: ', (novoNome) => {
                    pastaAtual.renomearElemento(nomeAtual, novoNome);
                    exibirOpcoesMenu();
                });
            });
        };
        const acessarSubpasta = (nomeSubpasta) => {
            const novaPastaAtual = pastaAtual.acessarSubpasta(nomeSubpasta);
            if (novaPastaAtual !== null) {
                pastaAtual = novaPastaAtual;
                console.log('Você está agora na pasta: ' + pastaAtual.getNome());
            }
        };
        const voltarPastaAnterior = () => {
            const pastaPai = pastaAtual.getPastaPai();
            if (pastaPai !== null) {
                pastaAtual = pastaPai;
            }
            else {
                console.log('A pasta atual já é a raiz.');
            }
        };
        const apagarArquivo = (nomeArquivo) => {
            pastaAtual.apagarArquivo(nomeArquivo);
        };
        const apagarPasta = (nomePasta) => {
            pastaAtual.apagarPasta(nomePasta);
        };
        const processarOpcao = (opcao) => {
            switch (opcao) {
                case '1':
                    pastaAtual.visualizarConteudo();
                    break;
                case '2':
                    rl.question('Digite o nome da nova pasta: ', (nomePasta) => {
                        criarPasta(nomePasta);
                        exibirOpcoesMenu();
                    });
                    break;
                case '3':
                    rl.question('Digite o nome do novo arquivo: ', (nomeArquivo) => {
                        rl.question('Digite a extensão do arquivo: ', (extensaoArquivo) => {
                            criarArquivo(nomeArquivo, extensaoArquivo);
                            exibirOpcoesMenu();
                        });
                    });
                    break;
                case '4':
                    renomearElemento();
                    break;
                case '5':
                    rl.question('Digite o nome da pasta: ', (nomeSubpasta) => {
                        acessarSubpasta(nomeSubpasta);
                        exibirOpcoesMenu();
                    });
                    break;
                case '6':
                    voltarPastaAnterior();
                    exibirOpcoesMenu();
                    break;
                case '7':
                    rl.question('Digite o nome do arquivo a ser apagado: ', (nomeArquivo) => {
                        apagarArquivo(nomeArquivo);
                        exibirOpcoesMenu();
                    });
                    break;
                case '8':
                    rl.question('Digite o nome da pasta a ser apagada: ', (nomePasta) => {
                        apagarPasta(nomePasta);
                        exibirOpcoesMenu();
                    });
                    break;
                case '9':
                    executando = false;
                    rl.close();
                    break;
                default:
                    console.log('Opção inválida. Digite um número válido correspondente à opção desejada.');
                    exibirOpcoesMenu();
                    break;
            }
        };
        exibirOpcoesMenu();
        rl.on('line', (opcao) => {
            processarOpcao(opcao);
        });
        rl.on('close', () => {
            console.log('Programa encerrado.');
        });
    }
}
Main.PASTA_SIMULACRO = 'Simulacro';
Main.main();
//# sourceMappingURL=Main.js.map