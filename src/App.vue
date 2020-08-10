<template>
  <div id="app">
    <router-link to="/">
      <img alt="CiudadBusca logo" src="./assets/logo.svg" class="logo" />
    </router-link>
    <router-view />
    <div class="credits" id="credits">
      <p class="credits__content">
        Prohibida su reproducción total o parcial, así como su traducción a
        cualquier idioma sin autorización escrita de su titular.
        <br />
        <br />
        <a
          href="https://ollorente.blogspot.com"
          target="_blank"
          class="text--white"
          >Ollorente Diseño Gráfico</a
        >
        para CiudadBusca ©
      </p>
    </div>
  </div>
</template>

<style>
:root {
  --primary: #044146;
  --dark: #2c3e50;
  --light: white;
}
body {
  margin: 0;
  padding: 0;
  background: var(--primary);
  box-sizing: border-box;
  background-image: url(./assets/img/aros3.png);
  background-position: center top;
  background-repeat: no-repeat;
}

*,
a,
a:hover,
a:link {
  text-decoration: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--dark);
}

.logo {
  margin: 2rem 0 0;
}

.main {
  width: 80%;
  max-width: 500px;
  margin: 1rem auto;
  background: var(--light);
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.25);
}

.credits {
  text-align: center;
  width: 80%;
  max-width: 380px;
  margin: auto;
  color: var(--light);
  font-size: 0.75rem;
}

.credits__content {
  display: block;
  padding: 1rem;
}

.text--white {
  color: var(--light) !important;
}

.btn {
  display: inline-block;
  font-weight: 400;
  color: var(--dark);
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-primary {
  color: var(--light);
  background-color: var(--primary);
  border-color: var(--primary);
}

.btn-block {
  display: block;
  width: 100%;
}

button,
input {
  overflow: visible;
}

button,
input,
optgroup,
select,
textarea {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}
</style>
