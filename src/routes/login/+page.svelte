<script>
	let username = '';
	let password = '';
</script>

<div class="h-screen flex">
	<div class="min-w-[300px] flex flex-col gap-2 m-auto justify-center items-center">
		<div on:click={() => {}} on:keydown={() => {}} aria-hidden>
			<a class="font-extrabold text-lg" href="/"><span class="text-[#0093ED]">SMART</span> OFFICE</a
			>
		</div>
		<form class="flex flex-col w-full items-center" method="POST">
			<input
				bind:value={username}
				class="input variant-form-material mt-4 bg-gray-50"
				placeholder="username..."
				name="username"
			/>
			<input
				type="password"
				bind:value={password}
				class="input variant-form-material mt-2 bg-gray-50"
				placeholder="password..."
				name="password"
			/>
			<button
				type="submit"
				on:click={() => {}}
				class="btn bg-blue_office rounded-sm text-white font-semibold mt-4 w-full">Login</button
			>
			<p class="mt-2">
				belum terdaftar? <span class="text-blue_office"><a href="/daftar">daftar</a></span>
			</p>
		</form>
	</div>
</div>
