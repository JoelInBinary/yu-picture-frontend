<template>
  <div class="picture-list">
    <!-- 图片列表 -->
    <a-list
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }"
      :data-source="dataList"
      :loading="loading"
    >
      <template #renderItem="{ item: picture }">
        <a-list-item style="padding: 0">
          <!-- 单张图片 -->
          <a-card hoverable @click="doClickPicture(picture)">
            <template #cover>
              <img
                style="height: 180px; object-fit: cover"
                :alt="picture.name"
                :src="picture.thumbnailUrl ?? picture.url"
                loading="lazy"
              />
            </template>
            <a-card-meta :title="picture.name">
              <template #description>
                <a-flex>
                  <a-tag color="green">
                    {{ picture.category ?? '默认' }}
                  </a-tag>
                  <a-tag v-for="tag in picture.tags" :key="tag">
                    {{ tag }}
                  </a-tag>
                </a-flex>
              </template>
            </a-card-meta>
            <template v-if="showOp" #actions>
              <a-tooltip title="以图搜图">
                <template #default>
                  <search-outlined @click="(e) => doSearch(picture, e)" />
                </template>
              </a-tooltip>
              <a-tooltip title="分享">
                <template #default>
                  <share-alt-outlined @click="(e) => doShare(picture, e)" />
                </template>
              </a-tooltip>
              <a-tooltip title="编辑">
                <template #default>
                  <edit-outlined @click="(e) => doEdit(picture, e)" />
                </template>
              </a-tooltip>
              <a-tooltip title="删除">
                <template #default>
                  <delete-outlined @click="(e) => doDelete(picture, e)" />
                </template>
              </a-tooltip>
            </template>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
    <ShareModal ref="shareModalRef" :link="shareLink" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { EditOutlined, DeleteOutlined, SearchOutlined, ShareAltOutlined } from '@ant-design/icons-vue'
import { deletePictureUsingPost } from '@/api/pictureController.ts'
import { message, Modal } from 'ant-design-vue'
import ShareModal from '@/components/ShareModal.vue'
import { ref } from 'vue'

interface Props {
  dataList?: API.PictureVO[]
  loading?: boolean
  showOp?: boolean
  onReload?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  dataList: () => [],
  loading: false,
  showOp: false,
})

// 跳转至图片详情
const router = useRouter()
const doClickPicture = (picture: API.PictureVO) => {
  router.push({
    path: `/picture/${picture.id}`,
  })
}

// 图片编辑
const doEdit = (picture: API.PictureVO, e: MouseEvent) => {
  // 阻止冒泡
  e.stopPropagation()
  router.push({
    path: '/add_picture',
    query: {
      id: picture.id,
      spaceId: picture.spaceId,
    },
  })
}

// 确认删除弹窗
const confirmDelete = (picture: API.PictureVO, e: MouseEvent) => {
  // 阻止冒泡
  e.stopPropagation()
  Modal.confirm({
    title: '确认删除',
    content: `确定要删除图片 "${picture.name}" 吗？`,
    onOk: async () => {
      await doDelete(picture)
    },
    onCancel: () => {},
    okText: '确定',
    cancelText: '取消'
  })
}

// 图片删除
const doDelete = async (picture: API.PictureVO) => {
  const id = picture.id
  if (!id) {
    return
  }
  const res = await deletePictureUsingPost({ id })
  if (res.data.code === 0) {
    message.success('删除成功')
    // 让外层刷新
    props.onReload?.()
  } else {
    message.error('删除失败')
  }
}

// 以图搜图搜索
const doSearch = (picture, e) => {
  // 阻止冒泡
  e.stopPropagation()
  // 打开新窗口
  window.open(`/search_picture?pictureId=${picture.id}`)
}

// 分享弹窗引用
const shareModalRef = ref()
// 分享链接
const shareLink = ref<string>()

// 分享
const doShare = (picture: API.PictureVO, e: Event) => {
  e.stopPropagation()
  shareLink.value = `${window.location.protocol}//${window.location.host}/picture/${picture.id}`
  if (shareModalRef.value) {
    shareModalRef.value.openModal()
  }
}

</script>

<style scoped>

</style>
