<template>
    <div class="container">
        <div class="row ">
            <ProfilUserMenu></ProfilUserMenu>
            <div class="col-lg-8">
                <div class=" border p-3">
                    <div class="d-flex justify-content-between">
                        <h3>Story List</h3>
                        <NuxtLink to="/ProfilPages/WebCreateStory" class="btn btn-dark rounded-0">
                            <div>+ Create Story</div>
                        </NuxtLink>
                    </div>
                    <div class=" mt-5 d-flex justify-content-center">
                        <img src="/assets/empty-data.svg" style="width:20%">
                    </div>
                    <h5 class="mt-4 text-center">Data not found</h5>
                </div>
            </div>
        </div>
    </div>
</template>