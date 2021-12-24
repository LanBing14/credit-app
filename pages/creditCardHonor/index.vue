<template>
    <view>
        <view class="mosowe-swiper" v-if="honorMainList.length > 0">
            <swiper class="uni-swiper" :previous-margin="'146rpx'" :next-margin="'146rpx'" circular @change="bannerChange">
                <swiper-item class="item"
                             v-for="(item,index) of honorMainList"
                             :key="index"
                             :class="active !== index ? 'swiper-pyramid' : active === index ? 'swiper-active' : ''">
                    <text class="text">
                        {{item.explain.length > 11 ? item.explain.substring(0,11) + '...' : item.explain}}
                    </text>
                    <image :src="website + item.picture.path" @click="previewImage(index)" class="image" ></image>
                </swiper-item>
            </swiper>
        </view>
        <noData info="暂无信息" style="margin-top: 200rpx" v-else></noData>
    </view>
</template>

<script>
    import request from "../../utils/request";
    import noData from "../../components/noData";

    export default {
        components: {
            noData
        },
        data () {
            return {
                companyId:String,
                honorMainList:Array,
                active: 0,
                photoList:[]
            }
        },
        onLoad(options) {
            this.companyId = options.companyId;
            this.getEnterpriseCard();
        },
        onShow(){

        },
        methods: {
            // banner轮播时
            bannerChange (e) {
                this.active = e.detail.current;
                this.$emit('change', e.detail.current);
            },
            getEnterpriseCard(){
                request('/enterprise/detail/card/getEnterpriseCard',{
                    method:'get',
                    data:{
                        type:3,
                        companyId:this.companyId,
                        queryType:1
                    }
                }).then(res => {
                    if(res.data != ''){
                        if(res.data.qualificationList.length > 0){
                            this.honorMainList = res.data.qualificationList;

                            if(this.honorMainList.length > 10){
                                this.honorMainList.length = 10;
                            }

                            if (this.active === 0 || this.active < 0 || this.active > this.honorMainList.length - 1) {
                                this.honorMainList.length ? '' : this.active = 1;
                            } else if (this.active === this.honorMainList.length - 1) {
                                this.active = this.honorMainList.length -2;
                            }

                            this.photoList = this.honorMainList.map(item => {
                                return this.website + item.picture.path;
                            });
                        } else{
                            this.honorMainList = [];
                        }
                    } else{
                        this.honorMainList = [];
                    }
                })
            },
            previewImage(index){//预览图片
                uni.previewImage({
                    current: index,
                    urls: this.photoList
                });
            }
        }
    }
</script>

<style>
    .mosowe-swiper{
        width: 100%;
        position: relative;
        margin-top: 60rpx;
        height: 705rpx;
    }
    .mosowe-swiper .uni-swiper {
        height: inherit;
    }
    .mosowe-swiper .uni-swiper .item {
        box-sizing: border-box;
    }
    .mosowe-swiper .uni-swiper .item .image{
        width: 100%;
        height: calc(100% - 90rpx);
    }
    .mosowe-swiper .uni-swiper .item text{
        display: block;
        height: 90rpx;
        font-size: 30rpx;
        color: #272727;
        text-align: center;
    }

    .mosowe-swiper .uni-swiper .swiper-pyramid{
        padding: 50rpx;
    }
    .mosowe-swiper .uni-swiper .swiper-prev {
        animation: prev .5s forwards;
    }
    .mosowe-swiper .uni-swiper .swiper-next {
        animation: next .5s forwards;
    }
    .mosowe-swiper .uni-swiper .swiper-active {
        animation: actives .5s forwards;
    }
    @keyframes prev {
        0%{
            padding: 0;
        }
        100% {
            padding: 50rpx;
        }
    }
    @keyframes next {
        0%{
            padding: 0;
        }
        100% {
            padding: 50rpx;
        }
    }
    @keyframes actives {
        0%{
            padding: 50rpx;
        }
        100% {
            padding: 0;
        }
    }
</style>
