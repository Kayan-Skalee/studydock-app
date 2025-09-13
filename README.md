# StudyDock 📚

**StudyDock** é um aplicativo web completo para organização de estudos, desenvolvido com Next.js 15, React 19 e TailwindCSS. O app oferece todas as ferramentas necessárias para maximizar sua produtividade nos estudos.

## ✨ Funcionalidades

### 🏠 Dashboard Inicial
- **Resumo do dia**: Visualize ciclos de Pomodoro concluídos, tarefas pendentes e eventos do calendário
- **Estatísticas em tempo real**: Tempo de foco diário, porcentagem de tarefas concluídas
- **Sistema de pontuação**: Acompanhe seu progresso com pontos e badges
- **Sequência de estudos**: Mantenha sua motivação com streak de dias consecutivos

### ⏰ Relógio Pomodoro
- **Timer personalizável**: Configure tempos de foco (padrão 25min) e descanso (padrão 5min)
- **Controles intuitivos**: Botões para Iniciar, Pausar e Resetar
- **Histórico completo**: Visualize todas as sessões do dia com estatísticas
- **Gamificação**: Ganhe +10 pontos por cada ciclo completado
- **Alternância automática**: Transição automática entre foco e descanso

### 📅 Calendário de Estudos
- **Interface simples**: Visualização clara de eventos e compromissos
- **CRUD completo**: Criar, editar e excluir eventos de estudo
- **Organização por matéria**: Categorize eventos por disciplinas
- **Lembretes no dashboard**: Próximos eventos sempre visíveis

### 🧠 Sistema de Flashcards
- **CRUD intuitivo**: Crie, edite e organize seus flashcards
- **Modo revisão interativo**: Sistema pergunta → resposta com feedback
- **Estatísticas de desempenho**: Contagem de acertos e erros por card
- **Organização por matéria**: Agrupe flashcards por disciplinas

### 📖 Organização de Matérias
- **Pastas personalizadas**: Crie categorias para diferentes cursos/matérias
- **Sistema de anotações**: Salve observações importantes para cada matéria
- **Cores identificadoras**: Visual organizado com cores distintas
- **Gestão completa**: Adicione, edite e remova matérias conforme necessário

### 🏆 Sistema de Gamificação
- **Pontuação progressiva**: +10 pontos por ciclo de Pomodoro completado
- **Dashboard de conquistas**: Visualize seu progresso total
- **Sistema de streak**: Mantenha sequências de dias estudando
- **Badges e conquistas**: Desbloqueie marcos como "3 dias seguidos"

## 🎨 Design e UX

### Interface Moderna
- **Tema clean e minimalista**: Cores suaves (azul, branco, cinza)
- **Layout responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Navegação intuitiva**: Sidebar com acesso rápido a todas as funcionalidades
- **Header fixo**: Nome do app e pontuação sempre visíveis

### Experiência do Usuário
- **Mobile-first**: Design otimizado para dispositivos móveis
- **Transições suaves**: Animações elegantes e responsivas
- **Feedback visual**: Estados claros para todas as interações
- **Acessibilidade**: Contraste adequado e navegação por teclado

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 15**: Framework React com App Router
- **React 19**: Biblioteca JavaScript para interfaces
- **TypeScript**: Tipagem estática para maior segurança
- **TailwindCSS v4**: Framework CSS utilitário moderno
- **Lucide React**: Biblioteca de ícones elegantes

### Funcionalidades Técnicas
- **Estado local otimizado**: Gerenciamento eficiente com React hooks
- **Timer preciso**: Sistema de cronômetro com useEffect
- **Persistência de dados**: Estrutura preparada para backend
- **Componentes reutilizáveis**: Arquitetura modular e escalável

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn como gerenciador de pacotes

### Instalação
```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre no diretório
cd studydock

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev
```

### Acesso
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📱 Funcionalidades por Seção

### Dashboard
- Cards de estatísticas com ícones
- Lista de tarefas com checkbox interativo
- Próximos eventos do calendário
- Indicadores visuais de progresso

### Pomodoro
- Timer grande e visível
- Controles de play/pause/reset
- Configuração de tempos personalizados
- Histórico visual de sessões

### Calendário
- Formulário de criação de eventos
- Lista organizada por data
- Botões de ação (editar/excluir)
- Integração com dashboard

### Flashcards
- Criação com pergunta/resposta
- Modo revisão com flip de cards
- Sistema de pontuação (acerto/erro)
- Navegação entre cards

### Matérias
- Cards visuais com cores
- Sistema de anotações
- Organização em grid responsivo
- Ações de edição e exclusão

## 🎯 Próximas Funcionalidades

### Backend (Planejado)
- **Node.js + Express**: API RESTful completa
- **PostgreSQL**: Banco de dados robusto
- **Autenticação JWT**: Sistema de login seguro
- **Sincronização**: Dados salvos na nuvem

### Melhorias Futuras
- **Notificações push**: Lembretes de estudo
- **Relatórios avançados**: Gráficos de progresso
- **Compartilhamento**: Flashcards entre usuários
- **Temas personalizados**: Dark mode e cores customizáveis
- **Integração com calendários**: Google Calendar, Outlook
- **Exportação de dados**: PDF, CSV

## 🏗️ Arquitetura do Projeto

```
src/
├── app/
│   ├── page.tsx          # Página principal com todas as funcionalidades
│   ├── layout.tsx        # Layout base da aplicação
│   ├── globals.css       # Estilos globais
│   └── icon.svg          # Ícone personalizado do app
├── lib/
│   └── fonts.ts          # Configuração de fontes
└── components/           # Componentes reutilizáveis (futuro)
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Desenvolvido por

**StudyDock** - Seu companheiro definitivo para estudos organizados e produtivos.

---

*Transforme seus estudos em uma experiência gamificada e organizada! 🚀*