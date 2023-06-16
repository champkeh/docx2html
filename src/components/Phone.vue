<script setup>
defineProps({
  content: String
})
</script>

<template>
  <div id="wrapper">
    <div class="phone view_3">
      <iframe :srcdoc="content"></iframe>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,600,300);
body {
  font-family: 'Open Sans', sans-serif;
  background-color: #FFFAF6;
}
#wrapper {
  position: absolute;
  right: 20px;
}

/*Basic Phone styling*/

.phone {
  border: 40px solid #ddd;
  border-width: 55px 7px;
  border-radius: 40px;
  margin: 30px auto;
  overflow: hidden;
  transition: all 0.5s ease;
  width: 400px;
  height: 750px;
}

.phone iframe {
  border: 0;
  width: 100%;
  height: 100%;
}
/*Different Perspectives*/

.phone.view_3 {
  transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  box-shadow: 0px 3px 0 #BBB, 0px 4px 0 #BBB, 0px 5px 0 #BBB, 0px 7px 0 #BBB, 0px 10px 20px #666;
}

@media (max-width:900px) {
  #wrapper {
    transform: scale(0.8, 0.8);
  }
}

@media (max-width:700px) {
  #wrapper {
    transform: scale(0.6, 0.6);
  }
}

@media (max-width:500px) {
  #wrapper {
    transform: scale(0.4, 0.4);
  }
}
</style>
