import { LitElement, html, css } from 'lit-element';

class ChatLobby extends LitElement {

  static get styles() {
    return css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      :host {
        display: block;
        background: #2c3e50;
        height: 100%;
        width: 100%;
      }

      :host([hidden]) {
        display: none;
      }

      .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
      }

      input {
        width: 350px;
        padding: 20px 0px;
        margin-bottom: 20px;
        background: transparent;
        border: 0;
        border-bottom: 1px solid #f5f5f5;
        outline: none;
        color: #fff;
        font-size: 16px;
      }

      ::-webkit-input-placeholder {
        color: #6D7781;
        font-size: 12px;
      }

      button {
        background: #1FCE6D;
        border: 0;
        width: 350px;
        height: 40px;
        border-radius: 3px;
        color: #fff;
        font-size: 12px;
        cursor: pointer;
      }

      button:hover {
        background: #16aa56;
      }
    `;
  }

  firstUpdated() {
    this._input = this.shadowRoot.querySelector('input');
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.joinChatRoom();
    }
  }

  handleClick() {
    this.joinChatRoom();
  }

  joinChatRoom() {
    const username = this._input.value;
    if (!username) {
      return;
    }

    let event = new CustomEvent('room-enter', {
      detail: { username }
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <div class="container">
        <input @keypress=${this.handleKeyPress} placeholder="Username"/>
        <button @click=${this.handleClick}>Join Room</button>
      </div>
    `;
  }
}

customElements.define('chat-lobby', ChatLobby);