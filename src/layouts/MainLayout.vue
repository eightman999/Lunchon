<template>
  <q-layout view="lHh Lpr lFf">
    <!-- ヘッダー -->
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />
        <q-toolbar-title>ランチョン</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- ドロワー -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item clickable to="/">
          <q-item-section avatar><q-icon name="home" /></q-item-section>
          <q-item-section>タイムライン</q-item-section>
        </q-item>
        <q-item clickable to="/profile">
          <q-item-section avatar><q-icon name="person" /></q-item-section>
          <q-item-section>プロフィール</q-item-section>
        </q-item>
        <q-item clickable to="/settings">
          <q-item-section avatar><q-icon name="settings" /></q-item-section>
          <q-item-section>せってい</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- メイン表示 -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- 投稿ボタン (FAB) -->
    <q-btn
      fab
      icon="add"
      color="primary"
      class="q-fab bottom-right"
      @click="goToPost"
    />
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const leftDrawerOpen = ref(false)
const router = useRouter()
const goToPost = () => {
  void router.push('/post')
}
</script>

<style scoped>
.q-fab.bottom-right {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
