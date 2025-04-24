export class ChatMessage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const text = this.getAttribute('text') || 'No message';
    this.render(text);
  }

  render(text) {
    this.shadowRoot.innerHTML = `
      <style>
        .inline-block {
          background: #f1f1f1;
          padding: 5px 10px;
          border-radius: 5px;
          margin: 5px 0;
          display: inline-block;
        }
      </style>
      <div class="inline-block">${text}</div>
    `;
  }
}

customElements.define('chat-message', ChatMessage);
