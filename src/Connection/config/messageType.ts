export type TType =
  | "conversation"
  | "imageMessage"
  | "videoMessage"
  | "extendedTextMessage"
  | "documentMessage"
  | "locationMessage"
  | "requestPaymentMessage"
  | "buttonsResponseMessage"
  | "contactMessage"
  | "productMessage"
  | "liveLocationMessage"
  | "listResponseMessage"
  | "templateButtonReplyMessage"
  | "ephemeralMessage"
  | "protocolMessage"
  | "stickerMessage"
  | "audioMessage"
  | "buttonsMessage"
  | "reactionMessage"
  | "declinePaymentRequestMessage"
  | "paymentRequestMessage"
  | "sendPaymentMessage"
  | "contactsArrayMessage"
  | "templateMessage";

export enum MessageType {
  text = "conversation"
}

export default TType