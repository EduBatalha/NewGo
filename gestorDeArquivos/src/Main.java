    /*
    * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
    * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
    */

import gestordearquivos.Pasta;
import java.io.File;
import java.io.IOException;
import java.util.Scanner;

public class Main {
    private static final String PASTA_SIMULACRO = "Simulacro";

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        String diretorioProjeto = System.getProperty("user.dir");
        String caminhoSimulacro = diretorioProjeto + File.separator + PASTA_SIMULACRO;

        File pastaSimulacro = new File(caminhoSimulacro);
        if (!pastaSimulacro.exists()) {
            if (pastaSimulacro.mkdir()) {
                System.out.println("'" + PASTA_SIMULACRO + "' criado com sucesso.");
            } else {
                System.out.println("Falha ao criar o '" + PASTA_SIMULACRO + "'.");
                return;
            }
        } else {
            System.out.println("O '" + PASTA_SIMULACRO + "' já existe.");
        }

        Pasta raiz = new Pasta(PASTA_SIMULACRO, null, caminhoSimulacro);
        Pasta pastaAtual = raiz;

        boolean executando = true;

        while (executando) {
            exibirOpcoesMenu(pastaAtual);

            int opcao = scanner.nextInt();
            scanner.nextLine(); // Limpar o buffer do scanner

            switch (opcao) {
                case 1:
                    pastaAtual.visualizarConteudo();
                    break;


                case 2:
                    criarPasta(scanner, pastaAtual);
                    break;

                case 3:
                    criarArquivo(scanner, pastaAtual);
                    break;

                case 4:
                    renomearElemento(scanner, pastaAtual);
                    break;

                case 5:
                    try {
                        pastaAtual = acessarSubpasta(scanner, pastaAtual);
                        // Atualiza a pasta atual para a nova pasta acessada
                        System.out.println("Você está agora na subpasta: " + pastaAtual.getNome());
                    } catch (IOException e) {
                        System.out.println("Erro ao acessar a subpasta: " + e.getMessage());
                    }
                    break;


                case 6:
                    pastaAtual = voltarPastaAnterior(pastaAtual);
                    break;

                case 7:
                    apagarArquivo(scanner, pastaAtual);
                    break;

                case 8:
                    apagarPasta(scanner, pastaAtual);
                    break;

                    
                case 9:
                    executando = false;
                    break;

                default:
                    System.out.println("Opção inválida. Digite um número válido correspondente à opção desejada.");
                    break;
            }
        }

        System.out.println("Programa encerrado.");
    }

    private static void exibirOpcoesMenu(Pasta pastaAtual) {
        System.out.println("--- Gerenciador de Arquivos ---");
        System.out.println("Pasta atual: " + pastaAtual.getCaminhoFisico());
        System.out.println("1. Visualizar conteúdo da pasta");
        System.out.println("2. Criar pasta");
        System.out.println("3. Criar arquivo");
        System.out.println("4. Renomear pasta ou arquivo");
        System.out.println("5. Acessar subpasta");
        System.out.println("6. Voltar à pasta anterior");
        System.out.println("7. Apagar um arquivo");
        System.out.println("8. Apagar uma pasta");
        System.out.println("9. Fechar");
        System.out.print("Escolha uma opção: ");
    }

    private static void criarPasta(Scanner scanner, Pasta pastaAtual) {
        System.out.print("Digite o nome da nova pasta: ");
        String nomePasta = scanner.nextLine();
        pastaAtual.criarSubpasta(nomePasta);
    }

    private static void criarArquivo(Scanner scanner, Pasta pastaAtual) {
        System.out.print("Digite o nome do novo arquivo: ");
        String nomeArquivo = scanner.nextLine();

        System.out.print("Digite a extensão do arquivo: ");
        String extensaoArquivo = scanner.nextLine();

        String nomeCompletoArquivo = nomeArquivo + "." + extensaoArquivo;
        pastaAtual.criarArquivo(nomeCompletoArquivo);
    }

    private static void renomearElemento(Scanner scanner, Pasta pastaAtual) {
        System.out.print("Digite o nome atual do elemento: ");
        String nomeAtual = scanner.nextLine();
        System.out.print("Digite o novo nome do elemento: ");
        String novoNome = scanner.nextLine();
        pastaAtual.renomearElemento(nomeAtual, novoNome);
    }

    private static Pasta acessarSubpasta(Scanner scanner, Pasta pastaAtual) throws IOException {
        System.out.print("Digite o nome da pasta: ");
        String nomeSubpasta = scanner.nextLine();
        Pasta novaPastaAtual = pastaAtual.acessarSubpasta(nomeSubpasta);
        if (novaPastaAtual != null) {
            // Atualiza a pasta atual para a nova pasta acessada
            System.out.println("Você está agora na pasta: " + novaPastaAtual.getNome());
            return novaPastaAtual;
        } else {
            return pastaAtual;
        }
    }

    private static Pasta voltarPastaAnterior(Pasta pastaAtual) {
        Pasta pastaPai = pastaAtual.getPastaPai();
        if (pastaPai != null) {
            return pastaPai;
        } else {
            System.out.println("A pasta atual já é a raiz.");
            return pastaAtual;
        }
    }

    private static void apagarArquivo(Scanner scanner, Pasta pastaAtual) {
        System.out.print("Digite o nome do arquivo a ser apagado: ");
        String nomeArquivo = scanner.nextLine();
        pastaAtual.apagarArquivo(nomeArquivo);
    }

    private static void apagarPasta(Scanner scanner, Pasta pastaAtual) {
    System.out.print("Digite o nome da pasta a ser apagada: ");
    String nomePasta = scanner.nextLine();
    pastaAtual.apagarPasta(nomePasta);
    }
}







