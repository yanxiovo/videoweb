<template>
    <!-- 仅在未上传时显示el-upload组件 -->
    <el-upload v-show="!uploading" class="upload-demo" drag :http-request="handleUpload" multiple
        :on-progress="handleProgress" :before-upload="beforeUpload">
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
            拖拽到此处也可上传
        </div>
        <div style="margin-top: 1rem">
            <el-button type="primary">上传视频</el-button>
        </div>
        <template #tip>
            <div class="el-upload__tip">
                mp4/avi等视频格式, 文件大小不超过1GB
            </div>
        </template>
    </el-upload>

    <div class="detail-container">
        <!-- 上传进度和提示信息独立显示 -->
        <div v-if="uploading || uploadSuccess" style="margin-top: 1rem">
            <div>
                已经上传：{{ uploadedSize }}MB / {{ totalSize }}MB
                当前速度：{{ speed }}MB/s
                剩余时间：{{ remainingTime }}秒
            </div>
            <el-progress :percentage="uploadPercentage"></el-progress>
            <div v-if="uploadSuccess" style="margin-top: 1rem; color: green;">
                视频上传成功
            </div>
        </div>

        <div v-if="uploading || uploadSuccess">
            <div :style="{ fontSize: '16px', fontWeight: 'bold' }">
                <p>基本设置</p>
            </div>
            <div class="cover">
                <span style="margin-right: 6rem">
                    <span style="color:red;margin-right:5px">*</span>
                    <span>封面</span>
                </span>
                <el-upload class="avatar-uploader" :show-file-list="false">
                    <img :src="imageUrl" class="avatar" />
                    <el-icon class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </div>

            <div class="Title">
                <span style="margin-right:6rem">
                    <span style="color:red;margin-right:5px">*</span>
                    <span>标题</span>
                </span>

                <el-input placeholder="请输入标题" v-model="title" :style="{ width: '50rem', height: '2.66rem' }"
                    maxlength="80" show-word-limit></el-input>
            </div>


            <div class="classify">
                <span style="margin-right:6rem">
                    <span style="color:red;margin-right:5px">*</span>
                    <span>分类</span>
                </span>

                <el-select v-model="classify" clearable placeholder="Select" :style="{ width: '6rem', height: '2.66rem' }">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
                        :style="{ paddingLeft: '2rem' }" />
                </el-select>
            </div>

            <div class="tags">
                <span style="margin-right:6rem">
                    <span style="color:red;margin-right:5px">*</span>
                    <span>标签</span>
                </span>

                <el-input v-model="input" placeholder="按回车添加Enter添加标签" @keyup.enter.native="handleAddTag" :style="{
                    width: '50rem', height: '2.66rem'
                }">
                    <template #prefix>
                        <el-tag v-for=" (tag, index) in tags" :key="index" closable @close="handleCloseTag(index)">
                            {{ tag }}
                        </el-tag>
                    </template>
                    <template #suffix>
                        还可以添加{{ maxNum - this.tags.length }}个标签
                    </template>
                </el-input>
            </div>

            <div class="desc">
                <span style="margin-right:6rem">
                    <span style="margin-left:0.6rem">简介</span>
                </span>

                <el-input type="textarea" placeholder="请输入视频简介" v-model="desc" rows="7" maxlength="2000" show-word-limit
                    :style="{ width: '50rem', height: '10.33rem' }">
                </el-input>
            </div>

            <div class="footerBtn">
                <el-button type="primary" :style="{ width: '7.66rem', marginRight: '1rem', height: '2.66rem' }">投稿</el-button>
                <el-button type="default" :style="{ width: '7.66rem', height: '2.66rem' }">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { UploadFilled } from '@element-plus/icons-vue';
// import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

