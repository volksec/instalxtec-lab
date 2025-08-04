"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function HomePage() {
  const [cpf, setCpf] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation (intentionally weak for vulnerability demonstration)
    if (!cpf.trim()) {
      setError("Por favor, informe o CPF");
      return;
    }

    // Clear any previous errors
    setError("");

    // Redirect to details page with CPF parameter (vulnerable to IDOR)
    router.push(`/detalhes/${encodeURIComponent(cpf)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Instalxtec - Lab
              </CardTitle>
              <CardDescription className="text-gray-600">
                Portal de Consulta de Serviços
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cpf" className="text-sm font-medium text-gray-700">
                    CPF do Cliente
                  </Label>
                  <Input
                    id="cpf"
                    type="text"
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    className="w-full"
                  />
                </div>

                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Consultar Dados
                </Button>
              </form>

              {/* Vulnerability demonstration hints */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="text-sm font-semibold text-yellow-800 mb-2">
                  🔬 Laboratório de Vulnerabilidades
                </h3>
                <p className="text-xs text-yellow-700">
                  Esta aplicação contém vulnerabilidades intencionais para fins educacionais.
                  Experimente diferentes entradas como: <code className="bg-yellow-100 px-1 rounded">' OR '1'='1</code>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Sample CPFs for testing */}
          <Card className="mt-6 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">CPFs de Teste</CardTitle>
              <CardDescription>
                Use estes CPFs para testar o sistema:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-mono">123.456.789-00</span>
                  <span className="text-gray-600">João Silva</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono">987.654.321-11</span>
                  <span className="text-gray-600">Maria Oliveira</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono">456.789.123-22</span>
                  <span className="text-gray-600">Carlos Eduardo</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono">' OR '1'='1</span>
                  <span className="text-red-600">SQL Injection Test</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer warning */}
      <footer className="bg-gray-800 text-white py-4 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            ⚠️ Este é um ambiente de laboratório com vulnerabilidades intencionais. 
            Não use em produção.
          </p>
        </div>
      </footer>
    </div>
  );
}
