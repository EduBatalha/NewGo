/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package gestordearquivos;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


public class Pasta {
    private String nome;
    private String caminhoFisico;
    private Pasta pastaPai;
    private List<Pasta> subpastas;
    private List<Arquivo> arquivos;

    public Pasta(String nome, Pasta pastaPai, String caminhoFisico) {
        this.nome = nome;
        this.caminhoFisico = caminhoFisico;
        this.pastaPai = pastaPai;
        this.subpastas = new ArrayList<>();
        this.arquivos = new ArrayList<>();
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCaminhoFisico() {
        return caminhoFisico;
    }

    public Pasta getPastaPai() {
        return pastaPai;
    }

    public void criarSubpasta(String nomeSubpasta) {
        String caminhoSubpasta = caminhoFisico + File.separator + nomeSubpasta;
        File subpastaFisica = new File(caminhoSubpasta);

        if (subpastaFisica.exists()) {
            System.out.println("A subpasta já existe.");
        } else {
            if (subpastaFisica.mkdir()) {
                Pasta novaSubpasta = new Pasta(nomeSubpasta, this, caminhoSubpasta);
                subpastas.add(novaSubpasta);
                System.out.println("Subpasta criada com sucesso.");
            } else {
                System.out.println("Falha ao criar a subpasta.");
            }
        }
    }

    public void visualizarConteudo() {
    File pastaFisica = new File(caminhoFisico);
    File[] arquivos = pastaFisica.listFiles();

    if (arquivos != null) {
        System.out.println("Conteúdo da pasta:");

        for (File arquivo : arquivos) {
            String tipo = arquivo.isDirectory() ? "P" : "A";
            String tamanho = arquivo.isDirectory() ? getTamanhoPasta(arquivo) : getTamanhoArquivo(arquivo);

            System.out.println(tipo + ": " + arquivo.getName() + " (" + tamanho + ")");
        }
        } else {
            System.out.println("A pasta está vazia.");
        }
    }

    private String getTamanhoPasta(File pasta) {
        long tamanhoBytes = calcularTamanhoPasta(pasta);
        return formatarTamanho(tamanhoBytes);
    }

    private long calcularTamanhoPasta(File pasta) {
        long tamanho = 0;

        File[] arquivos = pasta.listFiles();
            if (arquivos != null) {
                for (File arquivo : arquivos) {
                    if (arquivo.isFile()) {
                        tamanho += arquivo.length();
                    } else if (arquivo.isDirectory()) {
                        tamanho += calcularTamanhoPasta(arquivo);
                    }
                }
            }

            return tamanho;
        }

    private String getTamanhoArquivo(File arquivo) {
        long tamanhoBytes = arquivo.length();
        return formatarTamanho(tamanhoBytes);
    }

    private String formatarTamanho(long tamanhoBytes) {
        if (tamanhoBytes < 1024) {
            return tamanhoBytes + " bytes";
        } else if (tamanhoBytes < 1024 * 1024) {
            double tamanhoKB = tamanhoBytes / 1024.0;
            return String.format("%.2f KB", tamanhoKB);
        } else if (tamanhoBytes < 1024 * 1024 * 1024) {
            double tamanhoMB = tamanhoBytes / (1024.0 * 1024.0);
            return String.format("%.2f MB", tamanhoMB);
        } else {
            double tamanhoGB = tamanhoBytes / (1024.0 * 1024.0 * 1024.0);
            return String.format("%.2f GB", tamanhoGB);
        }
    }

    
    public void criarArquivo(String nomeArquivo) {
        String caminhoArquivo = caminhoFisico + File.separator + nomeArquivo;
        File arquivoFisico = new File(caminhoArquivo);

        if (arquivoFisico.exists()) {
            System.out.println("O arquivo já existe.");
        } else {
            try {
                if (arquivoFisico.createNewFile()) {
                    Arquivo novoArquivo = new Arquivo(nomeArquivo, caminhoArquivo);
                    arquivos.add(novoArquivo);
                    System.out.println("Arquivo criado com sucesso.");
                } else {
                    System.out.println("Falha ao criar o arquivo.");
                }
            } catch (IOException e) {
                System.out.println("Ocorreu uma exceção ao criar o arquivo: " + e.getMessage());
            }
        }
    }


    public void renomearElemento(String nomeAtual, String novoNome) {
        File elementoFisico = new File(caminhoFisico + File.separator + nomeAtual);

        if (!elementoFisico.exists()) {
            System.out.println("O elemento não existe.");
        } else {
            File novoElementoFisico = new File(caminhoFisico + File.separator + novoNome);

            if (novoElementoFisico.exists()) {
                System.out.println("Já existe um elemento com o novo nome.");
            } else {
                if (elementoFisico.renameTo(novoElementoFisico)) {
                    if (elementoFisico.isFile()) {
                        for (Arquivo arquivo : arquivos) {
                            if (arquivo.getNome().equals(nomeAtual)) {
                                arquivo.setNome(novoNome);
                                break;
                            }
                        }
                    } else {
                        for (Pasta subpasta : subpastas) {
                            if (subpasta.getNome().equals(nomeAtual)) {
                                subpasta.setNome(novoNome);
                                break;
                            }
                        }
                    }

                    System.out.println("Elemento renomeado com sucesso.");
                } else {
                    System.out.println("Falha ao renomear o elemento.");
                }
            }
        }
    }

    public Pasta acessarSubpasta(String nomeSubpasta) throws IOException {
        for (Pasta subpasta : subpastas) {
            if (subpasta.getNome().equals(nomeSubpasta)) {
                return subpasta;
            }
        }

        String caminhoSubpasta = caminhoFisico + File.separator + nomeSubpasta;
        File subpastaFisica = new File(caminhoSubpasta);

        if (subpastaFisica.exists() && subpastaFisica.isDirectory()) {
            Pasta subpasta = new Pasta(nomeSubpasta, this, caminhoSubpasta);
            subpastas.add(subpasta);
            return subpasta;
        }

        System.out.println("A subpasta não existe.");
        return null;
    }

    public void apagarArquivo(String nomeArquivo) {
        File arquivoFisico = new File(caminhoFisico + File.separator + nomeArquivo);

        if (!arquivoFisico.exists()) {
            System.out.println("O arquivo não existe.");
        } else {
            if (arquivoFisico.delete()) {
                arquivos.removeIf(arquivo -> arquivo.getNome().equals(nomeArquivo));
                System.out.println("Arquivo apagado com sucesso.");
            } else {
                System.out.println("Falha ao apagar o arquivo.");
            }
        }
    }

    
    public void apagarPasta(String nomePasta) {
        File pasta = new File(caminhoFisico + File.separator + nomePasta);
        if (pasta.exists() && pasta.isDirectory()) {
            if (removerArquivosPasta(pasta)) {
                System.out.println("Pasta removida: " + nomePasta);
            } else {
                System.out.println("Falha ao remover a pasta: " + nomePasta);
            }
        } else {
            System.out.println("A pasta não existe: " + nomePasta);
        }
    }

    private boolean removerArquivosPasta(File file) {
        if (file.isDirectory()) {
            File[] files = file.listFiles();
            if (files != null) {
                for (File f : files) {
                    if (!removerArquivosPasta(f)) {
                        return false;
                    }
                }
            }
        }
        return file.delete();
    }


    public List<Pasta> getSubpastas() {
        return subpastas;
    }

    public List<Arquivo> getArquivos() {
        return arquivos;
    }

    public static Pasta criarPastaSimulacro(String caminhoSimulacro) {
        File pastaSimulacro = new File(caminhoSimulacro);

        if (!pastaSimulacro.exists()) {
            if (pastaSimulacro.mkdir()) {
                System.out.println("'Simulacro' criado com sucesso.");
            } else {
                System.out.println("Falha ao criar 'Simulacro'.");
            }
        } else {
            System.out.println("'Simulacro' já existe.");
        }

        return new Pasta("Simulacro", null, caminhoSimulacro);
    }
}







