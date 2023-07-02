@startuml
class Arquivo {
  - nome: String
  - caminhoFisico: String
  
  + Arquivo(nome: String, caminhoFisico: String)
  + getNome(): String
  + getCaminhoFisico(): String
  + setNome(nome: String): void
  + setCaminhoFisico(caminhoFisico: String): void
  + criarArquivoFisico(): void
  + escreverConteudo(conteudo: String): void
  + apagarArquivoFisico(): void
}

class Pasta {
  - nome: String
  - pastaPai: Pasta
  - caminhoFisico: String
  
  + Pasta(nome: String, pastaPai: Pasta, caminhoFisico: String)
  + getNome(): String
  + getPastaPai(): Pasta
  + getCaminhoFisico(): String
  + criarSubpasta(nome: String): void
  + criarArquivo(nome: String): void
  + renomearElemento(nomeAtual: String, novoNome: String): void
  + acessarSubpasta(nomeSubpasta: String): Pasta
  + voltarPastaAnterior(): Pasta
  + apagarArquivo(nomeArquivo: String): void
  + apagarPasta(nomePasta: String): void
  + calcularTamanho(): long
  - calcularPasta(file: File): long
  - removerArquivosPasta(file: File): boolean
}

Main --> "*" Pasta
Pasta --> "*" Arquivo

class Main {
  - PASTA_SIMULACRO: String
  - diretorioProjeto: String
  - caminhoSimulacro: String
  - pastaSimulacro: File
  - raiz: Pasta
  - pastaAtual: Pasta
  - scanner: Scanner
  - executando: boolean
  
  + main(args: String[]): void
  + exibirOpcoesMenu(pastaAtual: Pasta): void
  + criarPasta(scanner: Scanner, pastaAtual: Pasta): void
  + criarArquivo(scanner: Scanner, pastaAtual: Pasta): void
  + renomearElemento(scanner: Scanner, pastaAtual: Pasta): void
  + acessarSubpasta(scanner: Scanner, pastaAtual: Pasta): Pasta
  + voltarPastaAnterior(pastaAtual: Pasta): Pasta
  + apagarArquivo(scanner: Scanner, pastaAtual: Pasta): void
  + apagarPasta(scanner: Scanner, pastaAtual: Pasta): void
  + calcularTamanho(scanner: Scanner, pastaAtual: Pasta): void
}

class Scanner {
  // Implementação da classe Scanner
}

Main "1" --> "1" Pasta
Main "1" --> "1" Scanner
@enduml
