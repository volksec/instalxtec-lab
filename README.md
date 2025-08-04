# Instalxtec - Lab

Um laboratório de vulnerabilidades web desenvolvido para fins educacionais, demonstrando vulnerabilidades comuns de segurança em aplicações web.

## ⚠️ Aviso Importante

Este é um ambiente de laboratório com vulnerabilidades intencionais para fins educacionais. **NÃO USE EM PRODUÇÃO**.

## 🎯 Vulnerabilidades Demonstradas

### 1. Broken Access Control (Alta Criticidade)
- Qualquer usuário pode acessar dados de outros usuários apenas informando um CPF válido
- Ausência de autenticação e verificação de autorização
- **Exemplo**: `123.456.789-00` exibe dados sensíveis sem autenticação

### 2. Excessive Data Exposure (Alta Criticidade)
- A aplicação expõe todos os dados do cliente, incluindo informações sensíveis
- Tokens JWT e permissões são exibidos na interface
- **Exemplo**: Dados como `token` e `permissao` são visíveis ao usuário

### 3. IDOR - Insecure Direct Object Reference (Alta Criticidade)
- CPFs podem ser enumerados para acessar perfis diferentes
- **Exemplo**: Alterar a URL `/detalhes/123.456.789-00` para `/detalhes/987.654.321-11`

### 4. SQL Injection (Criticidade Crítica)
- Campo CPF aceita payloads de SQL injection
- **Exemplo**: `' OR '1'='1` retorna todos os usuários do sistema

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <repository-url>
cd instalxtec-lab

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🧪 Testando as Vulnerabilidades

### CPFs de Teste
- `123.456.789-00` - João Silva Santos
- `987.654.321-11` - Maria Oliveira Costa  
- `456.789.123-22` - Carlos Eduardo Ferreira

### Payloads de SQL Injection
- `' OR '1'='1` - Retorna todos os usuários
- `'; DROP TABLE usuarios; --` - Simulação de ataque destrutivo

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Shadcn/ui** - Componentes de interface

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página inicial
│   └── detalhes/[cpf]/     # Página de detalhes (vulnerável)
├── components/ui/          # Componentes de interface
├── lib/
│   ├── db.ts              # Simulação de banco de dados vulnerável
│   └── utils.ts           # Utilitários
└── hooks/                 # React hooks customizados
```

## 🎓 Objetivos Educacionais

Este laboratório foi desenvolvido para:
- Demonstrar vulnerabilidades comuns em aplicações web
- Ensinar sobre segurança de aplicações
- Praticar identificação e exploração de vulnerabilidades
- Compreender o impacto de falhas de segurança

## 🔒 Mitigações Recomendadas

1. **Implementar autenticação robusta**
2. **Validar e sanitizar todas as entradas**
3. **Usar prepared statements para queries SQL**
4. **Implementar controle de acesso adequado**
5. **Limitar exposição de dados sensíveis**
6. **Aplicar rate limiting**

## 📝 Licença

Este projeto é destinado exclusivamente para fins educacionais.

---

**⚠️ LEMBRETE**: Este ambiente contém vulnerabilidades intencionais. Nunca implemente essas práticas em aplicações reais.
