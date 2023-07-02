import * as fs from 'fs';
import { Arquivo } from './Arquivo';

export class Pasta {
  private nome: string;
  private pastaPai: Pasta | null;
  private caminhoFisico: string;
  private subpastas: Pasta[];
  private arquivos: Arquivo[];

  constructor(nome: string, pastaPai: Pasta | null, caminhoFisico: string) {
    this.nome = nome;
    this.pastaPai = pastaPai;
    this.caminhoFisico = caminhoFisico;
    this.subpastas = [];
    this.arquivos = [];
  }

  public getNome(): string {
    return this.nome;
  }

  public getCaminhoFisico(): string {
    return this.caminhoFisico;
  }

  public getPastaPai(): Pasta | null {
    return this.pastaPai;
  }

  public criarSubpasta(nomeSubpasta: string): void {
    const caminhoSubpasta = `${this.caminhoFisico}/${nomeSubpasta}`;
    const subpasta = new Pasta(nomeSubpasta, this, caminhoSubpasta);
    this.subpastas.push(subpasta);
    console.log(`Subpasta '${nomeSubpasta}' criada com sucesso.`);
  }

  public criarArquivo(nomeArquivo: string): void {
    const arquivo = new Arquivo(nomeArquivo, this.caminhoFisico);
    this.arquivos.push(arquivo);
    console.log(`Arquivo '${nomeArquivo}' criado com sucesso.`);
  }

  public visualizarConteudo(): void {
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

  public renomearElemento(nomeAtual: string, novoNome: string): void {
    const elemento = this.buscarElemento(nomeAtual);
    if (elemento !== null) {
      if (elemento instanceof Arquivo) {
        elemento.setNome(novoNome);
        console.log(`Arquivo '${nomeAtual}' renomeado para '${novoNome}' com sucesso.`);
      } else if (elemento instanceof Pasta) {
        elemento.renamePasta(novoNome);
        console.log(`Pasta '${nomeAtual}' renomeada para '${novoNome}' com sucesso.`);
      }
    } else {
      console.log(`Não foi possível encontrar o elemento '${nomeAtual}'.`);
    }
  }
  

  public acessarSubpasta(nomeSubpasta: string): Pasta | null {
    const subpasta = this.buscarSubpasta(nomeSubpasta);
    if (subpasta !== null) {
      return subpasta;
    } else {
      console.log(`Não foi possível encontrar a subpasta '${nomeSubpasta}'.`);
      return null;
    }
  }

  public apagarArquivo(nomeArquivo: string): void {
    const indice = this.buscarIndiceArquivo(nomeArquivo);
    if (indice !== -1) {
      this.arquivos.splice(indice, 1);
      console.log(`Arquivo '${nomeArquivo}' apagado com sucesso.`);
    } else {
      console.log(`Não foi possível encontrar o arquivo '${nomeArquivo}'.`);
    }
  }

  public apagarPasta(nomePasta: string): void {
    const indice = this.buscarIndiceSubpasta(nomePasta);
    if (indice !== -1) {
      this.subpastas.splice(indice, 1);
      console.log(`Pasta '${nomePasta}' apagada com sucesso.`);
    } else {
      console.log(`Não foi possível encontrar a pasta '${nomePasta}'.`);
    }
  }

  private buscarElemento(nomeElemento: string): Pasta | Arquivo | null {
    const subpasta = this.buscarSubpasta(nomeElemento);
    if (subpasta !== null) {
      return subpasta;
    } else {
      const arquivo = this.buscarArquivo(nomeElemento);
      if (arquivo !== null) {
        return arquivo;
      } else {
        return null;
      }
    }
  }

  private renamePasta(novoNome: string): void {
    this.nome = novoNome;
  }

  private buscarSubpasta(nomeSubpasta: string): Pasta | null {
    for (const subpasta of this.subpastas) {
      if (subpasta.getNome() === nomeSubpasta) {
        return subpasta;
      }
    }
    return null;
  }

  private buscarArquivo(nomeArquivo: string): Arquivo | null {
    for (const arquivo of this.arquivos) {
      if (arquivo.getNome() === nomeArquivo) {
        return arquivo;
      }
    }
    return null;
  }

  private buscarIndiceArquivo(nomeArquivo: string): number {
    for (let i = 0; i < this.arquivos.length; i++) {
      if (this.arquivos[i].getNome() === nomeArquivo) {
        return i;
      }
    }
    return -1;
  }

  private buscarIndiceSubpasta(nomeSubpasta: string): number {
    for (let i = 0; i < this.subpastas.length; i++) {
      if (this.subpastas[i].getNome() === nomeSubpasta) {
        return i;
      }
    }
    return -1;
  }
}
