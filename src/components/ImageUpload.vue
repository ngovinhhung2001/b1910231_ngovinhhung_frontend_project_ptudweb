<template>
    <form action="http://localhost:3000/api/images" target="_blank" enctype="multipart/form-data" method="POST">
        <div class="form-control">
            <input type="file" name="image" multiple accept="image/*" class="form-control" />
            <input type="submit" value="Upload Photo" />
        </div>
    </form>
</template>
  
<script>
export default {

}
</script>