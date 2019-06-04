import { LitElement, html, css } from 'lit-element';
import './chat-message';

class ChatRoom extends LitElement {

  /**
   * Add username and messageList properties with type string and array respectively.
   * username - name/alias of the user.
   * messageList - list of messages.
   */
  static get properties() {

  }

  /**
   * Expose css custom properties for the ff:
   * - host background color
   * - button background, text color and hover background
   */
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        background: #e6eaea;
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
        color: #f5f5f5;
        background: #32465a;
        padding: 8px 20px;
        border: none;
        cursor: pointer;
      }

      button:hover {
        background: #192d41;
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
    // add the message to the messageList
  }

  render() {
    return html`
      <div class="message-list">
        <!-- render the message list -->
      </div>
      <div class="message-input">
        <!-- listen to keypress event -->
        <input placeholder="Type your message..."/>
        <!-- listen to click event -->
        <button>Send</button>
      </div>
    `;
  }
}

customElements.define('chat-room', ChatRoom);