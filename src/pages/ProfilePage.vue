<template>
  <q-page class="q-pa-md">
    <div class="text-h6 q-mb-md">👤 プロフィール</div>

    <div v-if="user">
      <p><strong>表示名：</strong> {{ user.displayName }}</p>
      <p><strong>メール：</strong> {{ user.email }}</p>

      <q-input
        v-model="nickname"
        label="ニックネーム（投稿に表示）"
        outlined
        class="q-mb-md"
      />
      <q-btn label="保存" color="primary" @click="saveNickname" />

      <q-btn label="ログアウト" color="negative" class="q-mt-md" @click="logout" />
    </div>

    <div v-else>
      <q-btn label="Googleでログイン" color="primary" @click="login" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { auth, provider, signInWithPopup, signOut, db } from 'boot/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

const user = ref<User | null>(null)
const nickname = ref('')

const login = async () => {
  const result = await signInWithPopup(auth, provider)
  user.value = result.user
  await loadNickname()
}

const logout = async () => {
  await signOut(auth)
  user.value = null
  nickname.value = ''
}

const loadNickname = async () => {
  if (!user.value) return
  const docRef = doc(db, 'users', user.value.uid)
  const snap = await getDoc(docRef)
  if (snap.exists()) {
    nickname.value = snap.data().nickname ?? ''
  }
}

const saveNickname = async () => {
  if (!user.value) return
  await setDoc(doc(db, 'users', user.value.uid), {
    nickname: nickname.value
  }, { merge: true })
  alert('ニックネームを保存しました！')
}

onMounted(() => {
  onAuthStateChanged(auth, (u) => {
    user.value = u
    if (u) void loadNickname()
  })
})
</script>
