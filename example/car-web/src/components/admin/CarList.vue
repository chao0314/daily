<template>
    <div>
        <button type="button" class="btn btn-primary" @click="create()">添加</button>
        <car-form :title="mode" :fields="fields" v-if="needForm" @cancel="cancel" @confirm="confirm"></car-form>
        <car-table :columns="columns" :rows="rows" @edit="edit" @del="del"></car-table>
        <pagination :amount="amount" @pagination="pagination"></pagination>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
import Pagination from "../common/Pagination";
import CarTable from "@/components/common/Table";
import CarForm from "@/components/common/DialogComplexForm"

export default {
    name: "CarList",
    components: {
        CarForm,
        CarTable,
        Pagination
    },
    data() {
        return {
            columns: ['名称', '价格'],
            amount: 0,
            rows: [],
            page: 1,
            needForm: false,
            mode: '添加',
            fields: [
                {name: "title", type: "text", value: "", label: "名称"},
                {name: "price", type: "text", value: "", label: "价格"},
                {name: "features", type: "array", value: [{key: "", value: ""}], label: "特点"},
                {name: "description", type: "textarea", value: "", label: "描述"},
                {name: "images", type: "file", value: "", label: "图片"},
            ]
        }
    },
    methods: {
        ...mapActions('admin', ['getCar', 'getCarCount', 'createCar', 'updateCar', 'deleteCar']),
        
        pagination(page) {
            this.page = page;
            this.getCarByPage(page);
            
        },
        getCarByPage(page = 1) {
            this.getCar(page).then(({err, data}) => {
                
                if (err) this.$alert('稍后重试');
                this.selfData['cars'] = data;
                this.rows = data.map(({title, price}) => ({title, price}));
                
                
            }).catch(e => {
                this.$alert('网络异常');
            })
            
        },
        cancel() {
            this.needForm = false;
        },
        confirm(data) {
            
            if (this.mode === '添加') {
                
                this.createCar(data).then(res => {
                    this.needForm = false;
                    this.$alert('添加成功');
                }).catch(this.$alert('失败'));
            } else {
                
                this.updateCar({ID: this.selfData.ID, data}).then(res => {
                    this.needForm = false;
                    this.$alert('修改成功');
                    this.selfData.ID = null;
                    this.getCarByPage(this.page);
                    
                }).catch(e => this.$alert('修改失败'));
                
            }
            
            
        },
        create() {
            this.needForm = true;
            this.mode = '添加';
            this.fields = this.fields.map(field => {
                
                if (field.type.toLowerCase() === 'array') field.value = [{key: "", value: ""}];
                else field.value = '';
                return field;
            })
        },
        edit(index) {
            this.needForm = true;
            this.mode = '修改';
            let item = this.selfData.cars[index];
            this.selfData.ID = item.ID;
            this.fields = this.fields.map(field => {
                field.value = item[field.name];
                return field;
            })
            
        },
        del(index) {
            let {ID} = this.selfData.cars[index];
            if (ID) {
                this.deleteCar(ID).then(res => {
                    this.$alert('删除成功');
                    this.getCarByPage(this.page);
                });
                
            }
            
            
        }
    },
    created() {
        this.selfData = {};
        this.getCarByPage(this.page);
        this.getCarCount().then(({data: {count}}) => this.amount = Math.ceil(count / 10));
    }
}
</script>

<style scoped>

</style>