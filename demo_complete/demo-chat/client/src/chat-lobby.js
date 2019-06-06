import { LitElement, html, css } from 'lit-element';

class ChatLobby extends LitElement {

  static get styles() {
    return css`
      :host {
        --background: #2c3e50;
        --input-color: #fff;
        --input-placeholder-color: #6D7781;
        --button-color: #fff;
        --button-background: #1FCE6D;
        --button-hover-background: #16aa56;

        display: block;
        background: var(--lobby-background, var(--background));
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
        color: var(--lobby-input-color, var(--input-color));
        font-size: 16px;
      }

      ::-webkit-input-placeholder {
        color: var(--lobby-input-placeholder-color, var(--input-placeholder-color));
        font-size: 12px;
      }

      button {
        background: var(--lobby-button-background, var(--button-background));
        border: 0;
        width: 350px;
        height: 40px;
        border-radius: 3px;
        color: var(--lobby-button-color, #fff);
        font-size: 12px;
        cursor: pointer;
      }

      button:hover {
        background: var(--lobby-button-hover-background, var(--button-hover-background));
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