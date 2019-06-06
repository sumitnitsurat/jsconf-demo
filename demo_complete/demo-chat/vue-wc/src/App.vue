<template>
  <div id="app">
    <chat-demo></chat-demo>
  </div>
</template>

<script>
import 'chat-demo/build/chat-demo';

export default {
  name: 'app'
}
</script>

<style>
#app {
  height: 100vh;
}

chat-demo {
  --lobby-background: var(--main-color);
  --lobby-button-background: var(--primary-color);
  --lobby-button-hover-background: var(--primary-color-darken-10);
  --lobby-input-placeholder-color: var(--grey-color);

  --room-background: var(--main-color);
  --room-button-background: var(--primary-color);
  --room-button-hover-background: var(--primary-color-darken-10);

  --message-badge-background: var(--primary-color);
  --message-color: var(--white-color);
  --message-name-color: var(--grey-color);
}
</style>
