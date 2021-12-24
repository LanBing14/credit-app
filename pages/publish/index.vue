<template>
    <view class="publish">
        <scroll-view v-if="type == 1" scroll-x="true" :scroll-into-view="themeToindex" show-scrollbar="false" class="searchNav">
            <!--<view class="li" :class="{active:navIndex == 0}" @click="navIndex = 0" id="theme0">
                企业信用快讯
            </view>-->
            <view class="li" :class="{active:navIndex == index}" @click="publishNav(item,index)" v-for="(item,index) in themeList" :key='index' :id="`theme${index}`">
                {{item.name}}
            </view>
        </scroll-view>
        <scroll-view v-if="type == 2" scroll-x="true" :scroll-into-view="themeToindex" show-scrollbar="false" class="searchNav">
            <view class="li" :class="{active:navIndex == index}" v-for="(item,index) in navList" :key="index" @click="publishNav(item,index)" :id="`theme${index}`">
                {{item}}
            </view>
        </scroll-view>
        <view style="height: 73rpx;"></view>
        <uni-popup ref="popup" class="popupBox" @maskClick="popupMaskClick" style="height: 100%" type="bottom">
            <view class="popupMain">
                <scroll-view scroll-y="true" class="popupScroll">
                    <view class="menu">
                        <view class="proServeTitle">
                            主题精选
                        </view>
                        <view class="menuMain clear">
<!--                            <view class="li" @click="scroll(0)">企业信用快讯</view>-->
                            <view class="li" v-for="(item,index) in themeList" :key="index" @click="scroll(item,index)">
                                {{item.name}}
                            </view>
                        </view>
                    </view>
                    <view class="menu menuTitle clear">
                        <view class="li" @click="meunClick('权威发布',0)">
                            权威发布
                        </view>
                        <view class="li" @click="meunClick('行业风险',8)">
                            行业风险
                        </view>
                        <view class="li" @click="meunClick('新华企业资讯',1)">
                            新华企业资讯
                        </view>
                        <view class="li" @click="meunClick('活动预告',2)">
                            活动
                        </view>
                        <view class="li" @click="meunClick('信用大学',6)">
                            信用大学
                        </view>
                        <view class="li" @click="meunClick('原创',7)">
                            原创
                        </view>
                    </view>
                    <view class="menu" style="margin-top: 20rpx;">
                        <view class="proServeTitle">
                            服务
                        </view>
                        <view class="menuMain clear">
                            <view class="li" v-for="(item,index) in serviceList" :key="index">
                                {{item.title.length > 7 ? item.title.substring(0,7) + '...' : item.title}}
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </view>
        </uni-popup>
        <view class="publistMain">
            <view class="dynaMain">
                <navigator class="li clear" hover-class="none" v-for="(item,index) in newsList" :key="index" :url="`/pages/newsDetail/index?url=${item.artUrl}`">
                    <image :src="item.picLinks ? item.picLinks : '../../static/img/png_11.png'"></image>
                    <view class="liMain">
                        <view class="liTitle">
                            {{item.title.length > 27 ? item.title.substring(0,27) + '...' : item.title}}
                        </view>
                        <view class="liTime">
                            <uni-dateformat :date="item.pubTime - 7200000" format="yyyy-MM-dd"></uni-dateformat>
                        </view>
                    </view>
                </navigator>
                <uni-load-more status="loading" v-if="loading"></uni-load-more>
                <uni-load-more status="noMore" v-if="noMore"></uni-load-more>
            </view>
        </view>
    </view>
</template>