// const ffmpeg = createFFmpeg({ log: true });
import { Plus } from '@element-plus/icons-vue'
export default {
    components: {
        UploadFilled,
    },
    data() {
        return {
            uploading: false,
            uploadPercentage: 0,
            uploadedSize: 0,
            totalSize: 0,
            speed: 0,
            startTime: 0,
            uploadSuccess: false,
            remainingTime: 0,
            title: '',
            classify: '',
            input: '',
            tags: [],
            maxNum: 10,
            desc: '',
            frames: [],
            options: [
                { value: '娱乐', label: '娱乐' },
                { value: '教育', label: '教育' },
                { value: '科技', label: '科技' },
                { value: '知识', label: '知识' },
                { value: '健康', label: '健康' },
                { value: '旅行', label: '旅行' },
                { value: '探险', label: '探险' },
                { value: '美食', label: '美食' },
                { value: '美食', label: '美食' },
                { value: '时尚', label: '时尚' },
                { value: '音乐', label: '音乐' },
                { value: '舞蹈', label: '舞蹈' },
                { value: '体育', label: '体育' },
                { value: '健身', label: '健身' },
                { value: '历史', label: '历史' },
                { value: '文化', label: '文化' },
                { value: '游戏', label: '游戏' },
                { value: '电影', label: '电影' },
                { value: '搞笑', label: '搞笑' },
                { value: '资讯', label: '咨讯' },
            ]
        };
    },
    methods: {
        async handleUpload(options) {
            const file = options.file;
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);

            reader.onloadstart = () => {
                this.uploading = true;
                this.uploadSuccess = false;
                this.startTime = Date.now();
                this.totalSize = (file.size / (1024 * 1024)).toFixed(2);
            };

            reader.onprogress = (event) => {
                const now = Date.now();
                const elapsed = (now - this.startTime) / 1000; // seconds
                this.uploadPercentage = ((event.loaded / file.size) * 100).toFixed(2);
                this.uploadedSize = (event.loaded / (1024 * 1024)).toFixed(2);
                this.speed = ((event.loaded / (1024 * 1024)) / elapsed).toFixed(2); // MB/s
                const remainingBytes = file.size - event.loaded;
                this.remainingTime = (remainingBytes / (this.speed * 1024 * 1024)).toFixed(2);
            };

            // reader.onloadend = async () => {
            //     this.uploading = true;
            //     this.uploadSuccess = true;
            //     // 开始提取关键帧
            //     await this.extractFrames(file);
            // };

            reader.onerror = () => {
                this.uploading = false;
                // 这里可以添加错误处理逻辑
            };
        },
        // async extractFrames(file) {
        //     const ffmpeg = createFFmpeg({ log: true });
        //     await ffmpeg.load();

        //     ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(file));
        //     await ffmpeg.run('-i', 'input.mp4', '-vf', 'select=eq(pict_type\\,I)', '-vsync', 'vfr', 'frame%d.png');

        //     for (let i = 0; i < 4; i++) {
        //         try {
        //             const frameData = ffmpeg.FS('readFile', `frame${i+1}.png`);
        //             const blob = new Blob([frameData.buffer], { type: 'image/png' });
        //             const url = URL.createObjectURL(blob);
        //             this.frames.push(url);
        //         } catch (e) {
        //             console.log(`Frame ${i+1} could not be read`);
        //         }
        //     }
        // },
        handleProgress(event, file) {
            // 这里可以处理其他上传进度更新逻辑
        },
        beforeUpload(file) {
            this.uploading = true;
            this.uploadPercentage = 0;
            this.uploadedSize = 0;
            this.startTime = Date.now();
            this.totalSize = (file.size / (1024 * 1024)).toFixed(2);
        },
        handleAddTag() {
            const value = this.input.trim();
            if (value && !this.tags.includes(value)) {
                this.tags.push(value);
                this.input = '';
            }
        },
        handleCloseTag(index) {
            this.tags.splice(index, 1);
        }
    }
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.cover {
    height: 8rem;
    display: flex;
    align-items: center;
}

.frame-container {
    display: flex;
    flex-wrap: wrap;
}

.frame {
    width: 100px;
    height: auto;
    margin: 10px;
}

.Title {
    height: 4rem;
    display: flex;
    align-items: center;
    margin-top: 1rem;
}

.classify {
    height: 4rem;
    display: flex;
    align-items: center;
    margin-top: 1rem;
}

.tags {
    height: 4rem;
    display: flex;
    align-items: center;
    margin-top: 1rem;
}

.desc {
    height: 10.33rem;
    display: flex;
    margin-top: 1rem;
}

.detail-container {
    margin-left: 15rem;
    width: 73.3rem;
}

.footerBtn {
    margin-top: 3rem;
    margin-left: 8rem;
}

.avatar-uploader .avatar {
    width: 4rem;
    height: 4rem;
    display: block;
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
