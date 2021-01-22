<template>
    
        <section id="container">
            <div class="zerogrid">
                <div class="wrap-container clearfix">
                    <div id="main-content">
                        <div class="wrap-box"><!--Start Box-->
                            <div class="header">
                                <h1>投诉和建议</h1>
                                <p>如果您有任何问题，请在下方留言，我们会尽快与您取得联系</p>
                            </div>
                            <div class="row">
                                <div class="col-2-3">
                                    <div class="wrap-col">
                                        <div class="contact">
                                            <div class="contact-header">
                                                <h5>留言建议</h5>
                                            </div>
                                            <div id="contact_form">
                                                <form name="form1" class="ff" ref="form">
                                                    <label class="row">
                                                        <div class="col-1-2">
                                                            <div class="wrap-col">
                                                                <input type="text" name="name" placeholder="您的姓名"
                                                                       required="required"/>
                                                            </div>
                                                        </div>
                                                        <div class="col-1-2">
                                                            <div class="wrap-col">
                                                                <input type="email" name="email" placeholder="您的邮箱"
                                                                       required="required"/>
                                                            </div>
                                                        </div>
                                                    </label>
                                                    <label class="row">
                                                        <div class="wrap-col">
                                                            <input type="text" name="title" placeholder="留言标题"
                                                                   required="required"/>
                                                        </div>
                                                    </label>
                                                    <label class="row">
                                                        <div class="wrap-col">
                                                            <textarea name="content" class="form-control" rows="4" cols="25"
                                                                      required placeholder="留言内容"></textarea>
                                                        </div>
                                                    </label>
                                                    <center><button class="sendButton" type="button" @click="submit">提交</button></center>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-1-3">
                                    <div class="wrap-col">
                                        <div class="contact-header">
                                            <h5>联系方式</h5>
                                        </div>
                                        <div
                                            style="background: #fff; padding: 20px; box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.3);">
                                            <p>联系电话：400-670-1080</p>
                                            <p>Email：kefu(at)renrenche.com</p>
                                            <p>商务合作：marketing(at)renrenche.com</p>
                                            <p>网站地址：http://www.renrenche.com</p>
                                            <p>总部地址：北京市朝阳区北苑东路中国铁建广场B座19-21层</p>
                                            <p>地图坐标：http://j.map.baidu.com/K93K7</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    
</template>

<script>
import {mapActions} from 'vuex';
export default {
    name: "Index",
    methods:{
        ...mapActions('web',['createMessage']),
        submit(){
            let formData =  new FormData(this.$refs['form']);
            this.createMessage(formData).then(res=>{
                if(!res.err) this.$alert('留言成功');
                else this.$alert('留言失败');
            })
            
            
        }
    }
   
}
</script>

<style scoped>
.sendButton{
    
    border: none;
    height: 30px;
}

</style>