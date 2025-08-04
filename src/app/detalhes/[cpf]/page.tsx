"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { searchUserByCPF, User } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

export default function DetalhesPage() {
  const params = useParams();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cpf = params.cpf as string;
    
    if (!cpf) {
      setError("CPF não fornecido");
      setLoading(false);
      return;
    }

    try {
      // Decode the CPF parameter (vulnerable - no sanitization)
      const decodedCpf = decodeURIComponent(cpf);
      
      // Vulnerable search - no input sanitization
      const foundUsers = searchUserByCPF(decodedCpf);
      
      if (foundUsers.length === 0) {
        setError("CPF não encontrado no sistema");
      } else {
        setUsers(foundUsers);
      }
    } catch (err) {
      setError("Erro ao buscar dados do usuário");
    } finally {
      setLoading(false);
    }
  }, [params.cpf]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "ativo":
        return "bg-green-100 text-green-800 border-green-200";
      case "pendente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "inativo":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Instalxtec - Lab</h1>
            <p className="text-gray-600">Detalhes do Cliente</p>
          </div>
          <Button 
            onClick={() => router.push("/")}
            variant="outline"
          >
            ← Voltar
          </Button>
        </div>

        {error ? (
          <Alert className="max-w-2xl mx-auto border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">
              {error}
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-6">
            {users.map((user, index) => (
              <div key={index} className="max-w-4xl mx-auto">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl text-blue-900">
                      {user.fullName}
                    </CardTitle>
                    <CardDescription>
                      Informações do cliente e serviços contratados
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Basic Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Dados Pessoais
                        </h3>
                        <div className="space-y-2">
                          <div>
                            <span className="font-medium text-gray-700">Nome Completo:</span>
                            <p className="text-gray-900">{user.fullName}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">CPF:</span>
                            <p className="text-gray-900 font-mono">{user.cpf}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Endereço Residencial:</span>
                            <p className="text-gray-900">{user.endereco}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Status dos Serviços
                        </h3>
                        <Badge className={getStatusColor(user.statusServicos)}>
                          {user.statusServicos}
                        </Badge>
                      </div>
                    </div>

                    <Separator />

                    {/* Products */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Lista de Produtos Comprados
                      </h3>
                      <div className="grid md:grid-cols-2 gap-2">
                        {user.produtos.map((produto, prodIndex) => (
                          <div 
                            key={prodIndex}
                            className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-200"
                          >
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                            <span className="text-blue-900">{produto}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* VULNERABILITY: Excessive Data Exposure */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-red-900 mb-3">
                        🚨 Dados Sensíveis (Exposição Excessiva)
                      </h3>
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium text-red-700">Token de Acesso:</span>
                          <p className="text-red-900 font-mono text-sm bg-red-100 p-2 rounded">
                            {user.token}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-red-700">Nível de Permissão:</span>
                          <p className="text-red-900 font-mono text-sm bg-red-100 p-2 rounded">
                            {user.permissao}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Vulnerability demonstration info */}
                {index === 0 && (
                  <Card className="mt-4 border-yellow-200 bg-yellow-50">
                    <CardHeader>
                      <CardTitle className="text-yellow-800 text-lg">
                        🔬 Vulnerabilidades Demonstradas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-semibold text-yellow-800 mb-2">IDOR (Insecure Direct Object Reference)</h4>
                          <p className="text-yellow-700">
                            Altere o CPF na URL para acessar dados de outros usuários.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-yellow-800 mb-2">Broken Access Control</h4>
                          <p className="text-yellow-700">
                            Nenhuma autenticação é exigida para acessar os dados.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-yellow-800 mb-2">Excessive Data Exposure</h4>
                          <p className="text-yellow-700">
                            Dados sensíveis como token e permissões são expostos.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-yellow-800 mb-2">SQL Injection (Simulado)</h4>
                          <p className="text-yellow-700">
                            Teste com: <code className="bg-yellow-100 px-1 rounded">' OR '1'='1</code>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}

            {/* Show multiple users warning when SQL injection is detected */}
            {users.length > 1 && (
              <Alert className="max-w-4xl mx-auto border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">
                  ⚠️ <strong>SQL Injection Detectado!</strong> Múltiplos usuários foram retornados devido à entrada maliciosa. 
                  Em um sistema real, isso permitiria acesso não autorizado a todos os dados.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* Footer warning */}
        <footer className="mt-12 text-center">
          <div className="bg-gray-800 text-white py-4 rounded-lg">
            <p className="text-sm">
              ⚠️ Este é um ambiente de laboratório com vulnerabilidades intencionais. 
              Não use em produção.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
