import { MessageType } from '../api/types/messagesTypes'
import store from '../core/store'
import WSTransport, { WSTransportEvents } from '../core/wsTransport'
import chatsController from './chatsController'

class MessagesController {
  private sockets: Map<number, WSTransport> = new Map()

  async connect(id: number, token: string) {
    if (this.sockets.has(id)) {
      return
    }

    const userId = store.getState().user.data!.id

    const wsTransport = new WSTransport(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`
    )

    this.sockets.set(id, wsTransport)

    await wsTransport.connect()

    this.subscribe(wsTransport, id)
    this.fetchOldMessages(id)
  }

  sendMessage(id: number, message: string) {
    const socket = this.sockets.get(id)

    if (!socket) {
      throw new Error(`Chat ${id} is not connected`)
    }

    socket.send({
      type: 'message',
      content: message
    })
  }

  fetchOldMessages(id: number) {
    const socket = this.sockets.get(id)

    if (!socket) {
      throw new Error(`Chat ${id} is not connected`)
    }

    socket.send({ type: 'get old', content: '0' })
  }

  closeAll() {
    Array.from(this.sockets.values()).forEach(socket => socket.close())
  }

  private onMessage(id: number, messages: MessageType | MessageType[]) {
    let messagesToAdd: MessageType[] = []

    if (Array.isArray(messages)) {
      messagesToAdd = messages.filter(el => el.type === 'message').reverse()
    } else {
      if (messages.type === 'message') {
        messagesToAdd.push(messages)

        // Костыль которым обновляю last_message
        chatsController.updateLastMessage(id, messages)
      }
    }

    const currentMessages = (store.getState().messages || {})[id] || []

    messagesToAdd = [...currentMessages, ...messagesToAdd]
    store.set(`messages.${id}`, messagesToAdd)
  }

  private onClose(id: number) {
    this.sockets.delete(id)
  }

  private subscribe(transport: WSTransport, id: number) {
    transport.on(WSTransportEvents.Message, message =>
      this.onMessage(id, message)
    )
    transport.on(WSTransportEvents.Close, () => this.onClose(id))
  }
}

const controller = new MessagesController()

// @ts-ignore
// window.messagesController = controller;

export default controller
