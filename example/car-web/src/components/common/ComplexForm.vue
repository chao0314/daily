<template>
    <form ref="form" class="form">
        <div class="form-group" v-for="item in  formFields">
            
            <label>{{ item.label }}:
                <input v-if="item.type === 'file'" multiple type="file" class="form-control"
                       :name="item.name">
                <template v-else-if="item.type==='array'">
                    <div v-for="feature in  item.value" class="feature">
                        <input type="text" class="form-control"
                               name="featureKey" v-model="feature.key">
                        <input type="text" class="form-control"
                               name="featureValue" v-model="feature.value">
                        <span @click.stop.prevent="add(item.value)">+</span>&nbsp;<span
                        @click.stop.prevent="sub(item.value)">-</span>
                    </div>
                </template>
                <textarea v-else-if="item.type === 'textarea'" name="description" cols="30" rows="5"></textarea>
                <input v-else :type="item.type" class="form-control" :name="item.name"
                       v-model="item.value">
            </label>
        
        </div>
        
        <div class="form-group">
            <button type="button" class="btn btn-primary" @click="confirm">确认</button>
            <button type="button" class="btn btn-default" @click="cancel">取消</button>
        </div>
    </form>
</template>

<script>

export default {
    name: "CarForm",
    props: {
        fields: {
            required: true,
            type: Array
        }
    },
    data() {
        return {
            formFields: []
        }
    },
    methods: {
        confirm() {
            
            this.$emit('confirm', new FormData(this.$refs['form']));
        },
        cancel() {
            this.$emit('cancel');
        },
        add(arr) {
            arr.push({key: "", value: ""});
            
        },
        sub(arr) {
            if (arr.length > 1) arr.splice(-1, 1);
            
        }
    },
    created() {
        this.formFields = this.fields.map(field => {
            let temp = Object.assign({}, field);
            if (field.type.toLowerCase() === 'array') temp.value = field.value.slice();
            return temp;
        });
    }
}
</script>

<style scoped>
.feature {
    display: flex;
}

.feature input {
    width: 30%;
}


.feature span {
    width: 20px;
    display: inline-block;
    border: 1px solid silver;
    text-align: center;
    line-height: 30px;
    margin: 0 2px;
}

</style>