# Q&A

## 1. Quais são os contras de utilizar-se herança entre classes? Quais alternativas você adotaria caso quisesse deixar de usar herança em um relacionamento especifico? Dê um exemplo

Tendo em vista meu conhecimento atual, os contras de se utilizar heranças que eu posso citar são:
- Rigidez: a herança cria uma forte conexão entre as classes mãe e filhas, que pode resultar em erros no projeto, já que mudanças em uma classe podem gerar erros em todas as classes subordinadas.
- Complexidade: a medida que novas classes são adicionadas a hieraquiarna difícil devido a dificuldade de se isolar o código para testes unitários.
- Herança Maldita: São comportamentos que não são desejados na subclasse e estão lá porque vieram da superclasse.

Ao invés de utilizar do recurso de herança,eu optaria por utilizar composição que é um conceito na programação orientada a objetos (POO) em que um objeto contém referências para outros objetos como parte de sua estrutura interna.
Isso significa que um objeto é composto por outros objetos, que são responsáveis por partes específicas de seu comportamento.
A composição permite que objetos complexos sejam construídos combinando funcionalidades de objetos menores e independentes. 
Essa abordagem promove a reutilização de código, modularidade e flexibilidade, pois os objetos podem ser substituídos ou reconfigurados facilmente. um exeplo de código utilizando de composição:

```
package composicao;

public class Carro {
    private Motor m;
    private Freio f;

    public Carro() {
        m = new Motor();
        f = new Freio();
    }

    public static void main(String[] args) {
        Carro carro = new Carro();
        carro.Dirigir();
    }

    public void Dirigir() {
        m.Acelerar();
        f.Parar();
        // Acelerar o motor
        // Parar usando os freios
    }
}
```

```
package composicao;

public class Motor{
    public void Acelerar() {
      System.out.println("Motor: Acelerar");
    }
}
```

```
package composicao;

public class Freio{
  public void Parar() {
    System.out.println("Freio: Parar");
  }
}
```

## 2. Suponha que você tem uma classe final, da qual você não tem o código-fonte, e que você deseja adicioná-la a uma estrutura de polimorfismo, 
mas cuja interface pública é ligeiramente diferente da classe. Que padrão de projeto você poderia utilizar para aproveitar o código desta classe, 
mas fazendo com que ela atenda à interface da esperada na estrutura de polimorfismo?

Não conheço outro padrão que corresponda às necessidades da situação além do padrão Adapter. O padrão adapter converte a interface de uma classe em outra interface esperada pelo cliente.
O Adapter permite que certas classes trabalhem em conjunto, pois de outra forma seria impossível estas classes funcionarem juntas por causa das interfaces incompatíveis.

## 3. Em que cenario você utilizaria proxy? de um exemplo real

Proxy pode ser utilizado em diversos cenários, alguns exemplos sendo:
- Caching: Um Caching Proxy é um tipo específico de Proxy que adiciona funcionalidade de caching aos objetos subjacentes. Ele armazena em cache os resultados de
  operações caras em termos de desempenho e retorna os dados armazenados em cache em vez de acessar o objeto real toda vez que uma solicitação é feita.
- Controle de Acesso: o Proxy atua como uma camada intermediária entre o cliente e o objeto real, verificando e controlando o acesso a esse objeto.
  Ele permite impor restrições, autenticação, autorização e outras políticas de segurança antes de permitir que uma solicitação seja executada.
- Acesso a Recursos Remotamente: o Proxy atua como uma representação local do recurso remoto, permitindo que o cliente acesse o recurso de forma transparente,
  enquanto o Proxy cuida dos detalhes de comunicação e gerenciamento da conexão remota.

O exemplo a seguir demonstra como um Caching Proxy pode ser usado para reduzir a latência e melhorar o desempenho em aplicações que dependem de serviços remotos. 
Ele evita chamadas desnecessárias à API, aproveitando os dados armazenados em cache quando disponíveis. 
Isso é especialmente útil quando as operações de busca são custosas em termos de tempo ou recursos:

