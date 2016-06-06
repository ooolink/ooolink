<template>
    <div class="biz-message">
        <div class="biz-message-left">
            <p class="biz-message-title">当前消息</p>
            <ul>
                <li v-for="(index, message) in messages" class="biz-message-item">
                    <p>{{`第${index+1}条`}}</p>
                    <p>{{message.message_title}}</p>
                    <p>{{message.message_content}}</p>
                </li>
            </ul>
        </div>
        <div class="biz-message-right">
            <input class="lang-input-text" v-model="domessageTitle" placeholder="输入标题" />
            <input class="lang-input-text" v-model="domessageContent" placeholder="输入内容" />
            <button class="lang-input-submit biz-message-submit" v-on:click="addMessage">发送平台消息</button>
        </div>
    </div>
</template>

<script>

module.exports={
    data(){
        return {
            messages: [],
            domessageTitle: '',
            domessageContent: '' 
        }
    },
    created: function(){
        fetch('/message')
        .then(response=>{
            return response.json();
        })
        .then(rs=>{
            this.$set('messages', rs.data);
        })
    },
    methods:{
        addMessage(){
            if (!this.domessageContent || !this.domessageTitle){
                return;
            }
            fetch('/message', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `title=${this.domessageTitle}&content=${this.domessageContent}`
            })
            .then(response=>{
                return response.json();
            })
            .then(rs=>{
                if (rs && rs.result === 1){
                    this.messages.push({
                        message_title: this.domessageTitle,
                        message_content: this.domessageContent
                    });
                    this.$set('domessageContent', '');
                    this.$set('domessageTitle', '');
                }
            });
        }
    }
}
</script>