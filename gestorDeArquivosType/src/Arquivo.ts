import * as fs from 'fs';

export class Arquivo {
  private nome: string;
  private caminhoFisico: string;

  constructor(nome: string, caminhoFisico: string) {
    this.nome = nome;
    this.caminhoFisico = caminhoFisico;
  }

  public getNome(): string {
    return this.nome;
  }

  public getCaminhoFisico(): string {
    return this.caminhoFisico;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public setCaminhoFisico(caminhoFisico: string): void {
    this.caminhoFisico = caminhoFisico;
  }

  public criarArquivoFisico(): void {
    fs.writeFile(this.caminhoFisico, '', (err) => {
      if (err) {
        console.log(`Falha ao criar o arquivo: ${this.nome}`);
      } else {
        console.log(`Arquivo criado com sucesso: ${this.nome}`);
      }
    });
  }

  public escreverConteudo(conteudo: string): void {
    fs.writeFile(this.caminhoFisico, conteudo, (err) => {
      if (err) {
        console.log(`Ocorreu uma exceção ao escrever no arquivo: ${this.nome}`);
      } else {
        console.log(`Conteúdo escrito no arquivo: ${this.nome}`);
      }
    });
  }

  public apagarArquivoFisico(): void {
    fs.unlink(this.caminhoFisico, (err) => {
      if (err) {
        console.log(`Falha ao remover o arquivo fisicamente: ${this.nome}`);
      } else {
        console.log(`Arquivo removido fisicamente: ${this.nome}`);
      }
    });
  }
}
