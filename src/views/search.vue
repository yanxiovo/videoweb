<template>
    <div>
        <homeNavbar></homeNavbar>
        <div><el-divider></el-divider></div>
        <div class="search-container">
            <el-input placeholder="请输入关键字搜索" v-model="searchText" clearable>
                <template #prefix>
                    <el-icon color="rgb(50,192,240)" size="20px">
                        <Search />
                    </el-icon>
                </template>
                <template #suffix>
                    <el-button
                        :style="{ 'background-color': 'rgb(50,192,240)', width: '6.25rem', height: '2.5rem', color: 'white' }">搜索</el-button>
                </template>
            </el-input>
        </div>

        <el-tabs v-model="activeName" :style="{ width: '93%', height: 'calc(100vh - 150px)' }">
            <el-tab-pane name="first">
                <template #label>
                    <span class="tab-label">综合</span>
                </template>
                <div class="button-group">
                    <el-button v-for="(button, index) in buttons" :key="index"
                        :class="{ 'selected': selectedButton === index }" @click="selectButton(index, 'videoSort')" text
                        :size="large" class="sort-button">{{ button.text
                        }}</el-button>
                </div>
                <div class="videoList">
                    <div class="recommend-video" v-for="video in videoList1.slice(0, 6)" :key="video.VID">
                        <el-image :src="video.Cover" class="image-with-overlay"></el-image>
                        <div class="video-info">
                            <el-button text :style="{ color: 'white', marginLeft: '10px' }">
                                <el-icon size="18px" :style="{ marginRight: '0.33 rem' }">
                                    <SvgIcon iconName="icon-bofangshu" />
                                </el-icon>
                                {{ video.CntViews }}
                            </el-button>
                            <el-button text :style="{ color: 'white', marginLeft: '10px' }">
                                <el-icon size="18px" :style="{ marginRight: '0.33 rem' }">
                                    <SvgIcon iconName="icon-danmushu" />
                                </el-icon>
                                {{ video.CntBarrages }}
                            </el-button>
                            <el-button text :style="{ color: 'white', marginLeft: '9rem' }">
                                {{ video.Duration }}
                            </el-button>
                        </div>
                        <div class="video-title">
                            <el-link :underline="false" class="video-title-link"
                                :href="`#/video/VideoID=${video.VID}`">{{
                                video.Title }}</el-link>
                        </div>
                        <div class="video-footer">
                            <el-link :underline="false">
                                <el-icon size="1.25rem" class="footer-icon">
                                    <SvgIcon iconName="icon-UPzhu" />
                                </el-icon>
                                {{ video.VCName }}
                            </el-link>
                        </div>
                    </div>
                </div>
                <div class="pagination">
                    <el-pagination background layout="prev, pager, next" :total="totalPage" />
                </div>
            </el-tab-pane>

            <el-tab-pane name="second">
                <template #label>
                    <el-badge :value="100" :max="99" :offset="[15, 10]" color="rgb(241,242,243)"
                        :badge-style="{ color: 'black' }" class="tab-badge">
                        <span class="tab-label">视频</span>
                    </el-badge>
                </template>
                <div class="button-group">
                    <el-button v-for="(button, index) in buttons" :key="index"
                        :class="{ 'selected': selectedButton === index }" @click="selectButton(index, 'videoSort')" text
                        :size="large" class="sort-button">{{ button.text
                        }}</el-button>
                </div>
                <div class="videoList">
                    <div class="recommend-video" v-for="(video, index) in videoList1.slice(0, 6)" :key="video.VID"
                        :style="{ marginRight: calculateMarginRight(index) }">
                        <el-image :src="video.Cover" class="image-with-overlay"></el-image>
                        <div class="video-info">
                            <el-button text :style="{ color: 'white', marginLeft: '10px' }">
                                <el-icon size="18px" :style="{ marginRight: '0.33 rem' }">
                                    <SvgIcon iconName="icon-bofangshu" />
                                </el-icon>
                                {{ video.CntViews }}
                            </el-button>
                            <el-button text :style="{ color: 'white', marginLeft: '10px' }">
                                <el-icon size="18px" :style="{ marginRight: '0.33 rem' }">
                                    <SvgIcon iconName="icon-danmushu" />
                                </el-icon>
                                {{ video.CntBarrages }}
                            </el-button>
                            <el-button text :style="{ color: 'white', marginLeft: '9rem' }">
                                {{ video.Duration }}
                            </el-button>
                        </div>
                        <div class="video-title">
                            <el-link :underline="false" class="video-title-link"
                                :href="`#/video/VideoID=53540871860293`">{{
                                video.Title }}</el-link>
                        </div>
                        <div class="video-footer">
                            <el-link :underline="false">
                                <el-icon size="1.25rem" class="footer-icon">
                                    <SvgIcon iconName="icon-UPzhu" />
                                </el-icon>
                                {{ video.VCName }}
                            </el-link>
                        </div>
                    </div>
                </div>
                <div class="pagination">
                    <el-pagination background layout="prev, pager, next" :total="totalPage" />
                </div>
            </el-tab-pane>

            <el-tab-pane name="third">
                <template #label>
                    <el-badge :value="100" :max="99" :offset="[15, 10]" color="rgb(241,242,243)"
                        :badge-style="{ color: 'black' }" class="tab-badge" style="padding-left: 2rem;">
                        <span class="tab-label">用户</span>
                    </el-badge>
                </template>
                <div class="button-group">
                    <el-button v-for="(button, index) in buttonsUser" :key="index"
                        :class="{ 'selected': selectedButton === index }" @click="selectButton(index, 'userSort')" text
                        :size="large" class="sort-button">{{ button.text }}</el-button>
                </div>

                <div class="userList">
                    <div class="search-user" v-for="n in 36" :key="n">
                        <el-avatar size="5rem">user</el-avatar>
                        <div class="user-info">
                            <div class="user-name">
                                <el-text class="username">这是用户名</el-text>
                                <el-icon size="1.25rem" class="user-level-icon">
                                    <SvgIcon iconName="icon-ic_userlevel_6" />
                                </el-icon>
                            </div>
                            <div class="user-stats">
                                <el-text class="user-stat">2103粉丝</el-text>
                                <el-text class="user-stat">77个视频</el-text>
                                <el-text class="user-stat">你无敌了孩子</el-text>
                            </div>
                            <div>
                                <el-button class="follow-button">+关注</el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pagination">
                    <el-pagination background layout="prev, pager, next" :total="totalPage" />
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>


