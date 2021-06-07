<template>
  <div class="btd-checkbox">
    <input
      class="ogcheck"
      :id="id"
      type="checkbox"
      @change="$emit('change', $event.target.checked)"
      :checked="checked"
    />
    <div class="ogreplace">
      <div class="checkmark" />
    </div>
  </div>
</template>

<script>
export default {
  name: "BtdCheckbox",
  props: ["id", "checked"],
  emits: ["change"],
};
</script>

<style scoped>
.ogcheck {
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
}

.ogreplace {
  width: 1em;
  height: 1em;
  background-color: white;
  border: 2px solid black;
  border-radius: 3px;
}

label:hover .ogreplace {
  background-color: #6fd4d3;
}

input:checked ~ .ogreplace {
  width: 0.8em;
  height: 0.8em;
  background-color: #53d3d1;
}
input:checked ~ .ogreplace .checkmark {
  position: absolute;
  border: 0.2em solid white;
  border-top-width: 0px;
  border-right-width: 0px;
  height: 2px;
  width: 6px;
  transform: rotate(-45deg) translate(0px, 2px);
}
</style>
