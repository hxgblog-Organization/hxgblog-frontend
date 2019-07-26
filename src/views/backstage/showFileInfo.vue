<template>
    <div class="show-file">
        <h1>
            {{ msg }}
        </h1>
    </div>
</template>

<script>
    export default {
        name: "showFileInfor",
        data() {
            return {
                msg: 'File',
            }
        }
    }
</script>

<style scoped>
    .show-file{
        margin-top: 2%;
        margin-left: 6%;
        width: 85%;
    }

</style>