<!-- src/pages/PostPage.vue -->
<template>
  <q-page class="q-pa-md">
    <div class="text-h6 q-mb-md">🍱 給食の写真を投稿</div>

    <q-form @submit="submitPost" class="column q-gutter-md">
      <q-input
        v-model="comment"
        label="コメントを入力"
        outlined
        type="textarea"
        autogrow
        required
      />

      <q-file
        v-model="imageFile"
        label="画像を選択"
        outlined
        accept="image/*"
        required
      >
        <template v-slot:prepend>
          <q-icon name="image" />
        </template>
      </q-file>

      <q-btn label="投稿する" color="primary" type="submit" :disable="isSubmitting" />

      <q-spinner v-if="isSubmitting" size="32px" color="primary" />
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db, storage } from 'boot/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

const comment = ref('')
const imageFile = ref<File | null>(null)
const isSubmitting = ref(false)
const router = useRouter()

const submitPost = async () => {
  if (!comment.value || !imageFile.value) return

  isSubmitting.value = true

  try {
    const file = imageFile.value
    const fileName = `${Date.now()}_${file.name}`
    const imgRef = storageRef(storage, `images/${fileName}`)

    await uploadBytes(imgRef, file)
    const downloadURL = await getDownloadURL(imgRef)

    await addDoc(collection(db, 'posts'), {
      comment: comment.value,
      imgUrl: downloadURL,
      timestamp: serverTimestamp(),
      uid: auth.currentUser?.uid ?? null  // 投稿者情報（匿名表示用）
    })


    await router.push('/')
  } catch (e) {
    console.error('投稿エラー:', e)
    alert('投稿に失敗しました')
  } finally {
    isSubmitting.value = false
  }
}
</script>
