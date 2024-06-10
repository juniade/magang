<template>
    <div>
        <button type="button" class="btn btn-dark w-100" data-bs-toggle="modal" data-bs-target="#exampleModal"
            style="width:100%" @click="$emit('register')">
            Register
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class=" modal-content mx-auto" style="width:100%">
                    <div class="mx-auto" style="width:50%">
                        <img src="/assets/success.svg" style="width:100%;height:50%">
                    </div>
                    <div class="mx-auto text-center px-5">
                        <h3>Registration Success</h3>
                    </div>
                    <div class="mx-auto py-3">
                        <button type="submit" class="btn btn-dark" data-bs-dismiss="modal"
                            @click="$emit('login')">Login</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>