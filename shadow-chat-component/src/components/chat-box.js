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
      <div class="flex">
        <div class="bg-blue-500">Chat</div>
        <div class="overflow-y-auto" id="chatBody"></div>
        <div class="border-t">
          <input type="text" class="flex-1" id="chatInput" placeholder="Type a message..." />
          <button class="ml-2" id="sendButton">Send</button>
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
