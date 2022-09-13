import makeWASocket, { WASocket, useMultiFileAuthState, MessageRetryMap } from '@adiwajshing/baileys';
import P from 'pino';


export class Connection {
    private readonly msgRetryCounterMap: MessageRetryMap = {}
    constructor () {
        
    }
    async start() {
        const keys = await this.keys()
        const sock = makeWASocket({
            browser: ["BOT Session", "Firefox", "3.0"],
            printQRInTerminal: true,
            logger: P({ level: 'warn' }),
            auth: keys.state,
            downloadHistory: false,
            syncFullHistory: false,
            markOnlineOnConnect: true,
            msgRetryCounterMap: this.msgRetryCounterMap
        })
        sock.ev.on('connection.update', async (update) => {
            const { connection } = update
            if (connection === 'close') process.exit()
            else if (connection == 'connecting') console.log('✅ Conectando...')
            else if (connection == 'open') console.log('✅ Servidor iniciado com Sucesso')
            
            if (update.receivedPendingNotifications) {
                console.log('✅ Recebendo notificações pendentes...')
            }
        })
        sock.ev.on('creds.update', async () => {
            console.log('✅ Credenciais atualizadas')
            await keys.saveState()
        })
        return sock
    }
    async keys() {
        const { state, saveCreds } = await useMultiFileAuthState('./session')
        return {
            state: state,
            saveState: saveCreds
        }
    }
};

