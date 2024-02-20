import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  message: string,
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name, message
}) => (
  <div className='m-5 p-5 text-muted-foreground'>
    <h3 className='text-primary'>Hello ${name},</h3>
    <br />
    <p>Thank you for contacting me. Your message has been received successfully.</p>
    <p>This is an automated reply with the details of your message:</p>
    <p>&quot; ${message} &quot;</p>
    <br />
    <br />
    <p>I will review your message and get back to you as soon as possible.</p>
    <br />
    <br />
    <p>Best Regards,</p>
    <p className='font-bold'>Jay Termulo</p>
    <p>Your Frontend Developer</p>
  </div>
);
