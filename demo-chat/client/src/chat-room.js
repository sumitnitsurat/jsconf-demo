import { LitElement, html, css } from 'lit-element';
import './chat-message';

class ChatRoom extends LitElement {

  static get properties() {
    return {
      username: { type: String },
      messageList: { type: Array }
    };
  }

  static get styles() {
    return css`
      :host {
        --background: #e6eaea;
        --button-color: #f5f5f5;
        --button-background: #32465a;
        --button-hover-background: #192d41;

        display: flex;
        flex-direction: column;
        background: var(--room-background, var(--background));
        height: 100%;
        width: 100%;
      }

      :host([hidden]) {
        display: none;
      }

      .message-list {
        flex: 1;
        overflow-x: hidden;
        padding: 12px 20px;
      }

      .message-list chat-message {
        margin-bottom: 16px;
      }

      .message-input {
        display: flex;
        width: 100%;
      }

      input {
        border: none;
        padding: 11px 32px 10px 8px;
        font-size: 0.8em;
        color: #32465a;
        outline: none;
        flex: 1;
      }

      button {
        color: var(--room-button-color, var(--button-color));
        background: var(--room-button-background, var(--button-background));
        padding: 8px 20px;
        border: none;
        cursor: pointer;
      }

      button:hover {
        background: var(--room-button-hover-background, var(--button-hover-background));
      }
    `;
  }

  set username(val) {
    let oldVal = this._username;
    this._username = val;
    this.requestUpdate('prop', oldVal);

    if (this._username) {
      this.establishWebSocket();
    }
  }

  get username() { return this._username; }

  constructor() {
    super();
    this.messageList = [];
  }

  firstUpdated(_) {
    this._input = this.shadowRoot.querySelector('input');
  }

  establishWebSocket() {
    this._socket = new WebSocket('ws://localhost:8080');
    this._socket.onmessage = (evt) => {
      const { from, message } = JSON.parse(evt.data);
      this._addToMessageList({ from, message });
    };
  }

  handleClick() {
    this.sendMessage();
  }

  handleKeyPress(e) {
    if (e.target.value !== '') {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
    }
  }

  sendMessage() {
    const newMessage = {
      from: this.username,
      message: this._input.value
    };
    this._addToMessageList(newMessage, true);
    this._socket.send(JSON.stringify(newMessage));
    this._input.value = '';
  }

  _addToMessageList(message, outgoing = false) {
    this.messageList = [
      ...this.messageList,
      { ...message, outgoing }
    ];
  }

  render() {
    return html`
      <div class="message-list">
        ${this.messageList.map(message => {
          return html`<chat-message ?outgoing=${message.outgoing} from=${message.from}>${message.message}</chat-message>`
        })}
      </div>
      <div class="message-input">
        <input @keypress=${this.handleKeyPress} placeholder="Type your message..."/>
        <button @click=${this.handleClick}>Send</button>
      </div>
    `;
  }
}

customElements.define('chat-room', ChatRoom);