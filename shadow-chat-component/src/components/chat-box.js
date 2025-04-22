import styles from '!!raw-loader!sass-loader!../styles/chat.scss';
import './chat-message';

export class ChatBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="chat-container">
        <div class="chat-header">Chat</div>
        <div class="chat-body" id="chatBody"></div>
        <div class="chat-footer">
          <input type="text" class="chat-input" id="chatInput" placeholder="Type a message..." />
          <button class="chat-send" id="sendButton">Send</button>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector('#sendButton').addEventListener('click', () => this.sendMessage());
  }

  sendMessage() {
    const input = this.shadowRoot.querySelector('#chatInput');
    const chatBody = this.shadowRoot.querySelector('#chatBody');

    if (input.value.trim()) {
      const message = document.createElement('chat-message');
      message.setAttribute('text', input.value);
      chatBody.appendChild(message);
      input.value = '';
    }
  }
}

customElements.define('chat-box', ChatBox);
