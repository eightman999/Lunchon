<template>
  <q-page class="q-pa-md">
    <div class="text-h6 q-mb-md">🍽 みんなの給食タイムライン</div>

    <q-list separator>
      <q-item v-for="post in posts" :key="post.id">
        <q-item-section avatar>
          <q-avatar>
            <img :src="post.imgUrl" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ post.comment }}</q-item-label>
          <q-item-label caption>
            {{ formatDate(post.timestamp) }} | 投稿者: {{ post.nickname || '匿名さん' }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
import type { Timestamp } from 'firebase/firestore'
import { onMounted, ref } from 'vue'
import { db } from 'boot/firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import type { DocumentData } from 'firebase/firestore'
import { doc, getDoc } from 'firebase/firestore'

interface Post extends DocumentData {
  id: string
  comment: string
  imgUrl: string
  timestamp: Timestamp
  uid?: string
  nickname?: string
}

const posts = ref<Post[]>([])

const fetchPosts = async () => {
  const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'))
  const querySnapshot = await getDocs(q)

  const results: Post[] = []

  for (const docSnap of querySnapshot.docs) {
    const data = docSnap.data()
    if ('comment' in data && 'imgUrl' in data && 'timestamp' in data) {
      const post: Post = { ...data, id: docSnap.id }
    }

    // ニックネームの取得
    if (post.uid) {
      const userDoc = await getDoc(doc(db, 'users', post.uid))
      if (userDoc.exists()) {
        post.nickname = userDoc.data().nickname
      }
    }

    results.push(post)
  }

  posts.value = results
}

const formatDate = (timestamp: Timestamp | undefined) => {
  const date = timestamp?.toDate?.() ?? new Date()
  return date.toLocaleDateString()
}

onMounted(fetchPosts)
</script>
