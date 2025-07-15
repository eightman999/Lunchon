<!-- src/components/LunchCard.vue -->
<template>
  <q-card class="q-ma-sm" flat bordered>
    <q-img :src="imgUrl" :alt="comment" height="200px" />
    <q-card-section>
      <div class="text-subtitle2">{{ comment }}</div>
      <div class="text-caption text-grey-7">{{ date }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
defineProps<{
  imgUrl: string
  comment: string
  date: string
}>()
</script>
