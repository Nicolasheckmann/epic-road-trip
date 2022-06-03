<script>
</script>

<header class="sticky top-0" id="header-container">
  <!-- <div class="corner">
    <a href="https://kit.svelte.dev">
      <img src={logo} alt="SvelteKit" />
    </a>
  </div> -->

  <nav class="w-full bg-gradient-to-r from-cyan-500 to-cyan-300">
    <ul class="w-full">
      <a class="absolute text-lg left-10 text-gray-50 font-sans items-center flex" href="/">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 float-left" fill="none" viewBox="0 0 24 24"
             stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p class="ml-4">
          Epic Road Trip
        </p>
      </a>
      <a class="absolute text-lg right-10 text-white font-sans" href="/">
        My travel
      </a>
    </ul>
  </nav>

  <!-- <div class="corner">
    TODO put something else here? github link?
  </div> -->
</header>

<style>

    header {
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    nav {
        display: flex;
        justify-content: center;
        --background: rgba(255, 255, 255, 0.7);
    }

    svg {
        width: 2em;
        height: 3em;
        display: block;
    }

    /*
      path {
        fill: var(--background);
      } */

    @font-face {
        font-family: 'Malter Sans Light';
        src: url('../../fonts/Malter_Sans_Light.otf');
    }

    @font-face {
        font-family: 'Malter Sans Bold';
        src: url('../../fonts/Malter_Sans_Bold.otf');
    }


    ul {
        position: relative;
        padding: 0;
        margin: 0;
        height: 3em;
        display: flex;
        justify-content: center;
        align-items: center;
        list-style: none;
        background: var(--background);
        background-size: contain;
        font-family: 'Malter Sans Bold';
    }
</style>
