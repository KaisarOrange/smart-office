<script>
	import { enhance } from '$app/forms';
	import { Avatar, ProgressBar } from '@skeletonlabs/skeleton';

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
				action="?/register"
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
				<input
					type="password"
					bind:value={password}
					class="input {form?.inputPasswordEmpty
						? 'input-error'
						: ''} variant-form-material mt-2 bg-gray-50"
					placeholder="konfirmasi password..."
					name="confirmPassword"
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
				<label for="file" class="bg-grey_office py-4 px-5 rounded-full select-none cursor-pointer">
					<i class="ri-user-fill text-3xl text-blue_office" />
					<input
						type="file"
						name="file"
						id="file"
						class="hidden"
						accept="image/gif,image/jpeg,image/jpg,image/png"
					/>
				</label>
				<p class="font-semibold text-sm mt-1">pilih foto profil</p>
				<button
					type="submit"
					on:click={() => {}}
					class="btn bg-blue_office rounded-sm text-white font-semibold mt-10 w-full">Daftar</button
				>
				<p class="mt-2">
					sudah punya akun? <span class="text-blue_office"><a href="/login">masuk</a></span>
				</p>
			</form>
		{/if}
	</div>
</div>
