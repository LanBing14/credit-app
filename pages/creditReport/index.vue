<template>
    <view class="xybg-bg">
		<view class="xybg">
			<view class="lineFh">
				新华信用平台提供基础版、标准版、深度版和定制版4种信用报告，以形成多用途、多层次的信用服务体系，适应多样化的市场需求。
			</view>
			<view class="titleTop">
				 <image src="../../static/img/title1.jpg" class="left-img"></image>
				 <text>信用报告分类</text>
			</view>
			<view class="tit-content">
				信用报告分为：<text class="tit-ita">基础版，标准版，深度版和定制版。</text>
				具体内容详见信用报告介绍页面。
			</view>
		</view>
		<!-- 间隔 -->
		<view class="jgf"></view>
		
		<view class="xybg">
			<view class="topTxt">
				<view class="icon-wl"></view>基础版信用报告
			</view>
			<view class="lineFh">基础版信用报告包含基础工商信息、股权信息、历史沿革、司法信息、知识产权信息、商标信息、董高监对外任职信息和信用履约信息—负面信息。此外，信用中国归集的红黑名单及其他信息也将逐步归集到该版本报告中。基础版信用报告仅含主体信息和履约结果信息，来源于公开渠道，报告查询前无须被征信主体授权。
			</view>
			<view class="btn-sample" @click="toExample">
				<image src="../../static/img/apply.png" class="imgIcon"></image>
				<text>查看报告样例</text>
			</view>
		</view>
		<!-- 间隔 -->
		<view class="jgf"></view>
		
		<view class="xybg">
			<view class="topTxt">
				<view class="icon-wl"></view>标准版信用报告
			</view>
			<view class="lineFh">标准版信用报告定位于信贷和商务征信，内容增加了企业生产经营信息，包括主营业务、产品和服务、上下游企业关系、人员信息、公司治理和内控制度、财务及融资信息等。相关数据可来源于经核验的公开市场信息，经认证的合作机构发布的调查报告、评级报告、评审报告等文件信息，但主要使用企业自行提供且通过新华信用核验的信息。出具标准版报告，须由企业主体提出申请或得到企业主体的第Ⅰ类授权，即授权特定对象查询企业上传至新华信用平台信息。对于公开市场企业，如上市公司和新三板企业，标准版信用报告中如较多使用公开市场信息，授权问题可酌情处理。
			</view>
			<view class="btn-sample" @click="toExample">
				<image src="../../static/img/apply.png" class="imgIcon"></image>
				<text>查看报告样例</text>
			</view>
		</view>
		<!-- 间隔 -->
		<view class="jgf"></view>
		
		<view class="xybg">
			<view class="topTxt">
				<view class="icon-wl"></view>深度版信用报告
			</view>
			<view class="lineFh">深度版信用报告是最完整的企业征信报告，除包含基础版和标准版信用报告所有信息外，增加企业在税务、电力、金融等方面的履约结果信息，还包括与企业相关的宏观、行业、区域等方面的信用风险关注与提示。深度版信用报告须由企业主体提出申请或得到企业主体的第Ⅱ类授权：即授权特定对象查询企业上传信息的同时，授权新华信用查询其在税务、电力、金融等方面的履约结果信息并向该特定主体如实反馈。</view>
			<view class="btn-sample" @click="toExample">
				<image src="../../static/img/apply.png" class="imgIcon"></image>
				<text>查看报告样例</text>
			</view>
		</view>
		<!-- 间隔 -->
		<view class="jgf"></view>
		
		<view class="xybg">
			<view class="topTxt">
				<view class="icon-wl"></view>定制版信用报告
			</view>
			<view class="lineFh">定制版报告允许用户自由选择报告所需字段，在一定规范下可增加部分自定义字段。在处理流程方面，定制版报告依照选定信息的最高“约束级”将报告分为类基础、类标准、类深度三个类型，分发给对应的基础版、标准版、深度版三个业务条线，参照相应的规范化流程一并处理。</view>
			<view class="ady-table">
				
				<!-- 表头 -->
				<view class="ady-table-tr">
					<view class="ady-table-th wih1">项目</view>
					<view class="ady-table-th wih2">子项目</view>
					<view class="ady-table-th wih3">基础版</view>
					<view class="ady-table-th wih3">标准版</view>
					<view class="ady-table-th wih3">深度版</view>
				</view>
				
				<!-- 基础信用信息 -->
				<view class="ady-table-tr">
					<view class="ady-table-td wih1">
						基础信用<br/>信息
					</view>
					<view class="ady-table-td wih2">
						<view class="ady-table-td-item">
							<view class="lineItem">1、基本信息</view>
							<view class="lineItem">2、股权类信息</view>
							<view class="lineItem">3、历史沿革</view>
							<view class="lineItem">4、行政许可和资质认证</view>
							<view class="lineItem">5、知识产权和资质认证</view>
							<view class="lineItem">6、商标信息</view>
							<view class="lineItem">7、董高监对外任职信息</view>
						</view>
					</view>
					<view class="ady-table-td wih3">
						<view class="ady-table-td-item">
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem"> </view>
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
						</view>
					</view>
					<view class="ady-table-td wih3">
						<view class="ady-table-td-item">
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
						</view>
					</view>
					<view class="ady-table-td wih3">
						<view class="ady-table-td-item">
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
						</view>
					</view>
				</view>
				
				<!-- 深度信用质量信息 -->
				<view class="ady-table-tr">
					<view class="ady-table-td wih1">
						深度信用<br/>质量信息
					</view>
					<view class="ady-table-td wih2">
						<view class="ady-table-td-item">
							<view class="lineItem2">
								1、生产经营信息-S1
								<view class="lineItem2-child">
									<view class="">经营环境</view>
									<view class="">生产情况</view>
									<view class="">主营业务及收入</view>
									<view class="">前五大供应商信息</view>
									<view class="">前五大销售客户信息</view>
									<view class="">公司治理和内控制度</view>
									<view class="">人员信息</view>
									<view class="">融资信息</view>
								</view>
							</view>
							<view class="lineItem2">
								2、股权类信息
								<view class="lineItem2-child">
									<view class="">企业纳税信息</view>
									<view class="">企业用电量信息</view>
									<view class="">企业社保公积金</view>
								</view>
							</view>
						</view>
					</view>
					<view class="ady-table-td wih3">
						<view class="ady-table-td-item">
							<view class="lineItems2"></view>
							<view class="lineItems3"></view>
						</view>
					</view>
					<view class="ady-table-td wih3">
						<view class="ady-table-td-item">
							<view class="lineItems2">√</view>
							<view class="lineItems3"></view>
						</view>
					</view>
					<view class="ady-table-td wih3">
						<view class="ady-table-td-item">
							<view class="lineItems2">√</view>
							<view class="lineItems3">√</view>
						</view>
					</view>
				</view>
				
				<!-- 信用履约信息 -->
				<view class="ady-table-tr">
					<view class="ady-table-td wih1">
						信用履约信息<br/>
						-正面信息
					</view>
					<view class="ady-table-td wih2">
						<view class="ady-table-td-item">
							<view class="lineItem">1、获奖信息</view>
							<view class="lineItem">2、信用等级</view>
						</view>
					</view>
					<view class="ady-table-td wih3">
						<view class="ady-table-td-item">
							<view class="lineItem"></view>
							<view class="lineItem"></view>
						</view>
					</view>
					<view class="ady-table-td wih3">
						<view class="ady-table-td-item">
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
						</view>
					</view>
					<view class="ady-table-td wih3">
						<view class="ady-table-td-item">
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
						</view>
					</view>
				</view>
				
				<!-- 信用履约信息-风险信息 -->
				<view class="ady-table-tr">
					<view class="ady-table-td wih1">
						信用履约信息<br/>-风险信息
					</view>
					<view class="ady-table-td wih2">
						<view class="ady-table-td-item">
							<view class="lineItem">1、动产抵押</view>
							<view class="lineItem">2、股权出质</view>
							<view class="lineItem">3、知识产权出质</view>
							<view class="lineItem">4、清算信息</view>
							<view class="lineItem">5、工商异常名录</view>
							<view class="lineItem">6、行政处罚记录</view>
							<view class="lineItem">7、司法信息</view>
							<view class="lineItem">8、欠税信息</view>
							<view class="lineItem">9、金融违约信息</view>
						</view>
					</view>
					<view class="ady-table-td wih3">
						<view class="ady-table-td-item">
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem"> </view>
							<view class="lineItem">√</view>
							<view class="lineItem"></view>
							<view class="lineItem">√</view>
							<view class="lineItem"></view>
							<view class="lineItem"></view>
						</view>
					</view>
					<view class="ady-table-td wih3">
						<view class="ady-table-td-item">
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem"></view>
							<view class="lineItem"></view>
						</view>
					</view>
					<view class="ady-table-td wih3">
						<view class="ady-table-td-item">
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
						</view>
					</view>
				</view>
			
			    <!-- 财务信息 -->
				<view class="ady-table-tr">
					<view class="ady-table-td wih1">财务信息</view>
					<view class="ady-table-td wih2">
						<view class="ady-table-td-item">
							<view class="lineItem">1、主要财务信息</view>
							<view class="lineItem">2、财务分析与评价</view>
							<view class="lineItem">3、财务报告表</view>
						</view>
					</view>
					<view class="ady-table-td wih3">
						<view class="ady-table-td-item">
							<view class="lineItem"></view>
							<view class="lineItem"></view>
							<view class="lineItem"></view>
						</view>
					</view>
					<view class="ady-table-td wih3">
						<view class="ady-table-td-item">
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							
						</view>
					</view>
					<view class="ady-table-td wih3">
						<view class="ady-table-td-item">
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
							<view class="lineItem">√</view>
						</view>
					</view>
				</view>
				
			</view>
		</view>	
      <commonFixedDownload title="立即申请获取信用报告" btnTitle="立即申请" @eventClick="toApply"></commonFixedDownload>
    </view>
