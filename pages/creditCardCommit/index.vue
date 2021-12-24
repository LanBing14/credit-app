<template>
    <view>
        <view class="commitMain">
            <image :src="website + promiseImage" mode="widthFix"></image>
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
                companyId:'',
                companyName:'',
                promiseImage:''
            }
        },
        onLoad(options) {
            this.companyId = options.companyId;
            this.companyName = options.companyName;
            uni.showLoading({
                title:'加载中...'
            })
            this.createPromiseImage();
        },
        onShow(){

        },
        methods: {
            createPromiseImage(){//获取企业承诺书
                request('/web/app/xhsRest/build/createPromiseImage',{
                    method:'get',
                    data:{
                        companyId: this.companyId,
                        companyName: this.companyName
                    }
                }).then(res => {
                    if(res.stateCode == '1'){
                        this.promiseImage = res.data;
                        uni.hideLoading();
                    }
                })
            }
        }
    }
</script>

<style>
    .commitMain{
        padding-top: 50rpx;
        text-align: center;
    }
    .commitMain image{
        width: 650rpx;
    }
</style>
