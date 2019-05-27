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
      :host {
        --color: #777;
        --name-color: #333;
        --badge-background: #435f7a;
        --badge-color: #fff;

        display: flex;
        font-size: 16px;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      }

      .badge {
        font-size: 1em;
        width: 2.5em;
        height: 2.5em;
        line-height: 2.5em;
        text-align: center;
        border-radius: 50%;
        background: var(--message-badge-background, var(--badge-background));
        vertical-align: middle;
        margin-right: 16px;
        color: var(--message-badge-color, var(--badge-color));
        text-transform: uppercase;
      }

      .message {
        color: var(--message-color, var(--color));
        font-size: 1em;
        margin: 0;
        width: 100%;
      }

      .name {
        font-size: 12px;
        color: var(--message-name-color, var(--name-color));
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