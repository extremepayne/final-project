<template>
  <div class="creationDisplay">
     <h2 class="creationHeader">{{creation.name}}</h2>
     <div class="creationGrid" v-for="image in creation.photos">
       <img src="image"/>
      </div>
     </div>
  </div>
</template>

<script>
export default {
  name: "CreationDisplay",
  props: {
    creation: Object,
  },
};
</script>