<script>
    import request from "../../utils/request";

    export default {
        components: {

        },
        data () {
            return {
                navIndex:Number,
                isMenu:false,
                themeList:[],
                serviceList:[],
                themeToindex: '',
                newsUrl:'',
                themeId:'',
                pageNo:1,
                newsList:[],
                noMore:false,
                loading:false,
                type:1,
                navList:[],
                navTitle:''
            }
        },
        onLoad() {
            this.newsUrl = '/xhxy_Json/xytt/' //默认信用头条
            uni.showLoading({
                title:'加载中...'
            })
            this.navList = [
                '权威发布',
                '新华企业资讯',
                '活动预告',
                '活动分享',
                '案例分享',
                '活动报道',
                '信用大学',
                '原创',
                '行业风险'
            ];
            this.getTopicList();
            this.getServiceManageList();
            this.getNewsList();
        },
        onShow(){

        },
        methods: {
            scroll(item,num) {//导航定位
                this.$mp.page.$getAppWebview().setTitleNViewButtonStyle(0,{
                    type:'menu'
                })
                this.$refs.popup.close();
                this.navIndex = num;
                this.themeToindex="theme" + num;
                this.newsList = [];
                this.themeId = item.id;
                this.pageNo = 1;
                this.noMore = false;
                this.type = 1;
                uni.showLoading({
                    title:'加载中...'
                })
                this.getTopicById();
            },
            meunClick(name,num){
                this.type = 2;
                this.$mp.page.$getAppWebview().setTitleNViewButtonStyle(0,{
                    type:'menu'
                })
                this.$refs.popup.close();
                this.themeToindex="theme" + num;
                this.publishNav(name,num);
            },
            publishNav(item,index){
                this.newsList = [];
                this.pageNo = 1;
                this.noMore = false;
                this.navIndex = index;
                uni.showLoading({
                    title:'加载中...'
                })
                if(this.type == 1){
                    this.themeId = item.id;
                    this.getTopicById();
                } else if(this.type == 2){
                    switch (item) {
                        case '权威发布':
                            this.themeId = '13';
                            this.getTopicById();
                            break;
                        case '信用大学':
                            this.themeId = '26';
                            this.getTopicById();
                            break;
                        case '原创':
                            this.themeId = '11';
                            this.getTopicById();
                            break;
                        case '行业风险':
                            this.themeId = '221';
                            this.getTopicById();
                            break;
                        case '新华企业资讯':
                            this.getArticleList();
                            this.navTitle = item;
                            break;
                        case '活动预告':
                            this.newsUrl = '/xhxy_Json/xyhd/xhxyhdyg/index.json';
                            this.getNewsList();
                            break;
                        case '活动分享':
                            this.newsUrl = '/xhxy_Json/xyhd/xhxyhdfx/index.json';
                            this.getNewsList();
                            break;
                        case '案例分享':
                            this.newsUrl = '/xhxy_Json/xyhd/qgxyalfx/index.json';
                            this.getNewsList();
                            break;
                        case '活动报道':
                            this.newsUrl = '/xhxy_Json/xyhd/xyhdbd/index.json';
                            this.getNewsList();
                            break;
                    }
                }
            },
            getTopicList(){//主题精选列表
                request('/user/center/xhsRest/release/getTopicList',{
                    method:'get'
                }).then(res => {
                    this.themeList = res.data;
                })
            },
            getServiceManageList(){//服务列表
                request('/user/center/xhsRest/cms/getServiceManageList',{
                    method:'get'
                }).then(res => {
                    this.serviceList = res.data;
                })
            },
            getTopicById(){//获取主题详情
                request('/user/center/xhsRest/release/getTopicById',{
                    method:'get',
                    data:{
                        id:this.themeId
                    }
                }).then(res => {
                    if (res.stateCode == '1') {
                        this.newsUrl = res.data.dataUrl;
                        this.getNewsList();
                    }
                })
            },
            getNewsList(){//资讯列表
                let last = 'index.json';
                if (this.pageNo > 1) {
                    last = 'index_' + this.pageNo + '.json';
                }
                this.newsUrl = this.newsUrl.substring(0, this.newsUrl.lastIndexOf('/') + 1) + last
                console.log(this.newsUrl);
                request('/user/center/xhsRest/getNewsList',{
                    method:'get',
                    data:{
                        url:this.newsUrl
                    }
                }).then(res => {
                    console.log(res);
                    if (res.stateCode == '1'){
                        this.totalPages = Math.ceil(res.data.pageTotal / res.data.pageSize);
                        this.newsList = this.newsList.concat(res.data.list);
                        this.loading = false;
                        uni.hideLoading();
                    }
                })
            },
            getArticleList(){//新华企业资讯
                request(`/creditPlus/xhsRest/cms/getArticleList?pageSize=10&pageNo=${this.pageNo}&current=true&copytype=true&categoryIds=15912,15913,15914,15915,15916,15917,15918,15919,15920`,{
                    method:'post'
                }).then(res => {
                    console.log(res);
                    if(res.stateCode == '50101'){
                        this.totalPages = res.data.totalPages;
                        this.newsList = this.newsList.concat(res.data.returnData); // 添加数据
                        this.loading = false;
                        uni.hideLoading();
                    }
                })
            },
            popupMaskClick(){
                this.$mp.page.$getAppWebview().setTitleNViewButtonStyle(0,{
                    type:'menu'
                })
                this.isMenu = !this.isMenu;
            }
        },
        onNavigationBarButtonTap(){
            this.isMenu = !this.isMenu;
            if(this.isMenu){
                this.$mp.page.$getAppWebview().setTitleNViewButtonStyle(0,{
                    type:'close'
                })
                this.$refs.popup.open('top')
            } else{
                this.$mp.page.$getAppWebview().setTitleNViewButtonStyle(0,{
                    type:'menu'
                })
                this.$refs.popup.close();
            }
        },
        onReachBottom(){
            if(this.pageNo == this.totalPages) return this.noMore = true;
            this.loading = true;
            this.pageNo ++;
            if(this.navTitle == '新华企业资讯'){
                this.getArticleList()
            } else {
                this.getNewsList();
            }
        }
    }
