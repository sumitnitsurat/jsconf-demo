import { LitElement, html, css } from 'lit-element';
import './chat-lobby';
import './chat-room';

class ChatDemo extends LitElement {

  /**
   * Add joined and username properties with type boolean and string respectively
   * joined - indicator whether the user has entered the room or not. default to false
   * username - name/alias of the user who joined the room
   */
  static get properties() {}

  static get styles() {
    return css`
      :host {
        display: block;
        height: 100%;
        width: 100%;
      }
    `;
  }

  /**
   * set joined property to true and assign input value to username property
   */
  handleRoomEnter(event) {

  }

  render() {
    return html`
      <!--
        Show chat-lobby and hide chat-room by default using boolean attribute binding.
        Listen to 'room-enter' event of chat-lobby -->
      <chat-lobby></chat-lobby>
      <!-- bind the username to chat-room using property binding -->
      <chat-room></chat-room>
    `;
  }
}

customElements.define('chat-demo', ChatDemo);