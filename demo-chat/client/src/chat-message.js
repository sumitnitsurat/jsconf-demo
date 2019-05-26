import { LitElement, html, css } from 'lit-element';

class ChatMessage extends LitElement {

  static get properties() {
    return {
      from: { type: String, reflect: true },
      outgoing: { type: Boolean, reflect: true }
    };
  }

  static get styles() {
    return css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      :host {
        display: flex;
        font-size: 16px;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif
      }

      .badge {
        font-size: 1em;
        width: 2.5em;
        height: 2.5em;
        line-height: 2.5em;
        text-align: center;
        border-radius: 50%;
        background: #435f7a;
        vertical-align: middle;
        margin-right: 16px;
        color: #fff;
        text-transform: uppercase;
      }

      .message {
        color: #777;
        font-size: 1em;
        margin: 0;
        width: 100%;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif
      }

      .name {
        font-size: 12px;
        color: #333;
        text-transform: capitalize;
      }

      :host([outgoing]) {
        flex-direction: row-reverse;
      }

      :host([outgoing]) .badge {
        margin: 0 0 0 16px;
      }
      
      :host([outgoing]) .chat-info {
        text-align: right;
      }
    `;
  }

  render() {
    const name = this.from || 'Anonymous';
    const initial = name[0];

    return html`
      <div class="badge">${initial}</div>
      <div class="chat-info">
        <strong class="name">${name}</strong>
        <p class="message"><slot></slot></p>
      </div>
    `;
  }
}

customElements.define('chat-message', ChatMessage);