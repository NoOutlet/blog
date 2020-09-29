<template>
  <nav
    class="navbar is-fixed-top is-header"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <a class="navbar-item" href="https://nooutlet.net">
        <img src="@/assets/images/logo.png" width="128" />
      </a>

      <a
        role="button"
        aria-label="menu"
        aria-expanded="false"
        @click="toggleMenu"
        class="navbar-burger burger"
        :class="{ 'is-active': menuOpen }"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': menuOpen }">
      <div class="navbar-start">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">Experiments</a>

          <div class="navbar-dropdown">
            <a href="https://nooutlet.net/balls" class="navbar-item">Balls</a>
            <hr class="navbar-divider" />
            <a href="https://nooutlet.net/evolution" class="navbar-item"
              >Evolution</a
            >
            <hr class="navbar-divider" />
            <a href="https://nooutlet.net/voice" class="navbar-item">Voice</a>
          </div>
        </div>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">Games</a>

          <div class="navbar-dropdown">
            <a href="https://nooutlet.net/draw" class="navbar-item">Color</a>
            <hr class="navbar-divider" />
            <a href="https://nooutlet.net/rubixcube" class="navbar-item"
              >Rubix Cube</a
            >
            <hr class="navbar-divider" />
            <a href="https://nooutlet.net/flash" class="navbar-item"
              >Flash Cards</a
            >
            <hr class="navbar-divider" />
            <a href="https://nooutlet.net/clock" class="navbar-item">Clock</a>
          </div>
        </div>
        <a href="https://blog.nooutlet.net" class="navbar-item">Blog</a>
      </div>

      <!--<div class="navbar-end">
        login buttons?
				<div class="navbar-item">
					<div class="buttons">
						<a class="button is-primary">
							<strong>Sign up</strong>
						</a>
						<a class="button is-light">
							Log in
						</a>
					</div>
        </div>
      </div>-->
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
  head: {
    bodyAttrs: {
      class: "has-navbar-fixed-top",
    },
  },
};
</script>