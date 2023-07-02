 package gestordearquivos;


 /*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class Arquivo {
    private String nome;
    private String caminhoFisico;

    public Arquivo(String nome, String caminhoFisico) {
        this.nome = nome;
        this.caminhoFisico = caminhoFisico;
    }

    public String getNome() {
        return nome;
    }

    public String getCaminhoFisico() {
        return caminhoFisico;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setCaminhoFisico(String caminhoFisico) {
        this.caminhoFisico = caminhoFisico;
    }

    public void criarArquivoFisico() {
        File arquivoFisico = new File(caminhoFisico);
        try {
            if (arquivoFisico.createNewFile()) {
                System.out.println("Arquivo criado com sucesso: " + nome);
            } else {
                System.out.println("Falha ao criar o arquivo: " + nome);
            }
        } catch (IOException e) {
            System.out.println("Ocorreu uma exceção ao criar o arquivo: " + e.getMessage());
        }
    }

    public void escreverConteudo(String conteudo) {
        try (FileWriter writer = new FileWriter(caminhoFisico)) {
            writer.write(conteudo);
            System.out.println("Conteúdo escrito no arquivo: " + nome);
        } catch (IOException e) {
            System.out.println("Ocorreu uma exceção ao escrever no arquivo: " + e.getMessage());
        }
    }

    public void apagarArquivoFisico() {
        File arquivoFisico = new File(caminhoFisico);
        if (arquivoFisico.exists()) {
            if (arquivoFisico.delete()) {
                System.out.println("Arquivo removido fisicamente: " + nome);
            } else {
                System.out.println("Falha ao remover o arquivo fisicamente: " + nome);
            }
        } else {
            System.out.println("O arquivo não existe: " + nome);
        }
    }
}
