<template>
  <div>
    <home_navbar></home_navbar>
    <div><el-divider></el-divider></div>

    <div class="video_detail">
      <div class="video_header">
        <div class="title">{{ this.Title }}</div>
        <div class="video_info">
          <div class="info_item">
            <img src="../assets/icons/播放量.png" class="icons" />
            <div class="text">{{ this.CntViews }}</div>
          </div>
          <div class="info_item">
            <img src="../assets/icons/弹幕.png" class="icons" :style="{ height: '15px', color: '#707070' }" />
            <div class="text">{{ this.CntBarrages }}</div>
          </div>
          <div class="info_item">
            <div class="text">{{ this.videoTime }}</div>
          </div>
          <div class="info_item">
            <img src="../assets/icons/禁止.png" class="icons" :style="{ height: '12px', width: '12px' }" />
            <div class="text">未经作者授权,禁止转载</div>
          </div>
        </div>
      </div>
      <div class="authorPart">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          class="bigAvatar"></el-avatar>
        <div class="rightPart">
          <div class="authorTop">
            <div class="authorName">电竞瓜瓜乐</div>
            <el-link :underline="false" :icon="ElIconMessage">发消息</el-link>
          </div>
          <div class="authorDes">
            别看了,这就是用来进行占位测试的,这是用来占位测试的,这是用来占位测试的
          </div>
          <div class="authorFooter">
            <el-button :style="{
              color: 'rgb(0, 174, 236)',
              border: '1px rgb(0, 174, 236) solid',
            }">充电</el-button>
            <el-button type="primary" :style="{ 'background-color': 'rgb(0, 174, 236)' }">+关注</el-button>
          </div>
        </div>
      </div>
      <video_player :videoID="videoID" v-if="videoID !== null"></video_player>
      <div class="barrageList">
        <el-collapse accordion>
          <el-collapse-item>
            <template #title>
              <p style="font-size: 16px"> 弹幕列表</p>
              <el-icon :size="25" style="margin-left: 1rem;">
                <SvgIcon iconName="icon-fengefu" />
              </el-icon>
            </template>
            <div class="barrageContext">
              <div class="barrageTop">
                <p>时间</p>
                <p>弹幕内容</p>
                <p>发送时间</p>
              </div>
              <div class="listItem" v-for="item in BarrageList" :key="item.id">
                <p>{{ item.time }}</p>
                <p>{{ item.content }}</p>
                <p>{{ item.date }}</p>
              </div>
              <el-button class="footerBtn">查看历史弹幕</el-button>
            </div>
          </el-collapse-item>
        </el-collapse>
        <div class="recVideoList">
          <div class="recVideoTop">
            <div>接下来将播放</div>
            <div style="margin-left: 10.5rem">
              <el-text>自动连播</el-text>
              <el-switch v-model="isEpisodic" style="margin-left: 1rem" />
            </div>
          </div>
          <div class="videoItem" v-for="item in 20">
            <span class="videoTime">11:20</span>
            <div>
              <el-image style="width:12rem;height:6.75rem"></el-image>
            </div>
            <div class="videoRightContainer">
              <div>
                <span class="link">感谢大家对植物大战僵尸的支持！</span>
              </div>
              <div>
                <el-link :underline="false" style="width: 5.825rem;color:reg(203,204,205)">
                  <el-icon size="15px" :style="{ marginRight: '0.33rem' }">
                    <SvgIcon iconName="icon-UPzhu" />
                  </el-icon>
                  111
                </el-link>
              </div>
              <div class="videoRightFooter">

                <span>
                  <el-icon size="15px" :style="{ marginRight: '0.25rem'}">
                    <SvgIcon iconName="icon-bofangshu" />
                  </el-icon>
                  <el-text>23.2k</el-text>
                </span>


                <span>
                  <el-icon size="15px" :style="{ marginRight: '0.25rem' }">
                    <SvgIcon iconName="icon-danmushu" />
                  </el-icon>
                  <el-text> 2317</el-text>
                </span>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="videoRest">
        <div class="videoFooter">
          <div class="videoFooterLeft">
            <div :style="{ width: '230px', marginLeft: '10px' }">64人在看，已装填985条弹幕</div>
            <el-icon size="25px" :style="{ marginLeft: '0px' }">
              <SvgIcon iconName="icon-bofangqi-danmukai" />
            </el-icon>

            <el-icon size="25px" :style="{ marginLeft: '20px', marginRight: '10px' }">
              <SvgIcon iconName="icon-danmushezhi" />
            </el-icon>

            <el-input :style="{ width: '750px', marginRight: '10px' }" maxLength="100" placeholder="输入弹幕内容"
              v-model="newBarrage">
              <template #prefix>
                <el-icon size="16px" class="icon-zihao">
                  <SvgIcon iconName="icon-zihao" />
                </el-icon>
              </template>
              <template #append>
                <el-button type="primary" size="large"
                  :style="{ 'background-color': 'rgb(0, 174, 236)', color: 'white' }">发送</el-button>
              </template>
            </el-input>
          </div>
        </div>
        <div class="interactions">
          <div class="footerBtn">
            <el-link :underline="false">
              <el-icon size="35px">
                <SvgIcon iconName="icon-zan1" />
              </el-icon>
              {{ this.Likes }}
            </el-link>
          </div>
          <div class="footerBtn">
            <el-link :underline="false">
              <el-icon size="35px">
                <SvgIcon iconName="icon-Bbi" />
              </el-icon>
              {{ this.Shells }}
            </el-link>
          </div>
          <div class="footerBtn">
            <el-link :underline="false">
              <el-icon size="35px">
                <SvgIcon iconName="icon-shoucangtianchong" />
              </el-icon>
              {{this.CntFavorites}}
            </el-link>
          </div>
          <div class="footerBtn">
            <el-link :underline="false">
              <el-icon size="35px">
                <SvgIcon iconName="icon-arrow-" />
              </el-icon>
              {{ this.CntShares }}
            </el-link>
          </div>
        </div>
        <div class="videoDescription">
          <div class="description">
            <el-text size="large" type="info" :style="{ color: 'black' }"
              line-clamp="4">文本自动换行工具可用于编程代码、串口调试数据、网站访问记录（*.log文件）等未分行数据分析，将未分行文本按所需换行字符进行自动换行处理。

              输入【换行符】和【待要换行文本】，点击“处理”按钮，将自动返回换行后文本。多次点击“处理”按钮，可调节换行间距。

              注：

              （1）【大框】输入待处理文本，【小框】输入换行符，当换行符为空时，将会在【每个】字之间增加换行符。

              （2）可选择换行符【前】或换行符【后】开始换行，可以选择【删除】或【保留】换行符。

              （3）换后符为【标点符号】时，应注意区分【全角】和【半角】。

              【举例说明】

              原始文本为：FF FF 55 35 10 94 84 6A 6C FF 55 AA 06 18 19 20 0D 64 FF 55 AA 06 18 19 21 0D 65 FF 55 AA 06 18 19
              22 0D 66 FF 55 AA 06 18 19 23 0D 67

              以“FF 55”开始换行处理。将原始文本录入【大框】，将换行字符录入【小框】，点击确认后。</el-text>
          </div>

          <div class="videoTags">
            <el-tag type="info" round="true" effect="light" size="large" v-for="item in videoTags" :key="item"
              :style="{ marginRight: '15px', height: '25px', paddingLeft: '5px', paddingRight: '5px', fontSize: '14px' }">{{
              item }}</el-tag>
          </div>
        </div>
        <div class="commentsContainer">
          <div class="commentsTabs">
            <span :style="{ fontSize: '23px' }">评论</span>
            <span :style="{ fontSize: '12px', marginLeft: '3px' ,fontWeight: '50',marginRight: '60px' }">698</span>
            <el-link :underline="false"
              :style="{ fontSize: '15px', color: 'rgb(148, 153, 160)',width: '40px' }">最热</el-link>
            <el-divider direction="vertical"
              :style="{ position: 'relative', transform: 'translate(-25px,-0px)',  height: '15px',borderWidth:'1px',borderColor:'rgb(148, 153, 160)' }"></el-divider>
            <el-link :underline="false"
              :style="{ fontSize: '15px', color: 'rgb(148, 153, 160)', width: '40px'  }">最新</el-link>
          </div>
          <div class="AddComment">
            <el-avatar :size="45"> user </el-avatar>
            <el-input :style="{ width: '1000px', marginLeft: '20px',height: '50px' }" maxLength="100"
              @focus="isButtonShow = !isButtonShow" placeholder="留下友善的评论吧!" class="custom-input" v-model="topComment">
            </el-input>
            <el-button type="primary" size="large"
              :style="{ 'background-color': 'rgb(0, 174, 236)', color: 'white',marginLeft: '90%',width:'5rem',marginTop:'10px' }"
              @click="addComment(-1,topComment)" v-show="isButtonShow">发布</el-button>
          </div>
          <div class="comments" v-for="comment in commentsList" :key="comment.CommentID">
            <el-avatar :size="45">user</el-avatar>
            <el-text :style="{marginLeft: '10px'}">七个字的用户名</el-text>
            <el-icon size="25px" :style="{ marginLeft: '5px' }">
              <SvgIcon iconName="icon-ic_userlevel_4" />
            </el-icon>
            <el-text
              :style="{marginLeft: '55px',fontSize:'16px',flex:'1 0 calc(100% - 55px)',flexWrap:'wrap',wordBreak:'break-all'}">{{
              comment.Content }}</el-text>
            <div class="commentFooter">
              <el-text size="small" :style="{color:'rgb(148, 153, 160)',marginTop:'5px'}">{{ comment.CreatedAt
                }}</el-text>
              <div :style="{display:'flex',alignItems:'center',marginLeft:'20px',marginTop:'8px'}">
                <el-icon size="15px" color='rgb(148, 153, 160)' class="icon" @click="toggleLike(comment.CommentID)">
                  <SvgIcon :iconName="switchLike(comment.Like)" :fill="comment.Like? 'rgb(0,174,236)' : 'inherit'" />
                </el-icon>
                <el-text size="small" :style="{color:'rgb(148, 153, 160)',marginLeft:'3px',marginBottom:'3px'}">{{
                  comment.Likes }}</el-text>
                <el-icon size="15px" color='rgb(148, 153, 160)' :style="{marginLeft:'20px',marginBottom:'3px'}"
                  class="icon" @click="toggleDislike(comment.CommentID)">
                  <SvgIcon :iconName="switchDislike(comment.Dislike)"
                    :fill="comment.Dislike ? 'rgb(0,174,236)' : 'inherit'" />
                </el-icon>
                <el-text size="small" class="replyBtn"
                  @click="this.replyToCommentID = this.replyToCommentID === null || this.replyToCommentID !== comment.CommentID? comment.CommentID : null">回复</el-text>
              </div>
            </div>
            <div class="reply" v-for="reply in comment.Replies">
              <el-avatar :size="25">use</el-avatar>
              <el-text :style="{ marginLeft: '10px' }" size="small">七个字的用户名</el-text>
              <el-icon size="25px" :style="{ marginLeft: '5px' }">
                <SvgIcon iconName="icon-ic_userlevel_4" />
              </el-icon>
              <el-text :style="{ marginLeft: '10px', fontSize: '16px',flex:'1' }">{{ reply.Content.slice(0,30)
                }}</el-text>
              <el-text :style="{ marginLeft: '35px', fontSize: '16px', flex: '1 0 calc(100% - 35px)' }">{{
                reply.Content.slice(30)}}</el-text>
              <div class="commentFooter" :style="{ marginLeft: '35px' }">
                <el-text size="small" :style="{ color: 'rgb(148, 153, 160)', marginTop: '5px' }">{{ reply.CreatedAt
                  }}</el-text>
                <div :style="{ display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '8px' }">
                  <el-icon size="15px" color='rgb(148, 153, 160)' class="icon" @click="toggleLike(reply.CommentID)">
                    <SvgIcon :iconName="switchLike(reply.Like)" :fill="reply.Like ? 'rgb(0,174,236)' : 'inherit'" />
                  </el-icon>
                  <el-text size="small"
                    :style="{ color: 'rgb(148, 153, 160)', marginLeft: '3px', marginBottom: '3px' }">{{reply.Likes}}</el-text>
                  <el-icon size="15px" color='rgb(148, 153, 160)' :style="{ marginLeft: '20px', marginBottom: '3px' }"
                    class="icon" @click="toggleDislike(reply.CommentID)">
                    <SvgIcon :iconName="switchDislike(reply.Dislike)"
                      :fill="reply.Dislike ? 'rgb(0,174,236)' : 'inherit'" />
                  </el-icon>
                  <el-text size="small" class="replyBtn"
                    @click="this.replyToCommentID = this.replyToCommentID === null || this.replyToCommentID !== reply.CommentID? reply.CommentID : null">回复</el-text>
                </div>
              </div>
            </div>
            <div v-show="findCommentID(this.replyToCommentID,comment)" class="replyInput">
              <el-avatar :size="45">user</el-avatar>
              <el-input :style="{ width: '910px', marginLeft: '20px' }" maxLength="100" placeholder="回复"
                v-model="userReply" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }" @focus="isFooterBtnShow = !isFooterBtnShow"></el-input>
                <el-button type="primary" size="large"
                  :style="{ 'background-color': 'rgb(0, 174, 236)', color: 'white',  width: '5rem', marginTop: '10px' }"
                  @click="addComment(this.replyToCommentID, userReply)" >发布</el-button>

            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message as ElIconMessage } from '@element-plus/icons-vue'
