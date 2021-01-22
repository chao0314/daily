<template>
    <div>
        <message-table :columns="columns" :rows="rows" :order="false" :check="true" :allow-edit="false"
                       @del="del"></message-table>
        <pagination :amount="amount" @pagination="pagination"></pagination>
    </div>
</template>

<script>
import Pagination from "@/components/common/Pagination";
import MessageTable from "@/components/common/Table";
import {mapActions} from 'vuex';

export default {
    name: "MessageList",
    components: {
        MessageTable,
        Pagination
    },
    data() {
        return {
            columns: ['姓名', '邮箱', '标题', '内容', '日期'],
            rows: [],
            page: 1,
            amount: 5
        }
    },
    methods: {
        ...mapActions('admin', ['getMessage', 'deleteMessage', 'getMessageCount']),
        pagination(page) {
            
            this.query(page);
        },
        query(page) {
            this.getMessage({page}).then(res => {
                this.selfData.messages = res;
                this.rows = res.map(item => {
                    
                    let temp = Object.assign({}, item);
                    delete temp.ID;
                    return temp;
                });
                
            });
        },
        del(indexs) {
            if (!Array.isArray(indexs)) {
                indexs = [indexs];
            }
            
            if (confirm(`删除 ${indexs.length} 条数据？`)) {
                let IDs = this.selfData.messages.filter((v, i) => indexs.includes(i)).map(msg => msg.ID);
                
                this.deleteMessage(IDs).then(() => {
                    this.query(this.page);
                })
            }
            
            
        }
    },
    created() {
        this.selfData = {};
        this.query(this.page);
        this.getMessageCount().then(({data: {count}}) => {
            this.amount = Math.ceil(count / 10);
        });
    }
    
}
</script>

<style scoped>

</style>