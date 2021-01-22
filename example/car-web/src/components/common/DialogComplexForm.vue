<template>
    <Dialog :title="title">
        <complex-form :fields="fields" @cancel="cancel" @confirm="confirm"></complex-form>
    </Dialog>
</template>

<script>
import Dialog from "@/components/common/Dialog";
import ComplexForm from "@/components/common/ComplexForm";
import DialogForm from "@/components/common/DialogForm";

export default {
    name: "DialogComplexForm",
    extends: DialogForm,
    components: {
        Dialog,
        ComplexForm
    }
}
</script>

<style scoped>

</style>