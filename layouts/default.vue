<template>
  <v-app light>
    <v-content>
      <Toolbar/>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from '~/components/Toolbar.vue'

export default {
  components: {
    Toolbar
  },
  data () {
    return {
    }
  }
}
</script>