```
public interface ProductService {
    List<Product> getProducts();
}

public class ProductServiceImpl implements ProductService {
    public List<Product> getProducts() {
        // Lógica para chamar a API REST e obter a lista de produtos
        // Pode envolver comunicação de rede e operações custosas
        return fetchProductsFromAPI();
    }

    private List<Product> fetchProductsFromAPI() {
        // Lógica para fazer a chamada HTTP para a API REST e obter os produtos
        // Retorna a lista de produtos obtida da API
    }
}

public class ProductCacheProxy implements ProductService {
    private ProductService productService;
    private List<Product> cachedProducts;

    public List<Product> getProducts() {
        if (cachedProducts == null) {
            if (productService == null) {
                productService = new ProductServiceImpl();
            }
            cachedProducts = productService.getProducts();
        }
        return cachedProducts;
    }
}

public class Client {
    public static void main(String[] args) {
        ProductService productService = new ProductCacheProxy();

        // A primeira chamada irá buscar os produtos da API e armazená-los em cache
        List<Product> products = productService.getProducts();

        // A segunda chamada utilizará o cache e retornará os produtos armazenados em cache
        List<Product> cachedProducts = productService.getProducts();
    }
}
```
 
## 4. Você prefere utilizar domínios anêmicos ou ricos? Como avalia os prós e contras de cada?
Pessoalmete, possuo mais experiência com domínios anêmicos e teoricamente este é um domínio com menor complexidade de implementação, por isso prefiro utilizá-lo ao invés do domínio rico.

Alguns prós e contras de cada seriam:

**Anêmico**
>Prós
>- Simplicidade: O domínio anêmico geralmente possui uma estrutura de classes mais simples
>- Facilidade de integração: O domínio anêmico pode ser mais adequado para sistemas em que a integração com outros sistemas ou serviços é uma prioridade. A separação entre os dados e a lógica de negócios torna mais fácil interagir com outros sistemas externos.
>
>Contras
>- Dificuldade na adição de novos comportamentos: Com a lógica de negócios espalhada por diferentes componentes, a adição de novos comportamentos ou regras de negócios pode exigir modificações em vários lugares diferentes.
>- Falta de encapsulamento: Com a lógica de negócios separada do domínio, pode haver uma falta de encapsulamento adequado, o que pode levar a um maior acoplamento entre os componentes do sistema. Isso pode dificultar a manutenção e a evolução do sistema.


**Rico**
>Prós
>- Flexibilidade e evolução: O domínio rico permite uma maior flexibilidade e capacidade de evolução ao longo do tempo. A incorporação da lógica de negócios no domínio torna mais fácil adicionar, modificar ou remover comportamentos e regras de negócios à medida que os requisitos mudam.
>- Encapsulamento: Com o domínio rico, a lógica de negócios é incorporada nas classes do domínio, permitindo um encapsulamento adequado dos dados e comportamentos relacionados. Isso ajuda a manter a integridade dos dados e reduz o acoplamento entre as diferentes partes do sistema.
>
>Contras
>- Complexidade: O domínio rico pode ser mais complexo de se implementar e manter. A inclusão de comportamentos e regras de negócios no domínio pode aumentar a complexidade da lógica do sistema, tornando-o potencialmente mais difícil de entender e depurar.
>- Complexidade da integração: Com um domínio rico, a lógica de negócios está diretamente incorporada nas classes do domínio. Isso pode tornar mais complexo integrar essas classes com sistemas externos que possuem diferentes modelos de dados ou abordagens de implementação.

## 5. Dê um exemplo do bom uso do princípio OCP, da sigla SOLID.

O Princípio Open-Closed Principle (OCP) é um dos princípios do SOLID, que promove o design de software flexível. Ele afirma que as entidades de software devem ser abertas para extensão, mas fechadas para modificação. Isso significa que você deve ser capaz de estender o comportamento de uma entidade sem precisar modificá-la diretamente.

