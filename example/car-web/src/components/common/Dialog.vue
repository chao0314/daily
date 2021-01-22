<template>
    <div>
        <div class="dialog-shadow"></div>
        <div class="panel panel-default dialog-panel">
            <div class="panel-heading">
                <h2 class="panel-title">
                    {{ title }}
                    <!--                    <a href="#" class="glyphicon glyphicon-remove pull-right"></a>-->
                </h2>
            </div>
            <div class="panel-body">
                <!--内容-->
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Dialog",
    props: {
        title: String
    }
}
</script>

<style scoped>

.dialog-shadow {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.3;
    z-index: 98;
}

.dialog-panel {
    position: absolute;
    left: 50%;
    top: 20px;
    width: 500px;
    margin-left: -250px;
    z-index: 99;
    overflow-y: scroll;
    height: 90%;
    
}


</style>
<style>

/*.dialog-panel:active html, body {*/
/*    */
/*    !*height: 100%;*!*/
/*    !*overflow: hidden;*!*/
/*    */
/*}*/

</style>