<script>
import homeNavbar from "@/components/homeNavbar.vue";
import { Search } from '@element-plus/icons-vue';
import jsonData from '@/assets/response_1716983420154.json';
import axios from "axios";

export default {
    components: {
        homeNavbar,
        Search
    },
    data() {
        return {
            searchText: "",
            activeName: "first",
            buttons: [
                { text: '综合升序' },
                { text: '最多播放' },
                { text: '最新发布' },
                { text: '最多弹幕' },
                { text: '最多收藏' }
            ],
            buttonsUser: [
                { text: '默认排序' },
                { text: '粉丝数由高到低' },
                { text: '粉丝数由低到高' },
                { text: 'Lv等级由高到低' },
                { text: 'Lv等级由低到高' }
            ],
            videoSort: ['default', 'newest', 'mostPlay', 'mostBarrage','mostFavorite'],
            videoList1: [],
            selectedButton: 0,
            totalPage: 280,
            keyword: "",
            type: 'videoSort',
            sortOrder: 'default'
        }
    },
    methods: {
        selectButton(index,string) {
            this.selectedButton = index;
            this.type = string;
            if (this.type === 'videoSort') {
                this.sortOrder = this.videoSort[index];
                console.log(this.sortOrder);
            }
        },
        formatTime(timeString) {
            if (timeString.startsWith('00:')) {  // 检查时间字符串是否以 "00:" 开头
                return timeString.substring(3);  // 去除代表小时的数字以及后面的冒号
            }
            return timeString;  // 如果不是以 "00:" 开头，则保持原样返回
        }
    },
    mounted() {
        const data = jsonData.data;
        const token = localStorage.getItem('token');
        this.keyword = this.$route.params.keyword;
        console.log(this.keyword);
        if (token ) {
            if (this.type === 'videoSort') {
                axios.get('/yanxi/video/SearchVideos', {
                    headers: {
                        'Authorization': token
                    },
                    params: {
                        videoNums: 10,
                        offset: 0,
                        key: this.keyword,
                        sortOrder: this.sortOrder

                    }
                }).then(res => {
                    const videodata = res.data.data;
                     console.log(data)
                })
            }
        }
        console.log(data);
        this.videoList1 = data.map(item => ({
            ...item,
            Cover: `data:image/png;base64,${item.Cover}`,
            Duration: this.formatTime(item.Duration)
        }));
        console.log(this.videoList1);
    },
    computed: {
        calculateMarginRight() {
            return (index) => {
                if ((index + 1) % 6 === 0) {
                    return '0px'; // 重新设置margin-right属性的值
                } else {
                    return '0.15rem'; // 默认的margin-right属性的值
                }
            }
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.recPlate {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    height: auto;
}

.homeNavbar {
    height: 1.25rem;
}

.el-divider {
    position: relative;
    transform: translateY(0.625rem);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-container {
    margin-top: 0.625rem;
    display: flex;
    height: 6.875rem;
    justify-content: center;
    align-items: center;
}

.el-input {
    width: 40.625rem;
    height: 3.125rem;
    font-size: 1rem;
}

::v-deep .el-input div {
    background-color: rgb(246, 247, 248);
}

::v-deep .el-input:focus div {
    background-color: white;
}

.el-tabs {
    margin-left: 4.825rem;
}

.selected {
    background-color: rgb(223, 246, 253);
    color: rgb(0, 174, 236);
}

.el-button:hover {
    color: rgb(0, 174, 236);
    background-color: inherit !important;
}

.recommend-video {
    margin-top: 0.9375rem;
    display: flex;
    flex-direction: column;
    height: 14rem;
    width: 16.56rem;
    margin-right: 0.15rem;
}

.el-image {
    width: 16.875rem;
    height: 9.375rem;
    border-radius: 0.3125rem;
}

.video-title {
    height: 2.8125rem;
}

.video-title .el-link {
    height: 3.125rem;
    width: 14.375rem;
    font-size: 0.875rem;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.video-footer {
    height: 1.875rem;
    display: flex;
    justify-content: flex-start;
    font-weight: 100;
    font-size: 0.8125rem;
}

.image-with-overlay {
    position: relative;
}

.image-with-overlay::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 94%;
    height: 20%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
}

.video-info {
    position: absolute;
    transform: translateY(calc(7.725rem));
}

.videoList {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.25rem;
}

.pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 6.25rem;
}

.el-pagination {
    width: 12.5rem;
}

.userList {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.25rem;
    margin-top: 2.5rem;
}

.search-user {
    display: flex;
    align-items: center;
    flex: 1 1 calc(33.333% - 1.25rem);
}

.user-info {
    margin-left: 0.625rem;
    display: flex;
    flex-direction: column;
    gap: 0.3125rem;
}

.user-name {
    display: flex;
    align-items: center;
}

.username {
    font-size: 1.125rem;
    font-weight: bold;
    color: black;
}

.user-level-icon {
    margin-left: 0.625rem;
}

.user-stats {
    display: flex;
    gap: 0.625rem;
    font-size: 0.8125rem;
    color: rgb(97, 102, 109);
}

.follow-button {
    background-color: rgb(0, 174, 236);
    color: white;
    width: 6.25rem;
    height: 2.1875rem;
    margin-top: 0.3125rem;
    border-radius: 0.3125rem;
}

@media (max-width: 925px) {
    .search-container {
        height: 4.375rem;
    }

    .el-input {
        width: 100%;
        font-size: 0.875rem;
    }

    .el-tabs {
        margin-left: 0;
        width: 100%;
    }

    .videoList {
        justify-content: center;
    }

    .recommend-video {
        width: calc(50% - 0.625rem);
    }

    .userList {
        justify-content: center;
    }

    .search-user {
        flex: 1 1 calc(50% - 0.625rem);
    }
}

@media (max-width: 480px) {
    .recommend-video {
        width: 100%;
    }

    .search-user {
        flex: 1 1 100%;
    }
}
</style>