Suponhamos que esteja sendo desenvolvido um sistema de envio de mensagens. Inicialmente, se tem uma classe chamada MessageSender que contém a lógica para enviar mensagens:
```
public class MessageSender {
    public void sendMessage(Message message) {
        // Lógica para enviar a mensagem
    }
}
```

Agora, é preciso adicionar suporte para enviar mensagens por email, sem modificar a classe MessageSender. Para seguir o Princípio OCP, pode-se usar uma abordagem baseada em interfaces:
```
public interface MessageSenderProvider {
    void sendMessage(Message message);
}
```

Em seguida, é criado uma implementação específica para enviar mensagens por email:
```
public class EmailMessageSender implements MessageSenderProvider {
    @Override
    public void sendMessage(Message message) {
        // Lógica específica para enviar a mensagem por email
    }
}
```

Agora, na classe MessageSender, é possível usar a interface MessageSenderProvider para enviar mensagens:
```
public class MessageSender {
    public void sendMessage(Message message, MessageSenderProvider senderProvider) {
        senderProvider.sendMessage(message);
    }
}
```

Dessa forma, é possivel estender o comportamento do MessageSender sem modificar a classe base.

Essa abordagem segue o Princípio OCP, permitindo a extensão do comportamento do MessageSender sem modificar o código existente. Se pode adicionar novas implementações de MessageSenderProvider para enviar mensagens por diferentes meios, como SMS por exemplo, sem alterar a classe MessageSender.

## 6. Qual a diferença entre requisitos funcionais, não-funcionais e regras de negócio? Dê um exemplo de cada.
**a. Requisitos funcionais**
- Os requisitos funcionais descrevem as funcionalidades específicas que o sistema deve fornecer, ou seja, as ações que o sistema deve realizar e as respostas que ele deve fornecer aos usuários.

Exemplo: Em um sistema de gerenciamento de tarefas, um requisito funcional pode ser "Os usuários devem poder criar uma nova tarefa, definindo um título, uma descrição e uma data de conclusão."

**b. Requisitos Não-Funcionais**
- Os requisitos não-funcionais são atributos do sistema que descrevem características e restrições gerais, como desempenho, usabilidade, segurança e escalabilidade.

Exemplo: Para o mesmo sistema de gerenciamento de tarefas, um requisito não-funcional pode ser "O tempo de resposta para a atualização de uma tarefa não deve exceder 2 segundos, mesmo com 1000 usuários simultâneos."

**c. Regras de Negócio**
- As regras de negócio são diretrizes e restrições específicas que se aplicam ao domínio do negócio e afetam o comportamento do sistema. Elas são definidas pelas políticas, procedimentos e regras do negócio em questão.

Exemplo: Em um sistema de reservas de hotel, uma regra de negócio pode ser "Os hóspedes só podem fazer o check-in após as 14h e devem fazer o check-out até as 11h."

## 7. Quais estratégias de diagramação você utiliza em seus projetos? Quais diagramas e por quê?
Atualmente a única técnica de diagramação que possuo alguma experiência é o diagrama de fluxo de processo (fluxograma), a utilizo por ser útil para representar a sequência de etapas em um processo

## 8. Você está utilizando GitFlow e precisa fazer uma alteração na versão em desenvolvimento de um projeto. Quais etapas você teria que realizar?

> 1. Atualização do branch develop: Certificar-se de estar no branch develop utilizando o comando git checkout develop. Em seguida, executar o comando git pull para obter as alterações mais recentes do branch principal no repositório remoto.

> 2. Criação de um novo branch de funcionalidade: Criar um novo branch a partir do develop utilizando o comando git checkout -b nome-da-funcionalidade. Criando um branch isolado para trabalhar na alteração específica.

> 3. Realização das modificações necessárias: Fazer as alterações desejadas no código, implementar as funcionalidades ou corrigir os problemas conforme necessário.

