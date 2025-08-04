// Simulated database for InstalxTec vulnerability laboratory
export interface User {
  cpf: string;
  fullName: string;
  endereco: string;
  produtos: string[];
  statusServicos: string;
  token: string; // Sensitive data - should not be exposed
  permissao: string; // Sensitive permission data - should not be exposed
}

// Sample user data for the vulnerability lab
export const users: User[] = [
  {
    cpf: "123.456.789-00",
    fullName: "João Silva Santos",
    endereco: "Rua das Flores, 123 - Centro, São Paulo - SP, CEP: 01234-567",
    produtos: ["Instalação de Ar Condicionado", "Manutenção Elétrica", "Sistema de Segurança"],
    statusServicos: "Ativo",
    token: "jwt_token_abc123xyz789_sensitive",
    permissao: "admin_full_access"
  },
  {
    cpf: "987.654.321-11",
    fullName: "Maria Oliveira Costa",
    endereco: "Av. Paulista, 456 - Bela Vista, São Paulo - SP, CEP: 01310-100",
    produtos: ["Instalação de Câmeras", "Alarme Residencial"],
    statusServicos: "Ativo",
    token: "jwt_token_def456uvw012_sensitive",
    permissao: "user_limited_access"
  },
  {
    cpf: "456.789.123-22",
    fullName: "Carlos Eduardo Ferreira",
    endereco: "Rua Augusta, 789 - Consolação, São Paulo - SP, CEP: 01305-000",
    produtos: ["Manutenção de Ar Condicionado", "Instalação Elétrica", "Automação Residencial"],
    statusServicos: "Pendente",
    token: "jwt_token_ghi789rst345_sensitive",
    permissao: "user_standard_access"
  },
  {
    cpf: "321.654.987-33",
    fullName: "Ana Paula Rodrigues",
    endereco: "Rua Oscar Freire, 321 - Jardins, São Paulo - SP, CEP: 01426-001",
    produtos: ["Sistema de Monitoramento", "Instalação de Sensores"],
    statusServicos: "Inativo",
    token: "jwt_token_jkl012mno678_sensitive",
    permissao: "user_basic_access"
  },
  {
    cpf: "789.123.456-44",
    fullName: "Roberto Lima Souza",
    endereco: "Rua Haddock Lobo, 654 - Cerqueira César, São Paulo - SP, CEP: 01414-001",
    produtos: ["Manutenção Preventiva", "Upgrade de Sistema"],
    statusServicos: "Ativo",
    token: "jwt_token_pqr345stu901_sensitive",
    permissao: "technician_access"
  }
];

// Vulnerable search function - simulates SQL injection behavior
export function searchUserByCPF(cpf: string): User[] {
  // Simulate SQL injection vulnerability
  // If input contains SQL injection payload, return all users
  if (cpf.includes("'") || cpf.toLowerCase().includes("or") || cpf.includes("1=1")) {
    console.log("⚠️ SQL Injection detected - returning all users");
    return users; // Return all users - simulating SQL injection success
  }
  
  // Normal search (still vulnerable to IDOR)
  const foundUsers = users.filter(user => user.cpf === cpf);
  return foundUsers;
}

// Additional vulnerable function for demonstration
export function getAllUsers(): User[] {
  return users;
}
