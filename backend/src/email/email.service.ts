import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendIncidentAssigned(toEmail: string, userName: string, incidentTitle: string) {
    await this.mailerService.sendMail({
      to: toEmail,
      subject: `Nova Tarefa: ${incidentTitle}`,
      text: `Olá ${userName}, foi-te atribuído o incidente ${incidentTitle}.`,
    });
  }
}