</script>

<style>
    .publish{
        padding-bottom: 70rpx;
    }
    /deep/.uni-scroll-view::-webkit-scrollbar {
        display: none
    }
    .searchNav{
        white-space: nowrap;
        height: 73rpx;
        /*border-bottom: 1rpx solid #eceff7;*/
        line-height: 73rpx;
        position: fixed;
        top: var(--window-top);
        left: 0;
        z-index: 3;
        background: #fff;
        width: 100%;
        box-shadow: 10rpx 0 50rpx rgba(41,44,51,0.07);
    }
    .searchNav .li{
        display: inline-block;
        font-size: 28rpx;
        color: #333;
        text-align: center;
        /*width: 170rpx;*/
        position: relative;
        padding-left: 56rpx;
    }
    .searchNav .li:first-child{
        padding-left: 30rpx;
    }
    .searchNav .li:last-child{
        padding-right: 30rpx;
    }
    .searchNav .li.active{
        color: #113090;
    }
    .searchNav .li.active:after{
        content: '';
        display: block;
        width: 36rpx;
        height: 6rpx;
        background: #113090;
        border-radius: 2rpx;
        position: absolute;
        bottom: 1rpx;
        left: 50%;
        transform: translateX(calc(-50% + 28rpx));
    }
    .searchNav .li:first-child{
        margin-left: 0;
    }

    .publistMain{
        padding:0 30rpx;
    }

    .dynaMain .li{
        padding:32rpx 0;
        border-bottom: 1px solid #e5e5e5;
    }
    .dynaMain .li:last-child{
        border: none;
    }
    .dynaMain .li image{
        width: 250rpx;
        height: 146rpx;
        float: left;
        border-radius: 5rpx;
    }
    .dynaMain .li .liMain{
        width: calc(100% - 276rpx);
        height: 146rpx;
        float: right;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .dynaMain .li .liMain .liTitle{
        font-size: 28rpx;
        line-height: 40rpx;
        color: #222;
    }
    .dynaMain .li .liMain .liTime{
        font-size: 22rpx;
        color: #9b9b9b;
    }
    .popupMain{
        width: 100%;
        background: #f6f6f6;
    }
    .popupScroll{
        height: 1100rpx;
    }
    .proServeTitle{
        position: relative;
        font-size: 32rpx;
        color: #222;
        padding-left: 25rpx;
        font-weight: bold;
        margin-top: 8rpx;
    }
    .proServeTitle:before{
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 6rpx;
        height:28rpx;
        background: #113090;
    }
    .menu{
        padding:30rpx;
        background: #fff;
    }
    .menuMain{
        margin-top: 15rpx;
    }
    .menuMain .li{
        width: 33.333%;
        float: left;
        font-size: 28rpx;
        color: #222;
        line-height: 64rpx;
        text-align: center;
    }
    .menuTitle{
        margin-top: 20rpx;
    }
    .menuTitle .li{
        float: left;
        width: 33.333%;
        font-size: 32rpx;
        color: #222;
        line-height: 72rpx;
        font-weight: bold;
        text-align: center;
    }
</style>
