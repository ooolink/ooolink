<template>
    <div class="biz-recommend">
        <select v-model="siteSelected" v-on:change="changeSiteSelected" class="biz-recommend-choose">
            <option v-for="site in sites" value={{site.site_id}}>
                {{site.site_name}}
            </option>
        </select>
        <div class="biz-recommend-left">
            <div class="mod-content-select-list">
                <ul>
                    <li v-for="content in contents[siteSelected]">
                        <div class="biz-recommend-list-item" v-on:click="selectContent(content)">
                            <div style="background-image: url('{{content.image}}')" class="biz-recommend-list-image-container">
                            </div>
                            <div class="biz-recommend-list-image-cover">
                            </div>
                            <div class="biz-recommend-list-text">
                                <p class="biz-recommend-list-title">{{content.title}}</p>
                                <p class="biz-recommend-list-desc">{{content.desc}}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="biz-recommend-right">
            <div class="biz-recommend-operate">
                <input class="lang-input-text" placeholder="请输入标题" v-model="doTitle" />
                <p>{{doRecommend.title}}</p>
                <button class="lang-input-submit" v-on:click="add" disabled={{showOperate}}>添加</button>
                <button class="lang-input-submit" v-on:click="del" disabled={{!showOperate}}>删除</button>
                <button class="lang-input-submit" v-on:click="update" disabled={{!showOperate}}>修改</button>
            </div>
            <p class="biz-recommend-now-title">当前推荐</p>
            <div class="biz-recommend-now">
                <div v-for="recommend in recommends" class="biz-recommend-now-item" v-on:click="selectContent(recommend.content, true)">
                    <img src="{{recommend.content.image}}"/>
                    <div class="biz-recommend-now-item-desc">
                        <p>{{recommend.recommend_title}}</p>
                        <p>{{recommend.content.title}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

module.exports={
    data() {
        return {
            siteSelected: '',
            sites: [],
            contents: {
            },
            recommends:[],
            doRecommend:{},
            doTitle:'',
            showOperate: true
        }
    },
    created: function(){
        fetch('/manager/site')
            .then(response=>{
                return response.json();
            })
            .then(rs=>{
                if (rs.result === 1){
                    this.$set('sites', rs.data);
                    this.changeSiteSelected(rs.data[0].site_id);
                    this.$set('siteSelected', rs.data[0].site_id);
                }
            });

        fetch('/manager/recommend')
            .then(response=>{
                return response.json();
            })
            .then(rs=>{
                if (rs.result === 1){
                    this.$set('recommends', rs.data);
                }
            })
    },
    methods:{
        changeSiteSelected: function(id){
            let site=this.siteSelected || id;
            fetch(`/manager/content?page=0&limit=10&site=${site}`)
            .then(response=>{
                return response.json();
            })
            .then(rs=>{
                if (rs.result === 1){
                    this.$set(`contents['${site}']`, rs.data);
                }
            });
        },
        selectContent: function(content, update){
            if (update){
                let flag = -1;
                this.recommends.forEach((re, idx)=>{
                    if (flag!=-1){return;}
                    if (re.mixed_id === content.content_id){
                        this.$set('doTitle', re.recommend_title);
                        flag = idx;
                    }
                });
            } else {
                this.$set('doTitle', '');
            }
            this.$set('showOperate', update);
            this.$set('doRecommend', content);
        },
        add: function(){
            if (!this.doRecommend || !this.doTitle){
                return;
            }
            setCA.call(this, ()=>{
                    let re = this.doRecommend;
                    this.recommends.unshift({
                        mixed_id: re.content_id, 
                        type: 'content', 
                        recommend_title: this.doTitle,
                        content: re
                    });
                    this.$set('recommends', this.recommends);
                    this.$set('doRecommend', {});
                    this.$set('doTitle', '');
            });
        },
        del: function(){
            let id = this.doRecommend.content_id;
            fetch('/manager/recommend', {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `mixed_id=${id}`
            })
            .then(response=>{
                return response.json();
            })
            .then(rs=>{
                if (rs.result === 1){
                    this.recommends = this.recommends.filter(re=>{
                        if (re.mixed_id === id){
                            return false;
                        }
                        return true;
                    });
                    this.$set('recommends', this.recommends);
                    this.$set('doRecommend', {});
                    this.$set('doTitle', '');
                } else {
                    alert('删除失败');
                }
            });
        },
        update: function(){
            setCA.call(this, ()=>{
                    let doRe = this.doRecommend;
                    this.recommends = this.recommends.map(re=>{
                        if (re.mixed_id === doRe.content_id){
                            re.recommend_title = this.doTitle;
                        }
                        return re;
                    });
                    this.$set('recommends', this.recommends);
                    this.$set('doRecommend', {});
                    this.$set('doTitle', '');
            });
        }
    }
}

function setCA(cb){
            fetch('/manager/recommend', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `id=${this.doRecommend.content_id}&type=content&title=${this.doTitle}`
            })
            .then(response=>{
                return response.json();
            })
            .then(rs=>{
                if (rs.result === 1){
                    cb();
                } else {
                    alert('添加失败');
                }
            });
}
</script>










