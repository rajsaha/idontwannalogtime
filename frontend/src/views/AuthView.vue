<template>
    <main class="p-4">
        <section class="grid what-is gap-x-6">
            <div class="md:justify-self-end order-2 md:order-1">
                <h1 class="font-bold">
                    What is this?
                    <span class="font-black" style="color: #b084cc"
                        >🙅‍♂️ I don't wanna log time!</span
                    >
                </h1>
                <p>
                    I don't either but your client needs to see what you worked
                    on or else you don't get paid! This tool makes logging time
                    just <i>that</i> much easier!
                </p>
                <br />
                <p>
                    So, throw away your excel sheet and your Notes app and sign
                    up. It's free! 🎉
                </p>
                <br />
                <h1 class="font-bold">What else can I do here?</h1>
                <p>
                    As of v0.1, not much. You can log time and revisit what you
                    what you have logged in the past. That's about it!
                </p>
                <br />
                <p>More to come soon! 🚧</p>
            </div>
            <div class="p-4 content shadow-2xl order-1 md:order-2">
                <LoginForm @goToSignup="goToSignup" v-if="isLogin"></LoginForm>
                <SignupForm @goToLogin="goToLogin" v-if="!isLogin"></SignupForm>
            </div>
        </section>
    </main>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue"
import SignupForm from "@/components/SignupForm.vue"

export default {
    components: { SignupForm, LoginForm },
    data() {
        return {
            isLogin: true,
        }
    },
    methods: {
        goToSignup() {
            this.isLogin = false
        },
        goToLogin() {
            this.isLogin = true
        },
    },
}
</script>

<style scoped>
.what-is {
    justify-content: center;
    grid-row-gap: 2rem;
}

.content {
    background-color: white;
    border-radius: 0.5rem;
}

@media (min-width: 768px) {
    .what-is {
        grid-template-columns: 300px max-content;
        grid-row-gap: inherit;
    }
}
</style>