</template>
<script>
import commonFixedDownload from "../../components/commonFixedDownload"
export default{
  components: {
    commonFixedDownload
  },
    data(){
        return{

        }
    },
  methods: {
    toApply() {
      uni.navigateTo({
        url: `./apply`
      });
    },
    toExample() {
      uni.navigateTo({
        url: `./example`
      });
    }
  }
}
</script>
<style lang="scss" scoped>

	.xybg-bg {
		margin-bottom: 108rpx;
		box-sizing: border-box;
	}
	
	// 间隔
	.jgf {
		background-color: #f6f6f6;
		height: 20rpx;
	}
	
	.xybg{
		padding: 30rpx;
		
		.btn-sample {
			width: 236rpx;
			height: 50rpx;
			line-height: 50rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #113090;
			font-size: 24rpx;
			font-stretch: normal;
			letter-spacing: 0rpx;
			color: #ffffff;
			margin: 18rpx auto 0;
			border-radius: 10rpx;
			.imgIcon{
				width: 22rpx;
				height: 24rpx;
				margin-right: 10rpx;
			}
		}
		
		.topTxt {
			font-size: 30rpx;
			font-weight: normal;
			font-stretch: normal;
			line-height: 50rpx;
			padding-left: 20rpx;
			letter-spacing: 0rpx;
			color: #373737;
			position: relative;
			
			.icon-wl {
				width: 6rpx;
				height: 20rpx;
				background-color: #113090;
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
			}
		}
		
		.lineFh {
			font-family: SourceHanSansCN-Normal;
			font-size: 28rpx;
			color: #444444;
			line-height:48rpx;
		}
		
		.titleTop {
			font-size: 28rpx;
			font-weight: normal;
			font-stretch: normal;
			line-height: 48rpx;
			letter-spacing: 0rpx;
			color: #113090;
			display: flex;
			align-items: center;
			.left-img {
			    width: 34rpx;
				height: 26rpx;
				margin-right: 15rpx;
			}
			
		}
		
		.tit-content {
			font-size: 28rpx;
			font-weight: normal;
			font-stretch: normal;
			line-height: 48rpx;
			letter-spacing: 1rpx;
			color: #444444;
			
			.tit-ita {
				font-style: italic;
				font-weight: bold;
				letter-spacing: 1rpx;
				color: #113090;
			}
			
		}
		
		// 表格样式
		.ady-table{
			width: 690rpx;
			overflow: hidden;
			box-sizing: border-box;
			margin-top: 10rpx;
			.ady-table-tr {
				display: flex;
				border-top: 2rpx solid #dae6f0;
				border-left: 2rpx solid #dae6f0;
				border-right: 2rpx solid #dae6f0;
				font-size: 24rpx;
				color: #333333;
				.ady-table-td {
					border-right: 2rpx solid #dae6f0;
					.ady-table-td-item {
						.lineItem {
							height: 52rpx;
							line-height: 52rpx;
							padding-left: 10rpx;
							font-size: 22rpx;
							color: #666666;
							border-bottom: 2rpx solid #dae6f0;
						}
						.lineItem:last-child {
							border-bottom:none;
						}
						
						.lineItem2 {
							padding-left: 10rpx;
							font-size: 22rpx;
							line-height: 52rpx;
							border-bottom: 2rpx solid #dae6f0;
							color: #666666;
							
							.lineItem2-child{
								padding-left: 40rpx;
								color: #999999;
							}
						}
						
						.lineItems2 {
							height: 470rpx;
							line-height: 470rpx;
						    padding-left: 10rpx;
							border-bottom: 2rpx solid #dae6f0;
						}
						.lineItems3 {
						    padding-left: 10rpx;
							line-height: 208rpx;
						}
						
						.lineItem2:last-child {
							border-bottom:none;
						}
					}
					&.wih2 {
						width: 300rpx;
					}
					&.wih1 {
						width: 160rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						letter-spacing: 0;
						font-size: 22rpx;
						box-sizing: border-box;
						line-height: 34rpx;
						text-align: center;
						color: #666;
					}
					&.wih3 {
						width: 95rpx;
					}
				}
				.ady-table-th {
					padding-left: 10rpx;
					line-height: 70rpx;
					background-color: #e6f0fc;
					border-right: 2rpx solid #dae6f0;
					
					&.wih2 {
						width: 300rpx;
					}
					&.wih1 {
						width: 160rpx;
					}
					&.wih3 {
						width: 95rpx;
					}
				}
				.ady-table-th:last-child,
				.ady-table-td:last-child{
		           border-right:none;
				}
			}
		    .ady-table-tr:last-child {
				border-bottom:2rpx solid #dae6f0 ;
			}
		}
		
	}
	/deep/.uni-scroll-view::-webkit-scrollbar {
		display: none
	}
	
	
</style>
