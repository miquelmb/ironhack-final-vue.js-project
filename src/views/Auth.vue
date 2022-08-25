<template>

  <div class="container h-screen flex-col self-center md:flex-row border-none items-center justify-center max-w-full bg-postItsBackground bg-no-repeat bg-center bg-opacity-90">
    
    <div class="container border-none p-8 w-1/4 m-6"> 
      <router-view></router-view>
    </div>

  </div>

</template>

<script setup></script>

<!-- 
**noHints**
se encarga de parametrizar el paso de los componentes de log in y sign out 
-->
