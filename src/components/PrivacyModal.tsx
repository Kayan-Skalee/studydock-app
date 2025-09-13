'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Shield } from 'lucide-react'

interface PrivacyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function PrivacyModal({ open, onOpenChange }: PrivacyModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Política de Privacidade</span>
          </DialogTitle>
          <DialogDescription>
            Como coletamos, usamos e protegemos suas informações
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-96 pr-4">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="font-semibold text-base mb-2">1. Informações que Coletamos</h3>
              <div className="text-gray-600 space-y-2">
                <p><strong>Informações de Conta:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Nome completo</li>
                  <li>Endereço de email</li>
                  <li>Senha (criptografada)</li>
                </ul>
                
                <p><strong>Dados de Uso:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Tarefas criadas e seu status</li>
                  <li>Flashcards e respostas</li>
                  <li>Eventos do calendário</li>
                  <li>Sessões do timer Pomodoro</li>
                  <li>Matérias e anotações</li>
                  <li>Pontuação e progresso</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">2. Como Usamos suas Informações</h3>
              <p className="text-gray-600 mb-2">Utilizamos suas informações para:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Fornecer e manter nossos serviços</li>
                <li>Personalizar sua experiência de aprendizagem</li>
                <li>Sincronizar seus dados entre dispositivos</li>
                <li>Gerar estatísticas de progresso</li>
                <li>Melhorar nossos serviços</li>
                <li>Comunicar atualizações importantes</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">3. Armazenamento de Dados</h3>
              <p className="text-gray-600">
                Seus dados são armazenados localmente no seu navegador usando localStorage e 
                podem ser sincronizados com nossos servidores seguros. Implementamos medidas 
                de segurança técnicas e organizacionais para proteger suas informações contra 
                acesso não autorizado, alteração, divulgação ou destruição.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">4. Compartilhamento de Informações</h3>
              <p className="text-gray-600 mb-2">
                Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, 
                exceto nas seguintes situações:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Com seu consentimento explícito</li>
                <li>Para cumprir obrigações legais</li>
                <li>Para proteger nossos direitos e segurança</li>
                <li>Com provedores de serviços que nos auxiliam (sob acordos de confidencialidade)</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">5. Seus Direitos</h3>
              <p className="text-gray-600 mb-2">Você tem o direito de:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Acessar suas informações pessoais</li>
                <li>Corrigir dados imprecisos</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Exportar seus dados</li>
                <li>Retirar seu consentimento a qualquer momento</li>
                <li>Apresentar reclamações às autoridades competentes</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">6. Cookies e Tecnologias Similares</h3>
              <p className="text-gray-600">
                Utilizamos localStorage e outras tecnologias de armazenamento local para melhorar 
                sua experiência, lembrar suas preferências e manter você conectado. Você pode 
                limpar esses dados através das configurações do seu navegador.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">7. Retenção de Dados</h3>
              <p className="text-gray-600">
                Mantemos suas informações pelo tempo necessário para fornecer nossos serviços 
                ou conforme exigido por lei. Quando você exclui sua conta, removemos suas 
                informações pessoais de nossos sistemas ativos.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">8. Segurança</h3>
              <p className="text-gray-600">
                Implementamos medidas de segurança apropriadas para proteger suas informações 
                contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, 
                nenhum método de transmissão pela internet é 100% seguro.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">9. Menores de Idade</h3>
              <p className="text-gray-600">
                Nosso serviço não é direcionado a menores de 13 anos. Não coletamos 
                intencionalmente informações pessoais de crianças menores de 13 anos. 
                Se descobrirmos que coletamos tais informações, as excluiremos imediatamente.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">10. Alterações nesta Política</h3>
              <p className="text-gray-600">
                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos 
                você sobre alterações significativas por email ou através de um aviso em nosso 
                serviço. O uso continuado após as alterações constitui aceitação da nova política.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">11. Contato</h3>
              <p className="text-gray-600">
                Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos 
                suas informações, entre em contato conosco:
              </p>
              <ul className="list-none text-gray-600 mt-2 space-y-1">
                <li>Email: privacidade@studydock.com</li>
                <li>Telefone: (11) 1234-5678</li>
              </ul>
            </section>

            <div className="pt-4 border-t text-xs text-gray-500">
              <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}