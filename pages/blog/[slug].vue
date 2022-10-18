<template>
  <main>
    <ContentDoc>
      <template #not-found>
        <h1>Document not found</h1>
      </template>
    </ContentDoc>
    <button @click="foo.increment">{{ foo.bar }}</button>
  </main>
</template>

<script setup>
const foo = useFooStore()
</script>