import { LitElement, html, css } from 'lit-element';

class ChatMessage extends LitElement {

  /**
   * Add from and outgoing properties with type string and boolean respectively.
   * from - the sender of the message. should reflect to attribute
   * outgoing - indicator whether if it's outgoing or incoming. should reflect to attribute
   */
  static get properties() {

  }

  /**
   * Expose css custom properties for the ff:
   * - badge background and text color
   * - message text color
   * - name text color 
   */
  static get styles() {
    return css`
      :host {
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

    // Bind the initial and name variables to the badge and name respectively.
    // Make use of slot for the message
    return html`
      <div class="badge"></div>
      <div class="chat-info">
        <strong class="name"></strong>
        <p class="message"></p>
      </div>
    `;
  }
}

customElements.define('chat-message', ChatMessage);