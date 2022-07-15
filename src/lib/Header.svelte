<script>
	import { user, updateUser } from "../store.js"
	import { auth } from "../firebase_config.js"
	import { signOut } from "firebase/auth";
	import SignUpModal from "./modals/SignUpModal.svelte";
	import SignInModal from "./modals/SignInModal.svelte";

	let modals = {}

	const toggleModal = (modalTypes = {}) => {
		modals = {
			...modalTypes,
		}
	}
	const handleSignOut = () => signOut(auth)
		.then(() => {
			updateUser({loggedIn: false})
			localStorage.removeItem("user")
		})
		.catch((error) => {
		console.log("=>(Header.svelte:20) error", error.message);
	});
</script>

{ #if modals.signInModal }
	<SignInModal {toggleModal}/>
{ /if }

{ #if modals.signUpModal }
	<SignUpModal {toggleModal}/>
{ /if }


<div class="absolute z-10 top-5 inset-x-10 flex justify-between items-center">
	<p class="text-black w-16 h-16 bg-white rounded-full inline-flex justify-center items-center"> logo</p>
		<div>
			{ #if $user.loggedIn }
				<button on:click={handleSignOut}
								class="relative ml-2 inline-flex items-center px-5 py-2 overflow-hidden text-white bg-red-500 rounded-lg group"
				>
				<span
					class="absolute left-0 transition-transform -translate-x-full group-hover:translate-x-4"
				>
					<svg
						class="w-4 h-4"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 8l4 4m0 0l-4 4m4-4H3"
						/>
					</svg>
				</span>

					<span class="text-sm font-medium transition-all group-hover:ml-4"> Sign out </span>
				</button>
			{:else}
				<button on:click={() => toggleModal({signInModal: true})}
								class="relative inline-flex items-center px-5 py-2 bg-white overflow-hidden text-emerald-600 rounded-lg group"
				>
				<span
					class="absolute left-0 transition-transform -translate-x-full group-hover:translate-x-4"
				>
					<svg
						class="w-4 h-4"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 8l4 4m0 0l-4 4m4-4H3"
						/>
					</svg>
				</span>

					<span class="text-sm font-medium transition-all group-hover:ml-4"> Sign in </span>
				</button>
				<button on:click={() => toggleModal({signUpModal: true})}
								class="relative ml-2 inline-flex items-center px-5 py-2 overflow-hidden text-white bg-emerald-600 rounded-lg group"
				>
				<span
					class="absolute left-0 transition-transform -translate-x-full group-hover:translate-x-4"
				>
					<svg
						class="w-4 h-4"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 8l4 4m0 0l-4 4m4-4H3"
						/>
					</svg>
				</span>

					<span class="text-sm font-medium transition-all group-hover:ml-4"> Sign up </span>
				</button>
			{ /if }
	</div>
</div>