> 4. Confirmação das alterações: Utilizar o comando git add para adicionar os arquivos modificados ou criados, seguido por git commit -m "Mensagem descritiva da confirmação" para realizar uma confirmação das alterações no ramo de funcionalidade.

> 5. Envio do ramo de funcionalidade: Executar o comando git push origin nome-da-funcionalidade para enviar o ramo de funcionalidade com as alterações para o repositório remoto.

> 6. Criação de uma Solicitação de Pull (SP): Acessar a plataforma de gerenciamento de código (como GitHub, GitLab, Bitbucket, etc.) e criar uma SP para o ramo develop. Nesta SP, descrever as alterações realizadas e solicitar uma revisão de código.

> 7. Revisão do código e aprovação: Outros membros da equipe revisarão as alterações. Podem ser solicitadas alterações adicionais ou sugestões de melhoria. Após a revisão e aprovação, a SP é considerada pronta para ser mesclada (merge).

> 8. Mesclagem da SP: Realizar a mesclagem (merge) da SP, trazendo as alterações do ramo de funcionalidade para o develop. Isso pode ser feito na plataforma de gerenciamento de código ou por meio de um comando no terminal, dependendo das ferramentas utilizadas.

Essas são as etapas gerais, mas a implementação pode variar dependendo das ferramentas e fluxos específicos adotados pela equipe.

## 9. O que você deve ter feito para que uma funcionalidade que você pegou para implementar seja considerada como "done"?
Pelo que interpretei da questão, para que uma fucionalidade seja considerada como "done" é necessário a realização de algumas etapas.

> 1. Planejar a implementação: Criar um plano ou uma estratégia para a implementação da funcionalidade.

> 2. Implementar o código: Escrever o código necessário para a funcionalidade de acordo com os padrões e diretrizes de desenvolvimento estabelecidos

> 3. Testar a funcionalidade: Executar testes para garantir que a funcionalidade esteja funcionando conforme o esperado. Corrigindo qualquer erro encontrado durante os testes.

> 4. Integração e deploy: Realizar a integração da funcionalidade com o restante do sistema e fazer o deploy para o ambiente de produção ou teste, dependendo do estágio do projeto.

> 5. Validação e aceitação: Realizar uma revisão final da funcionalidade implementada com o cliente ou com o responsável pelo projeto. Garantir que atenda aos requisitos acordados e às expectativas definidas.

## 10. Quais são as cerimônias do SCRUM e como você avalia a importância de cada?
O SCRUM possui 4 cerimônias, sendo elas:

> 1. Planejamento da Sprint: Onde se é planejado o que vai ser realizado durante a próxima sprint.

> 2. A daily: São reuniões diárias curtas, onde se atualiza a situação de cada membro do projeto.

> 3. Revisão da sprint: Ocorre ao final de cada sprint e tem como objetivo inspecionar o trabalho feito para que o produto esteja alinhado com as espectativas estipuladas.

> 4. Retrospectiva da sprint: Ocorre após a revisão da sprint, nesta reunião a equipe SCRUM analisa o processo da sprint como um todo, estudando pontos fortes e pontos a serem melhorados durante próximas sprints.

Todas as cerimônias são de extrema importância

> - O planejamento da sprint é fundamental para estabelecer metas e alinhar a visão da equipe.

> - A daily permite agilidade na resolução de problemas além de manter a equipe com a mesma visão de grupo.

> - A revisão da sprint é essêncial para manter o produto alinhado com as expectativas do cliente.

> - A restrospectiva da sprint permite que o time evolua, refletindo sobre pontos a serem melhorados e pontos a serem mantidos.

## 11.Você conhece e utiliza Docker nos seus projetos? Se sim, para que?

Não tive a oportunidade de utilizar docker em meus projetos, mas sei que o mesmo é um software de código aberto usado para implantar aplicativos dentro de containers virtuais, se assemelhando com uma máquina virtual. A conteinerização, permite que vários aplicativos funcionem em diferentes ambientes complexos de maneira mais rápida e prática se comparado a uma máquina virtual.
