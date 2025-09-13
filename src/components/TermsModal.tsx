'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FileText } from 'lucide-react'

interface TermsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function TermsModal({ open, onOpenChange }: TermsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Termos de Uso</span>
          </DialogTitle>
          <DialogDescription>
            Leia nossos termos de uso antes de utilizar o StudyDock
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-96 pr-4">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="font-semibold text-base mb-2">1. Aceitação dos Termos</h3>
              <p className="text-gray-600">
                Ao acessar e usar o StudyDock, você concorda em cumprir e estar vinculado a estes 
                Termos de Uso. Se você não concordar com qualquer parte destes termos, não deve 
                usar nosso serviço.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">2. Descrição do Serviço</h3>
              <p className="text-gray-600">
                O StudyDock é uma plataforma de estudos que oferece ferramentas como timer Pomodoro, 
                gerenciamento de tarefas, flashcards, calendário de eventos e organização de matérias 
                para auxiliar no processo de aprendizagem.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">3. Conta do Usuário</h3>
              <p className="text-gray-600 mb-2">
                Para usar certas funcionalidades do StudyDock, você deve criar uma conta fornecendo 
                informações precisas e atualizadas. Você é responsável por:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Manter a confidencialidade de sua senha</li>
                <li>Todas as atividades que ocorrem em sua conta</li>
                <li>Notificar-nos imediatamente sobre qualquer uso não autorizado</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">4. Uso Aceitável</h3>
              <p className="text-gray-600 mb-2">Você concorda em não usar o StudyDock para:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Atividades ilegais ou não autorizadas</li>
                <li>Violar direitos de propriedade intelectual</li>
                <li>Transmitir conteúdo ofensivo, difamatório ou prejudicial</li>
                <li>Interferir no funcionamento do serviço</li>
                <li>Tentar acessar contas de outros usuários</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">5. Conteúdo do Usuário</h3>
              <p className="text-gray-600">
                Você mantém todos os direitos sobre o conteúdo que cria no StudyDock (tarefas, 
                flashcards, anotações, etc.). Ao usar nosso serviço, você nos concede uma licença 
                limitada para armazenar e processar seu conteúdo apenas para fornecer o serviço.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">6. Privacidade</h3>
              <p className="text-gray-600">
                Sua privacidade é importante para nós. Nossa coleta e uso de informações pessoais 
                são regidos por nossa Política de Privacidade, que faz parte integrante destes termos.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">7. Limitação de Responsabilidade</h3>
              <p className="text-gray-600">
                O StudyDock é fornecido "como está" sem garantias de qualquer tipo. Não nos 
                responsabilizamos por danos diretos, indiretos, incidentais ou consequenciais 
                decorrentes do uso ou incapacidade de usar nosso serviço.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">8. Modificações</h3>
              <p className="text-gray-600">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações 
                entrarão em vigor imediatamente após a publicação. O uso continuado do serviço 
                constitui aceitação dos termos modificados.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">9. Encerramento</h3>
              <p className="text-gray-600">
                Podemos encerrar ou suspender sua conta e acesso ao serviço imediatamente, sem 
                aviso prévio, por qualquer motivo, incluindo violação destes termos.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">10. Contato</h3>
              <p className="text-gray-600">
                Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco através 
                do email: suporte@studydock.com
              </p>
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