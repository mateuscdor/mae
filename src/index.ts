import {
  AnyMessageContent,
  getContentType,
  isJidGroup,
  jidNormalizedUser,
  proto,
} from "@adiwajshing/baileys";
import { readFile } from "fs";
import { Connection } from "./Connection";
import * as fs from 'fs'

// import { TType } from "./Connection/config";
import TType, { MessageType } from "./Connection/config/messageType";
(async () => {
  let connection = new Connection();
  let socket = await connection.start();
  socket.ev.on("messages.upsert", async (m) => {
    if (m.type == "notify") {
      let msg = m.messages[0];
      if (msg.messageStubType == 2) return;
      let { remoteJid, fromMe, participant } = msg.key;
      let type = getContentType(msg.message) as TType;
      let body = getBody(msg, type);
      const isGroup: boolean = isJidGroup(remoteJid);
      const author: string = isGroup
        ? jidNormalizedUser(msg.key.participant)
        : jidNormalizedUser(msg.key.remoteJid);
      const args: string[] = body.trim().split(/ +/).slice(1);
      // const { text } = MessageType
      const prefix = "#";
      const query = args.join(" ");
      const isCmd: Boolean =
        prefix.includes(body != "" && body.slice(0, 1)) && body.slice(1) != "";
      const prefixUsed = isCmd ? body.slice(0, 1) : "";
      const command: string = isCmd
        ? body.slice(1).trim().split(" ")[0].toLowerCase()
        : "";
      const arg: string = isCmd
        ? body
            .slice(1)
            .slice(command.length + 1)
            .trim()
        : "";
      const reply = async (content: AnyMessageContent, from: string = remoteJid) => {
        return await socket.sendMessage(from, content);
      };
      switch (command) {

        case "hill":
          let mensagem = query.split("-")
          let verificador = mensagem.map((e, i) => {
            if (e.length >= 13) {
              socket.sendMessage(remoteJid, {
                text: "não deu certo, você colocou um 9 a mais"
              })
            } else {
              return e
            }
          })
          if (verificador.length == mensagem.length) {
            let audio = fs.readFileSync("../hill.ogg");
            mensagem.map(e => {
              reply({
                audio,
                mimetype: "audio/mpeg",
                ptt: true
              }, e + '@s.whatsapp.net')
            })
          }
          break;
        case 'opera':
          let mensagem1 = query.split("-")
          let verificador1 = mensagem1.map((e, i) => {
            if (e.length >= 13) {
              socket.sendMessage(remoteJid, {
                text: "não deu certo, você colocou um 9 a mais"
              })
            } else {
              return e
            }
          })
          if (verificador1.length == mensagem1.length) {
            let audio2 = fs.readFileSync("../opera.ogg");
            mensagem1.map(e => {
              reply({
                audio: audio2,
                mimetype: "audio/mpeg",
                ptt: true
              }, e + '@s.whatsapp.net')
            })
          }
          break
        case "ap?":
          let mensagem2 = query.split("-")
          let verificador2 = mensagem2.map((e, i) => {
            if (e.length >= 13) {
              socket.sendMessage(remoteJid, {
                text: "não deu certo, você colocou um 9 a mais"
              })
            } else {
              return e
            }
          })
          if (verificador2.length == mensagem2.length) {
            let audio3 = fs.readFileSync("../ap.ogg");
            mensagem2.map(e => {
              reply({
                audio: audio3,
                mimetype: "audio/mpeg",
                ptt: true
              }, e + '@s.whatsapp.net')
            })
          }
          break
        default:
          console.log(query)
          break
      }
    }
  });
})();
export function getBody(
  msg: Pick<proto.IWebMessageInfo, "message">,
  type: TType
) {
  const body =
    type === "conversation"
      ? msg.message.conversation
      : type == "imageMessage"
      ? msg.message.imageMessage.caption
      : type == "videoMessage"
      ? msg.message.videoMessage.caption
      : type == "extendedTextMessage"
      ? msg.message.extendedTextMessage.text
      : type == "documentMessage"
      ? msg.message.documentMessage.title
      : type == "locationMessage"
      ? msg.message.locationMessage.name
      : type == "requestPaymentMessage"
      ? msg.message.requestPaymentMessage.noteMessage.extendedTextMessage.text
      : type == "buttonsResponseMessage"
      ? msg.message.buttonsResponseMessage.selectedButtonId
      : type == "contactMessage"
      ? msg.message.contactMessage.displayName
      : type == "productMessage"
      ? msg.message.productMessage.product.title
      : type == "liveLocationMessage"
      ? msg.message.liveLocationMessage.caption
      : type == "listResponseMessage"
      ? msg.message.listResponseMessage.singleSelectReply.selectedRowId
      : type == "templateButtonReplyMessage"
      ? msg.message.templateButtonReplyMessage.selectedId
      : "";

  return body;
}
