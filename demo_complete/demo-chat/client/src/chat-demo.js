import { LitElement, html, css } from 'lit-element';
import './chat-lobby';
import './chat-room';

class ChatDemo extends LitElement {

  static get properties() {
    return {
      joined: { type: Boolean },
      username: { type: String }
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;
        height: 100%;
        width: 100%;
      }
    `;
  }

  constructor() {
    super();
    this.joined = false;
  }

  handleRoomEnter(event) {
    this.username = event.detail.username;
    this.joined = true;
  }

  render() {
    return html`
      <chat-lobby ?hidden=${this.joined} @room-enter=${this.handleRoomEnter}></chat-lobby>
      <chat-room ?hidden=${!this.joined} .username=${this.username}></chat-room>
    `;
  }
}

customElements.define('chat-demo', ChatDemo);