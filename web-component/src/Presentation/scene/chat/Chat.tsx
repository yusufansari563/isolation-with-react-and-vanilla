import React, { Suspense, useEffect } from "react";

import("chat_provider/ChatBox" as any);

function Chat() {
  return (
    <form className="mx-10 w-full bottom-0 relative chat">
      <chat-box></chat-box>
    </form>
  );
}

export default Chat;
