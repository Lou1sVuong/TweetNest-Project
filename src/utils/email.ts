/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses'
import { config } from 'dotenv'
import fs from 'fs'
import path from 'path'
config()
// Create SES service object.
const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string
  }
})

export const verifyEmailTemplate = fs.readFileSync(path.resolve('src/templates/verify-email.html'), 'utf8')

const createSendEmailCommand = ({
  fromAddress,
  toAddresses,
  ccAddresses = [],
  body,
  subject,
  replyToAddresses = []
}: {
  fromAddress: string
  toAddresses: string | string[]
  ccAddresses?: string | string[]
  body: string
  subject: string
  replyToAddresses?: string | string[]
}) => {
  return new SendEmailCommand({
    Destination: {
      /* required */
      CcAddresses: ccAddresses instanceof Array ? ccAddresses : [ccAddresses],
      ToAddresses: toAddresses instanceof Array ? toAddresses : [toAddresses]
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: 'UTF-8',
          Data: body
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      }
    },
    Source: fromAddress,
    ReplyToAddresses: replyToAddresses instanceof Array ? replyToAddresses : [replyToAddresses]
  })
}

const sendEmail = (toAddress: string, subject: string, body: string) => {
  const sendEmailCommand = createSendEmailCommand({
    fromAddress: process.env.SES_FROM_ADDRESS as string,
    toAddresses: toAddress,
    body,
    subject
  })

  return sesClient.send(sendEmailCommand)
}

export const sendVerifyRegisterEmail = (
  toAddress: string,
  name: string,
  email_verify_token: string,
  template: string = verifyEmailTemplate
) => {
  return sendEmail(
    toAddress,
    'Verify your email',
    template
      .replace('{{customer_name}}', name)
      .replace('{{content_1}}', 'Thank you for subscribing to our service. We are delighted to welcome you.')
      .replace('{{content_2}}', 'Please confirm your email by clicking the button below.')
      .replace('{{button_text}}', 'Verify Email')
      .replace('{{button_link}}', `${process.env.CLIENT_URL}/verify-email?token=${email_verify_token}`)
  )
}

export const sendForgotPassWordEmail = (
  toAddress: string,
  name: string,
  forgot_password_token: string,
  template: string = verifyEmailTemplate
) => {
  return sendEmail(
    toAddress,
    'Reset your password',
    template
      .replace('{{customer_name}}', name)
      .replace(
        '{{content_1}}',
        'We received a request to reset your password. If you did not make this request, please ignore this email.'
      )
      .replace('{{content_2}}', 'To reset your password, please click the button below:')
      .replace('{{button_text}}', 'Reset Password')
      .replace('{{button_link}}', `${process.env.CLIENT_URL}/reset-password?token=${forgot_password_token}`)
  )
}