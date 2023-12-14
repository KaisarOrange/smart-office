<script>
	import { enhance } from '$app/forms';
	import { ProgressBar } from '@skeletonlabs/skeleton';

	let username = '';
	let password = '';
	let formLoading = false;
	export let form;
</script>

<div class="h-screen flex">
	<div class="min-w-[300px] flex flex-col gap-2 m-auto justify-center items-center">
		<div on:click={() => {}} on:keydown={() => {}} aria-hidden>
			<a class="font-extrabold text-2xl" href="/"
				><span class="text-[#0093ED]">SMART</span> OFFICE</a
			>
		</div>

		{#if formLoading}
			<ProgressBar meter="bg-blue_office" height="h-2" value={undefined} />
		{:else}
			<form
				class="flex flex-col w-full items-center"
				action="?/login"
				method="POST"
				use:enhance={() => {
					formLoading = true;
					return async ({ update }) => {
						formLoading = false;
						update();
					};
				}}
			>
				<input
					bind:value={username}
					class="input {form?.inputEmpty
						? 'input-error'
						: ''} variant-form-material mt-4 bg-gray-50"
					placeholder="username..."
					name="username"
				/>
				<input
					type="password"
					bind:value={password}
					class="input {form?.inputPasswordEmpty
						? 'input-error'
						: ''} variant-form-material mt-2 bg-gray-50"
					placeholder="password..."
					name="password"
				/>
				<div class="mt-2 h-4 text-red-500">
					{#if form?.credentials}
						*username atau password tidak sesuai
					{/if}
					{#if form?.inputEmpty && !form?.inputPasswordEmpty}
						*Mohon isi username anda
					{/if}
					{#if form?.inputPasswordEmpty && !form?.inputEmpty}
						*Mohon isi password anda
					{/if}
					{#if form?.inputPasswordEmpty && form?.inputEmpty}
						*Mohon isi password dan username anda
					{/if}
				</div>
				<button
					type="submit"
					on:click={() => {}}
					class="btn bg-blue_office rounded-sm text-white font-semibold mt-10 w-full"
				>
					Login
				</button>
			</form>
			<p class="mt-2">
				belum terdaftar? <span class="text-blue_office"><a href="/daftar">daftar</a></span>
			</p>
		{/if}
	</div>
</div>
