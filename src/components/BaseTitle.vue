<template>
  <span>
    <div class="row">
      <div class="col col-auto mr-auto">
        <h1 class="text-h2 page-title">
          <slot name="title"></slot>
        </h1>
        <p class="text-body1 page-title">
          <slot name="subtitle"></slot>
        </p>

        <div class="page-title">
          <slot name="bottom-content"></slot>
        </div>
      </div>
      <div class="col col-auto page-content align-center d-flex">
        <slot name="right-content"></slot>
      </div>
    </div>
    <v-divider class="mt-5 mb-5"></v-divider>
  </span>
</template>