import home_navbar from '@/components/homeNavbar.vue'
import axios from 'axios'
import video_player from '@/components/videoPlayer.vue'
import jsonData from '@/assets/response_1716970547913.json';
import { transform } from 'typescript';
import { title } from 'process';
export default {
  data() {
    return {
      newBarrge: '',
      videoID: null,
      userReply: '',
      isEpisodic: true,
      isButtonShow: false,
      topComment: '',
      BarrageList: [
        {
          time: '0:00',
          date: '03-22 11:29',
          content: '这是一条弹幕',
          id: 1,
        },
        {
          time: '0:00',
          date: '03-22 11:29',
          content: '这是一条弹幕',
          id: 2,
        },
        {
          time: '0:00',
          date: '03-22 11:29',
          content: '这是一条弹幕',
          id: 3,
        },
        {
          time: '0:00',
          date: '03-22 11:29',
          content: '这是一条弹幕',
          id: 4,
        },
        {
          time: '0:00',
          date: '03-22 11:29',
          content: '这是一条弹幕',
          id: 5,
        },
        {
          time: '0:00',
          date: '03-22 11:29',
          content: '这是一条弹幕',
          id: 6,
        },
        {
          time: '0:00',
          date: '03-22 11:29',
          content: '这是一条弹幕',
          id: 7,
        },
        {
          time: '0:00',
          date: '03-22 11:29',
          content: '这是一条弹幕',
          id: 8,
        },
        {
          time: '0:00',
          date: '03-22 11:29',
          content: '这是一条弹幕',
          id: 9,
        },
        {
          time: '0:00',
          date: '03-22 11:29',
          content: '这是一条弹幕',
          id: 10,
        },
        {
          time: '0:00',
          date: '03-22 11:29',
          content: '这是一条弹幕',
          id: 11,
        },
        {
          time: '0:00',
          date: '03-22 11:29',
          content: '这是一条弹幕',
          id: 12,
        },
        {
          time: '0:00',
          date: '03-22 11:29',
          content: '这是一条弹幕',
          id: 13,
        },
        {
          time: '0:00',
          date: '03-22 11:29',
          content: '这是一条弹幕',
          id: 14,
        },
        {
          time: '0:00',
          date: '03-22 11:29',
          content: '这是一条弹幕',
          id: 15,
        },
        {
          time: '0:00',
          date: '03-22 11:29',
          content: '这是一条弹幕',
          id: 16,
        },
        {
          time: '0:00',
          date: '03-22 11:29',
          content: '这是一条弹幕',
          id: 17,
        },
        {
          time: '0:00',
          date: '03-22 11:29',
          content: '这是一条弹幕',
          id: 18,
        },
        {
          time: '0:00',
          date: '03-22 11:29',
          content: '这是一条弹幕',
          id: 19,
        },
        {
          time: '0:00',
          date: '03-22 11:29',
          content: '这是一条弹幕',
          id: 20,
        },
        {
          time: '0:00',
          date: '03-22 11:29',
          content: '这是一条弹幕',
          id: 21,
        },
        {
          time: '0:00',
          date: '03-22 11:29',
          content: '这是一条弹幕',
          id: 22,
        },
        {
          time: '0:00',
          date: '03-22 11:29',
          content: '这是一条弹幕',
          id: 23,
        },
        {
          time: '0:00',
          date: '03-22 11:29',
          content: '这是一条弹幕',
          id: 24,
        },
      ],
      ElIconMessage,
      videoTags: ['标签1', '标签2', '标签3'],
      newestChecked: false,
      hotestChecked: false,
      commentsList: [],
      isFooterBtnshow: false,
      replyToCommentID: null,
      Duration: '',
      Title: '',
      Description: '',
      Shells: 0,
      Likes: 0,
      CntViews: 0,
      CntShares: 0,
      CntFavorites: 0,
      CntBarrages: 0,
      videoTime: '',
    }
  },
  components: {
    home_navbar,
    video_player,
  },
  mounted() {
    this.videoID = this.$route.params.id;
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    this.getDetail(token);
    this.getComments(token);

  },
  methods: {
    formatDateTime(isoString) {
      const date = new Date(isoString);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    formatTimeAgo(timestamp) {
      const now = new Date();
      const time = new Date(timestamp);
      const timeDiff = now - time;
      const seconds = Math.floor(timeDiff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);

      if (seconds < 60) {
        return seconds + '秒前';
      } else if (minutes < 60) {
        return minutes + '分钟前';
      } else if (hours < 24) {
        return hours + '小时前';
      } else {
        // 超过24小时，返回原始时间格式
        return time.toLocaleString();
      }
    },
    switchLike(like) {
      if (like)
        return 'icon-zan1';
      else
        return 'icon-zan';
    },
    switchDislike(dislike) {
      if (dislike)
        return 'icon-cai1';
      else
        return 'icon-cai';
    },
    // 根据 CommentID 切换对应评论的 Like 属性值，并处理互斥关系
    toggleLike(commentID) {
      const id = this.$route.params.id;
      const token = localStorage.getItem('token');
      // 1. 遍历 commentsList 查找对应的 CommentID
      for (let comment of this.commentsList) {
        if (comment.CommentID === commentID) {
          // 找到对应的评论后切换 Like 属性值
          comment.Like = !comment.Like;
          if (comment.Dislike) {
            comment.Dislike = false;

            comment.Dislikes = comment.Dislikes === 0 ? 0 : comment.Dislikes - 1;
          }
          if (comment.Like) {
            comment.Likes++;
            axios.put(`/Comment/${id}/LikeOrDislikeComment`, {
              params: {
                CommentID: commentID,
                isLike: true
              },
              headers: {
                'Authorization': token
              }
            })
          } else {
            comment.Likes--;
            axios.put(`/Comment/${id}/UndoLikeOrDislikeComment`, {
              params: {
                CommentID: commentID,
                isLike: true
              },
              headers: {
                'Authorization': token
              }
            })
          }
        }
        // 如果有回复，递归切换 Like 属性值
        if (comment.Replies && comment.Replies.length > 0) {
          this.toggleLikeInReplies(comment.Replies, commentID);
        }
      }
    },
    // 处理回复中的评论的 Like 属性值
    toggleLikeInReplies(replies, commentID) {
      const id = this.$route.params.id;
      const token = localStorage.getItem('token');
      for (let reply of replies) {
        if (reply.CommentID === commentID) {
          // 找到对应的回复后切换 Like 属性值
          reply.Like = !reply.Like;
          if (reply.Dislike) {
            reply.Dislike = false;
            reply.Dislikes--;
          }
          if (reply.Like) {
            reply.Likes++;
            axios.put(`/Comment/${id}/LikeOrDislikeComment`, {
              params: {
                CommentID: commentID,
                isLike: true
              },
              headers: {
                'Authorization': token
              }
            })
          } else {
            reply.Likes--;
            axios.put(`/Comment/${id}/UndoLikeOrDislikeComment`, {
              params: {
                CommentID: commentID,
                isLike: true
              },
              headers: {
                'Authorization': token
              }
            })
          }
        }
        // 如果回复有回复，递归切换 Like 属性值
        if (reply.Replies && reply.Replies.length > 0) {
          this.toggleLikeInReplies(reply.Replies, commentID);
        }
      }
    },
    // 根据 CommentID 切换对应评论的 Dislike 属性值，并处理互斥关系
    toggleDislike(commentID) {
      const id = this.$route.params.id;
      const token = localStorage.getItem('token');
      // 1. 遍历 commentsList 查找对应的 CommentID
      for (let comment of this.commentsList) {
        if (comment.CommentID === commentID) {
          // 找到对应的评论后切换 Dislike 属性值
          comment.Dislike = !comment.Dislike;
          if (comment.Like) {
            comment.Like = false;
            comment.Likes--;
          }
          if (comment.Dislike) {
            comment.Dislikes++;
            axios.put(`/Comment/${id}/LikeOrDislikeComment`, {
              params: {
                CommentID: commentID,
                isLike: true
              },
              headers: {
                'Authorization': token
              }
            })
          } else {
            comment.Dislikes--;
            axios.put(`/Comment/${id}/UndoLikeOrDislikeComment`, {
              params: {
                CommentID: commentID,
                isLike: true
              },
              headers: {
                'Authorization': token
              }
            })
          }
        }
        // 如果有回复，递归切换 Dislike 属性值
        if (comment.Replies && comment.Replies.length > 0) {
          this.toggleDislikeInReplies(comment.Replies, commentID);
        }
      }
    },
    // 处理回复中的评论的 Dislike 属性值
    toggleDislikeInReplies(replies, commentID) {
      const id = this.$route.params.id;
      const token = localStorage.getItem('token');
      for (let reply of replies) {
        if (reply.CommentID === commentID) {
          // 找到对应的回复后切换 Dislike 属性值
          reply.Dislike = !reply.Dislike;
          if (reply.Like) {
            reply.Like = false;
            reply.Likes--;
          }
          if (reply.Dislike) {
            reply.Dislikes++;
            axios.put(`/Comment/${id}/LikeOrDislikeComment`, {
              params: {
                CommentID: commentID,
                isLike: false
              },
              headers: {
                'Authorization': token
              }
            })
          } else {
            reply.Dislikes--;
            axios.put(`/Comment/${id}/UndoLikeOrDislikeComment`, {
              params: {
                CommentID: commentID,
                isLike: false
              },
              headers: {
                'Authorization': token
              }
            })
          }
        }
        // 如果回复有回复，递归切换 Dislike 属性值
        if (reply.Replies && reply.Replies.length > 0) {
          this.toggleDislikeInReplies(reply.Replies, commentID);
        }
      }
    },
    findCommentID(commentID, comment) {
      if (comment.CommentID === commentID) {
        return true;
      }

      if (comment.Replies && comment.Replies.length > 0) {
        for (let reply of comment.Replies) {
          if (this.findCommentID(commentID, reply)) {
            return true;
          }
        }
      }
      return false;
    },
    getDetail(token) {
      const id = this.$route.params.id;
      axios.get(`/yanxi/video/${id}/VideoDetail`, {
        headers: {
          'Authorization': token
        }
      }).then(res => {
        const data = res.data.data;
        console.log(data);
        this.videoTitle = data.Title;
        this.videoDescription = data.Description;
        this.Likes = data.Likes;
        this.CntViews = data.CntViews;
        this.CntShares = data.CntShares;
        this.CntFavorites = data.CntFavorites;
        this.Duration = data.Duration;
        this.Title = data.Title;
        this.Description = data.Description;
        this.Shells = data.Shells;
        this.videoTime = this.formatDateTime(data.CreatedAt);
        // this.videoTags = data.Tags;
      });
    },
    getComments(token) {
      const id = this.$route.params.id;
      axios.get(`/yanxi/video/${id}/Comments`, {
        headers: {
          'Authorization': token
        },
        params: {
          commentNums: 20,
          offset: 0,
        }
      }).then(res => {
        const data = res.data.data;
        console.log(data);
        this.commentsList = data;
        this.commentsList = this.commentsList.map(item => {
          return {
            ...item,
            CreatedAt: this.formatTimeAgo(item.CreatedAt),
            Replies: item.Replies.map(reply => {
              return {
                ...reply,
                CreatedAt: this.formatTimeAgo(reply.CreatedAt),
              }
            })
          }
        })
        console.log(this.commentsList);
      });
    },
    addComment(commentID, content) {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('CommentContent', content);
      axios.post(`/yanxi/Comment/${this.videoID}/Comment`, formData,{
        params: {
          To: commentID,
        },
        headers: {
          'Authorization': token,
          'Content-Type': 'multipart/form-data',
        }
      }).then(res => {
        if (res.data.code === 200)
          console.log('评论成功');
        getComments(token);
      });
    }
  }

}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.home_navbar {
  height: 30px;
}

.video_detail {
  display: grid;
  margin-top: 40px;
  grid-template-columns: 1120px 410px;
  margin-left: 200px;
  grid-template-rows: 50px 630px;
  column-gap: 30px;
  row-gap: 26px;
}

.el-divider {
  position: relative;
  transform: translateY(30px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.video-info {
  margin-top: 0px;
}

.icons {
  width: 17px;
  height: 13px;
}

.title {
  font-size: 23px;
  margin-bottom: 6px;
}

.video_info {
  width: 450px;
  height: 30px;
  font-size: 13px;
  color: rgb(148, 153, 160);
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 65 50 120 160;
  column-gap: 0px;
  align-items: center;
}

.info_item {
  display: flex;
  align-items: center;
  column-gap: 5px;
}

.text {
  vertical-align: middle;
}

.bigAvatar {
  width: 50px;
  height: 50px;
}

.authorPart {
  display: grid;
  grid-template-columns: 50px 325px;
  column-gap: 25px;
}

.rightPart {
  display: grid;
  grid-template-rows: 20px 15px 30px;
  row-gap: 5px;
  height: 75px;
}

.authorName {
  display: flex;
  font-size: 15px;
  color: rgb(230, 25, 103);
  letter-spacing: 1px;
}

.authorTop {
  display: grid;
  grid-template-columns: 80px 60px;
  column-gap: 10px;
}

.el-link {
  align-items: center;
  display: grid;
  grid-template-columns: 14px 50px;
  font-size: 14px;
}

.authorDes {
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 50;
}

.authorFooter {
  height: 30px;
  display: grid;
  grid-template-columns: 75px 230px;
}

.authorFooter .el-button {
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.barrageList {
  width: 400px;
  height: 100px;
}

.barrageTop {
  display: grid;
  grid-template-columns: 50px 235px 65px;
  column-gap: 15px;
}

.listItem {
  height: 20px;
  display: grid;
  grid-template-columns: 50px 235px 65px;
  column-gap: 15px;
}

.barrageTop p {
  font-size: 12px;
  font-weight: 50;
}

.listItem p {
  font-size: 12px;
  font-weight: 200;
}

.barrageContext {
  display: grid;
  row-gap: 5px;
  height: 590px;
  overflow: auto;
}


.videoRest {
  display: grid;
  grid-template-rows: 50px 65px 1fr;
  width: 100%;
  height: auto;
  row-gap: 0px;
}

.videoFooter {
  width: 1100px;
  height: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  height: 50px;
  margin-top: -10px;
  border-radius: 5px;
}

.videoFooterLeft {
  font-size: 14px;
  font-weight: 150;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-zihao:hover {
  color: rgb(0, 174, 236);
  cursor: pointer;
}

.interactions {
  width: 1100px;
  height: 65px;
  display: grid;
  grid-template-columns: 85px 85px 85px 85px;
  column-gap: 30px;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
}

.footerBtn {
  width: 85px;
  height: 45px;
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.footerBtn .el-link {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
}

.footerBtn .el-link .el-icon {
  margin-right: 5px;
}

.videoDescription {
  border-bottom: 1px solid #e8e8e8;
  max-height: 150px;
  width: 1100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 20px;
  /* 设置高度为100%以填充整个父容器 */
}

.description {
  max-height: 90px;
  /* 设置该元素在垂直方向上占据剩余空间 */
  overflow-y: auto;
  /* 当文本内容超出容器高度时显示滚动条 */
}

.videoTags {
  display: flex;

  /* 标签向左对齐 */
  align-items: center;
  margin-bottom: 20px;
}

.commentsContainer {
  width: 1100px;
  margin-bottom:20px;
}

.commentsTabs{
  display: flex;
  align-items: center;
}

 .AddComment{
  margin-top: 20px;
  margin-left:10px;
 }
 
::v-deep  .el-input div{
  background-color: rgb(241,242,243) !important;
}

.comments{
  display: flex;
  margin-left: 10px;
  align-items: center;
  flex-wrap: wrap;
}

 .commentFooter{
  display:flex;
  align-items: center;
  margin-left:55px;
  width:100%;
 }

 .replyBtn:hover{
  color:rgb(0, 174, 236);
  cursor: pointer;
 }

 .replyBtn{
  margin-bottom: 3px;
  margin-left: 20px;
  color:rgb(148, 153, 160)
 }

  .reply{
    margin-left: 50px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .icon:hover{
    color:rgb(0, 174, 236);
    cursor: pointer;
  }

  .replyInput{
    display: flex;
    flex:1;
    margin-left: 4rem;
    margin-top: 1rem;
  }

  .recVideoList{
    margin-top:1rem;
    display: grid;

  }

  .recVideoTop{
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .videoList{
    display: flex;
  }

  .videoItem{
    display: grid;
    grid-template-columns: 12rem 14rem;
    column-gap: 1rem;
    margin-bottom: 1rem;
  }

  .videoRightContainer{
    display:grid;
    justify-content: flex-start;
  }

  .link:hover{
    color:rgb(0, 174, 236);
    display: grid;
    align-items: center;
  }
  
  .videoRightFooter{
    display: flex;
    align-items: center;
    font-size: 11px;
  }
  
  .videoRightFooter span{
    margin-right: 10px;
    display: flex;
    align-items: center;
  }

  .videoTime{
    display: flex;
    position: absolute;
    transform: translate(9.5rem,4.875rem);
    background-color: rgba(0, 0, 0, 0.3);
    color:white;
    z-index:1;
  }
</style>
