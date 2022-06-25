<script>
    import { createEventDispatcher } from 'svelte';
    import { globalSearch, updateStore } from '../../../store';
	
    const dispatch = createEventDispatcher();
    $: city = $globalSearch.city.name;
    $: startDate = $globalSearch.startDate;
    $: endDate = $globalSearch.endDate;

    let adults;
    let children;
    let infants;
    let stopOvers;
    
	
    export let isOpenModal;
	
    function closeModal() {
        isOpenModal = false;
        dispatch('closeModal', { isOpenModal });
    }
</script>

<div id="background" style="--display: {isOpenModal ? 'block' : 'none'};" on:click={closeModal}></div>
<div id="modal" style="--display: {isOpenModal ? 'block' : 'none'};" class="ml-4 mr-4 relative bg-white rounded-lg shadow dark:bg-gray-700">
  <form class="ml-10 mr-10 mt-5 ml-10">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3" for="grid-last-name">
            Start date
          </label>
          <input value={startDate} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="date" placeholder="Doe">
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3" for="grid-last-name">
            End date
          </label>
          <input value={endDate} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="date" placeholder="Doe">
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3 md:w-1/2">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3" for="grid-password">
            Your destination
          </label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={city.capitalize()}>
          <p class="text-gray-600 text-xs italic">You're gonna enjoy it!</p>
        </div>
        <div class="w-full px-3 md:w-1/2">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3" for="grid-password">
            Departure City
          </label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="From...">
          <p class="text-gray-600 text-xs italic">Home sweet home...</p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-3">
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3" for="grid-city">
            Adults
          </label>
          <input bind:value={adults} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number" placeholder=0>
        </div>
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3" for="grid-state">
            Children
          </label>
          <input bind:value={children} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number" placeholder=0>
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3" for="grid-state">
          Infants
        </label>
        <input bind:value={infants} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number" placeholder=0>
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-6">
        <label class="form-check-label inline-block text-gray-800" for="flexCheckDefault">
          Include stopovers
        </label>
        <input  bind:value={stopOvers} class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox">
      </div>
    <button id = "search" class="flex space-x-2 justify-center items-center  px-3 py-2 mt-4 mb-4 mb-0 ml-4 mr-4 bg-blue-500 hover:bg-blue-800 rounded-full drop-shadow-md">
        <span class="text-white">Search flights offer</span>
    </button>
  </form>
</div>

<style>
    #background {
        display: var(--display);
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color:rgba(240, 248, 255, 0.7);
    }

    #modal {
        display: var(--display);
        height: 47%;
        width: 60%;
       	position: fixed;
        z-index: 2;
        top: 65%;
        left: 50%;
        transform: translate(-50%, -50%);
        filter: drop-shadow(0 0 20px #333);
    }

    #search {
        width:80%;
        margin: 0 auto;
        margin-top: 3%;
    }

</style>