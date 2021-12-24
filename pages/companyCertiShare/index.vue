<template>
    <view class="certiShare">
        <web-view :src="`${url}/#/ShareNew?companyId=${companyId}&companyName=${companyName}&hideOther=0`"></web-view>
    </view>
</template>

<script>
    export default {
        components: {

        },
        data () {
            return {
                url:'',
                companyId:'',
                companyName:''
            }
        },
        onLoad(options) {
            this.companyId = options.companyId;
            this.companyName = options.companyName;
            if(this.website == 'https://www.credit100.com'){
                this.url = 'https://m.credit100.com';
            } else{
                this.url = this.website;
            }
        },
        onShow(){

        },
        methods: {

        }
    }
</script>

<style>

</style>
