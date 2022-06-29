<script lang="ts">
    import {createEventDispatcher} from "svelte";

    // could create an export let value with a bind:value in the element if you know the value has to be changed after init by an external source eg parent component
    export let invalid = false
    export let errorMessage = 'Input doesn\'t follow guidelines'

    const {'class': classes, ...props} = $$restProps // just separate the class props and all other props
    const dispatch = createEventDispatcher()


    function handleInputChange(e) {
      dispatch('inputChange', {
        value: e.target.value
      })
    }
</script>

<div class="some-other-classes-here {classes}">
    <input
        class:invalid={invalid}
        class:valid={!invalid}
        {...props}
        on:input={handleInputChange}
    > <!-- This "...props" will allow to have type,placeholder etc etc all just transferred without having to export it-->
    {#if invalid}
        <span>
            {errorMessage}
        </span>
    {/if}
</div>


<style>
    .invalid {
        border: 3px red solid;
    }
    .valid {
        border: 3px green solid;
    }
</style>
